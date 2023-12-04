import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splash from "../screens/Splash";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import AddList from "../screens/AddList";
import DetailList from "../screens/DetailList";
import AddCategory from "../screens/AddCategory";
import { Text, View } from "react-native";
import CategorySvg from "../components/svgComponents/CategorySvg";
import ClipBoardList from "../components/svgComponents/ClipBoardList";
import ListSvg from "../components/svgComponents/ListSvg";
import { TouchableOpacity, SafeAreaView } from "react-native";
import {db, auth} from "../config"
import { onSnapshot, collection } from "firebase/firestore";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTab = ({ navigation }: { navigation: any }) => {
  const [isActive, setIsActive] = useState(true);
  const [isAddList, setIsAddList] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "todos", auth.currentUser.uid, "task"),
      (snapShot) => {
        let list = [];
        snapShot.forEach((doc) => {
          list.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setDataList(list);
      },
      (error) => {
        console.log("ini error", error);
      }
    );
    return () => {
      unsub();
    };
  }, []);


  const handleHome = () => {
    setIsActive(true);
    setIsAddList(false);
    setIsCategory(false);
    navigation.navigate("Home");
  };

  const handleAddList = () => {
    setIsAddList(true);
    setIsActive(false);
    setIsCategory(false);
    navigation.navigate("Add List");
  };

  const handleCategory = () => {
    setIsCategory(true);
    setIsActive(false);
    setIsAddList(false);
    navigation.navigate("Add Category");
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "green",
        tabBarStyle: {
          paddingTop: 15,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={handleHome}
              className="justify-center items-center relative"
            >
              <ClipBoardList
                color={`${isActive ? "#DC2626" : "gray"}`}
                width={30}
                height={30}
              />
              <Text
                className={`${isActive ? "text-red-500" : "text-gray-500"}`}
              >
                Clipboard
              </Text>
              {
                dataList.length > 0 &&
              <TouchableOpacity
                className={`${
                  isActive ? "bg-green-500" : "bg-red-500"
                } w-7 h-7 rounded-full absolute -top-4 right-0 justify-center items-center`}
              >
                <Text className="text-white font-semibold">{dataList.length}</Text>
              </TouchableOpacity>
              }
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Add List"
        component={AddList}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={handleAddList}
              className="justify-center items-center"
            >
              <ListSvg color={`${isAddList ? "#DC2626" : "gray"}`} width={30} height={30} />
              <Text className={`${isAddList ? "text-red-500" : "gray"}`}>Add List</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Add Category"
        component={AddCategory}
        options={{
          headerShown: true,
          headerTitle: "Add Category",
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={handleCategory}
              className="justify-center items-center"
            >
              {isCategory ? (
                <View className="justify-center items-center">
                  <CategorySvg color="#DC2626" width={30} height={30} />
                  <Text className="text-red-500">Add Category</Text>
                </View>
              ) : (
                <View className="justify-center items-center">
                  <CategorySvg color="gray" width={30} height={30} />
                  <Text className="text-gray-500">Add Category</Text>
                </View>
              )}
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
     
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
     
       <Stack.Screen
        name="Mytab"
        component={MyTab}
        options={{ 
          headerShown: false }}
      />
      <Stack.Screen
        name="Detail List"
        component={DetailList}
        options={{ headerShown: true }}
      />
     
    </Stack.Navigator>
  );
};

export default Router;
