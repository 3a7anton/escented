
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover object-center"
        >
          <source src="https://cdn.pixabay.com/video/2025/02/12/257927_large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-lg">
          <h1 className="text-white font-serif text-4xl md:text-5xl xl:text-6xl leading-tight">
            Discover Your Signature Scent
          </h1>
          <p className="text-white/90 mt-6 text-lg">
            Premium fragrances crafted to evoke emotion and memory
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-neutral-900 hover:bg-white/90">
              <Link to="/shop">
                Shop Collection
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
