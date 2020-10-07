import React from 'react'
import {  StyleSheet,TouchableOpacity} from 'react-native'
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer,NavigationActions } from "react-navigation";



import Inicio from "./Telas/inicio";
import Login from "./Telas/login";
import Intro from "./Telas/intro";

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
        },
        {
            
            initialRouteName: 'Login',
            navigationOptions: {},
        }
    )
)