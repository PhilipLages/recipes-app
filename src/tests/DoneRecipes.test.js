import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import DoneRecipes from '../Pages/DoneRecipes';

describe('Testa o componente Done Recipes', () => {
  it('Verifica se renderiza os itens do componente', () => {
    renderWithRouter(<DoneRecipes />);

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealsFilterButton = screen.getByTestId('filter-by-meal-btn');
    const drinksFilterButton = screen.getByTestId('filter-by-drink-btn');

    expect(allButton).toBeInTheDocument();
    expect(mealsFilterButton).toBeInTheDocument();
    expect(drinksFilterButton).toBeInTheDocument();
  });
});
