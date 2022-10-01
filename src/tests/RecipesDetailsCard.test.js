import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

describe('Testa 45% do componente RecipeDetails', () => {
  it('Verifica se o botão start recipe é rederizado na tela de meals', async () => {
    const urlMeal = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
    fetch(urlMeal);

    const { history } = renderWithRouter(<App />, '/meals/52771');

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

  it('Verifica se os botões favorite e share são rederizado na tela de meals', async () => {
    const urlMeal = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
    fetch(urlMeal);

    renderWithRouter(<App />, '/meals/52771');

    const favButton = await screen.findByTestId('favorite-btn');
    const shareButton = await screen.findByTestId('share-btn');

    expect(favButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
  });

  it('Verifica se os botões favorite e share são rederizado na tela de drinks', async () => {
    const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13501';
    fetch(urlDrink);

    renderWithRouter(<App />, '/drinks/13501');
    const favButton = await screen.findByTestId('favorite-btn');
    const shareButton = await screen.findByTestId('share-btn');

    expect(favButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
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
