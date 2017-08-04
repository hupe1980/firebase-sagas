import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import rootReducer from './reducers';
import rootSaga from './sagas';
import App from './components/App';

const history = createHistory(); // BrowserHistory
const routerMiddleware = createRouterMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,
  compose(applyMiddleware(sagaMiddleware, routerMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.querySelector('#root'));
