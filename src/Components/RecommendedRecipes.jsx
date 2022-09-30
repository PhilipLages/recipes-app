import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../Context';
import '../styles/recipeCard.css';

export default function RecommendedRecipes() {
  const {
    drinks,
    meals,
    history: {
      location: {
        pathname,
      } },
  } = useContext(RecipesContext);
  const SIX = 6;

  return (
    <section>
      <div>
        {pathname.includes('drinks')
            && (
              <div className="carousel">
                { meals?.slice(0, SIX).map((rec, index) => (
                  <Link
                    to={ `/meals/${rec.idMeal}` }
                    key={ rec.idMeal }
                    data-testid={ `${index}-recommendation-card` }
                    className="recipe-card-recommended"
                  >
                    <div className="recipe-image-recommended">
                      <img
                        src={ rec.strMealThumb }
                        alt={ rec.strMeal }
                      />
                    </div>
                    <div className="recipe-name-recommended">
                      <h3
                        data-testid={ `${index}-recommendation-title` }
                      >
                        { rec.strMeal }
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}
        {pathname.includes('meals')
          && (
            <div className="carousel">
              { drinks?.slice(0, SIX).map((rec, index) => (
                <Link
                  to={ `/drinks/${rec.idDrink}` }
                  key={ rec.idDrink }
                  data-testid={ `${index}-recommendation-card` }
                  className="recipe-card-recommended"
                >
                  <div className="recipe-image-recommended">
                    <img
                      src={ rec.strDrinkThumb }
                      alt={ rec.strDrink }
                    />
                  </div>
                  <div className="recipe-name-recommended">
                    <h3
                      data-testid={ `${index}-recommendation-title` }
                    >
                      { rec.strDrink }
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
      </div>
    </section>
  );
}
