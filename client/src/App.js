import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', where: '', who: '', category: 'Beauty' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    setItems([...items, { ...formData, id: Date.now(), bought: false }]);
    setFormData({ name: '', price: '', where: '', who: '', category: 'Beauty' });
  };

  const toggleBought = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, bought: !item.bought } : item));
  };

  const deleteItem = (id) => {
    if (window.confirm("Permanent delete?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const wishlist = items.filter(i => !i.bought);
  const myShelf = items.filter(i => i.bought);

  // This part groups your items by category automatically!
  const categories = ['Beauty', 'Shoes', 'Tops', 'Bottoms', 'Decor'];

  return (
    <div style={{ backgroundColor: '#FDF5E6', minHeight: '100vh', padding: '40px', fontFamily: '"Syne", sans-serif', color: '#000' }}>
      <style>@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');</style>
      
      <h1 style={{ fontWeight: '800', fontSize: '5rem', textAlign: 'center', color: '#B2F2BB', textShadow: '4px 4px 0px #FFB6C1, 8px 8px 0px #000', letterSpacing: '-3px', marginBottom: '0' }}>WISHLIST</h1>
      <p style={{ textAlign: 'center', fontWeight: '700', fontSize: '1.2rem', color: '#FFB6C1', textTransform: 'uppercase', marginBottom: '50px', letterSpacing: '2px' }}>Vol. 01 — Special Edition Catalog</p>
      
      <form onSubmit={handleAdd} style={{ backgroundColor: '#B2F2BB', padding: '30px', border: '4px solid #000', boxShadow: '12px 12px 0px #FFB6C1', maxWidth: '600px', margin: '0 auto 60px auto' }}>
        <h3 style={{ fontWeight: '800', marginBottom: '15px' }}>ADD NEW ENTRY:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input placeholder="ITEM NAME" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{padding: '12px', border: '3px solid #000', fontWeight: '700'}} />
          <div style={{display: 'flex', gap: '10px'}}>
            <input placeholder="PRICE $" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{flex: 1, padding: '12px', border: '3px solid #000', fontWeight: '700'}} />
            <input placeholder="WHERE TO BUY" value={formData.where} onChange={e => setFormData({...formData, where: e.target.value})} style={{flex: 1, padding: '12px', border: '3px solid #000', fontWeight: '700'}} />
          </div>
          <input placeholder="WHO TO BUY WITH" value={formData.who} onChange={e => setFormData({...formData, who: e.target.value})} style={{padding: '12px', border: '3px solid #000', fontWeight: '700'}} />
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{padding: '12px', border: '3px solid #000', fontWeight: '700', backgroundColor: 'white'}}>
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <button type="submit" style={{backgroundColor: '#000', color: '#B2F2BB', border: 'none', padding: '15px', fontWeight: '800', cursor: 'pointer', fontSize: '1.1rem'}}>APPEND TO CATALOG</button>
        </div>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', maxWidth: '1100px', margin: '0 auto' }}>
        {/* MY CART WITH CATEGORIES */}
        <div>
          <h2 style={{ fontWeight: '800', fontSize: '2.5rem', borderBottom: '8px solid #FFB6C1', marginBottom: '30px', display: 'inline-block' }}>MY CART</h2>
          
          {categories.map(cat => {
            const categoryItems = wishlist.filter(item => item.category === cat);
            if (categoryItems.length === 0) return null; // Don't show empty categories

            return (
              <div key={cat} style={{ marginBottom: '40px' }}>
                <h3 style={{ backgroundColor: '#000', color: '#FFF', display: 'inline-block', padding: '5px 15px', transform: 'rotate(-2deg)', marginBottom: '20px', fontWeight: '800' }}>{cat.toUpperCase()}</h3>
                {categoryItems.map(item => (
                  <div key={item.id} style={{ background: '#FFF', border: '3px solid #000', padding: '20px', marginBottom: '20px', boxShadow: '6px 6px 0px #B2F2BB', position: 'relative' }}>
                    <h3 style={{ fontWeight: '800', fontSize: '1.4rem', margin: '0 0 10px 0' }}>{item.name}</h3>
                    <p style={{ margin: '5px 0', fontSize: '0.9rem' }}><b>COST:</b> {item.price || '???'}</p>
                    <p style={{ margin: '5px 0', fontSize: '0.9rem' }}><b>SOURCE:</b> {item.where}</p>
                    <p style={{ margin: '5px 0', fontSize: '0.9rem' }}><b>CO-BUYER:</b> {item.who}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                      <button onClick={() => toggleBought(item.id)} style={{ background: '#B2F2BB', border: '2px solid #000', fontWeight: '800', cursor: 'pointer', padding: '8px 15px' }}>CLAIMED!</button>
                      <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', textDecoration: 'underline', color: 'red', fontWeight: '800', cursor: 'pointer', fontSize: '0.7rem' }}>[ DISCARD ]</button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* MY SHELF */}
        <div>
          <h2 style={{ fontWeight: '800', fontSize: '2.5rem', borderBottom: '8px solid #B2F2BB', marginBottom: '30px', display: 'inline-block' }}>MY SHELF</h2>
          {myShelf.map(item => (
            <div key={item.id} style={{ background: '#FFB6C1', border: '3px solid #000', padding: '20px', marginBottom: '20px', boxShadow: '6px 6px 0px #000' }}>
              <h3 style={{ fontWeight: '800', textDecoration: 'line-through' }}>{item.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <button onClick={() => toggleBought(item.id)} style={{ background: '#FFF', border: '2px solid #000', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '700' }}>MOVE TO CART</button>
                <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', textDecoration: 'underline', color: 'black', fontWeight: '800', cursor: 'pointer', fontSize: '0.7rem' }}>[ REMOVE ]</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
