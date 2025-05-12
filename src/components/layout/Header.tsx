
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";

const Header = () => {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="ecommerce-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-emerald-600">
            ModernShop
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-700 hover:text-emerald-600 transition">
              Home
            </Link>
            <Link to="/products" className="text-slate-700 hover:text-emerald-600 transition">
              Shop
            </Link>
            <Link to="/categories" className="text-slate-700 hover:text-emerald-600 transition">
              Categories
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-emerald-600 transition">
              About
            </Link>
            <Link to="/contact" className="text-slate-700 hover:text-emerald-600 transition">
              Contact
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-slate-600 hover:text-emerald-600 transition">
              <Search size={20} />
            </button>
            <Link to="/cart" className="text-slate-600 hover:text-emerald-600 transition relative">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center space-x-2">
                {user.isAdmin && (
                  <Link to="/admin" className="text-slate-600 hover:text-emerald-600 transition">
                    Admin
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="text-slate-600 hover:text-emerald-600 transition"
                >
                  Logout
                </button>
                <Link to="/account" className="text-slate-600 hover:text-emerald-600 transition">
                  <User size={20} />
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-slate-600 hover:text-emerald-600 transition">
                  Login
                </Link>
                <Link to="/sign-up" className="text-slate-600 hover:text-emerald-600 transition">
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-slate-600 hover:text-emerald-600 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-slate-100">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-slate-700 hover:text-emerald-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-slate-700 hover:text-emerald-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/categories" 
                className="text-slate-700 hover:text-emerald-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className="text-slate-700 hover:text-emerald-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-slate-700 hover:text-emerald-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {!user && (
                <>
                  <Link 
                    to="/login" 
                    className="text-slate-700 hover:text-emerald-600 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/sign-up" 
                    className="text-slate-700 hover:text-emerald-600 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {user?.isAdmin && (
                <Link 
                  to="/admin" 
                  className="text-slate-700 hover:text-emerald-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              {user && (
                <>
                  <Link 
                    to="/account" 
                    className="text-slate-700 hover:text-emerald-600 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-slate-700 hover:text-emerald-600 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
