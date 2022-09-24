import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title }) {
  const searchIconImg = (title === 'Profile'
    || title === 'Favorite Recipes' || title === 'Done Recipes');
  return (
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
          <button type="button">
            <img src={ searchIcon } data-testid="search-top-btn" alt="search-profile" />
          </button>
        )
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
