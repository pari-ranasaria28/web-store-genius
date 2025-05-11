
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ProductGrid from "../components/product/ProductGrid";
import { useCart } from "../contexts/CartContext";
import { getProductById, getRelatedProducts, Product } from "../data/products";
import { Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  useEffect(() => {
    if (id) {
      // Fetch product by ID - in a real app, this would be an API call
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        // Fetch related products
        setRelatedProducts(getRelatedProducts(foundProduct));
      }
    }
  }, [id]);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
    }
  };
  
  if (!product) {
    return (
      <MainLayout>
        <div className="ecommerce-container py-16">
          <p className="text-center text-slate-500">Loading product...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="ecommerce-container py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to="/products" 
            className="flex items-center text-emerald-600 hover:text-emerald-700 transition"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Products
          </Link>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{product.name}</h1>
            
            <div className="mt-4">
              <span className="text-2xl font-semibold text-emerald-600">
                ${product.price.toFixed(2)}
              </span>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-slate-800">Description</h3>
              <p className="mt-2 text-slate-600">{product.description}</p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-slate-800">Category</h3>
              <p className="mt-2 text-slate-600">{product.category}</p>
            </div>
            
            {product.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-slate-800">Tags</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-slate-800 mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 border border-slate-300 rounded-l-md hover:bg-slate-100 disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="py-2 px-4 border-t border-b border-slate-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 border border-slate-300 rounded-r-md hover:bg-slate-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex items-center justify-center w-full py-3 rounded-md transition ${
                  product.inStock
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed"
                }`}
              >
                <ShoppingCart size={20} className="mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              
              {!product.inStock && (
                <p className="mt-2 text-sm text-slate-500 text-center">
                  This product is currently out of stock. Please check back later.
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <ProductGrid products={relatedProducts} title="You May Also Like" />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
