import React, { Component } from 'react'
import {  View, ScrollView,ActivityIndicator } from 'react-native'
import NavegacaoTab from '../../Componentes/navegacaoTab'
import apiWF from '../../api'
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Right, Content, List, ListItem, Text } from 'native-base';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, faCaretSquareUp} from '@fortawesome/free-solid-svg-icons'

export default class Abertos extends Component {
    state ={
        value: '',
        data:[],
        loading:true
    }

    pegaProjetos = async()=>{

        const id = await AsyncStorage.getItem('id');
            
        await apiWF.get('/projeto/'+id).then(response=>{
            var Finalizado = response.data.filter(data => data.status !== 'Finalizado')
            this.setState({
                data:Finalizado,
                loading:false
            })

            if(response.data.length > 0){
                this.setState({loading:false})
            }
            
        }).catch(e=>{
             console.log(e);
             this.setState({loading:false})
        })  
    }



    componentDidMount(){
        this.pegaProjetos()
    }



    render() {
        return (
            <>
                <ScrollView style={{marginBottom:60}}>
                {
                    this.state.loading ?
                        <View style={{flex: 1,justifyContent: "center",marginTop:150}}><ActivityIndicator size="large" color="#510d67" /></View> :
                        <Content>
                            <List>
                                {
                                    this.state.data.length > 0 ?
                                    this.state.data.map((dados,i)=>{
                                        return (
                                            <ListItem key={i} onPress={()=>this.props.navigation.navigate('Detalhes',{projeto:dados})}
                                                style={{justifyContent:'space-between'}}>
                                                <Text>{dados.nome}</Text>
                                                <Right>
                                                    <FontAwesomeIcon color={ '#510d67' }  size={ 15 } icon={ faChevronRight } />
                                                </Right>
                                            </ListItem>
                                        )
                                    }): <View style={{flex: 1,justifyContent: "center",marginTop:150}}><Text style={{textAlign:'center'}}>Nenhum projeto localizado</Text></View>
                                }
                                
                            </List>
                        </Content>
                }
                </ScrollView>
                <NavegacaoTab navega={this.props.navigation}/>
            </>
        )
    }
}
