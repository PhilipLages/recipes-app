import copy from 'clipboard-copy';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import useStorage from '../Hooks';

export default function DoneRecipes() {
  const [doneRecipes] = useStorage('doneRecipes', []);
  const [copyText, setCopyText] = useState(false);
  const [recipesDone, setRecipeDones] = useState(doneRecipes);

  const handleMealsFilter = () => {
    const filterMeals = recipesDone.filter((item) => item.type === 'meal');
    setRecipeDones(filterMeals);
  };

  const handleDrinksFilter = () => {
    const filterDrinks = recipesDone.filter((item) => item.type === 'drink');
    setRecipeDones(filterDrinks);
  };

  const handleAllFilter = () => {
    setRecipeDones(doneRecipes);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleAllFilter }
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleMealsFilter }
      >
        Meals

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleDrinksFilter }
      >
        Drinks

      </button>
      {
        recipesDone.map((item, index) => (
          <div key={ index }>
            <Link
              to={ item.type === 'meal'
                ? `/meals/${item.id}` : `/drinks/${item.id}` }
            >
              <img
                src={ item.image }
                data-testid={ `${index}-horizontal-image` }
                alt=""
              />
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
              src={ shareIcon }
              onClick={ () => {
                copy(`http://localhost:3000/meals/${item.id}`);
                setCopyText((prevState) => ({
                  ...prevState,
                  [item.id]: true,
                }));
              } }
            >
              Share

            </button>
            {copyText && 'Link copied!'}
            {/* {recipesDone} */}
          </div>
        ))
      }
    </div>
  );
}
