import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/recipeInProgress.css';
import RecipesContext from '../Context';

function RecipeInProgressCard(props) {
  const {
    func,
    recipe,
    pathname,
    thumb,
    name,
    category,
    instructions,
    alcoholic,
    id,
  } = props;

  const [checkedState, setCheckedState] = useState(
    Array(func(pathname, recipe).length).fill(false),
  );

  const { history, setStartRecipeStorage } = useContext(RecipesContext);

  const handleOnChange = (position, ingredient) => {
    const updatedCheckedState = checkedState
      .map((item, index) => (index === position ? !item : item));

    setCheckedState(updatedCheckedState);
    if (pathname.includes('meals')) {
      setStartRecipeStorage((prevState) => ({
        ...prevState,
        meals: { ...prevState.meals, [id]: [...prevState.meals[id], ingredient] },
      }));
    }
    if (pathname.includes('drinks')) {
      setStartRecipeStorage((prevState) => ({
        ...prevState,
        drinks: { ...prevState.drinks, [id]: [...prevState.drinks[id], ingredient] },
      }));
    }
  };

  const checkFinish = () => {
    const checkAllCheckbox = checkedState
      .every((e) => e === true);
    return !checkAllCheckbox;
  };

  const callCheckFinish = checkFinish();

  const finishedRecipe = () => {
    history.push('/done-recipes');
  };

  return (
    <section className="recipe-details-card">
      <img src={ recipe[thumb] } alt={ recipe[name] } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{recipe[name]}</h2>
      <p data-testid="recipe-category">
        {pathname.includes('drinks')
          ? `${recipe[category]} ${recipe[alcoholic]}`
          : recipe[category]}
      </p>
      <h3>Ingredients</h3>
      <div className="in-progress-ingredients">
        {func(pathname, recipe).map((ingredient, index) => (
          <label
            className={ checkedState[index] ? 'check-ingredient' : '' }
            htmlFor={ index }
            key={ ingredient[0] }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              checked={ checkedState[index] }
              onChange={ () => handleOnChange(index, ingredient[1]) }
              name={ recipe[name] }
              id={ index }
            />
            {`${ingredient[1]} - ${ingredient[2]}`}
          </label>
        ))}
      </div>
      <h3>Instructions</h3>
      <p data-testid="instructions">{recipe[instructions]}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ callCheckFinish }
        onClick={ finishedRecipe }
      >
        Finalizar

      </button>
    </section>
  );
}

RecipeInProgressCard.propTypes = {
  func: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    thumb: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    alcoholic: PropTypes.string.isRequired,
  }).isRequired,
}.isRequired;

export default RecipeInProgressCard;
