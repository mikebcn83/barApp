import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { getOrders } from "../Api/Apis";
import { useDispatch } from "react-redux";


const InterfaceUser = ({ navigation }) => {
  const dispatch = useDispatch();

  const toScan = () => {
    navigation.navigate("ScanQR");
  };

  const FindBar = () => {
    navigation.navigate("FindBar");
  };

  const OrderList = () => {
    getOrders(dispatch)
    navigation.navigate("OrderList");
  };

  return (
    <View style={styles.MainContainer}>
      <StatusBar barStyle="light-content" />

      <View style={styles.FirstView}>
        <Image
          source={require("../../images/logo.png")}
          style={styles.LogoStyle}
        />
      </View>
      <View style={styles.SecondView}>
        <TouchableOpacity style={styles.ViewFindBar} onPress={FindBar} >
          <Image
            source={require("../assets/images/lupa.png")}
            style={styles.ImageIconStyle}
          />
          <Image
            source={require("../assets/images/cubiertos.png")}
            style={styles.ImageIconStyle}
          />
        </TouchableOpacity>
        <Text style={styles.TextStyle}> Find your Bar </Text>
      </View>

      <View style={styles.ThirdView}>
        <View>
          <TouchableOpacity style={styles.ViewObject1} onPress={toScan}>
            <Image
              source={require("../assets/images/qr.png")}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>

          <Text style={styles.TextStyle}> Get your Table </Text>
        </View>

        <View>
          <TouchableOpacity style={styles.ViewObject2} onPress={OrderList}>
            <Image
              source={require("../assets/images/bloc.png")}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>

          <Text style={styles.TextStyle}> Orders </Text>
        </View>
      </View>      
    </View>
  );
};

export default InterfaceUser;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  LogoStyle: {
    marginTop: 15,
    width: 100,
    height: 100,
  },

  FirstView: {
    alignItems: "center",
  },

  SecondView: {
    alignItems: "center",
    marginTop: 60,
  },

  ThirdView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 80,
  },

  ViewFindBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 20,
    backgroundColor: "#E34C36",    
    width: 320,
    height: 150,
    padding: 0,
  },

  ViewObject1: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#D15C4B",
    fontWeight: "bold",
    fontSize: 20,
    width: 150,
    height: 130,
    padding: 5,
  },

  ViewObject2: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#BF4A3A",
    fontWeight: "bold",
    fontSize: 20,
    width: 150,
    height: 130,
    padding: 5,
  },

  ImageIconStyle: {
    width: 100,
    height: 100,
  },

  TextStyle: {
    color: "#711B10",
    textAlign: "center",
    fontWeight: "bold",
  },
});
