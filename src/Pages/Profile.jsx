import React, { useContext } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipesContext from '../Context';
import useStorage from '../Hooks';

export default function Profile() {
  const { setEmail } = useContext(RecipesContext);
  const [localStorage] = useStorage('user', setEmail);
  return (
    <div>
      <Header title="Profile" />
      <h3 data-testid="profile-email">{ localStorage.email }</h3>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
      <Footer />
    </div>
  );
}
