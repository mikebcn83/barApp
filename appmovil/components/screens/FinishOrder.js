import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FinishOrder = ({ navigation }) => {
  const [tab, setTab] = useState(0);
  const [orderList, setOrderList] = useState([
    { name: "Patatas", price: 12 },
    { name: "Chipirones", price: 5 },
    
  ]);
  const [orderItem, setOrderItem] = useState(orderList);

  const FinishOrder = () => {
    navigation.navigate("FinishOrder");
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.stylesText}> Table 4 </Text>
      </View>
      <FlatList
        style={{ backgroundColor: "white" }}
        data={orderItem}
        renderItem={({ item }) => (
          <View style={styles.flatListView}>
            <View style={styles.flatListItem}>
              <View style={styles.item}>
                <Text style={styles.textItem}>
                  {item.name} · {item.price} €
                </Text>
                <Text style={styles.textPrice}>Note: Poco hecho</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                openModal(item);
              }}
            >
              <Ionicons name="ios-close" size={40} color="#df5c4a" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.bottom}>
        <Text style={styles.stylesTextPrice}> Total: 50,12€ </Text>
        <TouchableOpacity style={styles.button} onPress={FinishOrder}>
          <Text style={styles.stylesText}>Finish Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FinishOrder;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#df5c4a",
    height: "8%",
    alignItems: "center",    
    justifyContent: "center",
  },
  bottom: {
    backgroundColor: "white",
    height: "20%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#df5c4a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    padding: 15,
    paddingTop:2,
    paddingBottom:2,
  },
  stylesTextPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  stylesText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  img: {
    width: 75,
    height: 75,
  },
  item: {
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  fab: {
    width: 50,
    height: 50,
  },
  buttonFab: {
    width: 50,
    height: 50,
  },
  flatListView: {
    height: 100,
    width: "90%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#B4ACA5",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatListItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  textItem: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  textItemModal: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textPrice: {
    fontSize: 15,
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
