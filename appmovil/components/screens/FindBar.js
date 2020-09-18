import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { _useGetBars } from "../Api/Apis";
import firebase from "@firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

const FindBar = ({ navigation }) => {
  const [bars, loading, error] = useCollectionData(
    firebase.firestore().collection("bars"),    
  );

  const [dataBackup, setDataBackup] = useState([""]);

  const [dataSource, setDataSource] = useState([""]);

  useEffect(() => {
    setDataSource(bars);
    setDataBackup(bars);
  }, [bars]);

  const filterList = (text) => {
    let newData = "";
    newData = dataBackup.filter((item) => {
      let itemData = item.name.toLowerCase();
      let textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setDataSource(newData);
  };

  if (error) {
    return <Text>Error: {JSON.stringify(errorLinks)}</Text>;
  }
  if (loading) {
    return (
      <View style={styles.activityIndicatorView}>
        <ActivityIndicator size="large" color="#df5c4a" />
      </View>
    );
  }

  if (bars) {
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
              >
                <Text style={styles.textItem}>{item.name}</Text>
                <Text style={styles.addressItem}>{item.address}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
};

export default FindBar;

const styles = StyleSheet.create({
  firstView: {
    height: 80,
    backgroundColor: "#E34C36",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  activityIndicatorView: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
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
  },
  addressItem: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#B4ACA5",
  },
});
