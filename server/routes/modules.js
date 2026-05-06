const express = require('express');
const router = express.Router();
const modules = require('../data/modules');

router.get('/', (req, res) => {
  const summary = modules.map(({ id, icon, title, description, estimatedTime, badge }) => ({
    id, icon, title, description, estimatedTime, badge,
  }));
  res.json(summary);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const module = modules.find((m) => m.id === id);
  if (!module) return res.status(404).json({ error: 'Module not found' });
  res.json(module);
});

module.exports = router;
