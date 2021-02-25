import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './store/store';
import Navigation from './navigation';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
}

registerRootComponent(App);
