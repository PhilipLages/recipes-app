import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import Profile from '../Pages/Profile';
import Login from '../Pages/Login';

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
  it('Verifica se o email aparece na tela', () => {
    const { history } = renderWithRouter(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const bttnLogin = screen.getByTestId('login-submit-btn');
    const emailTest = 'teste@teste.com';
    const passwordTest = '1234567';
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);
    userEvent.click(bttnLogin);
    expect(history.location.pathname).toBe('/meals');
  });
});
