
import React from 'react';
import { CartItem } from '@/hooks/useCart';

interface OrderSummaryProps {
  cartItems: CartItem[];
  getTotalPrice: () => number;
}

const OrderSummary = ({ cartItems, getTotalPrice }: OrderSummaryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
      <h2 className="font-medium mb-4">Order Summary</h2>
      
      <div className="divide-y max-h-60 overflow-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="py-3 flex items-start">
            <div className="w-12 h-12 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0 mr-3">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium">{item.name}</h3>
              <p className="text-xs text-neutral-500">{item.quantity} × ${item.price.toFixed(2)}</p>
            </div>
            <div className="text-right ml-2">
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2 border-t pt-4 mt-4">
        <div className="flex justify-between">
          <span className="text-neutral-600">Subtotal</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600">Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-medium text-lg pt-2">
          <span>Total</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
