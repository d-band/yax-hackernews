import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'yax-router';
import { Route, Redirect, Switch } from 'react-router';
import ListPage from './pages/ListPage';
import ItemPage from './pages/ItemPage';
import UserPage from './pages/UserPage';

const TYPES = ['top', 'new', 'show', 'ask', 'job'];

const MainRouter = ({ history }) => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/top" />)} />
      {TYPES.map(type => <Route key={`/${type}/:page?`} path={`/${type}/:page?`} component={ListPage} />)}
      <Route path="/item/:itemId" component={ItemPage} />
      <Route path="/user/:userId" component={UserPage} />
    </Switch>
  </Router>
);
MainRouter.propTypes = {
  history: PropTypes.any.isRequired
};

export default MainRouter;
