import React, { useState } from "react";
import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";

export default function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordR, setShowPasswordR] = useState(true);
  const [pressPass, setPressPass] = useState(false);
  const [pressPassR, setPressPassR] = useState(false);
  const [visible, setVisible] = useState(false);

  const showPass = () => {
    if (pressPass == false) {
       setPressPass(true);
       setShowPassword(false);
      
    } else {
       setPressPass(false);
       setShowPassword(true);
    }
  };

  const showPassR = () => {
    if (pressPassR == false) {
       setPressPassR(true);
       setShowPasswordR(false);
      
    } else {
       setPressPassR(false);
       setShowPasswordR(true);
    }
  };

 const saveAccount = () => {
    console.warn("User Created");
     setVisible(true);
  };

  const registre = () => {
    console.warn("User Created");
     setVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View>
        <Ionicons
          name="ios-mail"
          size={28}
          color="#df5c4a"
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#B4ACA5"
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
      </View>

      <View>
        <Ionicons
          name="ios-lock"
          size={28}
          color="#df5c4a"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#B4ACA5"
          secureTextEntry={showPassword}
          returnKeyType="go"
          onChangeText={(password) => setPassword(password)}
          value={password}          
        />
        <TouchableOpacity
          style={styles.btneye}
          onPress={showPass}
        >
          <Ionicons
            name={pressPass == false ? "ios-eye" : "ios-eye-off"}
            size={28}
            color="#df5c4a"
          />
        </TouchableOpacity>
      </View>
      <View>
        <Ionicons
          name="ios-lock"
          size={28}
          color="#df5c4a"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Repeat Password"
          placeholderTextColor="#B4ACA5"
          secureTextEntry={showPasswordR}
          returnKeyType="go"
          onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
          value={repeatPassword}
          onSubmitEditing={saveAccount}          
        />
        <TouchableOpacity
          style={styles.btneye}
          onPress={showPassR}
        >
          <Ionicons
            name={pressPassR == false ? "ios-eye" : "ios-eye-off"}
            size={28}
            color="#df5c4a"
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={saveAccount}>
          <Text style={styles.stylesText}> Sing Up </Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={registre}
        action={{
          label: "Done",
          onPress:() => { registre }
        }}
      >
        {" "}
        Registration is complete.
      </Snackbar>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inputIcon: {
    position: "absolute",
    padding: 6,
    left: 10,
  },
  btneye: {
    position: "absolute",
    padding: 6,
    right: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#C9C9C4",
    width: 300,
    height: 40,
    backgroundColor: "transparent",
    marginBottom: 20,
    paddingHorizontal: 50,
    color: "#000000",
  },
  stylesText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#df5c4a",
    width: 150,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});