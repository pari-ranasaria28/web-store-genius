
import ProductCard from "./ProductCard";
import { Product } from "../../data/products";

type ProductGridProps = {
  products: Product[];
  title?: string;
};

const ProductGrid = ({ products, title }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">No products found.</p>
      </div>
    );
  }
  
  return (
    <div>
      {title && (
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">{title}</h2>
      )}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
