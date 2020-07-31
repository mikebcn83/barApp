import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
import {Home, InterfaceUser, Login} from './components/screens';

const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="InterfaceUser"
          component={InterfaceUser}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
