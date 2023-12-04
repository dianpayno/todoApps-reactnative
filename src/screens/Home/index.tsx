import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import CardList from "../../components/Card";
import { ListRender, category } from "../../utils/dummydata";
import { db, auth } from "../../config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const status = [
  { label: "Done", value: 1 },
  { label: "Not Done", value: 2 },
];

const Home = ({ navigation }: { navigation: any }) => {
  const [nama, setNama] = useState("");
  const [idUser, setIdUser] = useState("");
  const [dropdwonValue, setDropdwonValue] = useState("");
  const [statusValue, setStatusValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState("");

  const [Data, setData] = useState([]);

  const data = Data.map((item) => {
    return {
      label: item.category,
      value: item.category,

    };
  });

  const newData =[
    ...data,{
      label: "Show All",
      value: "Show All",

    }
  ]

  console.log(newData);
  

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

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setNama(docSnap.data().fullname);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.log("ini adalah error", error);
      }
    };
    getCurrentUser();
  }, []);

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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", auth.currentUser.uid, "task", id));
      setDataList(dataList.filter((item) => item.id !== id));
      console.log("sukses delete");
    } catch (error) {
      console.log("ini adalah error", error);
    }
  };

  const handleDetails = (id) => {
    navigation.navigate("Detail List", { id: id });
  };

  const dataFiltered = dataList.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  const categoryFiltered = dataList.filter((item) => {
    return item.category === dropdwonValue;
  });

  console.log("dropdown", dropdwonValue);

  console.log("categoryFiltered", categoryFiltered);

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{ flex: 1, flexDirection: "row" }}
          className="py-5 justify-between px-7 items-center relative"
        >
          <View>
            <Text className="text-4xl font-bold">
              Hallo, {nama.substring(0, 5)}
            </Text>
            {dataList.length === 0 ? (
              <Text className="text-blue-500 text-[18px] capitalize">
                no list
              </Text>
            ) : (
              <Text className="text-red-500 text-[18px] capitalize">
                you have {dataList.length} lists
              </Text>
            )}
          </View>
          <View className="h-[70px] w-[70px] bg-red-400 rounded-full justify-center items-center">
            <Image
              className="w-16 h-16 rounded-full "
              source={{
                uri: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&ga=GA1.1.714462566.1697981532&semt=ais",
              }}
            />
          </View>

          {/* <TouchableOpacity
            className="absolute top-2 left-[180px] bg-slate-300 p-1 py-1
          rounded-tl-xl rounded-br-xl rounded-tr-xl flex-row"
          >
            <TouchableOpacity className="w-8 h-8 rounded-full bg-blue-500  justify-center items-center ">
              <Text className="text-white font-extrabold text-xl">T</Text>
            </TouchableOpacity>
            <View className="w-8 h-8 rounded-full -ml-3 bg-green-500 justify-center items-center ">
              <Text className="text-white font-extrabold text-xl">D</Text>
            </View>
            <View className="w-8 h-8 rounded-full -ml-3 bg-red-500 justify-center items-center ">
              <Text className="text-white font-extrabold text-xl">A</Text>
            </View>
          </TouchableOpacity> */}
        </View>

        <View className="px-5">
          <TextInput
            placeholder="Type here to search..."
            onChangeText={(e) => setSearch(e)}
            className="border-white bg-white py-4 px-5  rounded-md text-[18px]
        focus:border-red-500 "
          />
        </View>

        <View className="flex-row px-5 mt-3 mb-7 justify-center items-center">
          <View className="w-1/2 mr-1">
            <Dropdown
              style={styles.dropdown}
              data={newData}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Category" : "Search Category.."}
              value={dropdwonValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setDropdwonValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <View className="w-1/2">
            <Dropdown
              style={styles.dropdown}
              data={status}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Status" : "..."}
              value={statusValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setStatusValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
        <View className="mb-8">
          {dropdwonValue === ""
            ? dataFiltered.map((item: any, index: number) => {
                return (
                  <CardList
                    index={index}
                    id={item.id}
                    key={item.id}
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    date={item.date}
                    status={item.status}
                    delete={handleDelete}
                    details={handleDetails}
                  />
                );
              })
            : categoryFiltered.map((item: any, index: number) => {
                return (
                  <CardList
                    index={index}
                    id={item.id}
                    key={item.id}
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    date={item.date}
                    status={item.status}
                    delete={handleDelete}
                    details={handleDetails}
                  />
                );
              })}
              {
                dropdwonValue === "Show All" &&
                dataFiltered.map((item: any, index: number) => {
                  return (
                    <CardList
                      index={index}
                      id={item.id}
                      key={item.id}
                      title={item.title}
                      category={item.category}
                      description={item.description}
                      date={item.date}
                      status={item.status}
                      delete={handleDelete}
                      details={handleDetails}
                    />
                  );
                })}
              
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "white",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});
