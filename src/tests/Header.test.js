import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import Meals from '../Pages/Meals';

describe('Desenvolva testes para atingir cobertura total do Header', () => {
  it('Verifica se a página renderiza os elementos', () => {
    renderWithRouter(<Meals />);

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();

    const imgIcon = screen.getByTestId('profile-top-btn');
    expect(imgIcon).toBeInTheDocument();

    const serachIcon = screen.getByTestId('search-top-btn');
    expect(serachIcon).toBeInTheDocument();
  });
  it('Verifica se ao clicar na imagem, muda a página', () => {
    renderWithRouter(<Meals />);

    const bttnIcon = screen.getByTestId('search-top-btn');
    userEvent.click(bttnIcon);
    const searchField = screen.getByTestId('search-input');
    expect(searchField).toBeInTheDocument();
  });
});
