import React, { useContext } from 'react';
import RecipesContext from '../Context';
import Category from './Category';
import '../styles/categories.css';

export default function Categories() {
  const { history: { location: { pathname } }, mealsCategories,
    drinksCategories } = useContext(RecipesContext);
  const FIVE = 5;
  return (
    <section>
      {pathname.includes('drinks')
      && (
        <div className="categories-container">
          {drinksCategories.slice(0, FIVE).map(({ strCategory }) => (
            <Category
              key={ strCategory }
              category={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
            />
          ))}
          {/* <button
            type="button"
            data-testid="All-category-filter"
            onClick={ allCategories }
          >
            All

          </button> */}
        </div>
      )}
      { pathname.includes('meals')

      && (
        <div className="container">
          <div className="categories-container">
            {mealsCategories.slice(0, FIVE).map(({ strCategory }) => (
              <Category
                data-testid={ `${strCategory}-category-filter` }
                key={ strCategory }
                category={ strCategory }
              />
            ))}
          </div>
          {/* <button
            className="btn btn-sm category-btn"
            type="button"
            data-testid="All-category-filter"
            onClick={ allCategories }
          >
            All
          </button> */}
        </div>
      )}
    </section>
  );
}
