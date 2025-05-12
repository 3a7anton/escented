
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

// Sample data
const products = [
  {
    id: "1",
    name: "Amber Rose",
    price: 120,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Eau de Parfum",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Midnight Oud",
    price: 140,
    image: "https://images.unsplash.com/photo-1566977776052-6e61e35bf9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Eau de Parfum",
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Velvet Orchid",
    price: 110,
    image: "https://images.unsplash.com/photo-1616248351864-70f6d6577fdf?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Eau de Parfum",
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Citrus & Cedar",
    price: 95,
    image: "https://images.unsplash.com/photo-1610461888750-10bfc601b874?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Eau de Toilette",
    isBestSeller: true,
  },
];

const BestSellers = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-900">Best Sellers</h2>
          <div className="w-16 h-1 bg-purple mx-auto mt-6"></div>
          <p className="mt-6 text-neutral-600 max-w-xl mx-auto">
            Our most popular fragrances, loved by customers worldwide for their unique character and lasting impression.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild variant="outline" className="border-neutral-300 hover:bg-purple hover:text-white hover:border-purple">
            <Link to="/shop">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
