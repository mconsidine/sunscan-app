import * as React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Dimensions, Pressable, View, StyleSheet } from 'react-native';
import {
    createNavigatorFactory,
    DefaultNavigatorOptions,
    ParamListBase,
    CommonActions,
    TabActionHelpers,
    TabNavigationState,
    TabRouter,
    TabRouterOptions,
    useNavigationBuilder,
  } from '@react-navigation/native';
  
// Import SVG components for tab icons
import HomeSVG from './svg/HomeSVG';
import IrisSVG from './svg/IrisSVG';
import GallerySVG from './svg/GallerySVG';
import SettingsSVG from './svg/SettingsSVG';
import AppContext from './AppContext';
import ImageZoom from 'react-native-image-pan-zoom';
import { Image } from 'expo-image';

// Main TabNavigator component
export default function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}) {
  // Use the navigation builder hook to create the tab navigation
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  // Get the current screen name
  const screenName = state.routes[state.index].name;
  const myContext = React.useContext(AppContext);

  // Styles for the component
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',

    },
    image: {
      flex: 1,
     
      backgroundColor: 'transparent',
    },
  });

  return (
    <NavigationContent>
       
        <View className="flex-1 flex flex-row" style={{zIndex:99, elevation:99}}>
                {myContext.displayFullScreenImage !== '' && <View className="absolute bg-black w-screen h-screen" style={{zIndex:100, elevation:100}}>
                  <Pressable className="absolute right-0 top-0 m-4" style={{zIndex:102, elevation:102}} onPress={()=>{ myContext.setDisplayFullScreenImage(''); console.log('1') }}><MaterialIcons name="close" color="#fff" size={22} /></Pressable>
                        {/* Image zoom component */}
                        <ImageZoom
                            cropWidth={Dimensions.get('window').width}
                            cropHeight={Dimensions.get('window').height}
                            imageWidth={400}
                            imageHeight={400}>
                              <Image
                                style={styles.image}
                                source={myContext.displayFullScreenImage}
                                contentFit='contain'
                              />
                        </ImageZoom>
                </View>}
                {/* Sidebar navigation */}
                <View  className="  flex-0 w-14 bg-black  py-2 flex flex-col justify-evenly align-center items-center" style={{zIndex:99, elevation:99}} >
                {/* Home tab */}
                <View  className={screenName == "Home" ? "border-l-white border-2 pl-1":"border-l-black border-2 pl-1"}>
                    <Pressable onPress={() =>navigation.navigate('Home') } className="flex flex-col justify-center items-center w-12">
                    <HomeSVG color="white" size="32"  />
                    </Pressable>
                </View>

                {/* Scan tab */}
                <View className={screenName == "Scan" ? "border-l-white border-2 pl-1":"border-l-black border-2 pl-1"}>
                    <Pressable onPress={() =>navigation.navigate('Scan') } className="flex flex-col justify-center items-center w-12">
                    <IrisSVG color="white" size="32"  />
                    </Pressable>
                </View>

                {/* List tab */}
                <View className={screenName == "List" ? "border-l-white border-2 pl-1":"border-l-black border-2 pl-1"}>
                <Pressable onPress={() =>navigation.navigate('List') } className="flex flex-col justify-center items-center w-12">
                <GallerySVG color="white" size="32"  />
                    </Pressable>
                </View>

                {/* Settings tab */}
                <View className={screenName == "Settings" ? "border-l-white border-2 pl-1":"border-l-black border-2 pl-1"}>
                <Pressable onPress={() =>navigation.navigate('Settings') } className="flex flex-col justify-center items-center w-12">
                <SettingsSVG color="white" size="32"  />
                    </Pressable>
                </View>
                </View>
            
            {/* Content area */}
            <View  className="grow">
            {/* Render the current screen */}
            {state.routes.map((route, i) => {
                return (
                <View
                    key={route.key}
                    style={[
                        StyleSheet.absoluteFill,
                    { display: i === state.index ? 'flex' : 'none' },
                    ]}
                >
                    {descriptors[route.key].render()}
                </View>
                );
            })}
            </View>
        </View>
 
    </NavigationContent>
  );
}