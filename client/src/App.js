import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '', price: '', link: '', buyer: '', category: 'Beauty'
  });

  // THE BRAIN: This link must be exact
  const API_URL = '/.netlify/functions/server/api/items';

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error("Fetch error:", err); }
  };

  const addItem = async () => {
    if (!formData.name) return;
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: '', price: '', link: '', buyer: '', category: 'Beauty' });
      fetchItems();
    } catch (err) { alert("Save failed. Check your Netlify Logs."); }
  };

  return (
    <div style={{ backgroundColor: '#fffdf5', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* TITLE SECTION */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ 
          fontSize: 'clamp(3rem, 10vw, 6rem)', margin: 0, color: '#c8ffbf', 
          WebkitTextStroke: '2px #1a1a1a', textShadow: '8px 8px 0px #f6b6cf',
          fontWeight: '900', letterSpacing: '4px'
        }}>WISHLIST</h1>
        <p style={{ color: '#f6b6cf', fontWeight: 'bold', letterSpacing: '2px', marginTop: '-10px' }}>
          VOL. 01 — SPECIAL EDITION CATALOG
        </p>
      </div>

      {/* FORM CARD */}
      <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto', marginBottom: '80px' }}>
        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '100%', height: '100%', backgroundColor: '#f6b6cf', border: '3px solid #1a1a1a' }}></div>
        <div style={{ position: 'relative', backgroundColor: '#c8ffbf', border: '3px solid #1a1a1a', padding: '30px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: '900' }}>ADD NEW ENTRY:</h2>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            <input style={inputStyle} placeholder="ITEM NAME" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input style={inputStyle} placeholder="PRICE $" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              <input style={inputStyle} placeholder="WHERE TO BUY" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
            </div>
            <input style={inputStyle} placeholder="WHO TO BUY WITH" value={formData.buyer} onChange={e => setFormData({...formData, buyer: e.target.value})} />
            <select style={inputStyle} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Beauty">Beauty</option>
              <option value="Shoes">Shoes</option>
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Decor">Decor</option>
              <option value="Shelf">Move to Shelf</option>
            </select>
            <button onClick={addItem} style={{ backgroundColor: 'black', color: '#c8ffbf', border: 'none', padding: '20px', fontWeight: '900', cursor: 'pointer', fontSize: '1.1rem' }}>
              APPEND TO CATALOG
            </button>
          </div>
        </div>
      </div>

      {/* DISPLAY SECTION */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', borderBottom: '10px solid #f6b6cf', marginBottom: '20px' }}>MY CART</h2>
          {items.filter(i => i.category !== 'Shelf').map(item => (
            <div key={item.id} style={{ fontSize: '1.2rem', padding: '10px 0', borderBottom: '2px solid #1a1a1a', fontWeight: 'bold' }}>{item.name.toUpperCase()}</div>
          ))}
        </div>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', borderBottom: '10px solid #c8ffbf', marginBottom: '20px' }}>MY SHELF</h2>
          {items.filter(i => i.category === 'Shelf').map(item => (
            <div key={item.id} style={{ fontSize: '1.2rem', padding: '10px 0', borderBottom: '2px solid #1a1a1a', fontWeight: 'bold' }}>{item.name.toUpperCase()}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '15px', border: '3px solid #1a1a1a', outline: 'none', boxSizing: 'border-box', fontWeight: 'bold' };

export default App;
