import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { ResizeMode, Video } from "expo-av";
import { useVideoPlayer, VideoView, createVideoPlayer } from 'expo-video';

import { icons } from '../constants';

//для анимации
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({activeItem, item}) => {
                    //текущий эл.
  const [play, setPlay] = useState(false);

  const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    //player.play();
  });

  console.log('player', player)
  console.log(play)
    

 // console.log(activeItem, item.$id)
  
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      { play ? (
          <VideoView 
            player={player}
            style={styles.video}
            allowsFullscreen
            allowsPictureInPicture
            contentFit={'cover'}
            
          />
          /*<Video старое!!!
            source={{uri: item.video}}
            className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
            resizeMode={ResizeMode.CONTAIN} // для ресайза
            useNativeControls // native
            shouldPlay // начать           
          />*/
        ) : (
          <TouchableOpacity
            className="relative flex justify-center items-center"
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
          >
            <ImageBackground
              source={{ uri: item.thumbnail }}
              className="w-52 h-72 border-red-400 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
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

    </Animatable.View>
  )
}

const Trending = ({posts}) => {

  const [activeItem, setActiveItem] = useState(posts[0]) // 1 элемент из данных

  const viewableItemsChanged = ({ viewableItems }) => { //функция изменяет размер активного елемента
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
         <TrendingItem activeItem={activeItem} item={item}/>
        //<Text className="text-3xl text-white">{item.id}</Text> 
        )}
        onViewableItemsChanged={viewableItemsChanged} //изменяется видимость сток в флетлисте
        viewabilityConfig={{itemVisiblePercentThreshold: 70}} //изменить конфигурацию видимости
        contentOffset={{ x: 170 }} // смещение содержимого для видимости
        horizontal
    
    />
  )
}

const styles = StyleSheet.create({
  video: {
    width: 182,
    height: 252,
    borderWidth: 1,
    borderColor: "tomato",
    borderRadius: 33,
  },
})

export default Trending