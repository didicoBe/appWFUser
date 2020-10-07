import React, { Component } from 'react'
import { View, StyleSheet,Image,Alert  } from 'react-native'
import {Form, Item, Input, Label, Button,Text} from 'native-base'
import RadialGradient from 'react-native-radial-gradient';
import apiWF from '../api'
import AsyncStorage from '@react-native-community/async-storage';

export default class login extends Component {

    state={
        login:'',
        senha:'',
        token:'',
        logado:false
    }

    login = async ()=>{
        

        const body = {
            login: this.state.login,
            senha: this.state.senha 
        }
        
        await apiWF.post('/login', body).then(response=>{
            this.SalvaStore(response).then(()=>{
                this.props.navigation.navigate('Intro')
            })
            
            
        }).catch((erro)=>{
            Alert.alert(
                "Ops !",
                "Erro ao logar, Verifique login e senha ou tente novamente mais tarde.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false })
                    
        })


    }

    validaOnline = async()=>{
        const login = await AsyncStorage.getItem('login');
        const token = await AsyncStorage.getItem('token');
        const nome = await AsyncStorage.getItem('nome');

        var resposta = false


        
        if(login === null || token === null){
            return resposta

        }else{
            resposta = apiWF.get('/login/valida/'+login+'/'+token).then(response=>{


                if(response.data.permissao === 'admin'){
                    this.setState({
                        logado: true,
                        nome:nome
                    })
                }else{
                    this.setState({
                        logado: false,
                        nome:nome
                    })
                }
                

                return  true
            }).catch((erro)=>{
                this.setState({
                    logado: false,
                    nome:nome
                })
                return false
            })
    
            return resposta
            
        }

 
    }

    SalvaStore = async(response)=>{
        await AsyncStorage.setItem('login', response.data.response[0].email);
        await AsyncStorage.setItem('token', response.data.response[0].token);
        await AsyncStorage.setItem('nome', response.data.response[0].nome);
        await AsyncStorage.setItem('id', response.data.response[0].id);
    }

    componentDidMount(){
      const logado =  this.validaOnline();
      if(logado){
          this.props.navigation.push('Inicio')
      }
    }



    render() {
        return (
            <RadialGradient style={{width:"100%",height:"100%"}}
                        colors={['#6f3a80','#e9447b']}
                        center={[150]}
                        radius={350}>
                <View style={style.corpo}>
                    <View>
                        <Image style={style.img} source={require('../Img/logo_crv_Final_ajustado_LogoNEGATIVO.png')}/>
                    </View>
                    <View style={style.card}>
                        <Form>
                            <Item floatingLabel>
                                <Label> Usuario</Label>
                                <Input onChangeText={(text)=>{this.setState({login:text})}} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Senha</Label>
                                <Input  onChangeText={(text)=>{this.setState({senha:text})}} secureTextEntry={true}/>
                            </Item>
                            <View style={style.btn}>
                                <Button onPress={()=>this.login()} rounded success>
                                    <Text>Login</Text>
                                </Button>
                            </View>
                        </Form>
                    </View>
                </View>

            </RadialGradient>
        )
    }
}


const style = StyleSheet.create({
    corpo:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    card:{
        width:300,
        height:300,
        backgroundColor:"#f1f1f1",
        borderRadius:30,
        padding:30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    img:{
        height:160,
        resizeMode:'contain',
    },
    btn:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'flex-end'
    }
})