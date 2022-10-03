import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

// eslint-disable-next-line func-names
const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
}());

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Testes recipeInProgress', () => {
  const finalizar = 'finish-recipe-btn';
  const favorite = 'favorite-btn';
  const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';
  const MEALS_ROUTE = '/meals/52977/in-progress';
  const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';
  const DRINKS_ROUTE = '/drinks/15997/in-progress';

  it('Verifica se o botão de favoritar está na página (meals)', async () => {
    const urlMeal = MEALS_API;
    fetch(urlMeal);

    renderWithRouter(<App />, MEALS_ROUTE);

    await waitFor(() => {
      const finalizarBtn = screen.getByTestId(finalizar);
      expect(finalizarBtn).toBeDisabled();
    });
    const favoriteBtn = screen.getByTestId(favorite);
    expect(favoriteBtn).toBeInTheDocument();
  });
  it('Verifica se o botão de favoritar está na página (drinks)', async () => {
    const urlMeal = DRINKS_API;
    fetch(urlMeal);

    renderWithRouter(<App />, DRINKS_ROUTE);

    await waitFor(() => {
      const finalizarBtn = screen.getByTestId(finalizar);
      expect(finalizarBtn).toBeDisabled();
    });
    await waitFor(() => {
      const finalizarBtn = screen.getByTestId(finalizar);
      expect(finalizarBtn).toBeDisabled();
    });
    const favoriteBtn = screen.getByTestId(favorite);
    expect(favoriteBtn).toBeInTheDocument();
  });
  it('Verifica se o LocalStorage é alterado quando clicado no botão de favoritar (meals)', async () => {
    const urlMeal = MEALS_API;
    fetch(urlMeal);

    const spy = jest.spyOn(localStorage, 'setItem');

    renderWithRouter(<App />, MEALS_ROUTE);

    await waitFor(() => {
      const finalizarBtn = screen.getByTestId(finalizar);
      expect(finalizarBtn).toBeDisabled();
    });
    const favoriteBtn = screen.getByTestId(favorite);
    userEvent.click(favoriteBtn);
    expect(spy).toHaveBeenCalled();
  });
  it('Verifica se o LocalStorage é alterado quando clicado no botão de favoritar (drinks)', async () => {
    const urlMeal = DRINKS_API;
    fetch(urlMeal);

    const spy = jest.spyOn(localStorage, 'setItem');

    renderWithRouter(<App />, DRINKS_ROUTE);

    await waitFor(() => {
      const finalizarBtn = screen.getByTestId(finalizar);
      expect(finalizarBtn).toBeDisabled();
    });
    const favoriteBtn = screen.getByTestId(favorite);
    userEvent.click(favoriteBtn);
    expect(spy).toHaveBeenCalled();
  });
});
