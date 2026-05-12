import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '', price: '', link: '', buyer: '', category: 'Beauty'
  });

  const API_URL = '/.netlify/functions/server/api/items';

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error("Database error:", err); }
  };

  const addItem = async () => {
    if (!formData.name) return;
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: '', price: '', link: '', buyer: '', category: 'Beauty' });
      fetchItems();
    } catch (err) { alert("Save failed. Make sure server.js is in netlify/functions/"); }
  };

  return (
    <div style={{ backgroundColor: '#F5F5DC', minHeight: '100vh', padding: '60px 20px', fontFamily: "'Syne', sans-serif", color: '#1a1a1a' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');`}</style>
      
      {/* HEADER SECTION */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ 
          fontSize: '6rem', margin: 0, color: '#98FB98', textTransform: 'uppercase',
          fontWeight: '800', textShadow: '8px 8px 0px #FFB6C1', letterSpacing: '-2px',
          WebkitTextStroke: '2px #1a1a1a'
        }}>WISHLIST</h1>
        <p style={{ color: '#FFB6C1', letterSpacing: '6px', fontSize: '1rem', marginTop: '5px', fontWeight: '400', textTransform: 'uppercase' }}>
          VOL. 01 — SPECIAL EDITION CATALOG
        </p>
      </div>

      {/* MAIN FORM CARD */}
      <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ position: 'absolute', top: '12px', left: '12px', width: '100%', height: '100%', backgroundColor: '#FFB6C1', border: '3px solid #1a1a1a' }}></div>
        <div style={{ position: 'relative', backgroundColor: '#98FB98', border: '3px solid #1a1a1a', padding: '40px' }}>
          <h2 style={{ margin: '0 0 25px 0', fontSize: '1.4rem', fontWeight: '800', textTransform: 'uppercase' }}>ADD NEW ENTRY:</h2>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            <input style={inputStyle} placeholder="ITEM NAME" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
               <input style={inputStyle} placeholder="PRICE $" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
               <input style={inputStyle} placeholder="WHERE TO BUY" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
            </div>
            <input style={inputStyle} placeholder="WHO TO BUY WITH" value={formData.buyer} onChange={e => setFormData({...formData, buyer: e.target.value})} />
            
            <select style={inputStyle} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Beauty">BEAUTY</option>
              <option value="Shelf">MOVE TO SHELF</option>
            </select>

            <button onClick={addItem} style={{
              backgroundColor: '#1a1a1a', color: '#98FB98', padding: '20px', 
              border: 'none', fontWeight: '800', fontSize: '1.2rem', cursor: 'pointer', letterSpacing: '2px'
            }}>APPEND TO CATALOG</button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTIONS */}
      <div style={{ maxWidth: '1000px', margin: '80px auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px' }}>
        <div>
          <h2 style={{ fontSize: '3rem', fontWeight: '700', borderBottom: '12px solid #FFB6C1', letterSpacing: '4px', marginBottom: '30px' }}>MY CART</h2>
          {items.filter(i => i.category !== 'Shelf').map(item => (
            <div key={item.id} style={itemRowStyle}>— {item.name.toUpperCase()}</div>
          ))}
        </div>
        <div>
          <h2 style={{ fontSize: '3rem', fontWeight: '700', borderBottom: '12px solid #98FB98', letterSpacing: '4px', marginBottom: '30px' }}>MY SHELF</h2>
          {items.filter(i => i.category === 'Shelf').map(item => (
            <div key={item.id} style={itemRowStyle}>— {item.name.toUpperCase()}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = { backgroundColor: 'white', border: '3px solid #1a1a1a', padding: '15px', fontWeight: '700', outline: 'none', width: '100%', boxSizing: 'border-box' };
const itemRowStyle = { fontSize: '1.2rem', padding: '12px 0', borderBottom: '2px solid #1a1a1a', fontWeight: '700', letterSpacing: '1px' };

export default App;
