const favoriteRecipesMock = [
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
];

export default favoriteRecipesMock;

const today = '29/09/2022';

export const dataMeals = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: today,
    tags: [
      'Soup',
    ],
  },
  {
    id: '52844',
    type: 'meal',
    nationality: 'Italian',
    category: 'Pasta',
    alcoholicOrNot: '',
    name: 'Lasagne',
    image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
    doneDate: today,
    tags: [
      null,
    ],
  },
];

export const dataDrinks = [
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    doneDate: '',
    tags: [
      null,
    ],
  },
  {
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    doneDate: '',
    tags: [
      null,
    ],
  },
];

export const inProgressMeal = {
  meals: {
    52771: ['penne rigate', 'olive oil', 'garlic', 'chopped tomatoes', 'red chile flakes', 'italian seasoning', 'basil', 'Parmigiano-Reggiano'],
  },
  drinks: {},
};

// eslint-disable-next-line func-names
export const localStorageMock = (function () {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
}());
