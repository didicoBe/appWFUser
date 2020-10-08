import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet,Image, View } from 'react-native'
import NavegacaoTab from '../Componentes/navegacaoTab'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChartBar, faChartPie, faChartArea } from '@fortawesome/free-solid-svg-icons'
import LottieView from 'lottie-react-native';
import apiWF from '../api'
import AsyncStorage from '@react-native-community/async-storage';

export default class Projetos extends Component {
    render() {
        return (
            <>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center',alignItems:'baseline'}}>
                    <View>
                        <Image style={style.img} source={require('../Img/logo_WF_Final_ajustado_LogoCOR.png')}/>
                    </View>
                    <Text style={style.Titulo}>Dashboard</Text>
                </View>
                <ScrollView style={{marginBottom:60}}>
                </ScrollView>
                <NavegacaoTab navega={this.props.navigation}/>
            </>
        )
    }
}
const style = StyleSheet.create({
    Titulo:{
        textAlign:'left',
        fontSize:30,
        fontWeight:'100',
        padding:25,
        color:'#510d67',
        fontFamily:'OCR-ABTRegular'
    },
    img:{
        height:100,
        width:150,
        resizeMode:'contain',
    }
})