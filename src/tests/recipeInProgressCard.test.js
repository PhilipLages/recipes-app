import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('Testes recipeInProgressCard', () => {
  const finalizar = 'finish-recipe-btn';
  const ingredient1 = '0-ingredient-step';
  const ingredient2 = '1-ingredient-step';
  const ingredient3 = '2-ingredient-step';
  const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
  const MEALS_ROUTE = '/meals/52771/in-progress';
  const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';
  const DRINKS_ROUTE = '/drinks/15997/in-progress';

  it('Verifica se o botão Finalizar está desabilitado e depois de preenchidos os checkbox ele é habilitado (meals)', async () => {
    const urlMeal = MEALS_API;
    fetch(urlMeal);

    renderWithRouter(<App />, MEALS_ROUTE);

    await waitFor(() => {
      const finalizarBtn = screen.getByTestId(finalizar);
      expect(finalizarBtn).toBeDisabled();
    });

    const check1 = screen.getByTestId(ingredient1);
    const check2 = screen.getByTestId(ingredient2);
    const check3 = screen.getByTestId(ingredient3);
    const check4 = screen.getByTestId('3-ingredient-step');
    const check5 = screen.getByTestId('4-ingredient-step');
    const check6 = screen.getByTestId('5-ingredient-step');
    const check7 = screen.getByTestId('6-ingredient-step');
    const check8 = screen.getByTestId('7-ingredient-step');

    userEvent.click(check2);
    userEvent.click(check3);
    userEvent.click(check4);
    userEvent.click(check5);
    userEvent.click(check1);
    userEvent.click(check6);
    userEvent.click(check7);
    userEvent.click(check8);

    const finalizarBtn = screen.getByTestId(finalizar);
    expect(finalizarBtn).toBeEnabled();
  });
  it('Verifica se o botão Finalizar redireciona para a página done-recipes (meals)', async () => {
    const urlMeal = MEALS_API;
    fetch(urlMeal);

    const { history } = renderWithRouter(<App />, MEALS_ROUTE);

    await waitFor(() => {
      const finalizarBtn = screen.getByTestId(finalizar);
      expect(finalizarBtn).toBeDisabled();
    });

    const check1 = screen.getByTestId(ingredient1);
    const check2 = screen.getByTestId(ingredient2);
    const check3 = screen.getByTestId(ingredient3);
    const check4 = screen.getByTestId('3-ingredient-step');
    const check5 = screen.getByTestId('4-ingredient-step');
    const check6 = screen.getByTestId('5-ingredient-step');
    const check7 = screen.getByTestId('6-ingredient-step');
    const check8 = screen.getByTestId('7-ingredient-step');

    userEvent.click(check2);
    userEvent.click(check3);
    userEvent.click(check4);
    userEvent.click(check5);
    userEvent.click(check1);
    userEvent.click(check6);
    userEvent.click(check7);
    userEvent.click(check8);

    const finalizarBtn = screen.getByTestId(finalizar);
    userEvent.click(finalizarBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
      expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    });
  });
  it('Verifica se o botão Finalizar está desabilitado e depois de preenchidos os checkbox ele é habilitado (drinks)', async () => {
    const urlMeal = DRINKS_API;
    fetch(urlMeal);

    renderWithRouter(<App />, DRINKS_ROUTE);

    await waitFor(() => {
      const finalizarBtn = screen.getByTestId(finalizar);
      expect(finalizarBtn).toBeDisabled();
    });

    const check1 = screen.getByTestId(ingredient1);
    const check2 = screen.getByTestId(ingredient2);
    const check3 = screen.getByTestId(ingredient3);

    userEvent.click(check1);
    userEvent.click(check2);
    userEvent.click(check3);

    const finalizarBtn = screen.getByTestId(finalizar);
    expect(finalizarBtn).toBeEnabled();
  });
  it('Verifica se o botão Finalizar redireciona para a página done-recipes (drinks)', async () => {
    const urlMeal = DRINKS_API;
    fetch(urlMeal);

    const { history } = renderWithRouter(<App />, DRINKS_ROUTE);

    await waitFor(() => {
      const finalizarBtn = screen.getByTestId(finalizar);
      expect(finalizarBtn).toBeDisabled();
    });

    const check1 = screen.getByTestId(ingredient1);
    const check2 = screen.getByTestId(ingredient2);
    const check3 = screen.getByTestId(ingredient3);

    userEvent.click(check1);
    userEvent.click(check2);
    userEvent.click(check3);

    const finalizarBtn = screen.getByTestId(finalizar);
    userEvent.click(finalizarBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
      expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    });
  });
});
