import React from 'react';
import { StyleSheet,View,Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';

const slides = [
  {
    key: 'one',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    anima: require('../Animacao/24972-hi.json'),
    backgroundColor: '#6f3a80',
  },
  {
    key: 'two',
    title: 'Title 2',
    text: 'Other cool stuff',
    anima: require('../Animacao/27315-appointment-booking-with-smartphone.json'),
    backgroundColor: '#e9447b',
  },
  {
    key: 'three',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
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
      return this.props.navigation.push('Inicio');
    } else {
      return <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone}/>;
    }
  }
}


const styles = StyleSheet.create({
    slide:{},
    title:{},
    image:{},
    text:{},
    corpo:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
})