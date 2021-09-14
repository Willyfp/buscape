import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
  Alert,
  Keyboard,
} from "react-native";

import { Formik } from "formik";

import { TextInput } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import firebase from "../config/firebase";

export default function Login() {
  const navigation = useNavigation();

  const [logo] = useState(new Animated.ValueXY({ x: 250, y: 250 }));

  useEffect(() => {
    KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    KeyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 150,
        duration: 300,
      }),
      Animated.timing(logo.y, {
        toValue: 150,
        duration: 300,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 300,
        duration: 300,
      }),
      Animated.timing(logo.y, {
        toValue: 300,
        duration: 300,
      }),
    ]).start();
  }

  function loginFirebase(values) {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.senha)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        navigation.navigate("TwoFactor");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
        // ..
      });
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.viewLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
          }}
          source={require("../Assets/logo.png")}
        />
      </View>

      <View style={styles.container}>
        <Formik
          initialValues={{
            email: "",
            senha: "",
          }}
          onSubmit={(values) => {
            loginFirebase(values);
          }}
        >
          {(props) => (
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
              />

              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={props.handleChange("senha")}
                value={props.values.senha}
              />

              <TouchableOpacity
                style={styles.btnSubmit}
                onPress={props.handleSubmit}
              >
                <Text style={styles.SubmitText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnRegister}
                onPress={() => navigation.navigate("Registrar")}
              >
                <Text style={styles.textRegister}>Criar conta gratuita</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#206164",
  },

  viewLogo: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },

  input: {
    backgroundColor: "#FFF",
    width: "90%",
    marginBottom: 15,
    color: "black",
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },

  btnSubmit: {
    backgroundColor: "#07A7AD",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },

  SubmitText: {
    color: "#FFF",
    fontSize: 18,
  },

  btnRegister: {
    marginTop: 10,
  },

  textRegister: {
    color: "#FFF",
    fontSize: 18,
  },
});
