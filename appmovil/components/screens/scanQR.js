import React, { useState, useEffect } from "react";
import { cleanArray, subsPrice } from "../../redux/actions/actions";
import { Text, View, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import { _getBarName } from "../Api/Apis";

const ScanQR = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const data = useSelector((state) => state);
  const { price } = data;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let qrCode = data.split("/");
    if (qrCode[2] === "www.barapp.com") {
      navigation.navigate("ItemList", {
        id: qrCode[3],
        table: qrCode[4],
      });
      dispatch(cleanArray());
      dispatch(subsPrice(price));
      _getBarName(qrCode[3], dispatch);
    } else {
      alert("This is not a BarApp Qr Code");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};
export default ScanQR;
