import React from 'react';
import PropTypes, { object, string } from 'prop-types';
import '../styles/recipeDetailsCard.css';

function RecipeDetailsCard(props) {
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
      <div className="recipe-detail">
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
      </div>
      <div className="ingredients-card">
        <h3>Ingredients</h3>
        <ul className="recipe-card-ingredients">
          {func(pathname, recipe).map((ingredient, index) => (
            <li
              key={ ingredient[0] }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient[1]} - ${ingredient[2]}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="ingredients-card">
        <h3>Instructions</h3>
        <div className="recipe-card-ingredients">
          <p data-testid="instructions">{recipe[instructions]}</p>
        </div>
      </div>

      {pathname.includes('meals') && (
        <div className="video" data-testid="video">
          <iframe
            width="350"
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
    </section>
  );
}

RecipeDetailsCard.propTypes = {
  getIngredients: PropTypes.func,
  recipe: object,
  pathname: string,
}.isRequired;

export default RecipeDetailsCard;
