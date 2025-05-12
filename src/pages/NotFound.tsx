
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-40">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">404</h1>
          <div className="w-16 h-1 bg-purple mx-auto mb-6"></div>
          <p className="text-xl text-neutral-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Button asChild className="bg-neutral-900 hover:bg-neutral-800">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
