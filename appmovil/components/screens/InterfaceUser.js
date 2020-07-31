import React, { useState } from "react";
import {
  StatusBar,
  BackHandler,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
// import { FAB } from "react-native-paper";
// import Modal from "react-native-modal";

const InterfaceUser = ({ navigation }) => {
  // const [modal, setModal] = useState(false);

  // const openModal = () => {
  //   setModal(!modal);
  // };

  return (
    <View style={styles.MainContainer}>
      <StatusBar barStyle="dark-content" />

      <TouchableOpacity style={styles.ViewBalance} >
          {/* <Text style={styles.stylesText}> Login </Text> */}
        </TouchableOpacity>

      {/* <View style={styles.FirstView}>
        <Image
          source={require("../../images/logo.png")}
          style={styles.LogoStyle}
        />
      </View>
      <View style={styles.SecondView}>
        <TouchableOpacity style={styles.ViewBalance}>
          {" "}
          <Image
            source={require("../assets/images/wallet.png")}
            style={styles.ImageIconStyle}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.ThirdView}>
        <View>
          <TouchableOpacity
            style={styles.ViewObject1}
          >
            <Image
              source={require("../assets/images/qr.png")}
              style={styles.ImageIconStyle2}
            />
          </TouchableOpacity>

          <Text style={styles.TextStyle}> Show ID </Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.ViewObject2}
            // onPress={() => navigation.navigate("ShowID")}
          >
            <Image
              source={require("../assets/images/greencatpay.png")}
              style={styles.ImageIconStyle3}
            />
          </TouchableOpacity>

          <Text style={styles.TextStyle}>GreenCat Pay</Text>
        </View>
      </View>
      <View style={styles.FourthView}>
        <View>
          <TouchableOpacity
            style={styles.ViewObject3}
            onPress={() => navigation.navigate("RecyclingHistory")}
          >
            <Image
              source={require("../assets/images/reciclaje.png")}
              style={styles.ImageIconStyle4}
            />
          </TouchableOpacity>

          <Text style={styles.TextStyle}>Recycling History</Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.ViewObject4}
            // onPress={() => navigation.navigate("GetTransaccions")}
          >
            <Image
              source={require("../assets/images/transacciones.png")}
              style={styles.ImageIconStyle5}
            />
          </TouchableOpacity>

          <Text style={styles.TextStyle}>Transaccions</Text>
        </View>
      </View> */}
    </View>
  );
};

export default InterfaceUser;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  LogoStyle: {
    marginTop: 25,
    marginLeft: 25,
    width: 162,
    height: 42,
  },

  FirstView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  SecondView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 90,
  },

  ThirdView: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 70,
  },
  FourthView: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 130,
  },

  TextBalance: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
  },

  ViewBalance: {
    borderRadius: 20,
    backgroundColor: "#8ec033",
    fontWeight: "bold",
    fontSize: 20,
    width: 320,
    height: 170,
    padding: 5,
  },

  ViewObject1: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#adc089",
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
    backgroundColor: "#156c5c",
    fontWeight: "bold",
    fontSize: 20,
    width: 150,
    height: 130,
    padding: 5,
  },

  ViewObject3: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#8da463",
    fontWeight: "bold",
    fontSize: 20,
    width: 150,
    height: 130,
    padding: 5,
  },

  ViewObject4: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#5ba35b",
    fontWeight: "bold",
    fontSize: 20,
    width: 150,
    height: 130,
    padding: 5,
  },

  ImageIconStyle: {
    width: 90,
    height: 80,
    margin: 10,
  },

  ImageIconStyle2: {
    width: 70,
    height: 70,
  },

  ImageIconStyle3: {
    width: 80,
    height: 95,
  },

  ImageIconStyle4: {
    width: 65,
    height: 90,
  },

  ImageIconStyle5: {
    width: 107,
    height: 55,
  },

  TextStyle: {
    color: "#8ec033",
    textAlign: "center",
    fontWeight: "bold",
  },
});
