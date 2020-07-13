import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import MainPage from './components/MainPage';
import theme from './theme';
import rootReducer from './reducers/rootReducer';

const reduxStore = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default () => (
  <Provider store={reduxStore}>
      <ThemeProvider theme={theme}>
          <MainPage />
        </ThemeProvider>
    </Provider>
);
