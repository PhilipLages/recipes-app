import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testa o componente Profile', () => {
  it('Verifica se os componentes estão sendo renderizados na tela', () => {
    renderWithRouter(<App />, '/profile');
    const doneButton = screen.getByTestId('profile-done-btn');
    expect(doneButton).toBeInTheDocument();
    expect(doneButton).toBeEnabled();
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toBeEnabled();
    const logoutButton = screen.getByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toBeEnabled();
  });
  it('Verifica se ao clicar no botão Done Recipes, direciona para a página a rota muda', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const doneButton = screen.getByTestId('profile-done-btn');
    userEvent.click(doneButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Verifica o botão de favoritos', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Verifica botão logout', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const logoutButton = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
  });
  it('Verifica se o email aparece na tela', () => {
    renderWithRouter(<App />, '/profile');
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
  });
});
