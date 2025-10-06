import { useNavigate } from "react-router-dom";

function Cart({ cart, updateQty, isOpen, onClose }) {
  const navigate = useNavigate();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#ffffff',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.2)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          background: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)',
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            color: '#1f2937', 
            margin: 0 
          }}>
            Your Cart ({cart.length})
          </h2>
          <button 
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'}
          >
            <svg style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Body */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '20px',
          backgroundColor: '#fafafa',
        }}>
          {cart.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              paddingTop: '60px',
              paddingBottom: '60px',
            }}>
              <svg style={{ 
                width: '80px', 
                height: '80px', 
                margin: '0 auto 20px',
                color: '#9ca3af',
                opacity: 0.5,
              }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <p style={{ fontSize: '18px', color: '#6b7280', margin: 0 }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '8px' }}>
                Add some products to get started!
              </p>
            </div>
          ) : (
            cart.map((item, ) => (
              <div 
                key={item.id} 
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px',
                  marginBottom: '12px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  border: '1px solid #e5e7eb',
                }}
              >
                {/* Product Image */}
                {item.imageUrl && (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    style={{
                      width: '90px',
                      height: '90px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      backgroundColor: '#f3f4f6',
                      flexShrink: 0,
                    }}
                  />
                )}
                
                {/* Product Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#1f2937', 
                    margin: '0 0 6px 0',
                    lineHeight: '1.4',
                  }}>
                    {item.name}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '18px', 
                    fontWeight: '700', 
                    color: '#0d9488', 
                    margin: '0 0 12px 0' 
                  }}>
                    ₹{item.price}
                  </p>
                  
                  {/* Quantity Controls */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    marginTop: 'auto',
                  }}>
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        cursor: item.qty <= 1 ? 'not-allowed' : 'pointer',
                        opacity: item.qty <= 1 ? 0.5 : 1,
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#374151',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (item.qty > 1) e.currentTarget.style.backgroundColor = '#f9fafb';
                      }}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                    >
                      −
                    </button>
                    
                    <span style={{ 
                      minWidth: '40px', 
                      textAlign: 'center', 
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937',
                    }}>
                      {item.qty}
                    </span>
                    
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#374151',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                    >
                      +
                    </button>

                    <button 
                      onClick={() => updateQty(item.id, 0)}
                      style={{
                        marginLeft: 'auto',
                        padding: '6px 12px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div style={{ 
                  fontSize: '18px',
                  fontWeight: '700', 
                  color: '#0d9488',
                  flexShrink: 0,
                }}>
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer - Checkout Section */}
        {cart.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid #e5e7eb',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#6b7280',
              }}>
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '2px solid rgba(0,0,0,0.1)',
                fontSize: '22px',
                fontWeight: '700',
                color: '#1f2937',
              }}>
                <span>Total</span>
                <span style={{ color: '#0d9488' }}>₹{totalPrice}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              style={{
                width: '100%',
                height: '56px',
                backgroundColor: '#0d9488',
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0f766e';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(13, 148, 136, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0d9488';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.3)';
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
