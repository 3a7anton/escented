
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl mb-6">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingCart size={64} className="text-neutral-300" />
              </div>
              <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-neutral-500 mb-6">Add some items to your cart and they will appear here.</p>
              <Link to="/shop">
                <Button>Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b">
                    <h2 className="font-medium">Items ({cartItems.length})</h2>
                  </div>
                  
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 sm:mr-4 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow sm:mr-4">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-neutral-500 mb-2">{item.category}</p>
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-sm mt-2 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="flex items-center border rounded-md mt-4 sm:mt-0">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                  <h2 className="font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 border-b pb-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Subtotal</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between font-medium text-lg py-4">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    onClick={handleProceedToCheckout}
                    className="w-full mt-4"
                  >
                    Proceed <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
