import React from 'react';
import { onChangeText, value, StyleSheet, Platform, Image, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
//import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID } from 'react-native-dotenv';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera'
import {RNCamera} from 'react-native-camera'

export default class Cam extends React.Component {

  state = { loading: false };
  // firebase state constructor
  constructor() {
      super();
      this.state = { cam: true, username: null };
      const em = firebase.auth().currentUser.email;
      var db = firebase.database().ref();
      db.child("MAP").child(em.substring(0, em.length-4)).on('value', snapshot => {
          this.setState({ username: snapshot.val() });
          alert(this.state.username);
      });
  }

  barcodeReceived = (e) => {
      alert(e.data);
      this.setState(state => ({ cam: false, added_em: e.data }));
      db.child("MAP").child(this.state.added_em.substring(0, this.state.added_em.length-4)).on('value', snapshot => {
          db.child("Users").child(this.state.username).child("Contacts").set({
              [snapshot.val()]: "KIRAN"
          });
      });
      Actions.qr();
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
              // style={styles.view}
              // aspect={Camera.constants.Aspect.fill}>
              //   <Text
              //   style={styles.capture}
              //   onPress={this.takePicture.bind(this)}>
              //     [CAPTURE_IMAGE]
              //   </Text>
              barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
              onBarCodeRead={this.barcodeReceived}
              />
          </View>
        );
   }else{
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
