import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet,TouchableOpacity, View,Linking } from 'react-native'
import NavegacaoTab from '../../Componentes/navegacaoTab'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretSquareUp, faLaptopCode } from '@fortawesome/free-solid-svg-icons'
import {faGithub,faGoogleDrive} from '@fortawesome/free-brands-svg-icons'
import apiWF from '../../api'

export default class Tdetalhado extends Component {
    state={
        dados:[],
        historico:[]
        
    }


    componentDidMount(){
       this.setState(
            {
                dados:this.props.navigation.state.params.projeto,
            }
        )
        this.pegahistoricoTicket(this.props.navigation.state.params.projeto)
    }

    pegahistoricoTicket = async(dados)=>{
        console.log(dados)
        await apiWF.get('/suporte-historico/'+dados.id+'/'+dados.idCliente).then(response=>{
            console.log(response)
            this.setState({
                historico:response.data,
            })
            
        }).catch(e=>{
             console.log(e);
        })  
    }



    render() {
        return (
            <>
                <ScrollView style={{marginBottom:60,marginLeft:25,marginRight:25}}>
                    <Text style={style.Titulo}>{this.state.dados.assunto}</Text>
                    <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15}}>
                        <View>
                            <Text style={{textAlign:'center',fontSize:20,color:'#e9447b'}}>Status:.{this.state.dados.status}</Text>
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={{fontWeight:'800'}}>Solicitado em {this.state.dados.data}</Text>
                    </View>

                    <View style={style.sobre}>
                        <Text style={{fontSize:25}}>Descrição</Text>
                        <Text>
                            {this.state.dados.mensagem}
                        </Text>
                    </View>


                    

                    <View style={{marginBottom:30, marginTop:25}}>
                        <Text style={{fontSize:25, color:"#510d67"}}>Histórico</Text>
                        {
                            this.state.historico.map((dados,i)=>{
                                return(
                                    <View style={style.sobre} key={i}>
                                        <Text style={{fontSize:20, color:"#510d67"}}>{dados.status}</Text>
                                        <Text style={{color:"#510d67"}}>{dados.mensagem}</Text>
                                    </View>   
                                )
                            })
                        }
                        
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
