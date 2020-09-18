import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  BackHandler,
  Alert 
} from "react-native";
import MaterialTabs from "react-native-material-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import logo from "../../images/logo.png";
import { getIn, createUser } from "../../firebase/authFirebase";

const Home = ({ navigation }) => {
  const [tab, setTab] = useState(0);

  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [pressPass, setPressPass] = useState(false);

    useEffect(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to leave this amazing APP?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, []);

    const showPass = () => {
      if (pressPass == false) {
        setPressPass(true);
        setShowPassword(false);
      } else {
        setPressPass(false);
        setShowPassword(true);
      }
    };

    const toLogin = async (email, pass) => {
      if (!email) {
        alert("Email required");
      } else {
        try {
          await getIn(email, pass);
          navigation.navigate("InterfaceUser");
        } catch (e) {
          alert(e);
        }
      }
    };

    return (
      <View style={styles.box}>
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
            onSubmitEditing={() => toLogin(email, password)}
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              toLogin(email, password);
            }}
          >
            <Text style={styles.stylesText}> Login </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const SignUp = () => {
    const [emailSign, setEmailSign] = useState("");
    const [passwordSign, setPasswordSign] = useState("");
    const [repeatPasswordSign, setRepeatPasswordSign] = useState("");
    const [showPasswordSign, setShowPasswordSign] = useState(true);
    const [showPasswordRSign, setShowPasswordRSign] = useState(true);
    const [pressPassSign, setPressPassSign] = useState(false);
    const [pressPassRSign, setPressPassRSign] = useState(false);
    const [visible, setVisible] = useState(false);

    const showPassSign = () => {
      if (pressPassSign == false) {
        setPressPassSign(true);
        setShowPasswordSign(false);
      } else {
        setPressPassSign(false);
        setShowPasswordSign(true);
      }
    };

    const showPassRSign = () => {
      if (pressPassRSign == false) {
        setPressPassRSign(true);
        setShowPasswordRSign(false);
      } else {
        setPressPassRSign(false);
        setShowPasswordRSign(true);
      }
    };

    const saveAccount = async (email, pass, rPass) => {
      if (!email) {
        alert("Email required");
      } else {
        if (pass === rPass) {
          try {
            await createUser(email, pass);
            setVisible(true);
          } catch (e) {
            alert(e);
          }
        } else {
          alert("Password doesn't match");
        }
      }
    };

    const registre = () => {
      setVisible(false);
      setTab(0);
    };

    return (
      <View style={styles.box}>
        <StatusBar barStyle="light-content" />

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
            onChangeText={(email) => setEmailSign(email)}
            value={emailSign}
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
            secureTextEntry={showPasswordSign}
            returnKeyType="go"
            onChangeText={(password) => setPasswordSign(password)}
            value={passwordSign}
          />
          <TouchableOpacity style={styles.btneye} onPress={showPassSign}>
            <Ionicons
              name={pressPassSign == false ? "ios-eye" : "ios-eye-off"}
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
            secureTextEntry={showPasswordRSign}
            returnKeyType="go"
            onChangeText={(repeatPassword) =>
              setRepeatPasswordSign(repeatPassword)
            }
            value={repeatPasswordSign}
            onSubmitEditing={() =>
              saveAccount(emailSign, passwordSign, repeatPasswordSign)
            }
          />
          <TouchableOpacity style={styles.btneye} onPress={showPassRSign}>
            <Ionicons
              name={pressPassRSign == false ? "ios-eye" : "ios-eye-off"}
              size={28}
              color="#df5c4a"
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              saveAccount(emailSign, passwordSign, repeatPasswordSign);
            }}
          >
            <Text style={styles.stylesText}> Sing Up </Text>
          </TouchableOpacity>
        </View>
        <Snackbar
          visible={visible}
          onDismiss={registre}
          duration={1500}
          theme={{
            colors: {
              onSurface: "rgba(0, 0, 0, 0.85)",
              accent: "#df5c4a",
              surface: "white",
            },
          }}
          action={{
            label: "Success",
            onPress: () => {
              registre;
            },
          }}
        >
          Registration is complete
        </Snackbar>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.firstView}>
        <Image style={styles.logo} source={logo} />
      </View>

      <View style={styles.secondView}>{tab == 0 ? <Login /> : <SignUp />}</View>
      <MaterialTabs
        items={["Sign In", "Create Account"]}
        selectedIndex={tab}
        onChange={(tab) => setTab(tab)}
        barColor="transparent"
        indicatorColor="#C45C4C"
        activeTextColor="#df5c4a"
        inactiveTextColor="#E9E1DA"
      />
    </KeyboardAvoidingView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  firstView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    top: "10%",
  },
  secondView: {
    margin: 15,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: 170,
    height: 170,
  },
  box: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
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
    fontWeight: "bold",
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
