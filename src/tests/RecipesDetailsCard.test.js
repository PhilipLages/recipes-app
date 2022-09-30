import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('teste da tela RecipeDetails', () => {
  it('Verifica se o botão Start Recipe é renderizado na tela de meals', async () => {
    const urlMeal = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
    fetch(urlMeal);

    const { history } = renderWithRouter(<App />, '/meals/52771');

    await waitFor(() => {
      const startButton = screen.getByTestId('start-recipe-btn');
      userEvent.click(startButton);
      expect(history.location.pathname).toBe('/meals/52771/in-progress');
    });
  });

  it('Verifica se o botão Start Recipe é renderizado na tela de drinks', async () => {
    const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13501';
    fetch(urlDrink);

    const { history } = renderWithRouter(<App />, '/drinks/13501');

    await waitFor(() => {
      const startButton = screen.getByTestId('start-recipe-btn');
      userEvent.click(startButton);
      expect(history.location.pathname).toBe('/drinks/13501/in-progress');
    });
  });
});

it.only('Verifica os elementos na tela de Comida , imagem , texto e video', () => {
  renderWithRouter(<App />, '/meals/52771');

  const favButton = screen.getByTestId('favorite-btn');
  const shareButton = screen.getByTestId('share-btn');
  const imgMeals = screen.getByTestId('recipe-photo');
  // const recipeTitleMeal = screen.getByTestId('recipe-title');
  // const recipeCategoryMeals = screen.getByTestId('recipe-category');

  expect(favButton).toBeInTheDocument();
  expect(shareButton).toBeInTheDocument();
  expect(imgMeals).toBeInTheDocument();
});

/* <li data-testid="0-ingredient-name-and-measure">Filo Pastry - 1 Packet</li>
const recipeCategoryMeals = screen.getByTestId('recipe-category')
await waitFor(() => {
  for (let index = 0; index < RECIPES_LIMIT; index += 1) {
    expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
  }
}, { timeout: 3000 }); */
