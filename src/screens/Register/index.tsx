import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import InputComponent from "../../components/TextInput";
import ButtonComponents from "../../components/Button";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../config";

const Register = ({ navigation }) => {
  const [userData, setUserData] = useState({
    fullname: "",
    alamat: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserDataChange = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const submitData = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const response = await setDoc(doc(db, "users", res.user.uid), {
        ...userData,
        createdAt: serverTimestamp(),
      });
      navigation.navigate("Login");
      console.log("data submitted");
    } catch (error) {
      console.log("ini adalah error", error);
    }
  };

  return (
   
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >   
    <StatusBar style="dark" />
     <SafeAreaView className="flex-1 bg-white">
        <View className=" bg-white justify-center items-center">
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-232.jpg?size=626&ext=jpg&ga=GA1.1.714462566.1697981532&semt=ais",
            }}
            className="w-48 h-48"
          />
          <View className="self-start px-6 mb-2">
            <Text className="text-3xl capitalize font-bold self-start text-gray-600">
              register
            </Text>
            <View className="mt-5">
              <InputComponent
                onChangeText={(text) => handleUserDataChange("fullname", text)}
                text="fullname"
                placeholder="Type your name.."
                inputmode="text"
              />
              <InputComponent
                onChangeText={(text) => handleUserDataChange("alamat", text)}
                text="alamat"
                placeholder="Type your alamat.."
                inputmode="text"
              />
              <InputComponent
                onChangeText={(text) => setEmail(text)}
                text="email"
                placeholder="Type your email.."
                inputmode="email"
              />

              <InputComponent
                onChangeText={(text) => setPassword(text)}
                text="Password"
                secureTextEntry={true}
                inputmode="password"
              />
              <View className="mt-3">
                <ButtonComponents onPress={submitData} text="Register" />
              </View>
              <View className="flex-row mt-2 justify-center">
                <Text className="text-center">Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  <Text className="ml-1 text-red-500">Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
    
        </SafeAreaView>
    </KeyboardAvoidingView>
   
  );
};

export default Register;

const styles = StyleSheet.create({});
