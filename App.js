import React, { createContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeWindStyleSheet } from "nativewind";

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ListScreen from './screens/ListScreen';
import PictureScreen from './screens/PictureScreen';
import ScanScreen from './screens/ScanScreen';
 
NativeWindStyleSheet.setOutput({
  default: "native",
});

import {
  createNavigatorFactory,
} from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';
import AppContext from './components/AppContext';
import WebSocketProvider  from './utils/WSProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import './localization/i18n';
import i18next from 'i18next';

// ...

const createMyNavigator = createNavigatorFactory(TabNavigator);
const My = createMyNavigator();

export default function App() {
  const defaultApiURL_hotspot = process.env.EXPO_PUBLIC_SUNSCAN_API_URL || '10.42.0.1:8000';

  const [sunscanIsConnected, setSunscanIsConnected] = useState(false);
  const [cameraIsConnected, setCameraIsConnected] = useState(false);
  const [hotSpotModeVal, setHotSpotMode] = useState(true);
  const [showWatermark, setShowWatermark] = useState(true);
  const [debugVal, setDebug] = useState(false);
  const [demoVal, setDemo] = useState(false);
  const [tooltipVal, setTooltip] = useState(false);
  const [camera, setCamera] = useState("");
  const [observerVal, setObserver] = useState("");
  const [apiURLVal, setApiURL] = useState(defaultApiURL_hotspot);
  const [backendApiVersion, setBackendApiVersion] = useState("");
  const [displayFullScreenImage, setDisplayFullScreenImage] = useState("");
  const [freeStorage, setFreeStorage] = useState(0);

  const toggleShowWaterMark = () => {
    setShowWatermark(!showWatermark);
  };

  const toggleDemo = () => {
    setDemo(!demoVal);
  };
  const toggleTooltip = () => {
    setTooltip(!tooltipVal);
  };
  const toggleDebug= () => {
    setDebug(!debugVal);
  };

  useEffect(()=>{
    const loadLanguage = async ()=>{
      try{
        const storedLanguage = await AsyncStorage.getItem('SUNSCAN_APP::LANGUAGE');
        if (storedLanguage) {
          console.log('language', storedLanguage)
          i18next.changeLanguage(storedLanguage);
        }
      }catch(e){
        console.log(e)
      }
    
    }
    loadLanguage()
    },[])


  useEffect(() => {
    AsyncStorage.getItem('SUNSCAN_APP::OBSERVER').then((observer) => {
      if (observer) {
        setObserver(observer);
      }
    });
    AsyncStorage.getItem('SUNSCAN_APP::DEMO').then((d) => {
      if(d)  {
        setDemo(d == '1');
      }
    });
    AsyncStorage.getItem('SUNSCAN_APP::TOOLTIP').then((d) => {
      if(d)  {
        setTooltip(d == '1');
      }
    });
    AsyncStorage.getItem('SUNSCAN_APP::DEBUG').then((d) => {
      if(d)  {
        setDebug(d == '1');
      }
    });
    AsyncStorage.getItem('SUNSCAN_APP::WATERMARK').then((watermark) => {
      if(watermark)  {
        setShowWatermark(watermark == '1');
      }
    });
  }, []);

  useEffect(() => {
    if (observerVal !== "") {
      AsyncStorage.setItem('SUNSCAN_APP::OBSERVER', `${observerVal}`);
    }

    AsyncStorage.setItem('SUNSCAN_APP::DEMO', `${demoVal?'1':'0'}`);
    AsyncStorage.setItem('SUNSCAN_APP::TOOLTIP', `${tooltipVal?'1':'0'}`);
    AsyncStorage.setItem('SUNSCAN_APP::DEBUG', `${debugVal?'1':'0'}`);
    AsyncStorage.setItem('SUNSCAN_APP::WATERMARK', `${showWatermark?'1':'0'}`);
    
  }, [observerVal, hotSpotModeVal, apiURLVal, showWatermark, demoVal, debugVal, tooltipVal]);
  
  const userSettings = {
    sunscanIsConnected:sunscanIsConnected,
    setSunscanIsConnected,
    cameraIsConnected, cameraIsConnected,
    setCameraIsConnected,
    camera, 
    setCamera,
    demo:demoVal,
    debug:debugVal,
    tooltip:tooltipVal,
    hotSpotMode:hotSpotModeVal,
    observer:observerVal,
    showWatermark:showWatermark,
    backendApiVersion,
    setBackendApiVersion,
    setObserver,
    toggleShowWaterMark,
    toggleDebug,
    toggleDemo,
    toggleTooltip, 
    apiURL:apiURLVal,
    displayFullScreenImage,
    setDisplayFullScreenImage,
    freeStorage,
    setFreeStorage
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
  });

  return (
    <GestureHandlerRootView style={styles.container}>
    <AppContext.Provider value={userSettings}>
       <WebSocketProvider>
       <SafeAreaProvider>
        <NavigationContainer>
            <My.Navigator  
                screenOptions={{
                    headerShown: false
                      }}>
                    
              <My.Screen
                name="Home"
                component={HomeScreen}
              />
              <My.Screen
                name="Scan"
                component={ScanScreen}
              />
              <My.Screen
                name="List"
                component={ListScreen}
              />
              <My.Screen
                name="Picture"
                component={PictureScreen}
              />
              <My.Screen name="Settings" component={SettingsScreen} />
            </My.Navigator>
            <StatusBar hidden={true} />
          </NavigationContainer>
          </SafeAreaProvider>
       </WebSocketProvider>
    </AppContext.Provider>
    </GestureHandlerRootView>
  );

  
}
