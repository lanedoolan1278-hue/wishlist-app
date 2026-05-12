const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { getStore } = require('@netlify/blobs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper function to get the Netlify Blobs store
const getItemsStore = () => getStore('wishlist-items');

// Helper functions
const readData = async () => {
  try {
    const store = getItemsStore();
    const data = await store.get('items');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from Blobs:', error);
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

// GET all items
app.get('/api/items', async (req, res) => {
  const items = await readData();
  res.json(items);
});

// GET items by category
app.get('/api/items/category/:category', async (req, res) => {
  const items = await readData();
  const filtered = items.filter(item => item.category.toLowerCase() === req.params.category.toLowerCase());
  res.json(filtered);
});

// POST new item
app.post('/api/items', async (req, res) => {
  const { name, category, price, imageUrl, link } = req.body;
  
  if (!name || !category) {
    return res.status(400).json({ error: 'Name and category are required' });
  }
  
  const items = await readData();
  const newItem = {
    id: uuidv4(),
    name,
    category,
    price: price || null,
    imageUrl: imageUrl || null,
    link: link || null,
    bought: false,
    dateAdded: new Date().toISOString()
  };
  
  items.push(newItem);
  await writeData(items);
  res.status(201).json(newItem);
});

// PUT update item (toggle bought status or update)
app.put('/api/items/:id', async (req, res) => {
  const items = await readData();
  const itemIndex = items.findIndex(item => item.id === req.params.id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  items[itemIndex] = { ...items[itemIndex], ...req.body };
  await writeData(items);
  res.json(items[itemIndex]);
});

// DELETE item
app.delete('/api/items/:id', async (req, res) => {
  const items = await readData();
  const filtered = items.filter(item => item.id !== req.params.id);
  
  if (filtered.length === items.length) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  await writeData(filtered);
  res.json({ message: 'Item deleted' });
});

// GET categories
app.get('/api/categories', async (req, res) => {
  const items = await readData();
  const categories = [...new Set(items.map(item => item.category))];
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
