import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet,TouchableOpacity, View,Linking } from 'react-native'
import NavegacaoTab from '../../Componentes/navegacaoTab'
import * as Progress from 'react-native-progress';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretSquareUp, faLaptopCode } from '@fortawesome/free-solid-svg-icons'
import {faGithub,faGoogleDrive} from '@fortawesome/free-brands-svg-icons'
import apiWF from '../../api'
import * as Animatable from 'react-native-animatable';

export default class Detalhado extends Component {
    state={
        dados:[],
        progresso:0,
        historico:[]
    }


    componentDidMount(){
        console.log(this.props.navigation.state.params.projeto)
        this.setState(
            {
                dados:this.props.navigation.state.params.projeto,
                progresso:parseFloat(parseFloat(this.props.navigation.state.params.projeto.progresso)/100).toFixed(1)

            }
        )
        var idProj = this.props.navigation.state.params.projeto.id
        var idcliente = this.props.navigation.state.params.projeto.idCliente
        apiWF.get('/projeto-historico/'+idProj+'/'+idcliente).then(resp=>{
            console.log(resp)
                this.setState({
                    historico:resp.data
                })
        })

    }



    render() {
        return (
            <>
                <ScrollView style={{marginBottom:60,marginLeft:25,marginRight:25}}>
                    <Animatable.View animation='bounceInUp'>
                        <Text style={style.Titulo}> Projeto - {this.state.dados.nome}</Text>
                        <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15}}>
                            <View>
                                <Text style={{textAlign:'center'}}>{this.state.dados.progresso}%</Text>
                                <Progress.Bar color="#e9447b" progress={this.state.progresso} width={300} /> 
                            </View>
                        </View>
                        <View style={{marginTop:15}}>
                            <Text style={{fontWeight:'800'}}>Data entrega {this.state.dados.dataEntrega}</Text>
                        </View>
                    </Animatable.View>

                    <Animatable.View animation='bounceInUp'>
                        <View style={style.sobre}>
                            <Text style={{fontSize:25}}>Descrição</Text>
                            <Text>
                                {this.state.dados.descritivo}
                            </Text>
                        </View>
                    </Animatable.View>

                    <View>
                        <Animatable.View animation='bounceInUp'>
                            <TouchableOpacity style={style.card} onPress={()=>Linking.openURL(this.state.dados.urlDominio)} >
                                <View  style={{flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center', marginTop:20}}>
                                    <FontAwesomeIcon color={ '#fff' }  size={ 80 } icon={ faLaptopCode } />
                                    <Text style={style.valor}>Site</Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View animation='bounceInUp'>
                            <TouchableOpacity style={style.card} onPress={()=>Linking.openURL(this.state.dados.github)} >
                                <View  style={{flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center', marginTop:20}}>
                                    <FontAwesomeIcon color={ '#fff' }  size={ 80 } icon={ faGithub } />
                                    <Text style={style.valor}>Git</Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View animation='bounceInUp'>
                            <TouchableOpacity style={style.card} onPress={()=>Linking.openURL(this.state.dados.GoogleDrive)} >
                                <View  style={{flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center', marginTop:20}}>
                                    <FontAwesomeIcon color={ '#fff' }  size={ 80 } icon={ faGoogleDrive } />
                                    <Text style={style.valor}>Drive</Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View animation='bounceInUp'>
                            <TouchableOpacity style={style.card} onPress={()=>Linking.openURL(this.state.dados.vercel)} >
                                <View  style={{flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center', marginTop:20}}>
                                    <FontAwesomeIcon color={ '#fff' }  size={ 80 } icon={ faCaretSquareUp } />
                                    <Text style={style.valor}>Vercel</Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>

                    <View style={{marginBottom:30}}>
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
