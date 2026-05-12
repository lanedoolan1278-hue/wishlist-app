import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '', price: '', link: '', buyer: '', category: 'Beauty'
  });

  const API_URL = 'https://wishlist-catalog.netlify.app/.netlify/functions/server/api/items';

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) { console.error("Database error:", err); }
  };

  const addItem = async () => {
    if (!formData.name) return;
    await axios.post(API_URL, formData);
    setFormData({ name: '', price: '', link: '', buyer: '', category: 'Beauty' });
    fetchItems();
  };

  return (
    <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh', padding: '60px 20px', fontFamily: 'Orbitron, sans-serif', color: '#1a1a1a' }}>
      {/* HEADER SECTION */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ 
          fontSize: '5rem', margin: 0, color: '#c8ffbf', textTransform: 'uppercase',
          textShadow: '6px 6px 0px #f6b6cf', letterSpacing: '8px', WebkitTextStroke: '2px #1a1a1a'
        }}>WISHLIST</h1>
        <p style={{ color: '#f6b6cf', letterSpacing: '4px', fontSize: '0.9rem', marginTop: '10px' }}>
          VOL. 01 — SPECIAL EDITION CATALOG
        </p>
      </div>

      {/* MAIN FORM CARD */}
      <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
        {/* Pink Shadow Layer */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', width: '100%', height: '100%', backgroundColor: '#f6b6cf', border: '2px solid #1a1a1a', zIndex: 0 }}></div>
        
        {/* Main Mint Card */}
        <div style={{ position: 'relative', backgroundColor: '#c8ffbf', border: '2px solid #1a1a1a', padding: '40px', zIndex: 1 }}>
          <h2 style={{ margin: '0 0 25px 0', fontSize: '1.5rem', letterSpacing: '2px' }}>ADD NEW ENTRY:</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <input style={inputStyle} placeholder="ITEM NAME" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} />
            <div style={{ display: 'flex', gap: '10px', gridColumn: 'span 2' }}>
               <input style={inputStyle} placeholder="PRICE $" value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})} />
               <input style={inputStyle} placeholder="WHERE TO BUY" value={formData.link} onChange={(e)=>setFormData({...formData, link: e.target.value})} />
            </div>
            <input style={{...inputStyle, gridColumn: 'span 2'}} placeholder="WHO TO BUY WITH" value={formData.buyer} onChange={(e)=>setFormData({...formData, buyer: e.target.value})} />
            
            <select style={{...inputStyle, gridColumn: 'span 2'}} value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})}>
              <option value="Beauty">Beauty</option>
              <option value="Fashion">Fashion</option>
              <option value="Tech">Tech</option>
            </select>

            <button onClick={addItem} style={{
              gridColumn: 'span 2', backgroundColor: '#1a1a1a', color: '#c8ffbf', padding: '20px', 
              border: 'none', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', letterSpacing: '3px'
            }}>APPEND TO CATALOG</button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTIONS */}
      <div style={{ maxWidth: '1000px', margin: '80px auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', borderBottom: '8px solid #f6b6cf', display: 'inline-block', marginBottom: '30px' }}>MY CART</h2>
          {items.filter(i => i.category !== 'Shelf').map(item => (
            <div key={item.id} style={itemRowStyle}>— {item.name.toUpperCase()}</div>
          ))}
        </div>
        <div>
          <h2 style={{ fontSize: '2.5rem', borderBottom: '8px solid #c8ffbf', display: 'inline-block', marginBottom: '30px' }}>MY SHELF</h2>
          {items.filter(i => i.category === 'Shelf').map(item => (
            <div key={item.id} style={itemRowStyle}>— {item.name.toUpperCase()}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  backgroundColor: 'white', border: '2px solid #1a1a1a', padding: '15px', 
  fontSize: '0.9rem', outline: 'none', width: '100%', boxSizing: 'border-box'
};

const itemRowStyle = {
  fontSize: '1.1rem', padding: '10px 0', borderBottom: '1px solid #eee', letterSpacing: '1px'
};

export default App;
