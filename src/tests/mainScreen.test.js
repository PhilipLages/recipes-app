import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';
import fetch from '../../cypress/mocks/fetch';

const NAME_SEARCH = 'name-search-radio';
const FIRST_LETTER_SEARCH = 'first-letter-search-radio';
const BTN_SEARCH_EXEC = 'exec-search-btn';
const RECIPES_LIMIT = 12;
const SEARCH = 'search-input';
const SEARCH_TOP_BTN = 'search-top-btn';

describe('Testa a página Bebidas', () => {
  it('Se ao carregar a pagina, os cards são renderizados na tela', async () => {
    const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    fetch(MEALS_URL);

    renderWithRouter(<App />, '/meals');

    await waitFor(() => {
      for (let index = 0; index < RECIPES_LIMIT; index += 1) {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      }
    }, { timeout: 3000 });
  });

  it('Se ao escolher o filtro "ingredient" o fetch é feito', async () => {
    const urlIngredientCocktails = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    renderWithRouter(<App />, '/drinks');

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH);
    const firstLetter = screen.getByTestId(FIRST_LETTER_SEARCH);
    const btnSearch = screen.getByTestId(BTN_SEARCH_EXEC);

    userEvent.type(inputSearch, 's');
    userEvent.click(firstLetter);
    userEvent.click(btnSearch);

    await fetch(urlIngredientCocktails);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /smut/i })).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('Fazer uma pesquisa com filtro "name" e renderizado o card com o endpoint correto', async () => {
    renderWithRouter(<App />, '/drinks');

    const typedValue = 'Aquamarine';
    const urlNameCocktails = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${typedValue}`;

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH);
    const inputName = screen.getByTestId(NAME_SEARCH);
    const btnSearch = screen.getByTestId(BTN_SEARCH_EXEC);

    userEvent.type(inputSearch, 'sa');
    userEvent.click(inputName);
    userEvent.click(btnSearch);

    await fetch(urlNameCocktails);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /mimosa/i })).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
