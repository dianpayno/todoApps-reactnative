import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Pressable,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import ButtonComponents from "../../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db, auth } from "../../config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  onSnapshot
} from "firebase/firestore";


// onandroid import presable from "react-native";


const AddList = ({ navigation }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [newDate, setNewDate] = useState(new Date());
  const [dateOfList, setDateOfList] = useState("");
  const [Data, setData] = useState([]);

  const data = Data.map((item) => {
    return {
      label: item.category,
      value: item.id,
    };
  })

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "categories", auth.currentUser.uid, "category"),
      (snapShot) => {
        let list = [];
        snapShot.forEach((doc) => {
          list.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setData(list);
      },
      (error) => {
        console.log("ini error", error);
      }
    );
    return () => {
      unsub();
    };     
  

}, []);


  const userId = auth.currentUser.uid;
  const [dataList, setDataList] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
  });

  const onChangeText = (key, value) => {
    setDataList({
      ...dataList,
      [key]: value,
      date: dateOfList,
    });
  };

  // ini manambahkan data ke firebase firestore dengan collection todos berdasrkan userId login 
  // dan membuat subcollection task dengan mempunyai id juga
  const handleSubmit = async () => {
    try {
      const userTasksCollection = await collection(db, `todos/${userId}/task`);
      addDoc(userTasksCollection, {
        ...dataList,
        created: serverTimestamp(),
      }).then((docRef) => {
        console.log("Tugas berhasil ditambahkan dengan ID:", docRef.id);
      });
      navigation.navigate("Home");
      setDataList({
        title: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (error) {
      console.log("error menambahkan tugas", error);
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setNewDate(currentDate);
      if (Platform.OS === "android") {
        setDateOfList(newDate.toLocaleDateString());
        toggleDatePicker();
        console.log(dateOfList);
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmDateIos = () => {
    setDateOfList(newDate.toLocaleDateString());
    toggleDatePicker();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
    <ScrollView className="px-5">
      <View className="mt-5">
        <TextInput
          value={dataList.title}
          onChangeText={(e) => onChangeText("title", e)}
          placeholder="Type title here..."
          className="border-white bg-white py-4 px-5  rounded-md text-[18px]"
        />
      </View>
      <View className="mt-5">
        <Dropdown
          style={styles.dropdown}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Category" : "Search Category.."}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            onChangeText("category", item.label);
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
      <View className="mt-5">
        {showPicker && (
          <DateTimePicker
            onChange={onChange}
            mode="date"
            display="spinner"
            value={newDate}
            style={styles.datePicker}
          />
        )}
        {showPicker && Platform.OS === "ios" ? (
          <View className="flex-row justify-center items-center gap-10">
            <View className="flex-row justify-center items-center">
              <TouchableOpacity
                className="bg-blue-500 rounded-xl"
                onPress={confirmDateIos}
              >
                <Text className="text-[18px] px-3 py-2 text-white">
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center items-center">
              <TouchableOpacity
                className="bg-red-500 rounded-xl"
                onPress={() => setShowPicker(false)}
              >
                <Text className="text-[18px] px-3 py-2 text-white">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {!showPicker && (
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              placeholder={newDate.toLocaleDateString()}
              value={dateOfList}
              editable={false}
              onPressIn={toggleDatePicker}
              className="border-white bg-white py-4 px-5  rounded-md text-[18px]"
            />
          </Pressable>
        )}
      </View>
      <View className="mt-5">
        <TextInput
          multiline={true}
          numberOfLines={4}
          value={dataList.description}
          onChangeText={(e) => onChangeText("description", e)}
          placeholder="Type description here..."
          className="border-white bg-white py-4 px-5 h-36  rounded-md text-[18px]"
        />
      </View>
      <View className="mt-5">
        <ButtonComponents onPress={handleSubmit} text="Add List" />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddList;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "white",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  datePicker: {
    height: 120,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
