import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import DoneRecipes from '../Pages/DoneRecipes';

describe('Testa o componente Done Recipes', () => {
  it('Verifica se renderiza os botões na tela', () => {
    renderWithRouter(<DoneRecipes />);

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealsFilterButton = screen.getByTestId('filter-by-meal-btn');
    const drinksFilterButton = screen.getByTestId('filter-by-drink-btn');
    // const shareButton = screen.getByTestId('0-horizontal-share-btn');

    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);

    expect(mealsFilterButton).toBeInTheDocument();
    userEvent.click(mealsFilterButton);

    expect(drinksFilterButton).toBeInTheDocument();
    userEvent.click(drinksFilterButton);

    // expect(shareButton).toBeInTheDocument();
    // userEvent.click(shareButton);
  });
  it('Verifica os elementos na Tela', () => {
    renderWithRouter(<DoneRecipes />);

    // expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
  });
  it('Verifica se o botão de profile esta renderizando pra tela de profile', () => {
    const { history } = renderWithRouter(<DoneRecipes />);

    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);

    expect(history.location.pathname).toBe('/profile');
  });
});
