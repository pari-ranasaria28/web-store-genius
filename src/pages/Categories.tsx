
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ProductGrid from "../components/product/ProductGrid";
import { categories, getProductsByCategory } from "../data/products";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Get products for the selected category
    setProducts(getProductsByCategory(selectedCategory));
  }, [selectedCategory]);
  
  return (
    <MainLayout>
      <div className="ecommerce-container py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Product Categories</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Browse our collection of products by category to find exactly what you're looking for.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Category Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h2>
          <p className="text-slate-600">
            {selectedCategory === "All" 
              ? "Showing all available products across all categories." 
              : `Showing all products in the ${selectedCategory} category.`}
          </p>
        </div>
        
        {/* Products Grid */}
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500">No products found in this category.</p>
            <Link 
              to="/products" 
              className="inline-block mt-4 text-emerald-600 hover:text-emerald-700 transition"
            >
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Categories;
