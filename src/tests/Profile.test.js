import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testa o componente Profile', () => {
  it('Verifica se o botão de Favorite está redirecionado a tela de Favorite Recipes', () => {
    const { history } = renderWithRouter(<App />, '/profile');

    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    expect(favoriteButton).toBeInTheDocument();

    userEvent.click(favoriteButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Verifica se ao clicar no botão Done Recipes redireciona a tela Done Recipes ', () => {
    const { history } = renderWithRouter(<App />, '/profile');

    const doneButton = screen.getByTestId('profile-done-btn');
    userEvent.click(doneButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Verifica se o email aparece na tela', async () => {
    localStorage.setItem('user', JSON.stringify({
      email: 'tryber@teste.com',
    }));

    const { history } = renderWithRouter(<App />, '/profile');

    expect(screen.getByTestId('profile-email')).toBeInTheDocument();

    const logoutButton = screen.getByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();
    userEvent.click(logoutButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
});
