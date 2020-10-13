import React, { Component } from 'react'
import {  View, ScrollView,ActivityIndicator } from 'react-native'
import NavegacaoTab from '../../Componentes/navegacaoTab'
import apiWF from '../../api'
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faCaretSquareUp} from '@fortawesome/free-solid-svg-icons'
import { Form, Item, Picker, Text, Button,Textarea  } from 'native-base';

export default class TNovo extends Component {
    static navigationOptions = {
        title: 'Novo',
      };
    state ={
        tipo: '',
        idCLi:'',
        descricao:''
    }

    async onSubmit(e){
        const dados = { 
            idCliente:this.state.idCLi,
            status:'Pendente',
            assunto:this.state.tipo,
            mensagem:this.state.descricao
        }
        await apiWF.post('http://wfdesenvolvimento.com.br/api/suporte', dados)
            .then(response => {
                this.setState({
                    tipo:'',
                    descricao:''
                })
                alert('Salvo')

            })
            .catch(error => {
                console.error('aqui', error);
            });
    }

    onValueChange(value) {
        this.setState({
            tipo: value
        });
      }

    
    pegaStor = async()=>{
        const id = await AsyncStorage.getItem('id');
        this.setState({
            idCLi:id
        })
    }
   

    componentDidMount(){
        this.pegaStor()
    }



    render() {
        return (
            <>
                <ScrollView style={{marginBottom:60}}>
                    <Form style={{paddingLeft:25,paddingRight:25}}>
                        <Item picker style={{}}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<FontAwesomeIcon color={ '#458083' }  size={ 32 } icon={ faChevronDown } />}
                                style={{ width: undefined }}
                                placeholder="Selecione a cor"
                                placeholderStyle={{ color: "#458083" }}
                                placeholderIconColor="#458083"
                                selectedValue={this.state.selecionado}
                                onValueChange={(e)=>{this.onValueChange(e)}}
                                textStyle={{ color: "#458083",fontSize:20 }}
                                itemStyle={{
                                    color: "#458083",
                                    fontSize:20
                                    }}
                            >
                                <Picker.Item key={0} label={'Suporte site'} value={'Suporte site'} />
                                <Picker.Item key={1} label={'Suporte loja virtual'} value={'Suporte loja virtual'} />
                                <Picker.Item key={2} label={'Suporte Sistema'} value={'Suporte Sistema'} />
                                <Picker.Item key={3} label={'Suporte App'} value={'Suporte App'} />
                                <Picker.Item key={4} label={'Aplicação fora do ar'} value={'Aplicação fora do ar'} />
                                <Picker.Item key={5} label={'Pedido de orçamento'} value={'Pedido de orçamento'} />
                            </Picker>
                        </Item>
                        <Textarea rowSpan={8} onChangeText={(text)=>{this.setState({descricao:text})}} bordered placeholder="Descritivo do suporte" />
                        <View style={{marginTop:20,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Button onPress={(e)=>this.onSubmit(e)} rounded success>
                                <Text>Enviar</Text>
                            </Button>
                        </View>               
                    </Form>
                </ScrollView>
                <NavegacaoTab navega={this.props.navigation}/>
            </>
        )
    }
}
