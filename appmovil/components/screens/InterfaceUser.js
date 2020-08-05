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
  const toScan = () => {
    navigation.navigate("scanQR");
  };

  const FindBar = () => {
    navigation.navigate("FindBar");
  };

  return (
    <View style={styles.MainContainer}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.FirstView}>
        <Image
          source={require("../../images/logo.png")}
          style={styles.LogoStyle}
        />
      </View>
      <View style={styles.SecondView}>
        <TouchableOpacity style={styles.ViewBalance} onPress={FindBar} >
          <Image
            source={require("../assets/images/buscar.png")}
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
              style={styles.ImageIconStyle2}
            />
          </TouchableOpacity>

          <Text style={styles.TextStyle}> Get your Table </Text>
        </View>

        <View>
          <TouchableOpacity style={styles.ViewObject2}>
            <Image
              source={require("../assets/images/book.png")}
              style={styles.ImageIconStyle3}
            />
          </TouchableOpacity>

          <Text style={styles.TextStyle}> Orders </Text>
        </View>
      </View>
      {/* <View style={styles.FourthView}>
        <View>
          <TouchableOpacity
            style={styles.ViewObject3}
            // onPress={() => navigation.navigate("RecyclingHistory")}
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
  FourthView: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 100,
    marginTop: 40,
  },

  ViewBalance: {
    flexDirection: "row",
    alignItems: "center",
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

  ViewObject3: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FF988B",
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
    backgroundColor: "#CB1700",
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
  ImageIconStyle: {
    margin: 18
    
  },

  ImageIconStyle2: {
    width: 70,
    height: 70,
  },

  ImageIconStyle3: {
    width: 120,
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
    color: "#711B10",
    textAlign: "center",
    fontWeight: "bold",
  },
});
