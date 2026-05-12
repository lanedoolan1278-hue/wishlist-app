import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  // This talks to your Cloud Brain
  const API_URL = 'https://wishlist-catalog.netlify.app/.netlify/functions/server/api/items';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get(API_URL);
    setItems(res.data);
  };

  const addItem = async () => {
    await axios.post(API_URL, { name });
    setName('');
    fetchItems();
  };

  return (
    <div style={{ backgroundColor: '#fdf0f5', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: '#4a7c59' }}>MY CATALOG</h1>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Item Name" 
      />
      <button onClick={addItem}>APPEND TO CATALOG</button>
      <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;