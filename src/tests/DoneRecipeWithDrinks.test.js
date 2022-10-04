import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import { dataDrinks } from './Mocks/localStorageMock';

const DONE_RECIPES = '/done-recipes';
const IMG_LINK = '0-horizontal-image';

describe('Testa o componente Done Recipes Com Drinks', () => {
  beforeEach(() => localStorage.setItem('doneRecipes', JSON.stringify(dataDrinks)));
  it('Verifica se renderiza os botões na tela', () => {
    renderWithRouter(<App />, DONE_RECIPES);

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealsFilterButton = screen.getByTestId('filter-by-meal-btn');
    const drinksFilterButton = screen.getByTestId('filter-by-drink-btn');

    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);

    expect(mealsFilterButton).toBeInTheDocument();
    userEvent.click(mealsFilterButton);

    expect(drinksFilterButton).toBeInTheDocument();
    userEvent.click(drinksFilterButton);
  });
  it('Verifica os elementos na Tela', () => {
    renderWithRouter(<App />, DONE_RECIPES);

    expect(screen.getByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
  });
  it('Verifica se o botão de profile esta renderizando pra tela de profile', () => {
    const { history } = renderWithRouter(<App />, DONE_RECIPES);

    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);

    expect(history.location.pathname).toBe('/profile');
  });
  it('Espera que o clica na imagem redirecione pra a tela de Recipe Details ', async () => {
    const { history } = renderWithRouter(<App />, DONE_RECIPES);

    const imgLink = screen.getByTestId(IMG_LINK);
    userEvent.type(imgLink);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15997');
    });
  });
  it('testa do botão Share', () => {
    renderWithRouter(<App />, DONE_RECIPES);

    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    expect(screen.getByTestId(IMG_LINK)).toBeInTheDocument();

    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);
  });
});
