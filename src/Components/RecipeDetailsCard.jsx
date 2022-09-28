import React, { useState } from 'react';
import PropTypes, { object, string } from 'prop-types';
import '../styles/recipeDetailsCard.css';

function RecipeDetailsCard(props) {
  const [btn, setBtn] = useState(true);
  const {
    func,
    recipe,
    pathname,
    thumb,
    name,
    category,
    instructions,
    video,
    alcoholic,
  } = props;

  return (
    <section className="recipe-details-card">
      <img
        src={ recipe[thumb] }
        alt={ recipe[name] }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe[name]}</h2>
      <p data-testid="recipe-category">
        {pathname.includes('drinks')
          ? `${recipe[category]} ${recipe[alcoholic]}`
          : recipe[category]}
      </p>
      <h3>Ingredients</h3>
      <ul>
        {func(pathname, recipe).map((ingredient, index) => (
          <li
            key={ ingredient[0] }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient[1]} - ${ingredient[2]}`}
          </li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">{recipe[instructions]}</p>
      {pathname.includes('meals') && (
        <div data-testid="video">
          <iframe
            width="300"
            height="250"
            src={ recipe[video].replace('watch?v=', 'embed/') }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
      autoplay;
      clipboard-write;
      encrypted-media;
      gyroscope;
      picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => setBtn(!btn) }
      >
        Start Recipe
      </button>
    </section>
  );
}

RecipeDetailsCard.propTypes = {
  getIngredients: PropTypes.func,
  recipe: object,
  pathname: string,
}.isRequired;

export default RecipeDetailsCard;
