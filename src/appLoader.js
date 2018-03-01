import './theme.less';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { App } from './components/app';
import { rootReducer } from './reducers';


const composeEnhancers = process.env.NODE_ENV === 'production' ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Route component={Component} />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}