import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import MaterialTabs from "react-native-material-tabs";
import logo from "../../images/logo.png";
import SignUp from "./SignUp";
import Login from "./Login";

const Home = ({ navigation }) => {
  const [tab, setTab] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setVisible(false);
  };

  const _keyboardDidHide = () => {
    setVisible(true);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.firstView}>
        {visible == true ? <Image style={styles.logo} source={logo} /> : null}
      </View>

      <View style={styles.secondView}>{tab == 0 ? <Login /> : <SignUp />}</View>

      <MaterialTabs
        items={["Sign In", "Create Account"]}
        selectedIndex={tab}
        onChange={(tab) => setTab(tab)}
        barColor="transparent"
        indicatorColor="#C45C4C"
        activeTextColor="#df5c4a"
        inactiveTextColor="#E9E1DA"
      />
    </KeyboardAvoidingView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  firstView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    top: 100,
  },
  secondView: {
    margin: 15,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
