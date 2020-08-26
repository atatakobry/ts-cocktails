import React from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from 'react-router-dom';

import { Cocktails } from './pages/Cocktails/Cocktails';
import { Home } from './pages/Home/Home';

import styles from './App.module.scss';

const App = () => {
  return (
    <Router>
      <header className={styles.header}>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/" activeClassName={styles.isActive}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/cocktails" activeClassName={styles.isActive}>
                Cocktails
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <div className={styles.view}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/cocktails">
            <Cocktails />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
