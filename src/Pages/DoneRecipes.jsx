import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import useStorage from '../Hooks';

export default function DoneRecipes() {
  const [doneRecipes] = useStorage('doneRecipes', []);

  return (
    <div>
      <Header title="Done Recipes" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {
        doneRecipes.map((item, index) => (
          <div key={ index }>
            <img
              src={ item.image }
              data-testid={ `${index}-horizontal-image` }
              alt=""
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              { item.type === 'meal' ? `${item.nationality} - ${item.category}`
                : `${item.alcoholicOrNot}` }

            </p>
            <p data-testid={ `${index}-horizontal-name` }>{ item.name }</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
            {
              item.tags.map((el) => (
                <p
                  key={ index }
                  data-testid={ item.type === 'meal' ? `${index}-${el}-horizontal-tag`
                    : '' }
                >
                  {el}

                </p>
              ))
            }
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              Share

            </button>
          </div>
        ))
      }
    </div>
  );
}
