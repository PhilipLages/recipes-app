import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';

export default function Drinks() {
  return (
    <div>
      <Header title="Drinks" />
      <main>
        <Recipes />
      </main>
      <Footer />
    </div>
  );
}
