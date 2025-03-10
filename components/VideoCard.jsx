import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useVideoPlayer, VideoView, createVideoPlayer } from 'expo-video';

import { icons } from '../constants'

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false); // проигрывается ли видео

  const videoSource = video
    const player = useVideoPlayer(videoSource, (player) => {
      player.loop = true;    
      //player.play();
    });
  
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image source={{uri: avatar}}  className="w-full h-full rounded-lg" resizeMode="cover"/>
          </View>
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text className="font-psemibold text-sm text-white" numberOfLines={1}>{title}</Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>{creator}</Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
    { play ? (
        <VideoView             
          player={player}
          style={styles.video}
          allowsFullscreen
          allowsPictureInPicture                        
          contentFit={'cover'}          
        />
      ) : (
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true),
            player.play() //запуск видео
          }}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image 
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3 border-yellow-400 border-2"
            resizeMode="cover"
          />
          <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
        </TouchableOpacity>
      ) 
    }
    </View>
  )
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 230,
    borderWidth: 1,
    borderColor: "tomato",
    borderRadius: 33,
  },
})

export default VideoCard