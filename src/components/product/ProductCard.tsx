
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Product } from "../../data/products";
import { ShoppingCart } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };
  
  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-md">
            Featured
          </div>
        )}
        {!product.inStock && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-white font-semibold">Out of Stock</p>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-slate-800 group-hover:text-emerald-600 transition">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm mt-1">
          {product.category}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-lg">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`p-2 rounded-full ${
              product.inStock
                ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            } transition-colors`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
