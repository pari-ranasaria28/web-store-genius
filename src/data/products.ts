
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
  tags: string[];
};

export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Desk Lamp",
    description: "A sleek, modern desk lamp with adjustable brightness and color temperature. Perfect for your workspace.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1534105015606-40d3b6ff6244?auto=format&fit=crop&q=80&w=500",
    category: "Lighting",
    featured: true,
    inStock: true,
    tags: ["home", "office", "lighting"]
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    description: "High-quality ergonomic chair with lumbar support and breathable mesh back. Designed for all-day comfort.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1589384267710-7a25bc5b4862?auto=format&fit=crop&q=80&w=500",
    category: "Furniture",
    featured: true,
    inStock: true,
    tags: ["office", "furniture", "chair"]
  },
  {
    id: "3",
    name: "Bluetooth Wireless Earbuds",
    description: "Premium wireless earbuds with noise cancellation and crystal-clear sound quality. Water-resistant for workout use.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=500",
    category: "Electronics",
    featured: false,
    inStock: true,
    tags: ["electronics", "audio", "wireless"]
  },
  {
    id: "4",
    name: "Leather Laptop Sleeve",
    description: "Handcrafted genuine leather laptop sleeve with soft interior lining. Available for 13\", 15\", and 16\" laptops.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1603899123005-e2416ccc8f9a?auto=format&fit=crop&q=80&w=500",
    category: "Accessories",
    featured: false,
    inStock: true,
    tags: ["accessories", "laptop", "leather"]
  },
  {
    id: "5",
    name: "Smart Home Hub",
    description: "Control all your smart home devices from one central hub. Compatible with most major smart home brands.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?auto=format&fit=crop&q=80&w=500",
    category: "Electronics",
    featured: true,
    inStock: true,
    tags: ["electronics", "smart home", "tech"]
  },
  {
    id: "6",
    name: "Ceramic Pour-Over Coffee Set",
    description: "Elegant ceramic pour-over coffee maker with matching mug. Perfect for coffee enthusiasts who appreciate the ritual of brewing.",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=500",
    category: "Kitchen",
    featured: false,
    inStock: true,
    tags: ["kitchen", "coffee", "ceramic"]
  },
  {
    id: "7",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with non-slip surface.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?auto=format&fit=crop&q=80&w=500",
    category: "Electronics",
    featured: false,
    inStock: true,
    tags: ["electronics", "charging", "wireless"]
  },
  {
    id: "8",
    name: "Minimalist Wall Clock",
    description: "Modern wall clock with silent mechanism. Clean design that complements any interior style.",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?auto=format&fit=crop&q=80&w=500",
    category: "Home Decor",
    featured: true,
    inStock: true,
    tags: ["home", "decor", "clock"]
  }
];

export const categories = [
  "All",
  "Electronics",
  "Furniture",
  "Lighting",
  "Accessories",
  "Kitchen",
  "Home Decor"
];

export const getProductsByCategory = (category: string) => {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit = 4) => {
  return products
    .filter(p => 
      p.id !== product.id && (
        p.category === product.category || 
        p.tags.some(tag => product.tags.includes(tag))
      )
    )
    .slice(0, limit);
};
