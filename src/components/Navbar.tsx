
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-serif font-semibold tracking-tight text-neutral-900">
            enscented
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-900 hover:text-purple transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-neutral-900 hover:text-purple transition-colors">
              Shop
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-100">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-100">
              <User size={20} />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-100">
                <ShoppingCart size={20} />
                <span className="absolute top-0 right-0 bg-purple text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-100">
                <ShoppingCart size={20} />
                <span className="absolute top-0 right-0 bg-purple text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-100" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md animate-fade-in">
          <div className="flex flex-col py-4 px-8 space-y-4">
            <Link to="/" className="text-neutral-900 py-2 hover:text-purple" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop" className="text-neutral-900 py-2 hover:text-purple" onClick={() => setIsMobileMenuOpen(false)}>
              Shop
            </Link>
            <div className="flex items-center space-x-4 pt-2">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-100">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-100">
                <User size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
