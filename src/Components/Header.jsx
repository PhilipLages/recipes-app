import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import RecipesContext from '../Context';

export default function Header({ title }) {
  const [searchField, setSearchField] = useState(false);
  const { search: { searchText }, handleChange } = useContext(RecipesContext);

  const searchIconImg = (title === 'Profile'
    || title === 'Favorite Recipes' || title === 'Done Recipes');
  return (
    <div>
      <div>
        <h1 data-testid="page-title">{title}</h1>
        <Link to="/profile">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile"
          />
        </Link>
        {
          !searchIconImg && (
            <button type="button" onClick={ () => setSearchField(!searchField) }>
              <img src={ searchIcon } data-testid="search-top-btn" alt="search-profile" />
            </button>
          )
        }
        {
          searchField && (
            <input
              type="text"
              name="searchText"
              value={ searchText }
              onChange={ handleChange }
              data-testid="search-input"
            />
          )
        }
      </div>
      <SearchBar />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
