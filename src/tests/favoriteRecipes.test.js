import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import favoriteRecipesMock from './Mocks/localStorageMock';

describe('Tests for the Favorite Recipes page', () => {
  beforeEach(() => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    renderWithRouter(<App />, '/favorite-recipes');
  });

  it('should render the header title', () => {
    const headerTitle = screen.getByRole('heading', { name: /favorite recipes/i });

    expect(headerTitle).toBeInTheDocument();
  });

  it('should render buttons to filter the recipes', () => {
    const allFilterBtn = screen.getByRole('button', { name: /all/i });
    const mealsFilterBTN = screen.getByRole('button', { name: /meals/i });
    const drinksFilterBtn = screen.getByRole('button', { name: /drinks/i });

    expect(allFilterBtn).toBeInTheDocument();
    expect(mealsFilterBTN).toBeInTheDocument();
    expect(drinksFilterBtn).toBeInTheDocument();
  });

  it('should render the profile image', () => {
    const profileImage = screen.getByRole('img', { name: /profile/i });

    expect(profileImage).toBeInTheDocument();
  });

  it('should render all favorite recipes from localStorage', () => {
    const firstRecipeName = screen.getByRole('heading', { name: /gg/i });
    const secondRecipeName = screen.getByRole('heading', { name: /corba/i });
    const recipes = screen.getAllByRole('link');

    expect(recipes).toHaveLength(5);
    expect(firstRecipeName).toBeInTheDocument();
    expect(secondRecipeName).toBeInTheDocument();
  });

  it('should filter Meals correctly', () => {
    const mealsFilterBTN = screen.getByRole('button', { name: /meals/i });
    const drinkRecipeName = screen.getByRole('heading', { name: /gg/i });
    const mealRecipeName = screen.getByRole('heading', { name: /corba/i });

    userEvent.click(mealsFilterBTN);
    expect(mealRecipeName).toBeInTheDocument();
    expect(drinkRecipeName).not.toBeInTheDocument();
  });

  it('should filter Drinks correctly', () => {
    const drinksFilterBtn = screen.getByRole('button', { name: /drinks/i });
    const drinkRecipeName = screen.getByRole('heading', { name: /gg/i });
    const mealRecipeName = screen.getByRole('heading', { name: /corba/i });

    userEvent.click(drinksFilterBtn);
    expect(mealRecipeName).not.toBeInTheDocument();
    expect(drinkRecipeName).toBeInTheDocument();
  });

  it('should render all recipes after filtering by Drinks and removing filters', async () => {
    const drinksFilterBtn = screen.getByRole('button', { name: /drinks/i });
    const allFilterBtn = screen.getByRole('button', { name: /all/i });
    const drinkRecipeName = screen.getByRole('heading', { name: /gg/i });
    const mealRecipeName = screen.getByRole('heading', { name: /corba/i });

    userEvent.click(drinksFilterBtn);
    expect(mealRecipeName).not.toBeInTheDocument();
    expect(drinkRecipeName).toBeInTheDocument();

    userEvent.click(allFilterBtn);

    await waitFor(() => expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument());
    expect(drinkRecipeName).toBeInTheDocument();
  });

  it('should render all recipes after filtering by Meals and removing filters', async () => {
    const mealsFilterBTN = screen.getByRole('button', { name: /meals/i });
    const allFilterBtn = screen.getByRole('button', { name: /all/i });
    const drinkRecipeName = screen.getByRole('heading', { name: /gg/i });
    const mealRecipeName = screen.getByRole('heading', { name: /corba/i });

    userEvent.click(mealsFilterBTN);
    expect(drinkRecipeName).not.toBeInTheDocument();
    expect(mealRecipeName).toBeInTheDocument();

    userEvent.click(allFilterBtn);

    await waitFor(() => expect(screen.getByRole('heading', { name: /gg/i })).toBeInTheDocument());
    expect(mealRecipeName).toBeInTheDocument();
  });

  it('should remove drink from favorite recipes after clicking the heart button', () => {
    const drinkRecipeName = screen.getByRole('heading', { name: /gg/i });
    const mealRecipeName = screen.getByRole('heading', { name: /corba/i });
    const removeFavoriteDrinkBtn = screen.getByTestId('0-horizontal-favorite-btn');

    userEvent.click(removeFavoriteDrinkBtn);

    expect(drinkRecipeName).not.toBeInTheDocument();
    expect(mealRecipeName).toBeInTheDocument();
  });

  it('should remove meal from favorite recipes after clicking the heart button', () => {
    const drinkRecipeName = screen.getByRole('heading', { name: /gg/i });
    const mealRecipeName = screen.getByRole('heading', { name: /corba/i });
    const removeFavoriteMealBtn = screen.getByTestId('1-horizontal-favorite-btn');

    userEvent.click(removeFavoriteMealBtn);

    expect(mealRecipeName).not.toBeInTheDocument();
    expect(drinkRecipeName).toBeInTheDocument();
  });

  it('should render a message of link copied after clicking the share button', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    const shareButton = screen.getByTestId('1-horizontal-share-btn');

    userEvent.click(shareButton);

    const copiedMessage = screen.getAllByText(/link copied/i, { selector: 'p' });
    expect(copiedMessage).toHaveLength(2);
  });
});
