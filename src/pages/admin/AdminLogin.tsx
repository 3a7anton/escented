
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // For demo purposes only - in a real app this would be properly authenticated
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple demo credentials (admin/admin)
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        // Store auth state
        localStorage.setItem('adminAuthenticated', 'true');
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded-lg p-8 border border-neutral-200">
            <div className="flex flex-col items-center justify-center text-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-serif font-medium">Admin Login</h1>
              <p className="text-neutral-500 mt-2">Sign in to access the admin panel</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-neutral-500">
              <p>For demo purposes, use:</p>
              <p className="font-medium">Username: admin | Password: admin</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
