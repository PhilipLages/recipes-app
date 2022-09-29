import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
// import meals from '../../cypress/mocks/meals';

describe('Testa 45% do componente RecipeDetailsCard', () => {
  it('Verifica se o botão é rederizado na tela de meals', async () => {
    const urlMeal = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
    fetch(urlMeal);

    const { history } = renderWithRouter(<App />, '/meals/52771');

    const startButton = screen.getByTestId('start-recipe-btn');
    const favButton = screen.getByTestId('favorite-btn');
    const shareButton = screen.getByTestId('share-btn');

    expect(startButton).toBeInTheDocument();
    expect(favButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();

    userEvent.click(startButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771/in-progress');
    });
  });

  it('Verifica se o botão é rederizado na tela de drinks', async () => {
    const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13501';
    fetch(urlDrink);
    const { history } = renderWithRouter(<App />, '/drinks/13501');

    const startButton = screen.getByTestId('start-recipe-btn');

    expect(startButton).toBeInTheDocument();

    userEvent.click(startButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/13501/in-progress');
    });
  });

  it('', () => {

  });
});

const SEARCH_TOP_BTN = 'search-top-btn';
// const SEARCH_INPUT = 'search-input';
// const NAME_SEARCH_RADIO = 'name-search-radio';
// const EXEC_SEARCH_BTN = 'exec-search-btn';

const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
const testDoneRecipes = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '22/6/2020',
  tags: ['Pasta', 'Curry'],
}];

jest.useRealTimers();
jest.setTimeout(30000);

describe('Chamada de Api', () => {
  afterEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(testDoneRecipes),
    });
  });
  // afterEach(() => fetchMock.restore());

  it.only('Verifica se api Meals é chamada', async () => {
    const { history } = renderWithRouter(<App />, '/meals');

    const btnSearch = screen.getByTestId(SEARCH_TOP_BTN);

    fetchMock.mock(url, testDoneRecipes);

    userEvent.click(btnSearch);

    await waitFor(() => {
      expect(fetchMock.called(url)).toBeTruthy();
    });

    expect(history.location.pathname).toBe('/meals/52771');
  });
});
