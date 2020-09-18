import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "@firebase/app";
import "@firebase/firestore";
import firebaseCfg from "./firebase/firebase.json";
import {
  Home,
  InterfaceUser,
  ScanQR,
  FindBar,
  ItemList,
  FinishOrder,
  OrderList,
  BarMenus,
} from "./components/screens";

firebase.initializeApp(firebaseCfg);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="InterfaceUser"
            component={InterfaceUser}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ScanQR"
            component={ScanQR}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FindBar"
            component={FindBar}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ItemList"
            component={ItemList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FinishOrder"
            component={FinishOrder}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OrderList"
            component={OrderList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BarMenus"
            component={BarMenus}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
