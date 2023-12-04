import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CheckBox from "react-native-check-box";
import { useState } from "react";
import CalendarSvg from "../svgComponents/CalendarSvg";
import TrashSvg from "../svgComponents/TrashSvg";


type Props = {
  title: string;
  category: string;
  description: string;
  date: string;
  status?: string;
  index?: number;
  id: string;
  delete: (id: string) => void;
  details:(id: string) => void
};
const CardList = (props: Props) => {
  const {
    title,
    category,
    description,
    date,
    status,
    index,
    id,
    details: handleDetails,
    delete: handleDelete,
  } = props;
  const [isChecked, setChecked] = useState(false);
 

  return (
    <View className="px-5 mt-3">
      <TouchableOpacity
      onPress={()=>handleDetails(id)}>
        <View
          className={`
      ${
        isChecked
          ? "bg-green-300"
          : index % 2 === 0
          ? "bg-blue-100"
          : "bg-yellow-100"
      }
       rounded-md py-3 px-5`}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text
                className={`
             ${isChecked ? "line-through" : null}
            text-xl font-bold capitalize`}
              >
                {category} -
              </Text>
              <Text
                className={`
             ${isChecked ? "line-through" : null}
            text-xl font-bold capitalize ml-1`}
              >
                {title}
              </Text>
            </View>

            <View
              className={` 
          ${
            isChecked
              ? "bg-green-400"
              : index % 2 === 0
              ? "bg-blue-300"
              : "bg-yellow-300"
          }
          rounded-lg px-3 py-1`}
            >
              <Text
                className={`
             ${isChecked ? "line-through" : null}
            text-lg font-bold text-white capitalize`}
              >
                {category}
              </Text>
            </View>
          </View>

          <View className="py-3 flex-row justify-between items-center">
            <View className="w-3/4">
              <Text
                className={`
            ${isChecked ? "line-through" : null}
            text-[17px] text-gray-700 `}
              >
                {description}
              </Text>
            </View>
            <View>
              <CheckBox
                className="p-5 flex-1 "
                isChecked={isChecked}
                onClick={() => setChecked(!isChecked)}
                checkedCheckBoxColor="#2E8B57"
                uncheckedCheckBoxColor="#FF5733"
                style={{
                  borderRadius: 100,
                }}
              />
            </View>
          </View>

          <View className="flex-row items-center">
            {isChecked ? (
              <View className="flex-row items-center">
                <TouchableOpacity onPress={() => handleDelete(id)}>
                  <TrashSvg width={20} height={20} color="#FF5733" />
                </TouchableOpacity>
                <Text className="text-[17px] ml-2 text-red-500 capitalize">
                  yeay!! is done
                </Text>
              </View>
            ) : (
              <View className="flex-row items-center">
                <CalendarSvg width={20} height={20} color="#FF5733" />
                <Text className="text-[17px] ml-2 text-gray-500 capitalize">
                  {date}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardList;
