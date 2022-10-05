import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import RecipesContext from '../Context';
import { ReactComponent as ShareIcon } from '../images/shareIcon.svg';
import { ReactComponent as WhiteHeartIcon } from '../images/whiteHeartIcon.svg';
import { ReactComponent as BlackHeartIcon } from '../images/blackHeartIcon.svg';
import { fetchDrinkById, fetchMealById } from '../Services';
import RecipeInProgressCard from '../Components/RecipeInProgressCard';
import '../styles/recipeCard.css';

function RecipeInProgress({ match: { params: { id } } }) {
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    favoriteRecipes,
    setFavoriteRecipes,
    setFavoriteToStorage,
    copiedLink,
    setCopiedLink,
    history: { location: { pathname } },
  } = useContext(RecipesContext);

  useEffect(() => {
    const getData = async () => {
      if (pathname.includes('meals')) {
        const mealData = await fetchMealById(id);
        setFood(mealData);
        setLoading(false);
      } if (pathname.includes('drinks')) {
        const drinkData = await fetchDrinkById(id);
        setDrink(drinkData);
        setLoading(false);
      }
    };
    getData();
  //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIngredients = () => {
    const ingredientsAndMeasures = [];
    if (pathname.includes('meals')) {
      const ingredients = Object.entries(food[0])
        .filter((it) => it[0].includes('Ingredient') && it[1] !== null && it[1] !== '');

      const measures = Object.entries(food[0])
        .filter((it) => it[0].includes('Measure') && it[1] !== null && it[1] !== '');

      ingredients.forEach((ingredient, idx) => {
        ingredientsAndMeasures.push([...ingredient, measures[idx][1]]);
      });

      return ingredientsAndMeasures;
    }
    if (pathname.includes('drinks')) {
      const ingredients = Object.entries(drink[0])
        .filter((it) => it[0].includes('Ingredient') && it[1] !== null && it[1] !== '');

      const measures = Object.entries(drink[0])
        .filter((it) => it[0].includes('Measure') && it[1] !== null && it[1] !== '');

      const firstIngredient = [
        [...ingredients[0], measures[0][1]],
        [...ingredients[1], ''],
        [...ingredients[2], ''],
      ];

      if (measures.length === 1) {
        ingredientsAndMeasures.push(...firstIngredient);
      } else {
        ingredients.forEach((ingredient, idx) => {
          ingredientsAndMeasures.push([...ingredient, measures[idx][1]]);
        });
      }

      return ingredientsAndMeasures;
    }
  };

  const shareRecipe = () => {
    if (pathname.includes('meals')) {
      copy(`http://localhost:3000/meals/${id}`);
    } if (pathname.includes('drinks')) {
      copy(`http://localhost:3000/drinks/${id}`);
    }
    setCopiedLink(true);
  };

  const checkFavorite = () => favoriteRecipes.some((recipe) => recipe.id === id);
  const removeFavorite = () => {
    const filteredRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setFavoriteRecipes(filteredRecipes);
  };

  const addOrRemoveFavorite = () => {
    if (pathname.includes('meals')) {
      if (checkFavorite()) removeFavorite();
      else setFavoriteToStorage(id, food[0]);
    }
    if (pathname.includes('drinks')) {
      if (checkFavorite()) removeFavorite();
      else setFavoriteToStorage(id, drink[0]);
    }
  };

  return (
    <section>
      <div className="title-card">
        <h1>Receita em andamento</h1>
      </div>
      {!loading && (
        <section>
          {pathname.includes('meals') && (
            <RecipeInProgressCard
              id={ id }
              recipe={ food[0] }
              func={ getIngredients }
              pathname={ pathname }
              thumb="strMealThumb"
              name="strMeal"
              category="strCategory"
              instructions="strInstructions"
            />
          )}
          {pathname.includes('drinks') && (
            <RecipeInProgressCard
              id={ id }
              recipe={ drink[0] }
              func={ getIngredients }
              pathname={ pathname }
              thumb="strDrinkThumb"
              name="strDrink"
              category="strCategory"
              instructions="strInstructions"
              alcoholic="strAlcoholic"
            />
          )}
        </section>
      )}
      <div className="buttons">
        <button
          className="favorite-btn btn"
          type="button"
          onClick={ () => addOrRemoveFavorite() }
          data-testid="favorite-btn"
          src={ `../images/${checkFavorite() ? 'blackHeartIcon' : 'whiteHeartIcon'}` }
        >
          {checkFavorite() ? <BlackHeartIcon /> : <WhiteHeartIcon />}
        </button>
        <button
          type="button"
          className="favorite-btn btn"
          onClick={ () => shareRecipe() }
          data-testid="share-btn"
        >
          <ShareIcon />
        </button>
        {copiedLink && (<p>Link copied!</p>) }
      </div>
    </section>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
