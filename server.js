const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Data file path
const dataFile = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
}

// Helper functions
const readData = () => {
  return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// GET all items
app.get('/api/items', (req, res) => {
  const items = readData();
  res.json(items);
});

// GET items by category
app.get('/api/items/category/:category', (req, res) => {
  const items = readData();
  const filtered = items.filter(item => item.category.toLowerCase() === req.params.category.toLowerCase());
  res.json(filtered);
});

// POST new item
app.post('/api/items', (req, res) => {
  const { name, category, price, imageUrl, link } = req.body;
  
  if (!name || !category) {
    return res.status(400).json({ error: 'Name and category are required' });
  }
  
  const items = readData();
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
  writeData(items);
  res.status(201).json(newItem);
});

// PUT update item (toggle bought status or update)
app.put('/api/items/:id', (req, res) => {
  const items = readData();
  const itemIndex = items.findIndex(item => item.id === req.params.id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  items[itemIndex] = { ...items[itemIndex], ...req.body };
  writeData(items);
  res.json(items[itemIndex]);
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const items = readData();
  const filtered = items.filter(item => item.id !== req.params.id);
  
  if (filtered.length === items.length) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  writeData(filtered);
  res.json({ message: 'Item deleted' });
});

// GET categories
app.get('/api/categories', (req, res) => {
  const items = readData();
  const categories = [...new Set(items.map(item => item.category))];
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
