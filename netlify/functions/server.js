const app = express();
const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { getStore } = require('@netlify/blobs');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const getItemsStore = () => getStore('wishlist-items');

const readData = async () => {
  try {
    const store = getItemsStore();
    const data = await store.get('items');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const writeData = async (data) => {
  try {
    const store = getItemsStore();
    await store.set('items', JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to Blobs:', error);
  }
};

app.get('/api/items', async (req, res) => {
  const items = await readData();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const { name, category, price, imageUrl, link } = req.body;
  const items = await readData();
  const newItem = { id: uuidv4(), name, category, price: price || null, imageUrl: imageUrl || null, link: link || null, bought: false, dateAdded: new Date().toISOString() };
  items.push(newItem);
  await writeData(items);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  let items = await readData();
  items = items.map(item => item.id === id ? { ...item, ...req.body } : item);
  await writeData(items);
  res.json({ message: 'Item updated' });
});

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  let items = await readData();
  items = items.filter(item => item.id !== id);
  await writeData(items);
  res.status(204).send();
});

// Delete or comment out: app.listen(5000...)
// Final sync check
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const { getStore } = require('@netlify/blobs');

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

// 1. Route to GET items
router.get('/items', async (req, res) => {
  const store = getStore('wishlist');
  const items = await store.get('items', { type: 'json' }) || [];
  res.json(items);
});

// 2. Route to POST (Add) items
router.post('/items', async (req, res) => {
  const store = getStore('wishlist');
  const items = await store.get('items', { type: 'json' }) || [];
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  await store.setJSON('items', items);
  res.json(newItem);
});

// Important: Match the prefix you used in React
app.use('/api', router);

module.exports.handler = serverless(app);