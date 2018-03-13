'use strict';
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
//import TabNavigator from 'react-native-tab-navigator';
import NavigationBar from 'react-native-navbar';
import Logo from '../components/Logo';
import Tab_Bar from '../components/tabbar.js';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native';

export default class QrCode extends React.Component {

  state = {
    text: firebase.auth().currentUser.email,
  };

  render() {
    return (
      <View style = {styles.container}>
          <View style={styles.body}>
            <QRCode
              value={this.state.text}
              size={200}
              bgColor='black'
              fgColor='#d1e231'/>
              <TouchableOpacity onPress={() => Actions.camera()} style={styles.button}><Text style={styles.buttonText}>Scan Code</Text></TouchableOpacity>
          </View>
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <NavigationBar
            tintColor="#006600"
            leftButton={leftButtonConfig}
            rightButton={rightButtonConfig}
          />
        </View>
      </View>
    );
  };
}

const rightButtonConfig = {
    title: 'Contacts',
    handler: () => Actions.contacts(),
    tintColor: '#ffffff'
};

const leftButtonConfig = {
    title: 'Settings',
    handler: () => Actions.home(),
    tintColor: '#ffffff'
};

const styles= StyleSheet.create({
  container : {
     flex: 1,
     backgroundColor: "#d1e231",
  },

  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: "column"
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
