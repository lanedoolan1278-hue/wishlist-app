import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('MY CART');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('');

  const API_URL = 'https://wishlist-catalog.netlify.app/.netlify/functions/server/api/items';

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) { console.error("Error fetching:", err); }
  };

  const addItem = async () => {
    if (!name) return;
    const newItem = { name, category, price, imageUrl, link };
    await axios.post(API_URL, newItem);
    setName(''); setPrice(''); setImageUrl(''); setLink('');
    fetchItems();
  };

  return (
    <div style={{ backgroundColor: '#fdf0f5', minHeight: '100vh', padding: '20px', fontFamily: '"Times New Roman", serif' }}>
      <header style={{ textAlign: 'center', borderBottom: '2px solid #4a7c59', marginBottom: '40px' }}>
        <h1 style={{ color: '#4a7c59', fontSize: '3rem', margin: '10px 0', letterSpacing: '4px' }}>WISHLIST CATALOG</h1>
        <p style={{ color: '#4a7c59', fontStyle: 'italic' }}>SPECIAL EDITION / SPRING 2026</p>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '30px', border: '1px solid #4a7c59', boxShadow: '15px 15px 0px #4a7c59' }}>
        <h2 style={{ color: '#4a7c59', borderBottom: '1px solid #4a7c59' }}>APPEND TO CATALOG</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
          <input style={{ padding: '10px', border: '1px solid #4a7c59' }} placeholder="ITEM NAME" value={name} onChange={(e) => setName(e.target.value)} />
          <select style={{ padding: '10px', border: '1px solid #4a7c59' }} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="MY CART">MY CART</option>
            <option value="MY SHELF">MY SHELF</option>
          </select>
          <input style={{ padding: '10px', border: '1px solid #4a7c59' }} placeholder="PRICE" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input style={{ padding: '10px', border: '1px solid #4a7c59' }} placeholder="IMAGE URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          <input style={{ padding: '10px', border: '1px solid #4a7c59', gridColumn: 'span 2' }} placeholder="PRODUCT LINK" value={link} onChange={(e) => setLink(e.target.value)} />
          <button onClick={addItem} style={{ gridColumn: 'span 2', backgroundColor: '#4a7c59', color: 'white', padding: '15px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>APPEND TO CATALOG</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', maxWidth: '1000px', margin: '40px auto' }}>
        {['MY CART', 'MY SHELF'].map(cat => (
          <div key={cat}>
            <h2 style={{ color: '#4a7c59', borderBottom: '2px solid #4a7c59', paddingBottom: '5px' }}>{cat}</h2>
            {items.filter(i => i.category === cat).map(item => (
              <div key={item.id} style={{ marginTop: '20px', border: '1px solid #eee', padding: '10px' }}>
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />}
                <h3 style={{ margin: '10px 0 5px 0' }}>{item.name}</h3>
                <p style={{ color: '#4a7c59', fontWeight: 'bold' }}>{item.price}</p>
                {item.link && <a href={item.link} target="_blank" rel="noreferrer" style={{ color: '#4a7c59', fontSize: '0.8rem' }}>VIEW ITEM →</a>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
