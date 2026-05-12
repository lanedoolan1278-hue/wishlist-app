import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  const API_URL = 'https://wishlist-catalog.netlify.app/.netlify/functions/server/api/items';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  const addItem = async () => {
    if (!name) return;
    await axios.post(API_URL, { name });
    setName('');
    fetchItems();
  };

  return (
    <div style={{ backgroundColor: '#fdf0f5', minHeight: '100vh', padding: '40px', fontFamily: 'serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #4a7c59', padding: '30px', backgroundColor: 'white', boxShadow: '10px 10px 0px #4a7c59' }}>
        <h1 style={{ color: '#4a7c59', textAlign: 'center', letterSpacing: '2px', borderBottom: '1px solid #4a7c59', paddingBottom: '10px' }}>
          MY CATALOG
        </h1>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <input 
            style={{ flex: 1, padding: '10px', border: '1px solid #4a7c59', outline: 'none' }}
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="ITEM NAME..." 
          />
          <button 
            onClick={addItem}
            style={{ backgroundColor: '#4a7c59', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            APPEND
          </button>
        </div>

        <div style={{ marginTop: '30px' }}>
          {items.map(item => (
            <div key={item.id} style={{ borderBottom: '1px dashed #4a7c59', padding: '10px 0', color: '#333' }}>
              • {item.name.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;