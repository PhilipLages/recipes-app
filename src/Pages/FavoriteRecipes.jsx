import React, { useContext } from 'react';
import copy from 'clipboard-copy';
import Header from '../Components/Header';
import RecipesContext from '../Context';

import { ReactComponent as ShareIcon } from '../images/shareIcon.svg';
import { ReactComponent as BlackHeartIcon } from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const { favoriteRecipes, copiedLink, setCopiedLink } = useContext(RecipesContext);
  console.log(favoriteRecipes);

  const shareRecipe = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopiedLink(true);
  };

  return (
    <section>
      <Header title="Favorite Recipes" />
      <main>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-meal-btn">Meals</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
        <section>
          {favoriteRecipes
            .map((
              { id, alcoholicOrNot, category, image, name, nationality, type },
              index,
            ) => (
              <div className="recipe-details-card" key={ id }>
                <img
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot}
                </p>
                <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
                <button
                  type="button"
                  // onClick={ () => addOrRemoveFavorite() }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src="../images/blackHeartIcon.svg"
                >
                  <BlackHeartIcon />
                </button>
                <button
                  type="button"
                  onClick={ () => shareRecipe(type, id) }
                  data-testid={ `${index}-horizontal-share-btn` }
                  src="../images/shareIcon.svg"
                >
                  <ShareIcon />
                </button>
                {copiedLink && (<p>Link copied!</p>) }
              </div>
            ))}
        </section>
      </main>
    </section>
  );
}
