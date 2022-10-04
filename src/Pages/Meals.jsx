import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import '../styles/mainScreen.css';

export default function Meals() {
  return (
    <div>
      <Header title="Meals" />
      <main>
        <Recipes />
      </main>
      <Footer />
    </div>
  );
}
