import React, { useContext } from 'react';
import RecipesContext from '../Context';
import Category from './Category';

export default function Categories() {
  const { history: { location: { pathname } }, mealsCategories,
    drinksCategories, allCategories } = useContext(RecipesContext);
  const FIVE = 5;
  return (
    <section>
      {pathname.includes('drinks')
      && (
        <div>
          {drinksCategories.slice(0, FIVE).map(({ strCategory }) => (
            <Category
              key={ strCategory }
              category={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
            />
          ))}
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ allCategories }
          >
            All

          </button>
        </div>
      )}
      { pathname.includes('meals')

      && (
        <div>
          {mealsCategories.slice(0, FIVE).map(({ strCategory }) => (
            <Category
              data-testid={ `${strCategory}-category-filter` }
              key={ strCategory }
              category={ strCategory }
            />
          ))}
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ allCategories }
          >
            All

          </button>
        </div>
      )}
    </section>
  );
}
