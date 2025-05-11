
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import ProductFormComponent from "../../components/admin/ProductForm";
import { getProductById, Product } from "../../data/products";

const AdminProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const isNewProduct = id === "new";
  
  useEffect(() => {
    if (!isNewProduct && id) {
      setIsLoading(true);
      // In a real app, this would be an API call
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError("Product not found");
      }
      setIsLoading(false);
    }
  }, [id, isNewProduct]);
  
  const handleSubmit = (data: Omit<Product, "id">) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      console.log("Submitting product data:", data);
      // Redirect back to products list after saving
      navigate("/admin/products");
    } catch (err) {
      setError("Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isNewProduct ? "Add New Product" : "Edit Product"}
          </h1>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="text-slate-500 mt-4">Loading product data...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ProductFormComponent 
              initialData={product || undefined}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProductForm;
