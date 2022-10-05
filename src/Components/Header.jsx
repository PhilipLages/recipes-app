import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/header.css';

export default function Header({ title }) {
  const [searchField, setSearchField] = useState(false);

  const searchIconImg = (title === 'Profile'
    || title === 'Favorite Recipes' || title === 'Done Recipes');
  return (
    <div className="header-container">
      <div className="header-links">
        <h1 data-testid="page-title">{title}</h1>

        <div>
          <Link to="/profile">
            <img
              className="profile-icon"
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="profile"
            />
          </Link>
          {
            !searchIconImg && (
              <button type="button" onClick={ () => setSearchField(!searchField) }>
                <img
                  className="search-vector"
                  src={ searchIcon }
                  data-testid="search-top-btn"
                  alt="search-profile"
                />
              </button>
            )
          }
        </div>
      </div>
      { searchField && (<SearchBar />) }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
