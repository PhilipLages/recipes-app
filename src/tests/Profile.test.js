import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import Profile from '../Pages/Profile';

describe('Testa o componente Profile', () => {
  it('Verifica se os componentes estão sendo renderizados na tela', () => {
    renderWithRouter(<Profile />);
    const doneButton = screen.getByTestId('profile-done-btn');
    expect(doneButton).toBeInTheDocument();
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    const logoutButton = screen.getByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();
  });
  it('Verifica se ao clicar no botão Done Recipes, direciona para a página a rota muda', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneButton = screen.getByTestId('profile-done-btn');
    userEvent.click(doneButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
