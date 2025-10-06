import { Link } from "react-router-dom";

function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-teal-600 to-teal-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center" style={{ height: '72px' }}>
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 no-underline group"
            style={{ textDecoration: 'none' }}
          >
            <span style={{ fontSize: '40px', lineHeight: '1' }}>🛒</span>
            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: '700', 
              color: '#ffffff', 
              margin: '0',
              letterSpacing: '-0.5px'
            }}>
              MyShop
            </h1>
          </Link>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 border-none cursor-pointer"
            style={{ width: '52px', height: '52px' }}
            aria-label="Open cart"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              style={{ width: '28px', height: '28px' }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="#ffffff"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            
            {cartCount > 0 && (
              <span className="absolute flex items-center justify-center bg-red-500 text-white font-bold rounded-full border-2 border-teal-600"
                style={{
                  top: '-4px',
                  right: '-4px',
                  minWidth: '22px',
                  height: '22px',
                  padding: '0 6px',
                  fontSize: '13px'
                }}
              >
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
