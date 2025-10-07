import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, clearCart }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();
  
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    setIsLoading(true);
    axios.post("https://minimal-ecommerce-4rbw.onrender.com/checkout", { cart })
      .then(res => {
        setOrderDetails(res.data);
        setShowSuccessModal(true);
        clearCart();
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to place order. Please try again.");
        setIsLoading(false);
      });
  };

  const handleContinueShopping = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdfa 0%, #ecfeff 50%, #f0f9ff 100%)',
        paddingTop: '40px',
        paddingBottom: '60px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Header */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '32px',
            marginBottom: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          }}>
            <h2 style={{ 
              fontSize: '40px', 
              fontWeight: '800', 
              color: '#0f172a',
              margin: 0,
              letterSpacing: '-1px',
            }}>
              Checkout
            </h2>
            <p style={{ 
              fontSize: '16px', 
              color: '#64748b', 
              margin: '8px 0 0 0' 
            }}>
              Review your order before completing the purchase
            </p>
          </div>

          {cart.length === 0 ? (
            /* Empty Cart State */
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '80px 40px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <p style={{ fontSize: '20px', color: '#64748b', fontWeight: '600', marginBottom: '16px' }}>
                Your cart is empty
              </p>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '12px 32px',
                  backgroundColor: '#0d9488',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f766e'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0d9488'}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Order Items */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '32px',
                marginBottom: '24px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  marginBottom: '24px',
                  color: '#0f172a',
                }}>
                  Order Summary
                  <span style={{ 
                    marginLeft: '12px', 
                    fontSize: '16px', 
                    fontWeight: '600',
                    color: '#0d9488',
                    backgroundColor: '#f0fdfa',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}>
                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                  </span>
                </h3>
                
                <div style={{ marginBottom: '24px' }}>
                  {cart.map((item, index) => (
                    <div 
                      key={item.id} 
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px 0',
                        borderBottom: index !== cart.length - 1 ? '1px solid #e2e8f0' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
                        {item.imageUrl && (
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '12px',
                              backgroundColor: '#f8fafc',
                            }}
                          />
                        )}
                        <div>
                          <div style={{ 
                            fontWeight: '600', 
                            fontSize: '16px', 
                            color: '#0f172a',
                            marginBottom: '6px',
                          }}>
                            {item.name}
                          </div>
                          <div style={{ 
                            fontSize: '14px', 
                            color: '#64748b',
                            marginBottom: '4px',
                          }}>
                            ₹{item.price.toLocaleString('en-IN')} × {item.qty}
                          </div>
                          <div style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            backgroundColor: '#f1f5f9',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#475569',
                          }}>
                            Qty: {item.qty}
                          </div>
                        </div>
                      </div>
                      <div style={{ 
                        fontWeight: '700', 
                        fontSize: '20px', 
                        color: '#0d9488',
                        textAlign: 'right',
                      }}>
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div style={{
                  borderTop: '2px solid #e2e8f0',
                  paddingTop: '20px',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '16px',
                    color: '#64748b',
                  }}>
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '16px',
                    color: '#64748b',
                  }}>
                    <span>Shipping</span>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>FREE</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '2px solid #e2e8f0',
                    fontSize: '28px',
                    fontWeight: '800',
                    color: '#0f172a',
                  }}>
                    <span>Total</span>
                    <span style={{ color: '#0d9488' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                style={{
                  width: '100%',
                  height: '64px',
                  backgroundColor: isLoading ? '#14b8a6' : '#0d9488',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '20px',
                  fontWeight: '700',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: '0 8px 20px rgba(13, 148, 136, 0.3)',
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#0f766e';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(13, 148, 136, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#0d9488';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(13, 148, 136, 0.3)';
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      border: '3px solid #ffffff',
                      borderTop: '3px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }}></div>
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Place Order</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '48px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            animation: 'slideUp 0.4s ease',
          }}>
            {/* Success Icon */}
            <div style={{
              width: '100px',
              height: '100px',
              margin: '0 auto 24px',
              backgroundColor: '#d1fae5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'scaleIn 0.5s ease',
            }}>
              <svg width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h2 style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '12px',
            }}>
              Order Placed! 🎉
            </h2>

            <p style={{
              fontSize: '16px',
              color: '#64748b',
              marginBottom: '24px',
              lineHeight: '1.6',
            }}>
              Your order has been successfully placed. We'll send you a confirmation email shortly.
            </p>

            {orderDetails && (
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '24px',
              }}>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#64748b',
                  marginBottom: '8px',
                }}>
                  Order ID
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#0d9488',
                  fontFamily: 'monospace',
                }}>
                  {orderDetails.orderId}
                </div>
              </div>
            )}

            <button
              onClick={handleContinueShopping}
              style={{
                width: '100%',
                height: '56px',
                backgroundColor: '#0d9488',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f766e'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0d9488'}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes scaleIn {
          from { 
            transform: scale(0);
          }
          to { 
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}

export default Checkout;
