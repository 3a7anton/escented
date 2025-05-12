
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { CreditCard, Banknote, Wallet } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { CheckoutFormValues } from './CheckoutOrderForm';

interface PaymentMethodSelectorProps {
  control: Control<CheckoutFormValues>;
  showTransactionId: boolean;
}

const PaymentMethodSelector = ({ control, showTransactionId }: PaymentMethodSelectorProps) => {
  return (
    <>
      <FormField
        control={control}
        name="paymentMethod"
        rules={{ required: "Payment method is required" }}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Payment Method</FormLabel>
            <FormControl>
              <RadioGroup
                id="paymentMethod"
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-3"
              >
                <div className={`flex items-center space-x-2 border rounded-md p-4 cursor-pointer transition-colors duration-200 ${field.value === 'cash' ? 'bg-neutral-100 border-neutral-300' : 'hover:bg-neutral-50'}`}>
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Banknote size={20} className="text-neutral-700" />
                    <div>
                      <span className="font-medium">Cash on Delivery</span>
                      <p className="text-xs text-neutral-500 mt-1">Pay when your order arrives</p>
                    </div>
                  </Label>
                </div>

                <div className={`flex items-center space-x-2 border rounded-md p-4 cursor-pointer transition-colors duration-200 ${field.value === 'bkash' ? 'bg-purple-light/20 border-purple' : 'hover:bg-neutral-50'}`}>
                  <RadioGroupItem value="bkash" id="bkash" />
                  <Label htmlFor="bkash" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Wallet size={20} className="text-pink-600" />
                    <div>
                      <span className="font-medium">bKash</span>
                      <p className="text-xs text-neutral-500 mt-1">Pay with your bKash account</p>
                    </div>
                  </Label>
                </div>

                <div className={`flex items-center space-x-2 border rounded-md p-4 cursor-pointer transition-colors duration-200 ${field.value === 'nagad' ? 'bg-amber-50 border-amber-200' : 'hover:bg-neutral-50'}`}>
                  <RadioGroupItem value="nagad" id="nagad" />
                  <Label htmlFor="nagad" className="flex items-center gap-3 cursor-pointer flex-1">
                    <CreditCard size={20} className="text-orange-600" />
                    <div>
                      <span className="font-medium">Nagad</span>
                      <p className="text-xs text-neutral-500 mt-1">Pay with your Nagad account</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {showTransactionId && (
        <FormField
          control={control}
          name="transactionId"
          rules={{ required: showTransactionId ? "Transaction ID is required" : false }}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Transaction ID</FormLabel>
              <FormControl>
                <Input 
                  id="transactionId" 
                  placeholder="Enter your transaction ID" 
                  className="border-dashed"
                  {...field} 
                />
              </FormControl>
              <p className="text-xs text-neutral-500 mt-1">
                Please enter the transaction ID from your payment confirmation
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default PaymentMethodSelector;
