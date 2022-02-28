import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScenesKey } from './common/constant/constants';
import Home from './screens/home/Home';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ScenesKey.ScenesKey}>
        <Stack.Screen name={ScenesKey.Home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
