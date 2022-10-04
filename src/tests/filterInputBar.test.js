import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testing the searchBar inputs for meals', () => {
  it('should render recipes with chicken', async () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    renderWithRouter(<App />, '/meals');

    const showSearchBarBtn = screen.getByRole('img', { name: /search-profile/i });
    expect(showSearchBarBtn).toBeInTheDocument();

    userEvent.click(showSearchBarBtn);

    const ingredientRadio = screen.getByRole('radio', { name: /ingredient/i });
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(ingredientRadio).toBeInTheDocument();

    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(searchBtn);

    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');

    await waitFor(() => expect(screen.getByText(/chicken/i)).toBeInTheDocument(), { timeout: 3000 });
  });

  it('should push to the meal recipe if only one result is found', async () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { history } = renderWithRouter(<App />, '/meals');

    const showSearchBarBtn = screen.getByRole('img', { name: /search-profile/i });
    expect(showSearchBarBtn).toBeInTheDocument();

    userEvent.click(showSearchBarBtn);

    const ingredientRadio = screen.getByRole('radio', { name: /name/i });
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(ingredientRadio).toBeInTheDocument();

    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(searchBtn);

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'), { timeout: 2000 });
  });
});

describe('Testing the searchBar inputs for drinks', () => {
  it('should push to the recipe details page if only one result is found', async () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    renderWithRouter(<App />, '/drinks');

    const showSearchBarBtn = screen.getByRole('img', { name: /search-profile/i });
    expect(showSearchBarBtn).toBeInTheDocument();

    userEvent.click(showSearchBarBtn);

    const nameRadio = screen.getByRole('radio', { name: /ingredient/i });
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(nameRadio).toBeInTheDocument();

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'Light rum');
    userEvent.click(searchBtn);

    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');

    await waitFor(() => expect(screen.getByText(/151 florida/i)).toBeInTheDocument(), { timeout: 2000 });
  });

  it('should push to the meal recipe if only one result is found', async () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

    const { history } = renderWithRouter(<App />, '/drinks');

    const showSearchBarBtn = screen.getByRole('img', { name: /search-profile/i });
    expect(showSearchBarBtn).toBeInTheDocument();

    userEvent.click(showSearchBarBtn);

    const ingredientRadio = screen.getByRole('radio', { name: /name/i });
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(ingredientRadio).toBeInTheDocument();

    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(searchBtn);

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine');

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/178319'), { timeout: 2000 });
  });
});
