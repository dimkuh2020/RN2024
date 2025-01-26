import { View, Text } from 'react-native'
import React from 'react'
import { images } from '../constants'

const EmptyState = (title) => {
  return (
    <View>
      <Text className="justify-center items-center px-4">Empty
        <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode="contain"/>
      </Text>
    </View>
  )
}

export default EmptyState