
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Featured = () => {
  return (
    <section className="py-24 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square overflow-hidden">
            <img 
              src= "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1408&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-md mx-auto md:mx-0">
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900">Experience Our Signature Collection</h2>
            <div className="w-16 h-1 bg-purple mt-6"></div>
            <p className="mt-6 text-neutral-600 leading-relaxed">
              Our signature collection features a carefully curated selection of scents designed to evoke emotion and memory. Each fragrance is crafted with the finest ingredients sourced from around the world.
            </p>
            <Button asChild className="mt-8 bg-neutral-900 hover:bg-neutral-800">
              <Link to="/shop">
                Explore Collection
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
