import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

const FAVORITE = 'favorite-btn';
const ROTMEALS = '/meals/52771';

describe('Testa 45% do componente RecipeDetails', () => {
  it('Verifica se o botão start recipe é rederizado na tela de meals', async () => {
    const urlMeal = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
    fetch(urlMeal);

    const { history } = renderWithRouter(<App />, ROTMEALS);

    const startButton = await screen.findByTestId('start-recipe-btn');

    expect(startButton).toBeInTheDocument();

    userEvent.click(startButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771/in-progress');
    });
  });

  it('Verifica se o botão start recipe é rederizado na tela de drinks', async () => {
    const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13501';
    fetch(urlDrink);

    const { history } = renderWithRouter(<App />, '/drinks/13501');

    const startButton = await screen.findByTestId('start-recipe-btn');

    expect(startButton).toBeInTheDocument();

    userEvent.click(startButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/13501/in-progress');
    });
  });

  it('Verifica se o botão favorite é clicado na tela de meals', async () => {
    const urlMeal = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=13501';
    fetch(urlMeal);

    renderWithRouter(<App />, ROTMEALS);

    const favButton = await screen.findByTestId(FAVORITE);
    userEvent.click(favButton);

    expect(favButton).toBeTruthy();
  });

  it('Verifica se o botão favorite é clicado na tela de drinks', async () => {
    const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13501';
    fetch(urlDrink);

    renderWithRouter(<App />, '/drinks/13501');
    const favButton = await screen.findByTestId(FAVORITE);

    userEvent.click(favButton);

    expect(favButton).toBeTruthy();
  });
});

const promiseMock = Promise.resolve({
  json: () => Promise.resolve(meals),
});

describe('Chamada de Api Meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => promiseMock);
  });

  it('Verifica se api Meals é chamada', async () => {
    renderWithRouter(<App />, '/meals');

    const corba = await screen.findByText(/corba/i);

    userEvent.click(corba);

    expect(await screen.findByRole('heading', { name: /Recipe Details/i, level: 1 }));
    expect(await screen.findByRole('heading', { name: /Corba/i, level: 2 }));
  });
});

const promiseMockDrink = Promise.resolve({
  json: () => Promise.resolve(drinks),
});

describe('Chamada Api Drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => promiseMockDrink);
  });
  it('Verifica se api Drinks é chamada', async () => {
    renderWithRouter(<App />, '/drinks');

    const GG = await screen.findByText(/GG/i);

    userEvent.click(GG);

    expect(await screen.findByRole('heading', { name: /Recipe Details/i, level: 1 }));
    expect(await screen.findByRole('heading', { name: /GG/i, level: 2 }));
  });
});

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

describe('Testa botão favorito em drinks', () => {
  const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';
  const finish = 'finish-recipe-btn';
  const favorite = FAVORITE;
  const DRINKS_ROUTE = '/drinks/15997/in-progress';

  it('Verifica se o LocalStorage é alterado quando clicado no botão de favoritar de Drinks', async () => {
    const urlDrink = DRINKS_API;
    fetch(urlDrink);

    const spy = jest.spyOn(localStorage, 'setItem');

    renderWithRouter(<App />, DRINKS_ROUTE);

    await waitFor(() => {
      const finalBtn = screen.getByTestId(finish);
      expect(finalBtn).toBeDisabled();
    });

    const favoriteBtn = screen.getByTestId(favorite);
    userEvent.click(favoriteBtn);
    expect(spy).toHaveBeenCalled();
  });
});

describe('Testa botão favorito em meals', () => {
  const finish = 'finish-recipe-btn';
  const favorite = FAVORITE;
  const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';
  const MEALS_ROUTE = '/meals/52977/in-progress';

  it('Verifica se o LocalStorage é alterado quando clicado no botão de favoritar de Meals', async () => {
    const urlMeal = MEALS_API;
    fetch(urlMeal);

    const spy = jest.spyOn(localStorage, 'setItem');

    renderWithRouter(<App />, MEALS_ROUTE);

    await waitFor(() => {
      const finalizarBtn = screen.getByTestId(finish);
      expect(finalizarBtn).toBeDisabled();
    });
    const favoriteBtn = screen.getByTestId(favorite);
    userEvent.click(favoriteBtn);
    expect(spy).toHaveBeenCalled();
  });
});

describe('Verifica rota', () => {
  it('Verifica se a rota é copiada na página drinks', () => {
    beforeEach(() => {
      renderWithRouter(<App />, '/drinks/15997');
    });
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    const shareButton = screen.getByTestId('share-btn');

    userEvent.click(shareButton);

    const copiedMessage = screen.getByText(/link copied/i, { selector: 'p' });

    expect(copiedMessage).toBeInTheDocument();
  });
  it('Verifica se a rota é copiada na página meals', () => {
    beforeEach(() => {
      renderWithRouter(<App />, ROTMEALS);
    });
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    const shareButton = screen.getByTestId('share-btn');

    userEvent.click(shareButton);

    const copiedMessage = screen.getByText(/link copied/i, { selector: 'p' });

    expect(copiedMessage).toBeInTheDocument();
  });
});
