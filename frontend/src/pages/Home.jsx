import { useEffect, useState } from "react";
import axios from "axios";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      addToCart(product);
      setAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }, 400);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #ecfeff 50%, #f0f9ff 100%)',
      paddingTop: '40px',
      paddingBottom: '60px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: '800', 
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-1px',
          }}>
            Featured Products
          </h1>
          <p style={{ 
            fontSize: '20px', 
            color: '#64748b',
            fontWeight: '400',
          }}>
            Discover our curated collection of premium tech
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            paddingTop: '80px',
            paddingBottom: '80px',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '4px solid #e2e8f0',
              borderTop: '4px solid #0d9488',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              marginBottom: '20px',
            }}></div>
            <p style={{ fontSize: '16px', color: '#64748b', fontWeight: '500' }}>
              Loading amazing products...
            </p>
          </div>
        ) : (
          /* Products Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '28px',
          }}>
            {products.map(product => (
              <div 
                key={product.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)';
                }}
              >
                {/* Product Image Container */}
                <div style={{
                  width: '100%',
                  height: '280px',
                  overflow: 'hidden',
                  backgroundColor: '#f8fafc',
                  position: 'relative',
                }}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f1f5f9;color:#94a3b8;font-size:14px;">Image unavailable</div>';
                    }}
                  />
                  
                  {/* Category Badge */}
                  {product.category && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: '#0d9488',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }}>
                      {product.category}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '700', 
                    marginBottom: '8px', 
                    color: '#0f172a',
                    lineHeight: '1.4',
                    minHeight: '50px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {product.name}
                  </h3>
                  
                  {/* Description */}
                  {product.description && (
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#64748b', 
                      marginBottom: '16px',
                      lineHeight: '1.6',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '44px',
                    }}>
                      {product.description}
                    </p>
                  )}
                  
                  {/* Price */}
                  <div style={{ 
                    fontSize: '28px', 
                    fontWeight: '800', 
                    color: '#0d9488', 
                    marginBottom: '16px',
                    letterSpacing: '-0.5px',
                  }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart[product.id]}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: addingToCart[product.id] ? '#14b8a6' : '#0d9488',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: addingToCart[product.id] ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)',
                    }}
                    onMouseEnter={(e) => {
                      if (!addingToCart[product.id]) {
                        e.currentTarget.style.backgroundColor = '#0f766e';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(13, 148, 136, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!addingToCart[product.id]) {
                        e.currentTarget.style.backgroundColor = '#0d9488';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.2)';
                      }
                    }}
                  >
                    {addingToCart[product.id] ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid #ffffff',
                          borderTop: '2px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 0.6s linear infinite',
                        }}></div>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            paddingTop: '80px',
            paddingBottom: '80px',
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 24px',
              backgroundColor: '#f1f5f9',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <p style={{ fontSize: '20px', color: '#64748b', fontWeight: '600' }}>
              No products available at the moment
            </p>
          </div>
        )}
      </div>

      {/* Add keyframe animation for spinner */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Home;
