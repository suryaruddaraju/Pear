import React from 'react';
import { StyleSheet, Platform, Image, Text, View, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import Logo_Signup from '../components/Logo_Signup';
import Form from '../components/signupForm';

export default class Signup extends React.Component {
  //call logo component Logo_Signup
  //call form component signupForm
  //If you  already have an account, click this text button to go to signin
  render() {
    return(
      <View style={styles.container}>
      <Logo_Signup/>
      <Form type="Signup"/>
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => Actions.login()}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
      </View>

      </View>

    )
  }
}

const styles= StyleSheet.create({
  container : {
     backgroundColor:'#d1e231',
     flexGrow: 1,
     alignItems:'center',
     justifyContent:'center'
  },

  signupTextCont : {
    flexGrow: 1,
    alignItems:'flex-end',
    justifyContent:'center',
    paddingVertical: 16,
    flexDirection:'row'
  },

  signupText : {
    color:'rgba(128,128,128,0.7)',
    fontSize: 16
  },

  signupButton : {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  }
});
