
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import PaymentMethodSelector from './PaymentMethodSelector';

export type CheckoutFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'cash' | 'bkash' | 'nagad';
  transactionId?: string;
};

interface CheckoutOrderFormProps {
  onSubmit: (data: CheckoutFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const CheckoutOrderForm = ({ onSubmit, isSubmitting }: CheckoutOrderFormProps) => {
  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      paymentMethod: 'cash',
      transactionId: '',
    },
  });

  const [showTransactionId, setShowTransactionId] = React.useState(false);

  // Update transaction ID field visibility based on payment method
  useEffect(() => {
    const paymentMethod = form.watch('paymentMethod');
    setShowTransactionId(paymentMethod === 'bkash' || paymentMethod === 'nagad');
  }, [form.watch('paymentMethod')]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-medium mb-6 text-xl">Order Information</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={16} />
                    <Input id="fullName" placeholder="John Doe" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            rules={{ 
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={16} />
                    <Input id="email" placeholder="your@email.com" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={16} />
                    <Input id="phone" placeholder="+123 456 7890" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            rules={{ required: "Delivery address is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-neutral-500" size={16} />
                    <textarea 
                      id="address"
                      className="w-full h-20 rounded-md border border-input bg-background px-3 py-2 pl-10 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" 
                      placeholder="123 Street, City, Country"
                      {...field}
                    ></textarea>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <PaymentMethodSelector 
            control={form.control} 
            showTransactionId={showTransactionId} 
          />
          
          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutOrderForm;
