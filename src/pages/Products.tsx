
import { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import ProductGrid from "../components/product/ProductGrid";
import { products, categories } from "../data/products";
import { Search } from "lucide-react";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300 });
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Apply filters when any filter criteria changes
  useEffect(() => {
    let result = products;
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, priceRange]);
  
  return (
    <MainLayout>
      <div className="ecommerce-container py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Shop All Products</h1>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 input-field"
                  placeholder="Search products..."
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="w-full md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Price Range Filter */}
            <div className="w-full md:w-64">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Price Range</span>
                <span className="text-sm font-medium">
                  ${priceRange.min} - ${priceRange.max}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  min="0"
                  max={priceRange.max}
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                  className="input-field"
                  placeholder="Min"
                />
                <input
                  type="number"
                  min={priceRange.min}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  className="input-field"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Count */}
        <p className="text-slate-600 mb-6">
          Showing {filteredProducts.length} products
        </p>
        
        {/* Products Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </MainLayout>
  );
};

export default Products;
