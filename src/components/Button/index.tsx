import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'

type buttonProps = {
  text: string
  onPress?: () => void
}


const ButtonComponents= (porps: buttonProps) => {
    const {text, onPress} = porps
  return (
    <TouchableOpacity
      onPress={onPress}
      className='bg-red-500 p-2 px-32 rounded-lg'
      >
      <Text
      className='font-bold text-white text-lg capitalize text-center'
      >{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonComponents

