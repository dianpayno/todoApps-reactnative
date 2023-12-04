import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import ButtonComponents from '../../components/Button'


const Splash = ({navigation}) => {
  return (
    
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Image 
      className="w-40 h-40"
      source={{uri:'https://img.freepik.com/free-vector/hand-drawn-business-planning_52683-76248.jpg?size=626&ext=jpg&ga=GA1.1.714462566.1697981532&semt=ais'}} />
      <View className="flex-row items-baseline gap-3 ">
      <Text className="capitalize text-7xl font-bold ">ways</Text>
      <View className="flex-row">
      <Text className="capitalize text-7xl font-bold text-[#B82020] ms-">to</Text>
      <Text className="capitalize text-7xl font-bold text-[#FF5555]">do</Text>
      </View>
      </View>

      <Text className="text-center mt-3">
        Write your activity and finish your activity.
      </Text>
      <Text>
      Fast, Simple and Easy to Use
      </Text>
      <View
      className='mt-40  '>
      <ButtonComponents text="login"
      onPress={() => {
      navigation.navigate('Login')
      }}
      />
      <View className='mt-3'>

      <ButtonComponents text="register"
      onPress={() => {
        navigation.navigate('Register')
      }}
      />
      </View>
      </View>
     
      <StatusBar style="auto" />
      </SafeAreaView>
 
  )
}

export default Splash

const styles = StyleSheet.create({

})