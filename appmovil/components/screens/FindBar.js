import React, { useState } from "react";
import { Text, View, TextInput, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Card } from "react-native-paper";

const FindBar = ({ navigation }) => {

  const [dataSource, setDataSource] = useState([
    "Bar Tito",
    "Bar Tolo",
    "Pepe's Bar",
    "McDonals",
    "Casa Fuster",
  ]);
  const [dataBackup, setDataBackup] = useState([
    "Bar Tito",
    "Bar Tolo",
    "Pepe's Bar",
    "McDonals",
    "Casa Fuster",
  ]);

  const filterList = (text) => {
    let newData = dataBackup;
    newData = dataBackup.filter((item) => {
      let itemData = item.toLowerCase();
      let textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setDataSource(newData);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 80,
          backgroundColor: "#E34C36",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            height: 50,
            backgroundColor: "white",
            flexDirection: "row",
            padding: 5,
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Icon
            name={"ios-search"}
            style={{ fontSize: 25 }}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#C9C9C4"
            style={{ fontSize: 25, paddingLeft: 15, width: 350 }}
            onChangeText={(text) => {
              filterList(text);
            }}
          />
        </View>
      </View>
      <FlatList
        style={{ backgroundColor: "#FF988B" }}
        data={dataSource}
        renderItem={({ item }) => (
          <View>
            <Card
              style={[
                {
                  borderRadius: 10,
                  borderBottomWidth: 2,
                  backgroundColor: "white",
                  height: 70,
                  margin: 5,
                  justifyContent: "space-evenly",
                },
              ]}
              // onPress={() => }
            >
              <Card.Content
                style={[
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {item}
                </Text>                
              </Card.Content>
            </Card>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default FindBar;
