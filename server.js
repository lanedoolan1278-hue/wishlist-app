const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { getStore } = require('@netlify/blobs');
const app = express();
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));