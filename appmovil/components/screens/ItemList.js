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
  ActivityIndicator
} from "react-native";
import MaterialTabs from "react-native-material-tabs";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { _useLoadMenu } from "../Api/Apis";
import { useSelector, useDispatch } from "react-redux";
import { saveArray, sumPrice} from "../../redux/actions/actions";

let itemArray = [];

const ItemList = ({ route, navigation }) => {
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
  const [modal, setModal] = useState(false);
  const [nameItem, setNameItem] = useState("");
  const [priceItem, setPriceItem] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [noteItem, setNoteItem] = useState("");
  const [textInputModal, setTextInputModal] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const { items, price } = data;

  useEffect(() => {
    setStarters(getStarters);
    setMain(getMain);
    setDesserts(getDesserts);
    setDrinks(getDrinks);
    setOrderItem(starters);
    itemArray = items;
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

  const openModal = (item) => {
    setModal(!modal);
    setNameItem(item.name);
    setPriceItem(item.price);
    setIngredients(item.ingredients);
    setNoteItem("");
    setTextInputModal(false);
  };

  const openTextInput = () => {
    setTextInputModal(!textInputModal);
  };

  const saveOrderList = () => {
    itemArray.push({
      name: nameItem,
      price: priceItem,
      note: noteItem,
      done: false,
    });
    dispatch(saveArray(itemArray));
    dispatch(sumPrice(priceItem));
    openModal("");
  };

  const FinishOrder = () => {
    if (price === 0) {
      alert("You have not select any plate");
    } else {
      navigation.navigate("FinishOrder", {
        table: value.table,
        id: value.id,
      });
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
              <Modal
                isVisible={modal}
                backdropColor={"#df5c4a"}
                animationIn={"zoomInDown"}
                animationOut={"zoomOutUp"}
                animationInTiming={500}
                animationOutTiming={500}
                backdropTransitionInTiming={500}
                backdropTransitionOutTiming={500}
              >
                <View style={styles.modalContent}>
                  <View style={styles.modalItems}>
                    <Text style={styles.textItemModal}>{nameItem} · </Text>
                    <Text style={styles.textItemModal}>{priceItem} € </Text>
                  </View>
                  {ingredients == undefined ? null : (
                    <Text style={styles.textIngredient}>
                      Ingredientes: {ingredients}{" "}
                    </Text>
                  )}
                  {textInputModal == false ? null : (
                    <TextInput
                      style={styles.input}
                      placeholder="Add note for the Cook"
                      placeholderTextColor="#B4ACA5"
                      maxLength={50}
                      multiline
                      numberOfLines={3}
                      onChangeText={(text) => setNoteItem(text)}
                      onSubmitEditing={saveOrderList}
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
                        <Text style={styles.stylesTextModalButton}>
                          Add Note
                        </Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={styles.modalButtonStyle}
                      onPress={saveOrderList}
                    >
                      <Text style={styles.stylesTextModalButton}>
                        Select Item
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Image
                style={styles.img}
                source={{
                  uri: item.imageUri,
                }}
              />
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
          <Text style={styles.stylesText}>Confirm Order</Text>
        </TouchableOpacity>
        <Text style={styles.stylesTextPrice}> Total: {price} € </Text>
      </View>
    </View>
  ) : (
    <View style={styles.activityIndicatorView}>
      <ActivityIndicator size="large" color="#df5c4a" />
    </View>
  );
};

export default ItemList;

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
