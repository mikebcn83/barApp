import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const FindBar = ({ navigation }) => {
  const [dataSource, setDataSource] = useState([
    "Bar Tito",
    "Bar Tolo",
    "Pepe's Bar",
    "McDonals",
    "Casa Fuster",
  ]);
  const [dataBackup] = useState([
    "Bar Tito",
    "Bar Tolo",
    "Pepe's Bar",
    "McDonals",
    "Casa Fuster",
  ]);

  const filterList = (text) => {
    
    let newData = "";
    newData = dataBackup.filter((item) => {
      let itemData = item.toLowerCase();
      let textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setDataSource(newData);
  };

  const ItemList = () => {
    navigation.navigate("ItemList");
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.firstView}>
        <View style={styles.findBar}>
          <Icon name={"ios-search"} style={{ fontSize: 25 }} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#C9C9C4"
            style={styles.stylesText}
            onChangeText={(text) => {
              filterList(text);
            }}
          />
        </View>
      </View>
      <FlatList
        style={{ backgroundColor: "white" }}
        data={dataSource}
        renderItem={({ item }) => (
          <View style={styles.flatListView}>
            <TouchableOpacity
              style={styles.flatOrderListView}
              onPress={ItemList}
            >
              <Text style={styles.textItem}>{item}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default FindBar;

const styles = StyleSheet.create({
  firstView: {
    height: 80,
    backgroundColor: "#E34C36",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  findBar: {
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    borderRadius: 10,
  },
  stylesText: {
    fontSize: 25,
    paddingLeft: 15,
    width: "90%",
  },
  flatListView: {
    width: "90%",
    height: 65,
    borderBottomWidth: 1,
    borderBottomColor: "#df5c4a",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  }
});
