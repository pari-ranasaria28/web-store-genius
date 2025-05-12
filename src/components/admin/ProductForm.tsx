
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, Product } from "../../data/products";
import { addProduct, updateProduct } from "../../utils/productUtils";
import { useToast } from "@/hooks/use-toast";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Omit<Product, "id"> | Product) => void;
}

const ProductForm = ({ initialData, onSubmit }: ProductFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Omit<Product, "id"> | Product>(
    initialData || {
      name: "",
      description: "",
      price: 0,
      image: "",
      category: categories[0] === "All" ? categories[1] : categories[0],
      featured: false,
      inStock: true,
      tags: []
    }
  );
  
  const [tagsInput, setTagsInput] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAddTag = () => {
    if (!tagsInput.trim()) return;
    
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tagsInput.trim().toLowerCase()]
    }));
    
    setTagsInput("");
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Use the provided onSubmit handler
      onSubmit(formData);
      
      toast({
        title: initialData ? "Product updated" : "Product created",
        description: `Successfully ${initialData ? "updated" : "created"} ${formData.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${initialData ? "update" : "create"} product`,
        variant: "destructive",
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            rows={5}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleNumericChange}
              placeholder="0.00"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.filter(cat => cat !== "All").map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tagsInput">Tags</Label>
          <div className="flex gap-2">
            <Input
              id="tagsInput"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Add a tag"
            />
            <Button type="button" onClick={handleAddTag}>
              Add
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <div
                key={tag}
                className="bg-slate-100 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-slate-500 hover:text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="featured">Featured Product</Label>
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="inStock">In Stock</Label>
            <Switch
              id="inStock"
              checked={formData.inStock}
              onCheckedChange={(checked) => handleSwitchChange("inStock", checked)}
            />
          </div>
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
        {initialData ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
};

export default ProductForm;
