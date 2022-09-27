import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
// import drinks from './mocks/drinks';
// import meals from './mocks/meals';

describe('Desenvolva testes para atingir cobertura total do Header', () => {
  // beforeEach(() => {
  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: () => Promise.resolve(meals),
  //   });
  // });
  it('Verifica se ao clicar no Botão "Profile" é renderizada a rota /profile', () => {
    const { history } = renderWithRouter(<App />, '/meals');

    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();

    userEvent.click(btnProfile);
    expect(history.location.pathname).toEqual('/profile');
  });
  it('Verifica se a página renderiza o Titulo', () => {
    renderWithRouter(<App />, '/meals');

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  it.only('Verifica se ao clicar no botão de search abre o menu de busca', () => {
    renderWithRouter(<App />, '/meals');

    const btnSearch = screen.getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
});
