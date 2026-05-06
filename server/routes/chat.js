const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');

const BASE_SYSTEM_PROMPT = `You are a friendly, encouraging work readiness coach for Brimbank Tech School. You help Year 9–12 students in Victoria, Australia understand workplace skills. Keep responses short, practical, and easy to understand. Use examples relevant to young people. Never be preachy or lecture students — be a supportive peer coach. Format responses with short paragraphs. Maximum 3 paragraphs per response.`;

const INTERVIEW_SYSTEM_PROMPT = `You are an expert interview coach for Brimbank Tech School. A student has just answered a job interview question. Evaluate their answer and provide structured feedback. Be warm, encouraging, and specific. Always find genuine strengths before suggesting improvements.

Format your response EXACTLY like this (use these exact headings):
**✅ What worked well:**
[2-3 specific things they did well]

**💡 Areas to strengthen:**
[1-2 specific, actionable improvements]

**🔄 Suggested rewrite:**
[A model answer of 3-5 sentences using the STAR method where relevant]

Keep your total response under 250 words. Be encouraging — this student is building confidence.`;

router.post('/', async (req, res) => {
  const { messages, moduleContext, mode } = req.body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({
      error: 'AI Coach is not set up yet — ask your teacher to configure it.',
      code: 'NO_API_KEY',
    });
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required.' });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const systemPrompt = mode === 'interview'
      ? INTERVIEW_SYSTEM_PROMPT
      : `${BASE_SYSTEM_PROMPT}${moduleContext ? `\n\nThe student is currently working on: "${moduleContext}". Keep your answers relevant to this topic.` : ''}`;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: mode === 'interview' ? 500 : 300,
      system: systemPrompt,
      messages: messages.map(({ role, content }) => ({ role, content })),
    });

    res.json({ content: response.content[0].text });
  } catch (err) {
    console.error('Claude API error:', err.message);
    if (err.status === 401) {
      return res.status(401).json({ error: 'Invalid API key. Please check your configuration.', code: 'INVALID_KEY' });
    }
    res.status(500).json({
      error: 'AI Coach is taking a break — try again in a moment.',
      code: 'API_ERROR',
    });
  }
});

module.exports = router;
