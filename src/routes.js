import React from 'react'
import {  Image,View, Text} from 'react-native'
import { createStackNavigator, TransitionPresets } from "react-navigation-stack";
import { createAppContainer,NavigationActions } from "react-navigation";




import Inicio from "./Telas/inicio";
import Login from "./Telas/login";
import Intro from "./Telas/intro";

import Projetos from "./Telas/projetos";
import Abertos from "./Telas/Projetos/abertos";
import Fechados from "./Telas/Projetos/fechados";
import Detalhes from "./Telas/Projetos/detalhado";

import Suporte from "./Telas/suporte";
import Taberto from "./Telas/Suporte/Taberto";
import Tfechado from "./Telas/Suporte/Tfechado";
import Tnovo from "./Telas/Suporte/Tnovo";
import Tdetalhado from "./Telas/Suporte/Tdetalhado";




import Usuarios from "./Telas/usuario";



export default createAppContainer(
    createStackNavigator(
        {
            Inicio :{
                screen: Inicio,
                name:'Inicio',
                
            },
            Login :{
                screen: Login,
                name:'Login',
            },
            Intro :{
                screen: Intro,
                name:'Intro',
            },
            Projetos :{
                screen: Projetos,
                name:'Projetos',
            },
            Abertos :{
                screen: Abertos,
                name:'Abertos',
            },
            Fechados :{
                screen: Fechados,
                name:'Fechados',
            },
            Detalhes :{
                screen: Detalhes,
                name:'Detalhes',
            },
            Suporte :{
                screen: Suporte,
                name:'Suporte',
            },
            Tickets_abertos :{
                screen: Taberto,
                name:'Ticket Aberto',
            },
            Tickets_fechados :{
                screen: Tfechado,
                name:'Ticket Fechado',
            },
            Novo_Ticket :{
                screen: Tnovo,
                name:'Novo',
                title:'Novo',
            },
            Ticket_detalhado :{
                screen: Tdetalhado,
                name:'Ticket Detalhado',
            },
            Usuario :{
                screen: Usuarios,
                name:'Usuario',
            },
        },
        {
            
            initialRouteName: 'Login',
            defaultNavigationOptions:{
                gestureEnabled:true,
                gestureDirection:'horizontal',
                ...TransitionPresets.SlideFromRightIOS ,
                header:(info)=>{
                    
                    if(info.scene.route.routeName !== 'Login'){
                        if(info.scene.route.routeName !== 'Intro'){
                            return(
                                <View style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center',alignItems:'baseline'}}>
                                    <View>
                                        <Image style={{height:100,width:150,resizeMode:'contain',}} source={require('./Img/logo_WF_Final_ajustado_LogoCOR.png')}/>
                                    </View>
                                    <Text style={{textAlign:'left',fontSize:30,fontWeight:'100',padding:25,color:'#510d67',fontFamily:'OCR-ABTRegular'}}>{info.scene.route.routeName}</Text>
                                </View>
                            )
                        }
                    } else{
                        return null
                    }  
                        
                },
            }
        }
    )
    
)



