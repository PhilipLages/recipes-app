import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import oneMeal from './Mocks/OneMeal';
import oneDrink from './Mocks/oneDrink';
import { inProgressMeal } from './Mocks/localStorageMock';

const FAVORITE_BUTTON = 'favorite-btn';
const DRINK_ROUTE = '/drinks/15997';

describe('Recipe Details page tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should change favorte button icon', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    renderWithRouter(<App />, '/meals/52771');

    const favoriteBtn = await screen.findByTestId(FAVORITE_BUTTON);

    expect(favoriteBtn).toHaveTextContent('whiteHeartIcon.svg');

    userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveTextContent('blackHeartIcon.svg');
  });
});

describe('verifica botão de favoritar', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    global.localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressMeal));

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Troca de cor ao clicar', async () => {
    renderWithRouter(<App />, DRINK_ROUTE);
    const favoriteBtn = await screen.findByTestId(FAVORITE_BUTTON);

    expect(favoriteBtn).toHaveTextContent('whiteHeartIcon.svg');

    userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveTextContent('blackHeartIcon.svg');
  });

  it('chama o localStorage', async () => {
    renderWithRouter(<App />, DRINK_ROUTE);
    const spy = jest.spyOn(localStorage, 'setItem');
    const favoriteBtn = await screen.findByTestId(FAVORITE_BUTTON);

    userEvent.click(favoriteBtn);

    expect(spy).toHaveBeenCalled();
  });

  // it('muda o texto do botão para continue após começar a receita', async () => {
  //   const { history } = renderWithRouter(<App />, DRINK_ROUTE);
  //   const recipeBtn = await screen.findByTestId('start-recipe-btn');

  //   userEvent.click(recipeBtn);

  //   expect(history.location.pathname).toBe('/drinks/15997/in-progress');

  //   console.log(JSON.parse(localStorage.getItem('inProgressRecipes')));
  //   history.goBack();

  //   expect(history.location.pathname).toBe(DRINK_ROUTE);

  //   await waitFor(() => {
  //     expect(screen.getByTestId('start-recipe-btn')).toHaveTextContent('Continue Recipe');
  //   });
  // });
});
