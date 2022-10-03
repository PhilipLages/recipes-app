import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

const favorite = 'favorite-btn';
const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';
const MEALS_ROUTE = '/meals/52977/in-progress';
const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';
const DRINKS_ROUTE = '/drinks/15997/in-progress';
describe('teste heartIcon', () => {
  it('Verifica se o ícone de favoritar muda quando clicado (meals)', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));
    const urlMeal = MEALS_API;
    fetch(urlMeal);

    renderWithRouter(<App />, MEALS_ROUTE);

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId(favorite);
      expect(favoriteBtn).toHaveTextContent('whiteHeartIcon.svg');
    });
    const favoriteBtn = screen.getByTestId(favorite);
    userEvent.click(favoriteBtn);
    await waitFor(() => {
      expect(favoriteBtn.attributes[2].nodeValue).toBe('../images/blackHeartIcon');
    });
  });
  it('Verifica se o ícone de favoritar muda quando clicado (meals)', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));
    const urlMeal = DRINKS_API;
    fetch(urlMeal);

    renderWithRouter(<App />, DRINKS_ROUTE);

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId(favorite);
      expect(favoriteBtn).toHaveTextContent('whiteHeartIcon.svg');
    });
    const favoriteBtn = screen.getByTestId(favorite);
    userEvent.click(favoriteBtn);
    await waitFor(() => {
      expect(favoriteBtn.attributes[2].nodeValue).toBe('../images/blackHeartIcon');
    });
  });
});
