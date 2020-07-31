import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [pressPass, setPressPass] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  const showPass = () => {
    if (pressPass == false) {
      setPressPass(true);
      setShowPassword(false);
    } else {
      setPressPass(false);
      setShowPassword(true);
    }
  };

  const showLog = () => {
    if (showLogo == true) {
      setShowLogo(false);
    } else {
      setShowLogo(true);
    }
  };

  const login = () => {
    this.props.navigation.navigate("InterfaceUser");
  };

  return (
    <View style={styles.container}>
      <View>
        <Ionicons
          name="ios-mail"
          size={28}
          color="#df5c4a"
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.input}
          onFocus={() => showLog}
          onEndEditing={() => showLog}
          placeholder="Email"
          placeholderTextColor="#B4ACA5"
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(email) => setEmail(email)}
          value={email}
          onSubmitEditing={() => passwordInput.focus()}
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
          onSubmitEditing={login}
          ref={(input) => (passwordInput = input)}
        />
        <TouchableOpacity style={styles.btneye} onPress={showPass}>
          <Ionicons
            name={pressPass == false ? "ios-eye" : "ios-eye-off"}
            size={28}
            color="#df5c4a"
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.stylesText}> Login </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Login;

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
