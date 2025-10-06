import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showToast(`${product.name} quantity increased!`, "success");
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        showToast(`${product.name} added to cart!`, "success");
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      const item = cart.find(item => item.id === id);
      showToast(`${item?.name || 'Item'} removed from cart`, "error");
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
    }
  };

  const clearCart = () => {
    showToast("Order placed successfully! 🎉", "success");
    setCart([]);
  };

  return (
    <Router>
      {/* Toast Notification */}
      <div 
        style={{
          position: 'fixed',
          top: '90px',
          right: '20px',
          zIndex: 1100,
          maxWidth: '320px',
          backgroundColor: toast.type === 'error' ? '#ef4444' : '#0d9488',
          color: '#ffffff',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          transform: toast.show ? 'translateX(0)' : 'translateX(400px)',
          opacity: toast.show ? 1 : 0,
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg style={{ width: '24px', height: '24px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {toast.type === "success" ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
          <span style={{ fontWeight: '500', fontSize: '14px' }}>{toast.message}</span>
        </div>
      </div>

      {/* App Layout */}
      <div style={{ minHeight: '100vh', backgroundColor: '#fcfcf9' }}>
        <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
        
        {/* Cart Sidebar */}
        <Cart 
          cart={cart} 
          updateQty={updateQty} 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
        
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
