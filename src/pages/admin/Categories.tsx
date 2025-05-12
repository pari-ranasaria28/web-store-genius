
import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { categories } from "../../data/products";
import { addCategory } from "../../utils/productUtils";
import { Plus, Edit, Trash, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddCategoryDialog from "../../components/admin/AddCategoryDialog";
import { useToast } from "@/hooks/use-toast";

const AdminCategories = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  
  useEffect(() => {
    // Filter out "All" category and load the rest
    setCategoriesList(categories.filter(cat => cat !== "All"));
  }, []);

  // Filter categories based on search query
  const filteredCategories = searchQuery
    ? categoriesList.filter(category => 
        category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoriesList;

  const handleDeleteCategory = (categoryToDelete: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategoriesList(categoriesList.filter(cat => cat !== categoryToDelete));
      // In a real app, we would also update the categories array in the backend
      const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
      categories.length = 0;
      categories.push(...updatedCategories);
      
      toast({
        title: "Category deleted",
        description: `Category "${categoryToDelete}" has been deleted.`
      });
    }
  };

  const handleAddCategory = (newCategory: string) => {
    const success = addCategory(newCategory);
    
    if (success) {
      setCategoriesList([...categoriesList, newCategory]);
      toast({
        title: "Category added",
        description: `Category "${newCategory}" has been added.`
      });
    } else {
      toast({
        title: "Error",
        description: "This category already exists.",
        variant: "destructive"
      });
    }
    setAddDialogOpen(false);
  };

  const handleEditClick = (category: string) => {
    setEditingCategory(category);
    setNewCategoryName(category);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setNewCategoryName("");
  };

  const handleSaveEdit = (originalCategory: string) => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty.",
        variant: "destructive"
      });
      return;
    }

    if (categoriesList.includes(newCategoryName) && newCategoryName !== originalCategory) {
      toast({
        title: "Error",
        description: "This category already exists.",
        variant: "destructive"
      });
      return;
    }

    // Update local state
    setCategoriesList(categoriesList.map(cat => 
      cat === originalCategory ? newCategoryName : cat
    ));
    
    // Update the main categories array
    const categoryIndex = categories.findIndex(cat => cat === originalCategory);
    if (categoryIndex !== -1) {
      categories[categoryIndex] = newCategoryName;
    }
    
    toast({
      title: "Category updated",
      description: `Category "${originalCategory}" has been renamed to "${newCategoryName}".`
    });
    
    setEditingCategory(null);
    setNewCategoryName("");
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Categories</h1>
          <Button
            onClick={() => setAddDialogOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus size={18} className="mr-1" /> Add Category
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Search */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                className="pl-10"
              />
            </div>
            <div>
              <span className="text-slate-500">
                {filteredCategories.length} categories
              </span>
            </div>
          </div>

          {/* Categories Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-200">
                  <th className="pb-3 font-medium text-slate-600">Category Name</th>
                  <th className="pb-3 font-medium text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4">
                      {editingCategory === category ? (
                        <Input
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        <p className="font-medium text-slate-800">{category}</p>
                      )}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-end space-x-2">
                        {editingCategory === category ? (
                          <>
                            <Button size="sm" onClick={() => handleSaveEdit(category)} className="bg-emerald-600 hover:bg-emerald-700">
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <button 
                              className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
                              onClick={() => handleEditClick(category)}
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category)}
                              className="p-2 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-md"
                            >
                              <Trash size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500">No categories found.</p>
            </div>
          )}
        </div>
      </div>
      
      <AddCategoryDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen} 
        onAddCategory={handleAddCategory}
      />
    </AdminLayout>
  );
};

export default AdminCategories;
