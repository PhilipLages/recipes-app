import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Desenvolva testes para atingir cobertura total do APP', () => {
  test('Verifica se o input E-mail é renderizado', () => {
    renderWithRouter(<App />);

    const emailRender = screen.getByTestId('email-input');

    expect(emailRender).toBeInTheDocument();
  });

  test('Verifica se o input Password é renderizado', () => {
    renderWithRouter(<App />);

    const passwordRender = screen.getByTestId('password-input');

    expect(passwordRender).toBeInTheDocument();
  });
  test('Verifica se o botão é renderizado', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Enter/i });

    expect(button).toBeInTheDocument();
  });
  test('Verifica se button esta desabilitado ao entrar na tela', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Enter/i });

    expect(button).toBeDisabled();
  });
  test('Verifica se button esta habilitado ao digitar email e senha', () => {
    renderWithRouter(<App />);

    const buttonHab = screen.getByRole('button', { name: /enter/i });
    const emailLabel = screen.getByTestId('email-input');
    const passwordLabel = screen.getByTestId('password-input');
    const emailtest = 'test@test.com';
    const senhatest = '0987654';

    userEvent.type(emailLabel, emailtest);
    userEvent.type(passwordLabel, senhatest);

    expect(buttonHab).toBeEnabled();
  });
});

