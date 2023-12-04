import { StyleSheet, Text, View } from "react-native";
import React,{useEffect, useState} from "react";
import { db, auth } from "../../config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import CalendarSvg from "../../components/svgComponents/CalendarSvg";


const DetailList = ({ route}: { route: any}) => {
 const {id} = route.params
 const [dataDetails, setDataDetails] = useState<any>({})

 
  
  useEffect(() => {
    const getData = async () => {
      try {
        const list =[]
        const querySnapshot = await getDocs(
          collection(db, "todos", auth.currentUser.uid, "task")
        );
        querySnapshot.forEach((doc) => {
          list.push({
            ...doc.data(),
            id: doc.id,
          })
        });
        const data = list.filter((item) => item.id === id)
        setDataDetails(data[0])
        console.log("Document data by id data:", dataDetails);
      } catch (error) {
        console.log("ini adalah error", error);
      }
    };
    getData();
  }, []);

  return (
    <View className="px-5 relative">
      <View className="bg-blue-300 mt-3 rounded-md px-3 py-5">
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-bold ml-1 text-gray-700 capitalize">
          {dataDetails.title}
          </Text>
          <View className="bg-red-500 px-3 py-1 rounded-lg">
            <Text className="text-xl font-bold text-white capitalize">
              {dataDetails.category}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <CalendarSvg width={20} height={20} color="#FF5733" />
          <Text className="text-[17px] ml-2 text-gray-500 capitalize">
           {dataDetails.date}
          </Text>
        </View>
        <View className="py-7">
          <Text className="text-[20px] text-justify px-5 text-gray-700">
           {dataDetails.description}
          </Text>
        </View>
      </View>
     
    </View>
  );
};

export default DetailList;

const styles = StyleSheet.create({});
