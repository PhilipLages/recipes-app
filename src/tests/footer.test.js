import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Desenvolva testes do Componente footer', () => {
  it('Verifica se os Botões do Footer  estão na tela e', () => {
    const { history } = renderWithRouter(<App />, '/meals');

    const btnDrinksFooter = screen.getByTestId('drinks-bottom-btn');

    expect(btnDrinksFooter).toBeInTheDocument();
    userEvent.type(btnDrinksFooter);
    expect(history.location.pathname).toEqual('/drinks');
  });
  it('Verifica se os Botões do Footer  estão na tela ', () => {
    const { history } = renderWithRouter(<App />, '/meals');

    const btnMealsFooter = screen.getByTestId('meals-bottom-btn');

    expect(btnMealsFooter).toBeInTheDocument();
    userEvent.type(btnMealsFooter);
    expect(history.location.pathname).toEqual('/meals');
  });
});
