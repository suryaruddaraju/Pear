import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {RNCamera} from 'react-native-camera'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Body, Title } from 'native-base';

import Tabbar from '../components/Tabbar';

export default class camera extends Component {

  state = { loading: false };
  // firebase state constructor
  constructor() {
      super();
      this.state = { cam: true, username: null,  contacts: {} };
      const em = firebase.auth().currentUser.email;
      const db = firebase.database().ref();
      db.child("MAP").child(em.substring(0, em.length-4)).child("username").on('value', snapshot => {
          this.setState({ username: snapshot.val() });

      });
  }

//once the qr code is scanned, user info get saved into contacts
  barcodeReceived = (e) => {
  const db = firebase.database().ref();
  var contacts = {};

  this.setState(state => ({ cam: false, added_em: e.data }));
  db.child("MAP").child(e.data.substring(0, e.data.length-4)).on('value', snapshot => {
      alert("snapshot.val(): " + JSON.stringify(snapshot.val()));
      db.child("Users").child(this.state.username).child("Contacts").child(snapshot.val()["username"]).update({
          "name" : snapshot.val()["name"],
          "username" :snapshot.val()["username"]
      })

  });
    Actions.qr();
}

  //opens camera and scans qr codes only
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
