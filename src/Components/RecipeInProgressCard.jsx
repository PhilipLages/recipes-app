import React from 'react';
// import PropTypes from 'prop-types';

function RecipeInProgressCard() {
  return (
    <section>
      <h3>Receita em progresso</h3>
      <section>
        <img src="" alt="" data-testid="recipe-photo" />
        <h2 data-testid="recipe-title"> </h2>
        <p data-testid="recipe-category"> </p>
        <p data-testid="instructions"> </p>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
      </section>
    </section>
  );
}

// RecipeInProgressCard.propTypes = {};

export default RecipeInProgressCard;
