
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { products, Product } from "../../data/products";
import { Search, Plus, Edit, Trash } from "lucide-react";

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [productsList, setProductsList] = useState<Product[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setProductsList(products);
  }, []);
  
  // Filter products based on search query
  const filteredProducts = searchQuery
    ? productsList.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : productsList;
  
  // This would be replaced by an actual API call in a real app
  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProductsList(productsList.filter((product) => product.id !== id));
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Products</h1>
          <Link
            to="/admin/products/new"
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition"
          >
            <Plus size={18} className="mr-1" /> Add Product
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-10 input-field"
              />
            </div>
            <div>
              <span className="text-slate-500">
                {filteredProducts.length} products
              </span>
            </div>
          </div>
          
          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-200">
                  <th className="pb-3 font-medium text-slate-600">Product</th>
                  <th className="pb-3 font-medium text-slate-600">Category</th>
                  <th className="pb-3 font-medium text-slate-600">Price</th>
                  <th className="pb-3 font-medium text-slate-600">Status</th>
                  <th className="pb-3 font-medium text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded overflow-hidden mr-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{product.name}</p>
                          <p className="text-xs text-slate-500 mt-1 truncate max-w-xs">
                            {product.description.slice(0, 60)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-slate-600">{product.category}</span>
                    </td>
                    <td className="py-4">
                      <span className="font-medium text-slate-800">${product.price.toFixed(2)}</span>
                    </td>
                    <td className="py-4">
                      {product.inStock ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-md"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
