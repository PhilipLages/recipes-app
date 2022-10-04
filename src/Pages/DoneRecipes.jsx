import copy from 'clipboard-copy';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import RecipesContext from '../Context';
import shareIcon, { ReactComponent as ShareIcon } from '../images/shareIcon.svg';

import '../styles/favoritesPage.css';

export default function DoneRecipes() {
  const [copyText, setCopyText] = useState(false);
  const { doneRecipes } = useContext(RecipesContext);
  const [filterRecipesDone, setFilterRecipeDones] = useState(doneRecipes);

  const handleMealsFilter = () => {
    const filterMeals = doneRecipes.filter((item) => item.type === 'meal');
    setFilterRecipeDones(filterMeals);
  };

  const handleDrinksFilter = () => {
    const filterDrinks = doneRecipes.filter((item) => item.type === 'drink');
    setFilterRecipeDones(filterDrinks);
  };

  const handleAllFilter = () => {
    setFilterRecipeDones(doneRecipes);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div className="favorite-buttons">
        <button
          type="button"
          className="btn"
          data-testid="filter-by-all-btn"
          onClick={ handleAllFilter }
        >
          All

        </button>
        <button
          type="button"
          className="btn"
          data-testid="filter-by-meal-btn"
          onClick={ handleMealsFilter }
        >
          Meals

        </button>
        <button
          type="button"
          className="btn"
          data-testid="filter-by-drink-btn"
          onClick={ handleDrinksFilter }
        >
          Drinks

        </button>
      </div>
      {
        filterRecipesDone.map((item, index) => (
          <div key={ index } className="recipe-details-card favorite">
            <Link
              to={ item.type === 'meal'
                ? `/meals/${item.id}` : `/drinks/${item.id}` }
            >
              <img
                src={ item.image }
                data-testid={ `${index}-horizontal-image` }
                alt=""
              />
            </Link>
            <Link
              to={ item.type === 'meal'
                ? `/meals/${item.id}` : `/drinks/${item.id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>{ item.name }</p>
            </Link>

            <p data-testid={ `${index}-horizontal-top-text` }>
              { item.type === 'meal' ? `${item.nationality} - ${item.category}`
                : `${item.alcoholicOrNot}` }

            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
            {
              item.tags.map((el) => (
                <p
                  key={ index }
                  data-testid={ item.type === 'meal' ? `${index}-${el}-horizontal-tag`
                    : '' }
                >
                  {el}

                </p>
              ))
            }
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              className="btn"
              src={ shareIcon }
              onClick={ () => {
                copy(`http://localhost:3000/meals/${item.id}`);
                setCopyText((prevState) => ({
                  ...prevState,
                  [item.id]: true,
                }));
              } }
            >
              <ShareIcon />
            </button>
            {copyText && 'Link copied!'}
          </div>
        ))
      }
    </div>
  );
}
