import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context';

function RecipeDetails({ match: { params: { id } } }) {
  const [food, setFood] = useState([]);
  const [drinking, setDrinking] = useState([]);
  const [loading, setLoading] = useState(true);

  const { history } = useContext(RecipesContext);

  const getApiEAT = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await response.json();
    return meals;
  };
  getApiEAT();

  const getApiDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drink } = await response.json();
    return drink;
  };
  getApiDrink();

  useEffect(() => {
    const getData = async () => {
      const mealData = await getApiEAT();
      const drinkData = await getApiDrink();

      setFood(mealData);
      setDrinking(drinkData);
      setLoading(false);
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIngredients = () => {
    const NOVE = 9;
    const VINTE_E_NOVE = 29;
    const DEZESSETE = 17;
    const TRINTA_E_DOIS = 32;
    if (history.location.pathname === `/meals/${id}`) {
      const ingredients = Object.entries(food[0]).slice(NOVE, VINTE_E_NOVE);
      return ingredients;
    }
    if (history.location.pathname === `/drinks/${id}`) {
      const ingredients = Object.entries(drinking[0]).slice(DEZESSETE, TRINTA_E_DOIS);
      return ingredients;
    }

    return (
      <div>
        <h1>Recipe Details</h1>
        { !loading ? (
          <section id="food">
            <div>
              <img
                data-testid="recipe-photo"
                src={ food.strMealThumb }
                alt={ food.strMeal }
              />
              <title data-testid="recipe-title">{ food.strMeal }</title>
              <span data-testid="recipe-category">
                { food.strCategory }
              </span>
            </div>

            <div>
              <div>
                { getIngredients().map((foods, index) => (
                  <div
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ foods[0] }
                  >
                    {foods[1]}

                  </div>
                ))}
              </div>
            </div>

            <div data-testid="instructions">
              Instructions
              { food.strInstructions }
            </div>
            <div data-testid="video">
              Video
              { food.strYoutube }
            </div>

            <div>Recommended</div>
          </section>
        ) : (
          <section id="drink">
            <div data-testid="recipe-photo">
              <img
                src={ drinking.strDrinkThumb }
                alt={ drinking.strDrink }
              />
              <title data-testid="recipe-title">{drinking.strDrink}</title>
              <span data-testid="recipe-category">
                { drinking.strCategory }
              </span>
            </div>
            <div>
              <div>
                { getIngredients().map((ingredient, index) => (
                  <div
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ ingredient[0] }
                  >
                    {ingredient[1]}

                  </div>
                ))}
              </div>
            </div>
            <div data-testid="instructions">
              Instructions
              {drinking.strInstructions}
            </div>

            <div>Recommended</div>
          </section>
        ) }

      </div>
    );
  };

  RecipeDetails.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  };
}
export default RecipeDetails;
