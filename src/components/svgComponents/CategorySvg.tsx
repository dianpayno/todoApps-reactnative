import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, {Path} from 'react-native-svg';

type CategorySvgProps = {
    width?: number
    height?: number
    color: string
}
const CategorySvg = (props: CategorySvgProps) => {
    const {width, height, color} = props
  return (
    <Svg width={width} height={height} viewBox="0 0 29 29" fill={color}>
    <Path d="M14.0952 2.34924L7.63492 12.9207H20.5556L14.0952 2.34924Z" fill={color}/>
    <Path d="M20.5556 25.8413C23.4748 25.8413 25.8413 23.4748 25.8413 20.5556C25.8413 17.6364 23.4748 15.2699 20.5556 15.2699C17.6363 15.2699 15.2699 17.6364 15.2699 20.5556C15.2699 23.4748 17.6363 25.8413 20.5556 25.8413Z" fill={color}/>
    <Path d="M3.52381 15.8572H12.9206V25.254H3.52381V15.8572Z" fill={color}/>
    </Svg>

  )
}

export default CategorySvg

const styles = StyleSheet.create({})