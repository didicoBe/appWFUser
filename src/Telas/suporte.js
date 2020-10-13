import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet,TouchableOpacity, View } from 'react-native'
import NavegacaoTab from '../Componentes/navegacaoTab'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faTicketAlt, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import LottieView from 'lottie-react-native';
import apiWF from '../api'
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';

export default class Suporte extends Component {
    render() {
        return (
            <>
                <ScrollView style={{marginBottom:60}}>
                   
                    {/* cards */}
                    <Animatable.View animation='bounceInUp'>
                        <TouchableOpacity style={style.card} onPress={()=>this.props.navigation.navigate('Novo_Ticket')}>
                            <View  style={{flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center', marginTop:20}}>
                                <FontAwesomeIcon color={ '#fff' }  size={ 80 } icon={ faPlus } />
                                <Text style={style.valor}>Novo Ticket</Text>
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.View animation='bounceInUp'>
                        <TouchableOpacity style={style.card} onPress={()=>this.props.navigation.navigate('Tickets_abertos')}>
                            <View  style={{flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center', marginTop:20}}>
                                <FontAwesomeIcon color={ '#fff' }  size={ 80 } icon={ faTicketAlt } />
                                <Text style={style.valor}>Tickets em aberto</Text>
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.View animation='bounceInUp'>
                        <TouchableOpacity style={style.card} onPress={()=>this.props.navigation.navigate('Tickets_fechados')}>
                            <View  style={{flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center', marginTop:20}}>
                                <FontAwesomeIcon color={ '#fff' }  size={ 80 } icon={ faCalendarCheck } />
                                <Text style={style.valor}>Tickets fechados</Text>
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                    {/* cards */}

                     {/* animação */}
                     <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <LottieView source={require('../Animacao/drawkit-grape-animation-4-LOOP.json')} autoPlay loop style={{height:300,width:300}}/>
                    </View>
                    {/* animação */}

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
    },
    card:{
        height:150,
        backgroundColor:'#6f3a80',
        margin:20,
        borderRadius:20,
        padding:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        
    },
    textoCard:{
        color:'#fff',
        fontSize:25,
        fontFamily:'OCR-ABTRegular'
    },
    valor:{
        color:'#fff',
        fontSize:30,
        fontFamily:'OCR-ABTRegular',
        width:170
    },
    cardAndamento:{
        backgroundColor:'#6f3a80',
        margin:20,
        paddingRight:15,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textAndamento:{
        color:"#fff",
        fontSize:20,
        fontFamily:'OCR-ABTRegular'
    }
})
