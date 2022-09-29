import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const NAME_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Desenvolva testes para atingir cobertura total do Header', () => {
  it('Verifica se e exibida a mensagem de alerta caso não encontre nenhuma receita na tela de meals', async () => {
    renderWithRouter(<App />, '/meals');

    const btnSearch = screen.getByTestId(SEARCH_TOP_BTN);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    await waitFor(
      () => expect(screen.getByText(/search/i)),
    );

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(inputSearch, 'xxxx');

    const BtnRadioName = screen.getByTestId(NAME_SEARCH_RADIO);
    userEvent.type(BtnRadioName, { target: { value: true } });
    expect(BtnRadioName.value).toBe('name');

    const btnSearchRecipes = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(btnSearchRecipes).toBeInTheDocument();
    userEvent.click(btnSearchRecipes);

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    await waitFor(
      () => expect(alertMock).toHaveBeenCalledTimes(1),
    );
  });
  it('Verifica se e exibida a mensagem de alerta caso não encontre nenhuma receita na tela de drinks', async () => {
    renderWithRouter(<App />, '/drinks');

    const btnSearch = screen.getByTestId(SEARCH_TOP_BTN);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    await waitFor(
      () => expect(screen.getByText(/search/i)),
    );

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(inputSearch, 'xxxx');

    const BtnRadioName = screen.getByTestId(NAME_SEARCH_RADIO);
    userEvent.type(BtnRadioName, { target: { value: true } });
    expect(BtnRadioName.value).toBe('name');

    const btnSearchRecipes = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(btnSearchRecipes).toBeInTheDocument();
    userEvent.click(btnSearchRecipes);

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    await waitFor(
      () => expect(alertMock).toHaveBeenCalledTimes(1),
    );
  });
  it('Verifica o uso do input do searchBar ', () => {
    renderWithRouter(<App />, '/meals');

    const btnSearch = screen.getByTestId(SEARCH_TOP_BTN);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
    const inputSearch = screen.getByTestId(SEARCH_INPUT);
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

    const BtnRadioName = screen.getByTestId(NAME_SEARCH_RADIO);
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

    const btnSearchRecipes = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(btnSearchRecipes).toBeInTheDocument();
    userEvent.click(btnSearchRecipes);
  });
});
