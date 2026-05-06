require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const modulesRouter = require('./routes/modules');
const chatRouter = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use('/api/modules', modulesRouter);
app.use('/api/chat', chatRouter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    aiConfigured: !!process.env.GROQ_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`AI Coach: ${process.env.GROQ_API_KEY ? '✅ configured (Groq)' : '⚠️  GROQ_API_KEY not set'}`);
});
