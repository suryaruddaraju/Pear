import React, { Component } from 'react';
import { onChangeText, value, StyleSheet, Platform, Image, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import {RNCamera} from 'react-native-camera'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Body, Title } from 'native-base';

import Tabbar from '../components/Tabbar';

export default class camera extends Component {

  constructor(){
    super();
    this.state = { cam: true, username: null };
    const em = firebase.auth().currentUser.email;
    const db = firebase.database().ref();
    db.child("MAP").child(em.substring(0, em.length-4)).child("username").on('value', snapshot => {
        this.setState({ username: snapshot.val() });
    });
  }

  barcodeReceived = (e) => {
    const db = firebase.database().ref();
    var contacts = {};
      this.setState(state => ({ cam: false, added_em: e.data }));
      db.child("MAP").child(e.data.substring(0, e.data.length-4)).on('value', snapshot => {
          db.child("Users").child(this.state.username).child("Contacts").on('value', snapshot => {
              contacts = snapshot.val();
          })
          contacts[snapshot.val()["username"]] = snapshot.val()["name"];
      });
  }


  render() {
    if (this.state.cam === true) {
    return (
      <View style={styles.container}>
        <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style = {styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={this.barcodeReceived}
          />
          <Tabbar/>
      </View>
    );
   }
   else{
     return null;
   }
//  }
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
