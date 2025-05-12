
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    // Submit form - would normally connect to a backend service
    toast({
      title: "Success",
      description: "Thank you for subscribing to our newsletter",
    });
    
    // Reset form
    setEmail("");
  };
  
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-neutral-900">Join Our Newsletter</h2>
          <p className="mt-4 text-neutral-600">
            Subscribe to receive updates, exclusive offers, and fragrance tips.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-neutral-900 hover:bg-neutral-800 whitespace-nowrap">
              Subscribe
            </Button>
          </form>
          
          <p className="mt-4 text-xs text-neutral-400">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
