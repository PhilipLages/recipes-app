import React, { useContext, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import RecipesContext from '../Context';
import { ReactComponent as ShareIcon } from '../images/shareIcon.svg';
import { ReactComponent as BlackHeartIcon } from '../images/blackHeartIcon.svg';
import '../styles/favoritesPage.css';

export default function FavoriteRecipes() {
  const {
    favoriteRecipes,
    setFavoriteRecipes,
    copiedLink,
    setCopiedLink,
  } = useContext(RecipesContext);

  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);

  const shareRecipe = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopiedLink(true);
  };

  const removeFavorite = (id) => {
    const filteredFavorites = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setFavoriteRecipes(filteredFavorites);
    setFilteredRecipes(filteredFavorites);
  };

  const filterMeals = () => {
    const meals = favoriteRecipes.filter(({ type }) => type === 'meal');
    setFilteredRecipes(meals);
  };

  const filterDrinks = () => {
    const drinks = favoriteRecipes.filter(({ type }) => type === 'drink');
    setFilteredRecipes(drinks);
  };

  const removeFilters = () => {
    setFilteredRecipes(favoriteRecipes);
  };

  return (
    <section>
      <Header title="Favorite Recipes" />
      <main>
        <div className="favorite-buttons">
          <button
            type="button"
            className="btn"
            data-testid="filter-by-all-btn"
            onClick={ () => removeFilters() }
          >
            All
          </button>
          <button
            type="button"
            className="btn"
            data-testid="filter-by-meal-btn"
            onClick={ () => filterMeals() }
          >
            Meals
          </button>
          <button
            type="button"
            className="btn"
            data-testid="filter-by-drink-btn"
            onClick={ () => filterDrinks() }
          >
            Drinks
          </button>
        </div>
        <section>
          {filteredRecipes
            .map((
              { id, alcoholicOrNot, category, image, name, nationality, type },
              index,
            ) => (
              <div className="recipe-details-card favorite" key={ id }>
                <Link to={ type === 'meal' ? `/meals/${id}` : `/drinks/${id}` }>
                  <img
                    src={ image }
                    alt={ name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot}
                </p>
                <Link to={ type === 'meal' ? `/meals/${id}` : `/drinks/${id}` }>
                  <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
                </Link>
                <div>
                  <button
                    type="button"
                    className="btn"
                    onClick={ () => removeFavorite(id) }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src="../images/blackHeartIcon.svg"
                  >
                    <BlackHeartIcon />
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={ () => shareRecipe(type, id) }
                    data-testid={ `${index}-horizontal-share-btn` }
                    src="../images/shareIcon.svg"
                  >
                    <ShareIcon />
                  </button>
                  {copiedLink && (<p>Link copied!</p>) }
                </div>
              </div>
            ))}
        </section>
      </main>
    </section>
  );
}
