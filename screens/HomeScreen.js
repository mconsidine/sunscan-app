
import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

import Infos from '../components/Infos';
import Status from '../components/Status';


export default function HomeScreen({navigation}) {
  return (
    <View className="flex flex-col bg-zinc-900 h-screen ">
          <ImageBackground className="flex flex-col h-screen items-center" source={require("../assets/bg.png")}>
            <View  className="flex flex-col justify-between items-center">
                  <View className="p-4 grow flex flex-col justify-center items-center">
                    <View className="p-2"><Status isFocused={navigation.isFocused()}/></View>
                    <View className="p-2"><Infos isFocused={navigation.isFocused()}/></View>
                  </View> 
            </View>
          </ImageBackground>
      </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  
  },
  image: {
    flex:1,
    resizeMode: 'scale',
    justifyContent: 'top',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000',
  },
});

