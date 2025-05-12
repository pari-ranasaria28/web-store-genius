
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ProductGrid from "../components/product/ProductGrid";
import { getFeaturedProducts, categories } from "../data/products";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch featured products - in a real app, this would be an API call
    setFeaturedProducts(getFeaturedProducts());
  }, []);
  
  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${category}`);
  };
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white">
        <div className="ecommerce-container py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Modern Designs for Modern Living
              </h1>
              <p className="mt-4 text-slate-300 text-lg">
                Discover our curated collection of high-quality products for your home and workspace.
              </p>
              <div className="mt-8 flex gap-4">
                <Link to="/products" className="btn-primary">
                  Shop Now
                </Link>
                <Link to="/categories" className="btn-secondary">
                  Browse Categories
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800" 
                alt="Modern home interior" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="ecommerce-container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-slate-800">Featured Products</h2>
            <Link 
              to="/products" 
              className="flex items-center text-emerald-600 hover:text-emerald-700 transition"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 bg-slate-50">
        <div className="ecommerce-container">
          <h2 className="text-2xl font-semibold text-slate-800 mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories
              .filter(category => category !== "All")
              .map((category) => (
                <div
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="bg-white shadow-sm hover:shadow-md rounded-lg p-6 text-center transition-shadow cursor-pointer"
                >
                  <h3 className="text-slate-800 font-medium">{category}</h3>
                </div>
              ))}
          </div>
        </div>
      </section>
      
      {/* Promotion Banner */}
      <section className="py-16">
        <div className="ecommerce-container">
          <div className="bg-emerald-600 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Summer Sale
                </h3>
                <p className="mt-2 text-emerald-100">
                  Get up to 40% off on selected items.
                </p>
                <Link
                  to="/products"
                  className="mt-6 inline-flex bg-white text-emerald-600 font-medium px-4 py-2 rounded-md hover:bg-emerald-50 transition w-fit"
                >
                  Shop Now
                </Link>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=800" 
                  alt="Promotion" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
