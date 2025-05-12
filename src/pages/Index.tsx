
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Featured from '../components/Featured';
import BestSellers from '../components/BestSellers';
import NewReleases from '../components/NewReleases';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Featured />
      <BestSellers />
      <NewReleases />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
