import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

const SEARCH_TOP_BTN = 'search-top-btn';

describe('Desenvolva testes para atingir cobertura total do Header', () => {
  global.alert = jest.fn();
  it('Verifica o uso do input do searchBar ', () => {
    renderWithRouter(<App />, '/meals');

    const btnSearch = screen.getByTestId(SEARCH_TOP_BTN);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'abc');
    userEvent.clear(inputSearch);
  });
  it('Verifica  o filtro de Name , firstLetter, ingredient ', async () => {
    renderWithRouter(<App />, '/meals');

    const btnSearch = screen.getByTestId(SEARCH_TOP_BTN);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    await waitFor(
      () => expect(screen.getByText(/name/i)),
    );

    const BtnRadioName = screen.getByTestId('name-search-radio');
    userEvent.type(BtnRadioName, { target: { value: true } });
    expect(BtnRadioName.value).toBe('name');
    userEvent.clear(BtnRadioName);

    const btnRadioFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.type(btnRadioFirstLetter, { target: { value: true } });
    expect(btnRadioFirstLetter.value).toBe('first-letter');
    userEvent.clear(btnRadioFirstLetter);

    const btnRadioIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.type(btnRadioIngredient, { target: { value: true } });
    expect(btnRadioIngredient.value).toBe('ingredient');
    userEvent.clear(btnRadioIngredient);
  });
  it('Verifica o botão Search', async () => {
    renderWithRouter(<App />, '/meals');

    const btnSearch = screen.getByTestId(SEARCH_TOP_BTN);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    await waitFor(
      () => expect(screen.getByText(/search/i)),
    );

    const btnSearchRecipes = screen.getByTestId('exec-search-btn');
    expect(btnSearchRecipes).toBeInTheDocument();
    userEvent.click(btnSearchRecipes);
  });
  it.only('Verifica se e exibida a mensagem de alerta caso não encontre nenhuma receita', async () => {
    renderWithRouter(<App />, '/meals');

    const btnSearch = screen.getByTestId(SEARCH_TOP_BTN);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    await waitFor(
      () => expect(screen.getByText(/search/i)),
    );

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'abc');
    const btnSearchRecipes = screen.getByTestId('exec-search-btn');
    expect(btnSearchRecipes).toBeInTheDocument();
    userEvent.click(btnSearchRecipes);

    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});
