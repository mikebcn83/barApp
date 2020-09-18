import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import MaterialTabs from "react-native-material-tabs";
import bravas from "../assets/images/bravas.png";
import { _useLoadMenu } from "../Api/Apis";


const BarMenus = ({ route, navigation }) => {
  const [value] = useState(route.params);
  const getStarters = _useLoadMenu(value, "starters");
  const getMain = _useLoadMenu(value, "main");
  const getDesserts = _useLoadMenu(value, "desserts");
  const getDrinks = _useLoadMenu(value, "drinks");
  const [tab, setTab] = useState(0);
  const [starters, setStarters] = useState([""]);
  const [main, setMain] = useState([""]);
  const [desserts, setDesserts] = useState([""]);
  const [drinks, setDrinks] = useState([""]);
  const [orderItem, setOrderItem] = useState("");

  useEffect(() => {
    setStarters(getStarters);
    setMain(getMain);
    setDesserts(getDesserts);
    setDrinks(getDrinks);
    setOrderItem(starters);
  }, [getStarters, getDrinks]);

  const showTab = (tab) => {
    setTab(tab);

    switch (tab) {
      case 0:
        setOrderItem(starters);
        break;
      case 1:
        setOrderItem(main);
        break;
      case 2:
        setOrderItem(desserts);
        break;
      case 3:
        setOrderItem(drinks);
        break;
    }
  };

  return starters ? (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerBottomScreen}>
        <Text style={styles.stylesTextPrice}> Table {value.table} </Text>
      </View>
      <View style={styles.firstView}>
        <MaterialTabs
          items={["Starters", "Main Dishes", "Desserts", "Drinks"]}
          textStyle={{ fontSize: 13 }}
          selectedIndex={tab}
          onChange={showTab}
          barColor="transparent"
          indicatorColor="#df5c4a"
          activeTextColor="#df5c4a"
          inactiveTextColor="black"
        />
      </View>

      <FlatList
        style={{ backgroundColor: "white" }}
        data={orderItem}
        renderItem={({ item }) => (
          <View style={styles.flatListView}>
            <View style={styles.pictureItem}>              
              <Image style={styles.img} source={bravas} />
              <View style={styles.item}>
                <Text style={styles.textItem}>{item.name}</Text>
                <Text style={styles.textPrice}>{item.price} €</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />      
    </View>
  ) : (
    <View style={styles.activityIndicatorView}>
      <ActivityIndicator size="large" color="#df5c4a" />
    </View>
  );
};

export default BarMenus;

const styles = StyleSheet.create({
  activityIndicatorView: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
  headerBottomScreen: {
    backgroundColor: "#df5c4a",
    height: "8%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  stylesText: {
    color: "#df5c4a",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: "#df5c4a",
    width: "95%",
    alignSelf: "center",
    padding: 10,
  },
  modalItems: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  modalButtonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  modalButtonStyle: {
    backgroundColor: "#df5c4a",
    borderRadius: 15,
    padding: 7,
  },
  stylesTextModalButton: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  stylesTextPrice: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  img: {
    width: 70,
    height: 70,
  },
  item: {
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  flatListView: {
    width: "90%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#B4ACA5",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstView: {
    height: 80,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#B4ACA5",
  },
  pictureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  textItem: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  textItemModal: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textIngredient: {
    fontSize: 15,
  },
  textPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B4ACA5",
  },
  input: {
    marginTop: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: "#C9C9C4",
    color: "#000000",
  },
});
