import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useVideoPlayer, VideoView, createVideoPlayer } from 'expo-video';

const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const Bookmark = () => {

const player = useVideoPlayer('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', player => {
    player.loop = true;
    player.play();
  });  

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-52 h-72 border-red-400 rounded-[33px] bg-white/10">
        <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 182,
    height: 252,
    borderWidth: 1,
    borderColor: "tomato",
    borderRadius: 33,
  },
  
});

export default Bookmark