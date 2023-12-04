import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import ButtonComponents from "../../components/Button";
import TrashSvg from "../../components/svgComponents/TrashSvg";
import { db, auth } from "../../config";
import {
  deleteDoc,
  collection,
  doc,
  serverTimestamp,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

const AddCategory = () => {
  const [iscategory, setIsCategory] = useState<string>("");
  const [categoryList, setCategoryList] = useState([]);
  const [DataCategory, setDataCategory]= useState([]);

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
        setDataCategory(list);
      },
      (error) => {
        console.log("ini error", error);
      }
    );
    return () => {
      unsub();
    };     
  

}, []);


  const handleDelete = async (id) => {
    try {
      await deleteDoc(
        doc(db, "categories", auth.currentUser.uid, "category", id)
      );
      setDataCategory(DataCategory.filter((item) => item.id !== id));
      console.log("sukses delete");
    } catch (error) {
      console.log("ini adalah error", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(
        collection(db, "categories", auth.currentUser.uid, "category"),
        {
          ...categoryList,
          category: iscategory,
          createdAt: serverTimestamp(),
        }
      );
      setIsCategory("");
      console.log("category berhasil ditambahkan :", categoryList);
    } catch (error) {
      console.log("error menambahkan tugas", error);
    }
  };

  return (
    <View className="mt-7 px-5">
      <View>
        <TextInput
          onChangeText={(text) => setIsCategory(text)}
          value={iscategory}
          placeholder="Type new category here..."
          className="border-white bg-white py-4 px-5  rounded-md text-[18px]
        focus:border-red-500 "
        />
      </View>
      <View className="mt-5">
        <ButtonComponents onPress={handleSubmit} text="Add Category" />
      </View>

      <View className="mt-10">
        <Text className="capitalize text-2xl font-bold">
          list of your category
        </Text>
      </View>
      <View className=" flex-row gap-3 flex-wrap mt-1 ">
        {DataCategory?.map((item: any, index: number) => (
          <TouchableOpacity
            key={index}
            className={`
          ${
            index === 0 || index % 3 === 1
              ? "bg-blue-300"
              : index % 2 === 0
              ? "bg-yellow-200"
              : "bg-green-300"
          }
          px-3 py-1 rounded-lg flex-row items-center`}
          >
            <Text className="capitalize text-lg font-bold mr-2 text-gray-600">
              {item.category}
            </Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <TrashSvg width={20} height={20} color="#FF5733" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({});
