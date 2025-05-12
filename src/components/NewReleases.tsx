
import ProductCard from "./ProductCard";

// Sample data
const newProducts = [
  {
    id: "5",
    name: "Summer Gardenia",
    price: 130,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Eau de Parfum",
    isNew: true,
  },
  {
    id: "6",
    name: "Mediterranean Fig",
    price: 125,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Eau de Parfum",
    isNew: true,
  },
  {
    id: "7",
    name: "Bamboo Forest",
    price: 115,
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Eau de Toilette",
    isNew: true,
  },
];

const NewReleases = () => {
  return (
    <section className="py-24 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-neutral-900">New Releases</h2>
          <div className="w-16 h-1 bg-purple mx-auto mt-6"></div>
          <p className="mt-6 text-neutral-600 text-center mb-12">
            Introducing our latest additions to the Enscented collection
          </p>
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewReleases;
