import React from 'react';
import { StyleSheet,View,Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';

import { StackActions, NavigationActions } from 'react-navigation';
const slides = [
  {
    key: 'one',
    title: 'Bem Vindo !',
    text: 'Esse é o app feito para os nossos clientes e temos certeza que você vai amar.',
    anima: require('../Animacao/24972-hi.json'),
    backgroundColor: '#6f3a80',
  },
  {
    key: 'two',
    title: 'Tudo que você precisa.',
    text: 'Aqui você irá encontrar todas as informações que você precisa saber sobre o seu projeto com a WF',
    anima: require('../Animacao/27315-appointment-booking-with-smartphone.json'),
    backgroundColor: '#e9447b',
  },
  {
    key: 'three',
    title: 'Contato',
    text: 'E claro poderá entrar em contato com nossa equipe muito mais rápido, abrir chamados e muito mais, bora começar ?',
    anima: require('../Animacao/30852-dating-app-online-chat.json'),
    backgroundColor: '#510d67',
  }
];

export default class Intro extends React.Component {
  state = {
    showRealApp: false
  }


  _renderItem = ({ item }) => {
    return (
      <View style={{...styles.corpo,backgroundColor:item.backgroundColor}}>
        <Text style={styles.title}>{item.title}</Text>
        <LottieView source={item.anima} autoPlay loop style={{height:300,width:300}}/>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }


  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }


  render() {
    if (this.state.showRealApp) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Inicio' })],
      });    
      return this.props.navigation.dispatch(resetAction);;
    } else {
      return <AppIntroSlider renderItem={this._renderItem} doneLabel={'Vamos!'} nextLabel={'próximo'} data={slides} onDone={this._onDone}/>;
    }
  }
}


const styles = StyleSheet.create({
    slide:{},
    title:{
      color:'#fff',
      fontSize:35
    },
    image:{},
    text:{
      color:'#fff',
      padding:15,
      textAlign:'center',
      fontSize:20
    },
    corpo:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
})