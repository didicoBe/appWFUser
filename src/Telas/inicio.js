import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet,Image, View,SafeAreaView  } from 'react-native'
import {ListItem, List } from 'native-base';
import NavegacaoTab from '../Componentes/navegacaoTab'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChartBar, faChartPie, faChartArea } from '@fortawesome/free-solid-svg-icons'
import LottieView from 'lottie-react-native';
import apiWF from '../api'
import AsyncStorage from '@react-native-community/async-storage';



export default class inicio extends Component {
    state={
        nome: '',
        email: '',
        token:'',
        idCliente:'',
        dataProj : [],        
        ProjFin: 0,
        ProjAb: 0,
        TicketsAb:0,
        loading: true
    }


      pegaId= async(email,token)=>{
        
        await apiWF.get('/usuario/idCliente/'+email+'/'+token).then(response=>{
              this.setState({
                  idCliente:response.data[0].idcliente
              })
              this.pegaProjetos(response.data[0].idcliente)
              this.pegaTickets(response.data[0].idcliente)
          }).catch(e=>{
               console.log(e);
          })   
      }
  
      pegaProjetos = async(idCliente)=>{
          await apiWF.get('/projeto/'+idCliente).then(response=>{
              var Finalizado = response.data.filter(data => data.status === 'Finalizado')
              var Andamento = response.data.filter(data => data.status !== 'Finalizado')
              this.setState({
                  dataProj:response.data,
                  ProjFin:Finalizado.length,
                  ProjAb: Andamento.length
              })
  
              if(response.data.length > 0){
                  this.setState({loading:false})
              }
              
          }).catch(e=>{
               console.log(e);
          })  
      }
  
      pegaTickets = async(idCliente)=>{
          await apiWF.get('/suporte/'+idCliente).then(response=>{
              var Andamento = response.data.filter(data => data.status !== 'Resolvido')
              this.setState({
                  TicketsAb:Andamento.length,
              })
              
          }).catch(e=>{
               console.log(e);
          })  
      }

      pegaDadosClieStore = async()=>{
        const login = await AsyncStorage.getItem('login');
        const token = await AsyncStorage.getItem('token');
        const nome = await AsyncStorage.getItem('nome');
        this.setState({
            nome: nome,
            email: login,
            token: token
        })
      }
  
      componentDidMount(){
          this.pegaDadosClieStore().then(()=>{
                this.pegaId(this.state.email,this.state.token)
          })
         
  
  
      }




    render() {
        return (
            <>
                <ScrollView style={{marginBottom:60}}>
                    {/* cards */}
                    <View style={style.card}>
                        <Text style={style.textoCard}>Projetos Finalizados</Text>
                        <View  style={{flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center', marginTop:20}}>
                            <FontAwesomeIcon color={ '#fff' }  size={ 55 } icon={ faChartBar } />
                            <Text style={style.valor}>{this.state.ProjFin}</Text>
                        </View>
                    </View>
                    <View style={style.card}>
                        <Text style={style.textoCard}>Projetos em Aberto</Text>
                        <View  style={{flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center', marginTop:20}}>
                            <FontAwesomeIcon color={ '#fff' }  size={ 55 } icon={ faChartPie } />
                            <Text style={style.valor}>{this.state.ProjAb}</Text>
                        </View>
                    </View>
                    <View style={style.card}>
                        <Text style={style.textoCard}>Chamados em aberto</Text>
                        <View  style={{flexDirection:'row',justifyContent:'space-evenly',alignContent:'center',alignItems:'center', marginTop:20}}>
                            <FontAwesomeIcon color={ '#fff' }  size={ 55 } icon={ faChartArea } />
                            <Text style={style.valor}>{this.state.TicketsAb}</Text>
                        </View>
                    </View> 
                    {/* cards */}

                    {/* animação */}
                    <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <LottieView source={require('../Animacao/drawkit-grape-animation-7-LOOP.json')} autoPlay loop style={{height:300,width:300}}/>
                    </View>
                    {/* animação */}

                    {/* projetos em andamento */}
                    <View style={style.cardAndamento}>
                        <List>
                            {
                                this.state.dataProj.map((dados,i)=>{
                                    return(
                                    <ListItem key={i}>
                                        <View  style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                            <Text style={style.textAndamento}>{dados.nome}</Text>
                                            <Text style={style.textAndamento}>{dados.progresso}%</Text>
                                        </View>
                                    </ListItem>
                                    )
                                })
                            }
                        </List>
                    </View>
                    {/* projetos em andamento */}
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
        fontSize:60,
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
