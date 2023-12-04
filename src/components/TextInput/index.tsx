import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { width } from "../../utils/width";
type inputProps = {
  text: string;
  placeholder?: string;
  onPress?: () => void;
  secureTextEntry?: boolean;
  inputmode:any
  nama?:string
  value?:string
  onChangeText?:any
};

const InputComponent = (props: inputProps) => {
  const { text, onPress, placeholder, secureTextEntry, inputmode,nama,value, onChangeText } = props;

  return (
    <View>
     

      <Text
      className="text-lg  capitalize mb-2 self-start text-gray-500"
      >{text}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        inputMode={inputmode}
        onChangeText={onChangeText}
        className="border py-3 px-4  rounded-md border-gray-100 bg-slate-100
     focus:border-red-500 mb-2
        "
      />
    </View>
  );
};

export default InputComponent;


const styles = StyleSheet.create({
  input: {
    width: width * 0.87,
  },
});
