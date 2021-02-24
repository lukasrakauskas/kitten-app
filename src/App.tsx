import * as React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';

import store from './store/store';
import Navigation from './navigation';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar style="auto" />
    </Provider>
  );
}

registerRootComponent(App);
