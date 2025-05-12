
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

const OrderSuccess = () => {
  const navigate = useNavigate();
  
  // Check if there's a recent order, if not redirect to home
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (orders.length === 0) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            
            <h1 className="font-serif text-3xl mb-4">Thank You!</h1>
            <p className="text-neutral-600 mb-6">
              Your order has been placed successfully. We'll process it right away.
            </p>
            
            <div className="mb-8 p-4 bg-neutral-50 rounded-md">
              <p className="text-sm text-neutral-600">
                A confirmation email has been sent to your email address.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
              <Link to="/shop">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
