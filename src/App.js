import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './Context/RecipesProvider';
import Login from './Pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Profile from './Pages/Profile';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
