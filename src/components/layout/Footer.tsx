
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="ecommerce-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-emerald-400 mb-4">ModernShop</h3>
            <p className="text-slate-300">
              Your one-stop shop for modern, high-quality products for home and office.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-emerald-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-300 hover:text-emerald-400 transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-slate-300 hover:text-emerald-400 transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-emerald-400 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-medium mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-emerald-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-slate-300 hover:text-emerald-400 transition">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-slate-300 hover:text-emerald-400 transition">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-300 hover:text-emerald-400 transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-300 hover:text-emerald-400 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-medium mb-4">Stay Updated</h4>
            <p className="text-slate-300 mb-4">
              Subscribe to our newsletter for the latest products and offers.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 py-2 px-3 rounded-l-md text-slate-800 focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-emerald-600 hover:bg-emerald-700 py-2 px-4 rounded-r-md transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} ModernShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
