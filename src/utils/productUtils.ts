
import { Product, products } from "../data/products";

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
