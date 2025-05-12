
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '@/hooks/useCart';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import CheckoutOrderForm, { CheckoutFormValues } from '@/components/checkout/CheckoutOrderForm';
import OrderSummary from '@/components/checkout/OrderSummary';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Format cart items for the order
      const orderItems = cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));
      
      // Create order object
      const order = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        paymentType: data.paymentMethod,
        transactionId: (data.paymentMethod !== 'cash') ? data.transactionId : "",
        items: orderItems,
        total: getTotalPrice()
      };
      
      // Use form submission as a workaround for CORS issues
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = "https://script.google.com/macros/s/AKfycbzsQleJ224e2BwgDiquK-oQ2JxhloX-sK4Us3lwcqcUJnwk5BT5dmn2NEXD9nud0YlT/exec";
      form.target = '_blank'; // Opens in new tab to not interrupt flow
      
      // Add hidden input with JSON data
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = 'data';
      hiddenField.value = JSON.stringify(order);
      form.appendChild(hiddenField);
      
      // Add the form to the document body and submit it
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      
      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        id: Date.now().toString(),
        ...order,
        date: new Date().toISOString(),
        status: 'pending'
      };
      
      localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
      
      // Clear cart and redirect
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/order-success');
    } catch (error) {
      console.error("Order error:", error);
      toast.error(`Error placing order: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl mb-6">Checkout</h1>
          
          <Alert className="mb-6 bg-amber-50 border-amber-200">
            <AlertDescription>
              Note: After placing your order, a new tab may open briefly to process your order. This is normal and helps us avoid technical issues.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutOrderForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary cartItems={cartItems} getTotalPrice={getTotalPrice} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
