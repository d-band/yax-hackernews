import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import yax from 'yax';
import router, { push } from 'yax-router';
import './index.less';
import item from './models/item';
import user from './models/user';
import Router from './router';
import * as handlers from './handlers';

const history = createHistory();
const store = yax({
  state: {
    loading: false,
  },
  reducers: {
    show(state) {
      return { ...state, loading: true };
    },
    hide(state) {
      return { ...state, loading: false };
    },
  },
  modules: { item, user },
}, router(history));

store.onRoute('/:type/:page?', handlers.list);
store.onRoute('/item/:itemId', handlers.item);
store.onRoute('/user/:userId', handlers.user);

store.dispatch(push(window.location.pathname));

render(
  <Provider store={store}>
    <Router history={history} />
  </Provider>,
  document.getElementById('root'),
);
