import React from 'react'
import {  StyleSheet,TouchableOpacity} from 'react-native'
import { createStackNavigator, TransitionSpecs,TransitionPresets } from "react-navigation-stack";
import { createAppContainer,NavigationActions } from "react-navigation";
import { fromLeft } from 'react-navigation-transitions';



import Inicio from "./Telas/inicio";
import Login from "./Telas/login";
import Intro from "./Telas/intro";
import Projetos from "./Telas/projetos";
import { createBottomTabNavigator } from 'react-navigation-tabs';

const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  const transitionConfig = () => {
    return {
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {      
        const { layout, position, scene } = sceneProps
  
        const thisSceneIndex = scene.index
        const width = layout.initWidth
  
        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [width, 0],
        })
  
        return { transform: [ { translateX } ] }
      },
    }
  }

export default createAppContainer(
  

    createStackNavigator(
        {
            Inicio :{
                screen: Inicio,
                name:'Inicio',
                navigationOptions: ()=> ({
                    headerShown: false,
                })
            },
            Login :{
                screen: Login,
                name:'Login',
                navigationOptions: ()=> ({
                    headerShown: false,
                })
            },
            Intro :{
                screen: Intro,
                name:'Intro',
                navigationOptions: ()=> ({
                    headerShown: false,
                })
            },
            Projetos :{
                screen: Projetos,
                name:'Projetos',
                navigationOptions: ()=> ({
                    headerShown: false,
                })
            },
        },
        {
            
            initialRouteName: 'Login',
            defaultNavigationOptions:{
                gestureEnabled:true,
                gestureDirection:'horizontal',
                ...TransitionPresets.SlideFromRightIOS ,
                
            },
            navigationOptions: {
            },
        }
    )
)