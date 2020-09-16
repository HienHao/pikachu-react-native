/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import Footer from './src/components/Footer/Footer';
import Header from './src/components/Header/Header';
import MainPlaySection from './src/components/MainPlay/MainPlaySection';
import RootReducer from './src/redux/reducers/rootReducer';
import RootSagas from './src/sagas/rootSagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(RootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(RootSagas);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ScrollView>
          <Header />
          <MainPlaySection />

          {/* <Footer /> */}
        </ScrollView>
      </Provider>
    );
  }
}

export default App;
