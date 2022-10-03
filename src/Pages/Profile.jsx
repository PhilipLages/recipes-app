import React, { useContext } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipesContext from '../Context';
import useStorage from '../Hooks';

export default function Profile() {
  const { setEmail, history } = useContext(RecipesContext);
  const [storageEmail] = useStorage('user', setEmail);

  const handleClickDoneReciples = () => {
    history.push('/done-recipes');
  };

  const handleClickFavorite = () => {
    history.push('/favorite-recipes');
  };

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
    localStorage.clear({ email });
  };

  return (
    <div>
      <Header title="Profile" />
      <h3 data-testid="profile-email">{ storageEmail.email }</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleClickDoneReciples }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleClickFavorite }
      >
        Favorite Recipes

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}
