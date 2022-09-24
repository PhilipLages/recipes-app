import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './Context/RecipesProvider';
import Login from './Pages/Login';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
