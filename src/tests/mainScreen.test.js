import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import drinks from '../../cypress/mocks/drinks';
import oneDrink from '../../cypress/mocks/oneDrink';

const DRINKS_PATH = '/drinks';
const INGREDIENT_SEARCH = 'ingredient-search-radio';
const NAME_SEARCH = 'name-search-radio';
const FIRST_LETTER_SEARCH = 'first-letter-search-radio';
const BTN_SEARCH_EXEC = 'exec-search-btn';
const RECIPES_LIMIT = 12;
const SEARCH = 'search-input';
const BEEF_CATEGORY_FILTER = 'Beef-category-filter';
const BREAKFAST_CATEGORY_FILTER = 'Breakfast-category-filter';
const CHICKEN_CATEGORY_FILTER = 'Chicken-category-filter';
const DESSERT_CATEGORY_FILTER = 'Dessert-category-filter';
const GOAT_CATEGORY_FILTER = 'Goat-category-filter';
const SEARCH_TOP_BTN = 'search-top-btn';

describe('Testa a página Bebidas', () => {
  it.only('verifica os botões de categoria', () => {
    renderWithRouter(<App />, '/meals');

    // const beefCategoryFilter = screen.getByTestId(BEEF_CATEGORY_FILTER);
    // expect(beefCategoryFilter).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: /meals/i })).toBeInTheDocument();
    expect(screen.getByText(/breakfast/i)).toBeInTheDocument();
    // userEvent.type(beefCategoryFilter, { value: true });
    // expect(beefCategoryFilter.value).toBe('Beef');
  });

  it('Se ao carregar a pagina, os cards são renderizados na tela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    renderWithRouter(<App />, DRINKS_PATH);

    await waitFor(() => {
      for (let index = 0; index < RECIPES_LIMIT; index += 1) {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      }
    }, { timeout: 2000 });
  });

  it('Se ao escolher o filtro "ingredient" o fetch é feito', () => {
    renderWithRouter(<App />, DRINKS_PATH);

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(cocktailDrinks),
    });

    const typedValue = 'cocktails';
    const urlIngredientCocktails = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${typedValue}`;

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH);
    const inputIngredient = screen.getByTestId(INGREDIENT_SEARCH);
    const btnSearch = screen.getByTestId(BTN_SEARCH_EXEC);

    userEvent.type(inputSearch, typedValue);
    userEvent.click(inputIngredient);
    userEvent.click(btnSearch);

    expect(fetch).toBeCalledWith(urlIngredientCocktails);
  });

  it('Fazer uma pesquisa com filtro "name" e renderizado o card com o endpoint correto', () => {
    renderWithRouter(<App />, DRINKS_PATH);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(cocktailDrinks),
    });

    const typedValue = 'cocktails';
    const urlNameCocktails = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${typedValue}`;

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH);
    const inputName = screen.getByTestId(NAME_SEARCH);
    const btnSearch = screen.getByTestId(BTN_SEARCH_EXEC);

    userEvent.type(inputSearch, typedValue);
    userEvent.click(inputName);
    userEvent.click(btnSearch);

    expect(fetch).toBeCalledWith(urlNameCocktails);
  });

  it('Fazer um pesquisa com filtro "First letter" e retornado o card com somente uma letra ', () => {
    renderWithRouter(<App />, DRINKS_PATH);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(cocktailDrinks),
    });

    const typedValue = 'c';
    const urlNameCocktails = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${typedValue}`;

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH);
    const inputFirstLetter = screen.getByTestId(FIRST_LETTER_SEARCH);
    const btnSearch = screen.getByTestId(BTN_SEARCH_EXEC);

    userEvent.type(inputSearch, typedValue);
    userEvent.click(inputFirstLetter);
    userEvent.click(btnSearch);

    expect(fetch).toBeCalledWith(urlNameCocktails);
  });

  it('Se ao digitar "aquamarine" e pesquisar e retornado o card com ID correto', async () => {
    const { history } = renderWithRouter(<App />, DRINKS_PATH);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    const typedValue = 'aquamarine';
    const pathNameAquamarine = '/drinks/178319';
    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH);
    const inputName = screen.getByTestId(NAME_SEARCH);
    const btnSearch = screen.getByTestId(BTN_SEARCH_EXEC);

    userEvent.type(inputSearch, typedValue);
    userEvent.click(inputName);
    userEvent.click(btnSearch);

    await waitFor(() => expect(history.location.pathname)
      .toBe(pathNameAquamarine), { timeout: 2000 });
  });
});
