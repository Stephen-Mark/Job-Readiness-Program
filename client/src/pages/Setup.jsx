import { useState } from 'react';
import axios from 'axios';

export default function Setup() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(null);

  async function testConnection() {
    setTesting(true);
    setResult(null);
    try {
      const { data } = await axios.get('/api/health');
      if (data.aiConfigured) {
        // Try a real API call
        const chat = await axios.post('/api/chat', {
          messages: [{ role: 'user', content: 'Say "Connected!" in exactly one word.' }],
        });
        setResult({ ok: true, message: `✅ AI Coach is connected and working! Response: ${chat.data.content}` });
      } else {
        setResult({ ok: false, message: '⚠️ API key not found. Follow the steps below to set it up.' });
      }
    } catch (err) {
      setResult({ ok: false, message: err.response?.data?.error || '❌ Connection failed — check your API key and server.' });
    } finally {
      setTesting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-navy mb-2">AI Coach setup</h1>
      <p className="text-mid mb-8">The AI Coach feature needs an Anthropic API key to work. Follow these steps to get one for free.</p>

      {/* Test button */}
      <div className="card mb-8">
        <h2 className="font-extrabold text-navy mb-2">Test your connection</h2>
        <p className="text-sm text-mid mb-4">If you've already set up your API key, click below to verify it's working.</p>
        <button
          onClick={testConnection}
          disabled={testing}
          className="btn-primary disabled:opacity-50"
        >
          {testing ? 'Testing...' : 'Test AI connection'}
        </button>
        {result && (
          <div className={`mt-4 p-4 rounded-xl text-sm font-semibold ${
            result.ok ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-coral border border-red-200'
          }`}>
            {result.message}
          </div>
        )}
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {[
          {
            n: 1,
            title: 'Create an Anthropic account',
            body: 'Go to console.anthropic.com and sign in or create a free account. New accounts get free trial credits.',
          },
          {
            n: 2,
            title: 'Create an API key',
            body: 'In the left sidebar, click "API Keys", then click "Create Key". Give it a name like "Job Readiness Program" and copy the key — you won\'t see it again.',
          },
          {
            n: 3,
            title: 'Add the key to your project',
            body: 'In the root folder of this project, create a file called .env. Add this line:',
            code: 'ANTHROPIC_API_KEY=sk-ant-api03-...your-key-here...',
          },
          {
            n: 4,
            title: 'Restart the server',
            body: 'Stop the server (Ctrl+C) and run npm run dev again. The AI Coach will now be active on every module page.',
          },
          {
            n: 5,
            title: 'For Render deployment',
            body: 'In your Render dashboard, go to your web service → Environment → Environment Variables. Add ANTHROPIC_API_KEY with your key value. Never commit your .env file to GitHub.',
          },
        ].map((step) => (
          <div key={step.n} className="card flex gap-4">
            <div className="w-8 h-8 rounded-full bg-teal text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
              {step.n}
            </div>
            <div>
              <h3 className="font-extrabold text-navy mb-1">{step.title}</h3>
              <p className="text-sm text-mid leading-relaxed">{step.body}</p>
              {step.code && (
                <code className="block mt-2 bg-navy text-teal text-xs px-3 py-2 rounded-lg font-mono">
                  {step.code}
                </code>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 card-cream">
        <h3 className="font-extrabold text-navy mb-1">🔒 Security reminder</h3>
        <p className="text-sm text-mid">
          Your API key is stored in a .env file that is listed in .gitignore — it will never be committed to GitHub. Never share your key publicly. The key is only used server-side and is never sent to the browser.
        </p>
      </div>
    </div>
  );
}
