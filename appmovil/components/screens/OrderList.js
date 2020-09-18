import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import firebase from "@firebase/app";
import { getUser } from "../../firebase/authFirebase";
import { useSelector } from "react-redux";

const OrderList = () => {
  const data = useSelector((state) => state);
  const { orders } = data;
  const [orderItem, setOrderItem] = useState([""]);
  const [orderList, setOrderList] = useState(null);
  const [modal, setModal] = useState(false);


  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  const getUserMenu = async (id) => {
    const snapshot = await firebase
      .firestore()
      .collection(`/clients/${getUser()}/orders/${id}/orderItems`)
      .get();
      setOrderItem(snapshot.docs.map((doc) => doc.data()))
  };

  const openModal = (id) => {
    getUserMenu(id)
    setModal(!modal);       
  };



  const RenderModal = () => {
    return (orderItem ? (
      <View style={styles.modalContent}>
        <FlatList
          style={{ backgroundColor: "white" }}
          data={orderItem}
          renderItem={({ item }) => (
            <View style={styles.flatListView}>
              <Text style={styles.textItem}>{item.name}</Text>
              <Text style={styles.textPrice}>{item.price} €</Text>
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
    ) : (
      <View style={styles.activityIndicatorView}>
        <ActivityIndicator size="large" color="#df5c4a" />
      </View>
    ));
  };

  return orderList != null ? (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerBottomScreen}>
        <Text style={styles.stylesTextPrice}> Orders List </Text>
      </View>
      <FlatList
        style={{ backgroundColor: "white" }}
        data={orderList}
        renderItem={({ item }) => (
          <View style={styles.flatListView}>
            <Modal
              isVisible={modal}
              backdropColor={"#df5c4a"}
              animationInTiming={1500}
              animationOutTiming={1500}
              backdropTransitionInTiming={1500}
              backdropTransitionOutTiming={1500}
            >
              <RenderModal></RenderModal>
            </Modal>

            <TouchableOpacity
              style={styles.flatOrderListView}
              onPress={() => {
                openModal(item.id);
              }}
            >
              <Text style={styles.textItem}>{item.bar_name}</Text>
              <Text style={styles.textPrice}>Total Bill:   {item.total} €</Text>
            </TouchableOpacity>
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

export default OrderList;

const styles = StyleSheet.create({
  headerBottomScreen: {
    backgroundColor: "#df5c4a",
    height: "8%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  activityIndicatorView: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
  item: {
    justifyContent: "space-between",
    alignContent: "center",
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
