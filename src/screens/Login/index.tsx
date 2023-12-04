import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
  
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import InputComponent from "../../components/TextInput";
import ButtonComponents from "../../components/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleTextEmail = (text) => {
    setEmail(text);
  };
  const handleTextPassword = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
    
        navigation.navigate("Mytab");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(true);
      });
    
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
     
    >
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white justify-center items-center">
      <StatusBar style="dark" />
      <Image
        source={{
          uri: "https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-232.jpg?size=626&ext=jpg&ga=GA1.1.714462566.1697981532&semt=ais",
        }}
        className="w-60 h-60"
      />
      {error &&
      <View>
        <Text className="text-red-500 capitalize">wrong email or password</Text>
      </View>
      }
      <View className="mb-10 self-start px-6">
        <Text className="text-3xl font-bold self-start text-gray-600">
          Login
        </Text>
        <View className="mt-5">
          <InputComponent
            onChangeText={handleTextEmail}
            text="Email"
            placeholder="Email"
            inputmode="email"
          />
          <InputComponent
          onChangeText={handleTextPassword}
            text="Password"
            secureTextEntry={true}
            inputmode="password"
          />
          <View className="mt-3">
            <ButtonComponents
            onPress={handleLogin}
            text="Login" />
          </View>
          <View className="flex-row mt-2 justify-center">
            <Text className="text-center">Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text className="ml-1 text-red-500">Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
    </SafeAreaView>
    
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({});
