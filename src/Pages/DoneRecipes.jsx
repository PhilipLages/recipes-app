import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    const getRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getRecipes !== '') setDoneRecipes(getRecipes);
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {
        doneRecipes.map((item, index) => (
          <div key={ index }>
            <img
              src={ item.image }
              data-testid={ `${index}-horizontal-image` }
              alt=""
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{ item.category }</p>
            <p data-testid={ `${index}-horizontal-name` }>{ item.name }</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Share

            </button>
            {
              item.tags.map((el) => (
                <p key={ index } data-testid={ `${index}-${el}-horizontal-tag` }>{el}</p>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}
