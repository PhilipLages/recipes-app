import React, { useContext } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipesContext from '../Context';
import useStorage from '../Hooks';
import '../styles/favoritesPage.css';

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
  };

  return (
    <div>
      <Header title="Profile" />
      <h3 data-testid="profile-email">{ storageEmail.email }</h3>
      <div className="favorite-buttons">
        <button
          type="button"
          className="btn"
          data-testid="profile-done-btn"
          onClick={ handleClickDoneReciples }
        >
          Done Recipes
        </button>
        <button
          type="button"
          className="btn"
          data-testid="profile-favorite-btn"
          onClick={ handleClickFavorite }
        >
          Favorite Recipes

        </button>
        <button
          type="button"
          className="btn"
          data-testid="profile-logout-btn"
          onClick={ handleClickLogout }
        >
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}
