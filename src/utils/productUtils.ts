
import { Product, products, categories } from "../data/products";

// This is a mock implementation - in a real app, this would call your API
export const addProduct = (product: Omit<Product, "id">): Product => {
  const newId = (Math.max(...products.map(p => parseInt(p.id))) + 1).toString();
  
  const newProduct: Product = {
    id: newId,
    ...product
  };
  
  // In a real app, this would be an API call
  products.push(newProduct);
  
  return newProduct;
};

export const updateProduct = (product: Product): Product => {
  // In a real app, this would be an API call
  const index = products.findIndex(p => p.id === product.id);
  
  if (index !== -1) {
    products[index] = product;
  }
  
  return product;
};

export const addCategory = (category: string): boolean => {
  // Check if category already exists (case-insensitive)
  if (categories.some(c => c.toLowerCase() === category.toLowerCase())) {
    return false;
  }
  
  // In a real app, this would be an API call
  categories.push(category);
  return true;
};

export const deleteProduct = (id: string): boolean => {
  const initialLength = products.length;
  const filteredProducts = products.filter(product => product.id !== id);
  
  if (filteredProducts.length === initialLength) {
    return false; // Product not found
  }
  
  // Update the original array
  products.length = 0;
  products.push(...filteredProducts);
  
  return true;
};
