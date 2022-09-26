import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import Meals from '../Pages/Meals';

describe('Desenvolva testes para atingir cobertura total do Header', () => {
  it('Verifica se a página renderiza os elementos', () => {
    renderWithRouter(<Meals />);

    const title = screen.getByTestId('footer');
    expect(title).toBeInTheDocument();

    const drinksIconBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinksIconBtn).toBeInTheDocument();

    const mealsIconBtn = screen.getByTestId('meals-bottom-btn');
    expect(mealsIconBtn).toBeInTheDocument();
  });
  it('Verifica se ao clicar na imagem, muda a página', () => {
    const { history } = renderWithRouter(<Meals />);

    const btnIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(btnIcon);

    expect(history.location.pathname).toBe('/drinks');
  });
});
