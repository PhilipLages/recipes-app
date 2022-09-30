import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Desenvolva testes para atingir cobertura total do APP', () => {
  const EMAIL_INPUT = 'email-input';
  const PASSWORD_INPUT = 'password-input';

  it('Verifica se o input E-mail é renderizado', () => {
    renderWithRouter(<App />);

    const emailRender = screen.getByTestId(EMAIL_INPUT);

    expect(emailRender).toBeInTheDocument();
  });

  it('Verifica se o input Password é renderizado', () => {
    renderWithRouter(<App />);

    const passwordRender = screen.getByTestId(PASSWORD_INPUT);

    expect(passwordRender).toBeInTheDocument();
  });
  it('Verifica se o botão é renderizado', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Enter/i });

    expect(button).toBeInTheDocument();
  });
  it('Verifica se button esta desabilitado ao entrar na tela', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Enter/i });

    expect(button).toBeDisabled();
  });
  it('Verifica se button esta habilitado ao digitar email e senha', () => {
    renderWithRouter(<App />);

    const buttonHab = screen.getByRole('button', { name: /enter/i });
    const emailLabel = screen.getByTestId(EMAIL_INPUT);
    const passwordLabel = screen.getByTestId(PASSWORD_INPUT);
    const emailtest = 'test@test.com';
    const senhatest = '0987654';

    userEvent.type(emailLabel, emailtest);
    userEvent.type(passwordLabel, senhatest);

    expect(buttonHab).toBeEnabled();
  });

  it('Verifica se é redirecionado para a página "Meals" após efetuar login', () => {
    const { history } = renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /enter/i });
    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '0987655');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/meals');
  });
});
