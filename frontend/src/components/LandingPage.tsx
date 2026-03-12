import React from 'react';
import Navbar from './landing/Navbar';
import Hero from './landing/Hero';
import Features from './landing/Features';
import FAQ from './landing/FAQ';
import Footer from './landing/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
