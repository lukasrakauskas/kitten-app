import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import LinkingConfiguration from './LinkingConfiguration';
import KittenScreen from 'src/features/kitten/screens/Kitten';
import KittenListScreen from 'src/features/kitten/screens/KittenList';

export type RootStackParamList = {
  KittenList: undefined;
  Kitten: { kitten: KittenDTO };
};

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="KittenList">
      <Stack.Screen
        name="KittenList"
        component={KittenListScreen}
        options={{ title: 'Kitten List' }}
      />
      <Stack.Screen
        name="Kitten"
        component={KittenScreen}
        options={{ title: 'Kitten View' }}
      />
    </Stack.Navigator>
  );
}
