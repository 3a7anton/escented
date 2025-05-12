import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import CollectionBanner from '@/components/CollectionBanner';

// Sample data for featured collections
const featuredCollections = [
  {
    id: 'featured-1',
    title: 'FLORAL',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    url: '/collections/floral'
  },
  {
    id: 'featured-2',
    title: 'WOODY',
    image: 'https://images.unsplash.com/photo-1709551264866-4573279d4c3e?q=80&w=1438&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url: '/collections/woody'
  },
  {
    id: 'featured-3',
    title: 'CITRUS',
    image: 'https://images.unsplash.com/photo-1688413580470-5eff69a96686?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url: '/collections/citrus'
  },
  {
    id: 'featured-4',
    title: 'ORIENTAL',
    image: 'https://images.unsplash.com/photo-1610461888750-10bfc601b874?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    url: '/collections/oriental'
  }
];

// Sample products data - keeping this as fallback if no products in localStorage
const sampleProducts = [
  {
    id: '1',
    name: 'Amber Rose',
    price: 120,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Eau de Parfum',
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Midnight Oud',
    price: 140,
    image: 'https://images.unsplash.com/photo-1566977776052-6e61e35bf9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Eau de Parfum',
  },
  {
    id: '3',
    name: 'Velvet Orchid',
    price: 110,
    image: 'https://images.unsplash.com/photo-1676347929093-6614fb45bd90?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Eau de Parfum',
  },
  {
    id: '4',
    name: 'Citrus & Cedar',
    price: 95,
    image: 'https://images.unsplash.com/photo-1610461888750-10bfc601b874?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Eau de Toilette',
  },
  {
    id: '5',
    name: 'Summer Gardenia',
    price: 130,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Eau de Parfum',
    isNew: true,
  },
  {
    id: '6',
    name: 'Mediterranean Fig',
    price: 125,
    image: 'https://images.unsplash.com/photo-1616248359628-7d6b3ada6f78?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Eau de Parfum',
    isNew: true,
  },
  {
    id: '7',
    name: 'Bamboo Forest',
    price: 115,
    image: 'https://images.unsplash.com/photo-1635870224065-4968419a8df7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Eau de Toilette',
  },
  {
    id: '8',
    name: 'Ocean Breeze',
    price: 105,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Eau de Toilette',
  },
  {
    id: '9',
    name: 'Vanilla Dreams',
    price: 95,
    image: 'https://images.unsplash.com/photo-1566977776052-6e61e35bf9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Eau de Parfum',
  },
  {
    id: '10',
    name: 'Royal Saffron',
    price: 150,
    image: 'https://images.unsplash.com/photo-1616248359628-7d6b3ada6f78?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Eau de Parfum',
    isBestSeller: true,
  },
  {
    id: '11',
    name: 'Amber Oud',
    price: 155,
    image: 'https://images.unsplash.com/photo-1610461888750-10bfc601b874?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Eau de Parfum',
  },
  {
    id: '12',
    name: 'Fresh Linen',
    price: 85,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Eau de Toilette',
  },
];

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Use sample products if no products in localStorage
      setProducts(sampleProducts);
    }
  }, []);

  // Filter products based on search query
  const filteredProducts = searchQuery
    ? products.filter(product => 
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-neutral-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-4xl md:text-5xl text-center">Shop All</h1>
            <div className="w-16 h-1 bg-purple mx-auto mt-6"></div>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-sm">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full py-3 pl-4 pr-10 border-none focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-600">
                  <Search size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Collections */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredCollections.map((collection) => (
                <CollectionBanner 
                  key={collection.id}
                  title={collection.title}
                  image={collection.image}
                  url={collection.url}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  isNew={product.isNew}
                  isBestSeller={product.isBestSeller}
                />
              ))}
            </div>
            
            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-neutral-700 mb-4">No products found</h3>
                <p className="text-neutral-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                <Button onClick={() => setSearchQuery('')} variant="outline">Clear Search</Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
