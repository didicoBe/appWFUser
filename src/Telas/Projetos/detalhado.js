import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet,TouchableOpacity, View } from 'react-native'
import NavegacaoTab from '../../Componentes/navegacaoTab'
import * as Progress from 'react-native-progress';

export default class Detalhado extends Component {
    state={
        dados:[]
    }


    componentDidMount(){
        console.log(this.props.navigation.state.params.projeto)
        this.setState(
            {
                dados:this.props.navigation.state.params.projeto
            }
        )
    }



    render() {
        return (
            <>
                <ScrollView style={{marginBottom:60,marginLeft:25,marginRight:25}}>
                    <Text style={style.Titulo}>{this.state.dados.nome}</Text>
                    <Progress.Bar progress={ 0.3} width={200} />
                    <View style={style.sobre}>
                        <Text>{parseFloat(this.state.dados.progresso)/100}</Text>
                        <Text>
                            {this.state.dados.descritivo}
                        </Text>
                    </View>
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
        fontFamily:'OCR-ABTRegular'
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
    },
    sobre:{
        borderRadius:20,
        padding:15,
        borderWidth:1,
        borderColor:'#e9447b',
        marginTop:15
    }
})
