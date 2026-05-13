const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const { getStore } = require('@netlify/blobs');

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

// Match the path exactly to what React is calling
router.get('/items', async (req, res) => {
  try {
    const store = getStore('wishlist');
    const items = await store.get('items', { type: 'json' }) || [];
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/items', async (req, res) => {
  try {
    const store = getStore('wishlist');
    const items = await store.get('items', { type: 'json' }) || [];
    const newItem = { id: Date.now(), ...req.body };
    items.push(newItem);
    await store.setJSON('items', items);
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/', router); 

// Ensure this is the only export and at the bottom
module.exports.handler = serverless(app);
