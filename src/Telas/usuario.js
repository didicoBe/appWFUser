import React, { Component } from 'react'
import { ScrollView, StyleSheet,Alert, View,TouchableOpacity } from 'react-native'
import {Item, Input, Label,Button,Text,} from 'native-base'
import NavegacaoTab from '../Componentes/navegacaoTab'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import LottieView from 'lottie-react-native';
import apiWF from '../api'
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Usuarios extends Component {
    state = {
        dados:'',
        id:'',
        senha:''
    }


    pegaDados = async()=>{
            const id = await AsyncStorage.getItem('id');
            console.log(id)
            apiWF.get('/usuario/'+id).then(response=>{
                console.log(response)
                this.setState({
                    dados:response.data[0],
                    senha:response.data[0].senha
                })
            })
    }

    sair = async()=>{
        try {
            await AsyncStorage.clear()
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
            });
            this.props.navigation.dispatch(resetAction);
          } catch(e) {
            console.log(e)
          }
        
    }

    atualiza = async()=>{
        await apiWF.post('http://wfdesenvolvimento.com.br/api/usuario/atualiza',{senha:this.state.senha}).then(
            ()=>{
                Alert.alert(
                    "Sucesso !",
                    "Sua senha foi atualizada com suecesso.",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false })
            }
        )
    }

    componentDidMount(){
        this.pegaDados()
    }

    render() {
        return (
            <>
                <ScrollView style={{marginBottom:60}}>
                    <View style={style.card}>
                        <Text style={style.textAndamento}>{this.state.dados.nome}</Text>
                        <Text style={style.textAndamento}>{this.state.dados.email}</Text>
                        <Item floatingLabel style={{marginTop:20,marginBottom:20}}>
                            <Label style={style.textAndamento}> Senha</Label>
                            <Input value={this.state.dados.senha} secureTextEntry={true} onChangeText={(text)=>{this.setState({senha:text})}} />
                        </Item>
                        <Button onPress={()=>this.atualiza()} rounded success>
                            <Text>Atualizar</Text>
                        </Button>
                    </View>
                    {/* animação */}
                    <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <LottieView source={require('../Animacao/drawkit-grape-animation-10-LOOP.json')} autoPlay loop style={{height:300,width:300}}/>
                    </View>
                    {/* animação */}
                    {/* cards */}
                    <TouchableOpacity style={style.card} onPress={()=>{this.sair()}}>
                        <View  style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                            <FontAwesomeIcon color={ '#fff' }  size={ 30 } icon={ faSignOutAlt } />
                            <Text style={style.valor}>Sair</Text>
                        </View>
                    </TouchableOpacity>
                    {/* cards */}
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
        backgroundColor:'#6f3a80',
        margin:20,
        borderRadius:20,
        padding:20,
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
    }
})
