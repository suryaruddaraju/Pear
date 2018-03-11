import React from 'react';
import { onChangeText, value, StyleSheet, Platform, Image, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
//import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID } from 'react-native-dotenv';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera'

export default class Cam extends React.Component {

  state = { loading: false };
  // firebase state constructor
  constructor() {
      super();
      this.state = {
          loading: true, //set loading state
      };
  }

  takePicture() {
      const options = {}
      this.camera.capture({metadata: options}).then((data) => {
          console.log(data)
      }).catch((error) => {
          console.log(error)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.view}
          aspect={Camera.constants.Aspect.fill}>
            <Text
            style={styles.capture}
            onPress={this.takePicture.bind(this)}>
              [CAPTURE_IMAGE]
            </Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'steelblue',
    borderRadius: 10,
    color: 'red',
    padding: 15,
    margin: 45
  }
});
