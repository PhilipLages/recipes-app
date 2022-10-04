import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

const MEALS_ROUTE = '/meals/52771';
const DRINKS_ROUTE = '/drinks/178319';
describe('teste heartIcon', () => {
  it('Verifica se o ícone de favoritar muda quando clicado (meals)', async () => {
    const inProgressRecipes = {
      meals: {
        52771: [],
      },
    };
    const teste = global.localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    fetch(teste);
    fetch(oneMeal);
    renderWithRouter(<App />, MEALS_ROUTE);

    await waitFor(() => {
      const startBtn = screen.getByTestId('start-recipe-btn');
      expect(startBtn).toHaveTextContent('Continue Recipe');
    });
  });
  it('Verifica se o ícone de favoritar muda quando clicado (meals)', async () => {
    const inProgressRecipes = {
      drinks: {
        178319: [],
      },
    };
    const teste = global.localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    fetch(teste);
    fetch(oneDrink);
    renderWithRouter(<App />, DRINKS_ROUTE);

    await waitFor(() => {
      const startBtn = screen.getByTestId('start-recipe-btn');
      expect(startBtn).toHaveTextContent('Continue Recipe');
    });
  });
});
