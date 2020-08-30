import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Modal from "react-native-modal";

const OrderList = ({ navigation }) => {
  const [tab, setTab] = useState(0);
  const [orderItem, setOrderItem] = useState([
    { name: "Patatas", price: 12 },
    { name: "Chipirones", price: 5 },
    { name: "Patatas", price: 12 },
    { name: "Chipirones", price: 5 },
    { name: "Patatas", price: 12 },
    { name: "Chipirones", price: 5 },
    { name: "Patatas", price: 12 },
    { name: "Chipirones", price: 5 },
    { name: "Patatas", price: 12 },
  ]);
  const [orderList, setOrderList] = useState([
    { bar: "McDonals", total: 44 },
    { bar: "BurgerKing", total: 33 },
  ]);
  const [modal, setModal] = useState(false);

  const openModal = (item) => {
    setModal(!modal);
  };

  const FinishOrder = () => {
    navigation.navigate("FinishOrder");
  };

  const RenderModal = () => {
    return (
      <View style={styles.modalContent}>
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
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View>
          <TouchableOpacity style={styles.button} onPress={openModal}>
            <Text style={styles.stylesText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerBottomScreen}>
        <Text style={styles.stylesTextPrice}> Order List </Text>
      </View>
      <FlatList
        style={{ backgroundColor: "white" }}
        data={orderList}
        renderItem={({ item }) => (
          <View style={styles.flatListView}>
            <Modal
              isVisible={modal}
              backdropColor={"#df5c4a"}
              animationIn={"zoomInDown"}
              animationOut={"zoomOutUp"}
              animationInTiming={1000}
              animationOutTiming={1000}
              backdropTransitionInTiming={1000}
              backdropTransitionOutTiming={1000}
            >
              <RenderModal></RenderModal>
            </Modal>

            <TouchableOpacity
              style={styles.flatOrderListView}
              onPress={() => {
                openModal(item);
              }}
            >
              <Text style={styles.textItem}>{item.bar}</Text>
              <Text style={styles.textPrice}>{item.total} €</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                openModal(item);
              }}
            >
              <Ionicons name="ios-add-circle" size={50} color="#df5c4a" />
            </TouchableOpacity> */}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  headerBottomScreen: {
    backgroundColor: "#df5c4a",
    height: "8%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    margin: 20,
    backgroundColor: "#df5c4a",
    padding: 15,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  stylesText: {
    color: "white",
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
  flatListView: {
    width: "90%",
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#B4ACA5",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatOrderListView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textItem: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  textPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B4ACA5",
  },
});
