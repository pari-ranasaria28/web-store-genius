
import { useState } from "react";
import { Product } from "../../data/products";
import { categories } from "../../data/products";

type ProductFormProps = {
  initialData?: Product;
  onSubmit: (data: Omit<Product, "id">) => void;
};

const ProductForm = ({ initialData, onSubmit }: ProductFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [image, setImage] = useState(initialData?.image || "");
  const [category, setCategory] = useState(initialData?.category || categories[0]);
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [inStock, setInStock] = useState(initialData?.inStock || true);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      price,
      image,
      category,
      featured,
      inStock,
      tags
    });
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Product Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
        </div>
        
        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1">
            Price ($) *
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="input-field"
            required
          />
        </div>
      </div>
      
      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
          Description *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field min-h-[120px]"
          required
        ></textarea>
      </div>
      
      {/* Image URL */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-1">
          Image URL *
        </label>
        <input
          id="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input-field"
          placeholder="https://example.com/image.jpg"
          required
        />
        {image && (
          <div className="mt-2">
            <p className="text-sm text-slate-500 mb-1">Preview:</p>
            <img 
              src={image} 
              alt="Preview" 
              className="h-32 w-32 object-cover rounded-md border border-slate-200" 
            />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
            required
          >
            {categories
              .filter(c => c !== "All")
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
        </div>
        
        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-slate-700 mb-1">
            Tags
          </label>
          <div className="flex">
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              className="input-field rounded-r-none"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 rounded-r-md"
            >
              Add
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-100 text-slate-700 text-sm px-2 py-1 rounded-md flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-slate-500 hover:text-slate-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        {/* Featured Toggle */}
        <div className="flex items-center">
          <input
            id="featured"
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="featured" className="ml-2 text-sm text-slate-700">
            Featured Product
          </label>
        </div>
        
        {/* In Stock Toggle */}
        <div className="flex items-center">
          <input
            id="inStock"
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="inStock" className="ml-2 text-sm text-slate-700">
            In Stock
          </label>
        </div>
      </div>
      
      <div className="pt-4">
        <button type="submit" className="btn-primary">
          {initialData ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
