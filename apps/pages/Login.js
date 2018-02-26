import React from 'react';
import { StyleSheet, Platform, Image, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Logo from '../components/Logo';
import Form from '../components/Form';
//import Routes from '../Routes.js';

export default class Login extends React.Component {

  //to signup page
  toSignup(){
    Actions.register();
  }

  render() {
    return(
      <View style={styles.container}>
      <Logo/>
      <Form type="Login"/>
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Do not have an account yet?</Text>
        <TouchableOpacity onPress={() => Actions.register()}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
      </View>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container : {
     backgroundColor:'#d1e231',
     flex: 1,
     alignItems:'center',
     justifyContent:'center',

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
