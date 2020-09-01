import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
} from "react-native";
import MaterialTabs from "react-native-material-tabs";
import bravas from "../assets/images/bravas.png";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

const ItemList = ({ navigation }) => {
  const [tab, setTab] = useState(0);
  const [entrantes, setEntrantes] = useState([
    { name: "Patatas", price: 12 },
    { name: "Chipirones", price: 5 },
  ]);
  const [principal, setPrincipal] = useState([
    { name: "Bistec", price: 7 },
    { name: "Potaje", price: 8 },
  ]);
  const [postres, setPostres] = useState([
    { name: "Tarta", price: 4 },
    { name: "Helado", price: 5 },
  ]);
  const [bebidas, setBebidas] = useState([
    { name: "Cerveza", price: 3 },
    { name: "Vino", price: 4 },
  ]);
  const [orderItem, setOrderItem] = useState(entrantes);
  const [modal, setModal] = useState(false);
  const [textInputModal, setTextInputModal] = useState(false);
  const [nameItem, setNameItem] = useState("");
  const [priceItem, setPriceItem] = useState("");

  const openModal = (item) => {
    setModal(!modal);
    setNameItem(item.name);
    setPriceItem(item.price);
    setTextInputModal(false);
  };

  const openTextInput = () => {
    setTextInputModal(!textInputModal);
  };

  const RenderModal = () => {
    return (
      <View style={styles.modalContent}>
        <View style={styles.modalItems}>
          <Text style={styles.textItemModal}>{nameItem} · </Text>
          <Text style={styles.textItemModal}>{priceItem} € </Text>
        </View>
        <Text>Ingredientes: Patata con salsa Bravas y picante </Text>
        {textInputModal == false ? null : (
          <TextInput
            style={styles.input}
            placeholder="Add note for the Cook"
            placeholderTextColor="#B4ACA5"
            editable
            maxLength={50}
            multiline
            numberOfLines={3}
          />
        )}

        <View style={styles.modalButtonsView}>
          <TouchableOpacity
            style={styles.modalButtonStyle}
            onPress={() => {
              openModal("");
            }}
          >
            <Text style={styles.stylesTextModalButton}>Cancel</Text>
          </TouchableOpacity>
          {textInputModal == true ? null : (
            <TouchableOpacity
              style={styles.modalButtonStyle}
              onPress={openTextInput}
            >
              <Text style={styles.stylesTextModalButton}>Add note</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.modalButtonStyle}
            onPress={() => {
              openModal("");
            }}
          >
            <Text style={styles.stylesTextModalButton}>Confirm Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const showTab = (tab) => {
    setTab(tab);

    switch (tab) {
      case 0:
        setOrderItem(entrantes);
        break;
      case 1:
        setOrderItem(principal);
        break;
      case 2:
        setOrderItem(postres);
        break;
      case 3:
        setOrderItem(bebidas);
        break;
    }
  };

  const FinishOrder = () => {
    navigation.navigate("FinishOrder");
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerBottomScreen}>
        <Text style={styles.stylesTextPrice}> Table 4 </Text>
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
              <Image style={styles.img} source={bravas} />
              <View style={styles.item}>
                <Text style={styles.textItem}>{item.name}</Text>
                <Text style={styles.textPrice}>{item.price} €</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                openModal(item);
              }}
            >
              <Ionicons name="ios-add-circle" size={50} color="#df5c4a" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.headerBottomScreen}>
        <TouchableOpacity style={styles.button} onPress={FinishOrder}>
          <Text style={styles.stylesText}>Finish Order</Text>
        </TouchableOpacity>
        <Text style={styles.stylesTextPrice}> Total: 50,12€ </Text>
      </View>
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({
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
    paddingTop:2,
    paddingBottom:2,
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
    fontSize: 20,
    fontWeight: "bold",
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
