'use strict';
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';

export default class QRCODE extends React.Component {

  state = {
    text: firebase.auth().currentUser.email,
  };

  render() {
    return (
      <View style = {styles.container}>
        <QRCode
          value={this.state.text}
          size={200}
          bgColor='black'
          fgColor='#d1e231'/>
      </View>
    );
  };
}

const styles= StyleSheet.create({
  container : {
     flex: 1,
     backgroundColor: "#d1e231",
     justifyContent:'center',
     alignItems:'center',
  },

  button : {
    width:300,
    height:40,
    backgroundColor:'rgba(128,128,128,0.4)',
    borderRadius: 20,
    marginVertical: 12,
    paddingVertical: 12,

  },

  buttonText : {
    fontSize: 16,
    fontWeight:'500',
    color:'rgba(255,255,255,0.8)',
    textAlign:'center'
  }
});
