import React from 'react';
import { StyleSheet, Platform, Image, Text, View, StatusBar } from 'react-native';

import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID } from 'react-native-dotenv';

import firebase from 'react-native-firebase';

import Login from './apps/pages/Login';
import Signup from './apps/pages/Signup';
import Home from './apps/pages/Home';

import { Router, Scene } from 'react-native-router-flux';

export default class App extends React.Component {

  componentWillMount() {
    firebase.initializeApp({ //initializeApp
      apiKey: APIKEY,
      authDomain: AUTHDOMAIN,
      databaseURL: DATABASEURL,
      projectId: PROJECTID,
      storageBucket: STORAGEBUCKET,
      messagingSenderId: MESSAGINGSENDERID
    });
  }

  render() {
    return(
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="login" component={Login} initial={true}/>
          <Scene key="register" component={Signup}/>
          <Scene key="home" component={Home}/>
        </Scene>
     </Router>
    )

  }

}

const styles = StyleSheet.create({
  container : {
     backgroundColor:'#d1e231',
     flexGrow: 1,
     alignItems:'center',
     justifyContent:'center',
  }
});
