import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import oneMeal from './Mocks/OneMeal';
import oneDrink from './Mocks/oneDrink';
import { inProgressMeal, localStorageMock } from './Mocks/localStorageMock';

const FAVORITE_BUTTON = 'favorite-btn';
const DRINK_ROUTE = '/drinks/178319/in-progress';
const MEAL_ROUTE = '/meals/52771/in-progress';

describe('verifica botão de favoritar em progress bebidas', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    global.localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressMeal));

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Troca de cor ao clicar-bebidas', async () => {
    renderWithRouter(<App />, DRINK_ROUTE);
    const favoriteBtn = await screen.findByTestId(FAVORITE_BUTTON);

    expect(favoriteBtn).toHaveTextContent('whiteHeartIcon.svg');

    userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveTextContent('blackHeartIcon.svg');
  });

  it('chama o localStorage-bebidas', async () => {
    renderWithRouter(<App />, DRINK_ROUTE);
    const spy = jest.spyOn(localStorage, 'setItem');
    const favoriteBtn = await screen.findByTestId(FAVORITE_BUTTON);

    userEvent.click(favoriteBtn);

    expect(spy).toHaveBeenCalled();
  });
});

describe('verifica botão de favoritar em progress comidas', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    global.localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressMeal));

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Troca de cor ao clicar-comidas', async () => {
    renderWithRouter(<App />, MEAL_ROUTE);
    const favoriteBtn = await screen.findByTestId(FAVORITE_BUTTON);

    expect(favoriteBtn).toHaveTextContent('whiteHeartIcon.svg');

    userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveTextContent('blackHeartIcon.svg');
  });

  it('chama o localStorage-comidas', async () => {
    renderWithRouter(<App />, MEAL_ROUTE);
    const spy = jest.spyOn(localStorage, 'setItem');
    const favoriteBtn = await screen.findByTestId(FAVORITE_BUTTON);

    userEvent.click(favoriteBtn);

    expect(spy).toHaveBeenCalled();
  });
});
