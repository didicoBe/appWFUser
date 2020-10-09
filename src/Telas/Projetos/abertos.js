import React, { Component } from 'react'
import {  View, ScrollView } from 'react-native'
import NavegacaoTab from '../../Componentes/navegacaoTab'
import apiWF from '../../api'
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

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
            })

            if(response.data.length > 0){
                this.setState({loading:false})
            }
            
        }).catch(e=>{
             console.log(e);
        })  
    }



    componentDidMount(){
        this.pegaProjetos()
    }



    render() {
        return (
            <>
                <ScrollView style={{marginBottom:60}}>
                    <Content>
                        <List>
                            {
                                this.state.data.map((dados,i)=>{
                                    return (
                                        <ListItem key={i} onPress={()=>this.props.navigation.navigate('Detalhes',{projeto:dados})}>
                                            <Text>{dados.nome}</Text>
                                        </ListItem>
                                    )
                                })
                            }
                            
                        </List>
                    </Content>
                </ScrollView>
                <NavegacaoTab navega={this.props.navigation}/>
            </>
        )
    }
}
