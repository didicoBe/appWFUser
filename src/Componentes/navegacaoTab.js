import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import {FooterTab, Button, Icon,Footer } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faTasks, faHandsHelping, faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default class navegacaoTab extends Component {
    render() {
        return (
            <View style={style.footer}>
                <View style={style.footerTab}>
                    <TouchableOpacity onPress={()=>{this.props.navega.navigate('Inicio')}} style={style.btns} >
                        <FontAwesomeIcon color={ '#fff' }  size={ 30 } icon={ faHome } />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navega.navigate('Projetos')}} style={style.btns} >
                        <FontAwesomeIcon color={ '#fff' }  size={ 30 } icon={ faTasks } />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{}} style={style.btns} >
                        <FontAwesomeIcon color={ '#fff' }  size={ 30 } icon={ faHandsHelping } />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{}} style={style.btns} >
                        <FontAwesomeIcon color={ '#fff' }  size={ 30 } icon={ faUserCircle } />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    footer:{
        position:'absolute',
        bottom:0,
        zIndex:99,
        width:'100%'
    },
    footerTab:{
        backgroundColor:'#e9447b',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    btns:{
        padding:15,
        marginLeft:15,
        marginRight:15,
        zIndex:999
    }
})