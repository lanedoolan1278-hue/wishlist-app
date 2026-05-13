import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // We are USING 'items' now so the error goes away!
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', link: '', buyer: '', category: 'Beauty' });
  const API_URL = '/.netlify/functions/server/api/items';
  useEffect(() => { fetchItems(); }, []);
  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      if (Array.isArray(res.data)) setItems(res.data);
    } catch (err) { console.error("Cloud Brain Offline"); }
  };

  const addItem = async () => {
    if (!formData.name) return;
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: '', price: '', link: '', buyer: '', category: 'Beauty' });
      fetchItems();
    } catch (err) { alert("Save failed. Function not linked."); }
  };

  return (
    <div style={{ backgroundColor: '#fcf2e6', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Syne', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');`}</style>
      
      {/* TITLE WITH PINK + BLACK DOUBLE SHADOW */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ 
          fontSize: 'clamp(3rem, 10vw, 6rem)', color: '#b1f2ba', fontWeight: '800', 
          textShadow: '6px 6px 0px #ffb6c1, 12px 12px 0px #1a1a1a', 
          WebkitTextStroke: '2px #1a1a1a', textTransform: 'uppercase' 
        }}>WISHLIST</h1>
        <p style={{ color: '#ffb6c1', letterSpacing: '4px', fontWeight: 'bold' }}>VOL. 01 — SPECIAL EDITION CATALOG</p>
      </div>

      {/* ENTRY BOX WITH BLACK OUTLINE & PINK SHADOW */}
      <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto', marginBottom: '60px' }}>
        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '100%', height: '100%', backgroundColor: '#ffb6c1', border: '3px solid #1a1a1a' }}></div>
        <div style={{ position: 'relative', backgroundColor: '#b1f2ba', border: '3px solid #1a1a1a', padding: '30px' }}>
          <h2 style={{ fontWeight: '800' }}>ADD NEW ENTRY:</h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            <input style={inputStyle} placeholder="ITEM NAME" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input style={inputStyle} placeholder="PRICE $" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              <input style={inputStyle} placeholder="WHERE TO BUY" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
            </div>
            <select style={inputStyle} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Beauty">Beauty</option>
              <option value="Shelf">Move to Shelf</option>
            </select>
            <button onClick={addItem} style={{ backgroundColor: 'black', color: '#b1f2ba', padding: '20px', fontWeight: '900', border: 'none', cursor: 'pointer' }}>APPEND TO CATALOG</button>
          </div>
        </div>
      </div>

      {/* LIST SECTION (Using 'items' variable so build succeeds) */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', borderBottom: '10px solid #ffb6c1', marginBottom: '20px' }}>MY CART</h2>
          {items.filter(i => i.category !== 'Shelf').map(item => (
            <div key={item.id} style={{ fontSize: '1.2rem', padding: '10px 0', borderBottom: '2px solid #1a1a1a', fontWeight: 'bold' }}>{item.name.toUpperCase()}</div>
          ))}
        </div>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', borderBottom: '10px solid #b1f2ba', marginBottom: '20px' }}>MY SHELF</h2>
          {items.filter(i => i.category === 'Shelf').map(item => (
            <div key={item.id} style={{ fontSize: '1.2rem', padding: '10px 0', borderBottom: '2px solid #1a1a1a', fontWeight: 'bold' }}>{item.name.toUpperCase()}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '15px', border: '3px solid #1a1a1a', boxSizing: 'border-box', fontWeight: '700', fontFamily: 'Syne' };

export default App;\