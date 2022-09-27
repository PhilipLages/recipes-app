import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../Context';
import '../styles/recipeCard.css';

export default function Recipes() {
  const { loading, drinks, history, meals } = useContext(RecipesContext);
  const DOZE = 12;

  return (
    <section>
      <div>
        {!loading && history.location.pathname === '/meals'
            && (
              <div>
                { meals.meals.slice(0, DOZE).map((rec, index) => (
                  <Link
                    to={ `/meals/${rec.idMeal}` }
                    key={ rec.idMeal }
                    data-testid={ `${index}-recipe-card` }
                    className="recipe-card"
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ rec.strMealThumb }
                      alt={ rec.strMeal }
                    />
                    <h3
                      data-testid={ `${index}-card-name` }
                    >
                      { rec.strMeal }
                    </h3>
                  </Link>
                ))}
              </div>
            )}
        {!loading && history.location.pathname === '/drinks'
          && (
            <div>
              { drinks.drinks.slice(0, DOZE).map((rec, index) => (
                <Link
                  to={ `/drinks/${rec.idDrink}` }
                  key={ rec.idDrink }
                  data-testid={ `${index}-recipe-card` }
                  className="recipe-card"
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ rec.strDrinkThumb }
                    alt={ rec.strDrink }
                  />
                  <h3
                    data-testid={ `${index}-card-name` }
                  >
                    { rec.strDrink }
                  </h3>
                </Link>
              ))}
            </div>
          )}
      </div>
    </section>
  );
}
