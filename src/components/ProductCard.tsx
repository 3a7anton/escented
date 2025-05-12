
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const ProductCard = ({ id, name, price, image, category, isNew, isBestSeller }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, category });
    toast.success(`Added ${name} to cart`);
  };

  return (
    <div className="group">
      <div className="relative aspect-[3/4] mb-4 bg-neutral-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {isNew && (
          <div className="absolute top-2 right-2 bg-purple text-white text-xs font-medium px-2 py-1 rounded-sm">
            NEW
          </div>
        )}
        {isBestSeller && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-sm">
            BEST SELLER
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-neutral-500 text-sm mb-2">{category}</p>
        <p className="font-semibold">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
