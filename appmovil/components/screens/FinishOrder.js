import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { saveArray, subsPrice, cleanArray } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../firebase/authFirebase";
import { Ionicons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import { _saveOrder } from "../Api/Apis";
import { randomId } from "../UniqID";

let index;
let backupArray;

const FinishOrder = ({ route, navigation }) => {
  const [value] = useState(route.params);
  const [orderItem, setOrderItem] = useState([]);
  const [visible, setVisible] = useState(false);
  const [orderID] = useState(randomId(value.table));
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const { items, price, barName } = data;

  useEffect(() => {
    setOrderItem(items);
  }, [items, orderItem]);

  const FinishOrder = () => {
    if (price != 0) {
      _saveOrder(
        value.id,
        orderID,
        orderItem,
        getUser(),
        price,
        value.table,
        barName
      );
      setVisible(true);
    } else {
      alert("You don't have anything to order.");
    }
  };

  const itsDone = () => {
    backupArray = [];
    setVisible(false);
    dispatch(cleanArray());
    dispatch(subsPrice(price));
    navigation.navigate("InterfaceUser");
  };

  const DeleteItem = async (item) => {
    index = orderItem.indexOf(item);
    orderItem.splice(index, 1);
    console.log(orderItem)    
    dispatch(saveArray(orderItem));
    dispatch(subsPrice(item.price));
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.stylesText}> Table {value.table} </Text>
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
                <Text style={styles.textPrice}>Note: {item.note}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                DeleteItem(item);
              }}
            >
              <Ionicons name="ios-close" size={40} color="#df5c4a" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.bottom}>
        <Text style={styles.stylesTextPrice}> Total: {price} € </Text>
        <TouchableOpacity style={styles.button} onPress={FinishOrder}>
          <Text style={styles.stylesText}>Finish Order</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={itsDone}
        duration={1500}
        theme={{
          colors: {
            onSurface: "rgba(0, 0, 0, 0.85)",
            accent: "#df5c4a",
            surface: "white",
          },
        }}
        action={{
          label: "Success",
          onPress: () => {
            itsDone;
          },
        }}
      >
        Order is complete
      </Snackbar>
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
    paddingTop: 2,
    paddingBottom: 2,
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
  item: {
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
  textPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#B4ACA5",
  },
});
