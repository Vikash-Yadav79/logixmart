import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/Auth/LoginScreen';
import SplashScreen from '../screens/splash/SplashScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
      animation: 'fade',
    }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Main" component={TabNavigator} />
  </Stack.Navigator>
);

export default RootNavigator;
