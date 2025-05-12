
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Package, User, LogIn, Pencil, Trash2 } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

const AdminDashboard = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
    
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/admin/login');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setProductName('');
    setProductPrice('');
    setProductCategory('');
    setProductImage('');
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName || !productPrice || !productCategory || !productImage) {
      toast({
        title: "Validation Error",
        description: "All fields are required, including an image",
        variant: "destructive",
      });
      return;
    }
    
    const price = parseFloat(productPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Invalid Price",
        description: "Price must be a positive number",
        variant: "destructive",
      });
      return;
    }

    let updatedProducts: Product[];
    
    if (editingProduct) {
      // Update existing product
      updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? {
              ...p,
              name: productName,
              price: price,
              category: productCategory,
              image: productImage || p.image
            }
          : p
      );
      toast({
        title: "Product Updated",
        description: `${productName} has been updated successfully`,
      });
    } else {
      // Create new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: productName,
        price: price,
        category: productCategory,
        image: productImage,
      };
      updatedProducts = [...products, newProduct];
      toast({
        title: "Product Added",
        description: `${productName} has been added successfully`,
      });
    }
    
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductPrice(product.price.toString());
    setProductCategory(product.category);
    setProductImage(product.image);
  };

  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    toast({
      title: "Product Deleted",
      description: "Product has been removed successfully",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-serif font-medium">Admin Dashboard</h1>
              <p className="text-neutral-500 mt-1">Manage your store inventory</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-white shadow-sm rounded-lg border border-neutral-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Admin</span>
                </div>
                
                <nav className="space-y-1">
                  <a href="#" className="block py-2 px-3 bg-primary/10 text-primary font-medium rounded-md">
                    <Package className="inline-block mr-2 h-4 w-4" />
                    Products
                  </a>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9">
              <div className="bg-white shadow-sm rounded-lg border border-neutral-200 p-6 mb-6">
                <h2 className="text-xl font-medium mb-4">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input 
                        id="productName" 
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="productPrice">Price ($)</Label>
                      <Input 
                        id="productPrice" 
                        type="number"
                        step="0.01"
                        value={productPrice} 
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="productCategory">Category</Label>
                      <Input 
                        id="productCategory" 
                        value={productCategory} 
                        onChange={(e) => setProductCategory(e.target.value)}
                        placeholder="e.g. Eau de Parfum"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="productImage">Product Image</Label>
                      <Input 
                        id="productImage" 
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      {productImage && (
                        <div className="mt-2">
                          <img 
                            src={productImage} 
                            alt="Preview" 
                            className="w-32 h-32 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingProduct ? (
                        <>
                          <Pencil className="mr-2 h-4 w-4" />
                          Update Product
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Product
                        </>
                      )}
                    </Button>
                    {editingProduct && (
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </div>
              
              {/* Product List */}
              <div className="bg-white shadow-sm rounded-lg border border-neutral-200 p-6">
                <h2 className="text-xl font-medium mb-4">Product List</h2>
                
                {products.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left font-medium">Image</th>
                          <th className="py-3 px-4 text-left font-medium">Product</th>
                          <th className="py-3 px-4 text-left font-medium">Category</th>
                          <th className="py-3 px-4 text-left font-medium">Price</th>
                          <th className="py-3 px-4 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b last:border-0 hover:bg-neutral-50">
                            <td className="py-3 px-4">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-md"
                              />
                            </td>
                            <td className="py-3 px-4">{product.name}</td>
                            <td className="py-3 px-4">{product.category}</td>
                            <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(product)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(product.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-6 text-neutral-500">
                    <Package className="h-12 w-12 mx-auto text-neutral-300 mb-2" />
                    <p>No products have been added yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
