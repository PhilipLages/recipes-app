import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import RecipeDetailsCard from '../Components/RecipeDetailsCard';

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
jest.setTimeout(40000);

describe('Testa 45% do componente RecipeDetailsCard', () => {
  afterEach(() => fetchMock.restore());

  it('Verifica se o botão é rederizado na tela', async () => {
    const { history } = renderWithRouter(<RecipeDetailsCard />);

    const img = screen.getAllByTestId('recipe-photo');
    const title = screen.getAllByTestId('recipe-title');
    const category = screen.getAllByTestId('recipe-category');
    const instructions = screen.getAllByTestId('instructions');
    const ingredient = screen.getAllByTestId('0-ingredient-name-and-measure');
    const startButton = screen.getByTestId('start-recipe-btn');

    userEvent.type(img, testDoneRecipes.image);
    userEvent.type(title, testDoneRecipes.name);
    userEvent.type(category, testDoneRecipes.category);
    userEvent.type(instructions, testDoneRecipes);
    userEvent.type(ingredient, testDoneRecipes.tags);
    userEvent.click(startButton);

    fetchMock.mock(testDoneRecipes);

    await waitFor(() => {
      expect(fetchMock.called(testDoneRecipes)).toBeTruthy();
    });

    expect(await screen.findByTestId('start-recipe-btn')).toHaveTextContent('Start Recipe');

    expect(history.location.pathname).toBe('/drinks');
  });
  // it('Verifica se a imagem é renderizada na tela', () => {
  //   const img = screen.getAllByTestId('recipe-photo');
  //   expect(img).toBeInTheDocument();
  // });
});
