import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
import Home from './components/screens/Home';

const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
