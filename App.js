import React from 'react';
import { StyleSheet, Platform, Image, Text, View, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';

//import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID } from 'react-native-dotenv';

import firebase from 'react-native-firebase';

import Login from './apps/pages/Login';
import Signup from './apps/pages/Signup';
import Home from './apps/pages/Home';
import QrCode from './apps/pages/qr';
import camera from './apps/pages/camera';
import Init from './apps/pages/Init';
import Contacts from './apps/pages/Contacts';
import ContactDetails from './apps/pages/contactdetail';


import { Router, Scene } from 'react-native-router-flux';

export default class App extends React.Component {

  componentWillMount() {
    /*firebase.initializeApp({ //initializeApp
      apiKey: APIKEY,
      authDomain: AUTHDOMAIN,
      databaseURL: DATABASEURL,
      projectId: PROJECTID,
      storageBucket: STORAGEBUCKET,
      messagingSenderId: MESSAGINGSENDERID
    });*/
  }

  render() {
    return(
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="login" component={Login} initial={true}/>
          <Scene key="register" component={Signup}/>
          <Scene key="home" component={Home}/>
          <Scene key="qr" component={QrCode}/>
          <Scene key="cam" component={camera}/>
          <Scene key="init" component={Init}/>
          <Scene key="contacts" component={Contacts}/>
          <Scene key="contactdetails" component={ContactDetails}/>
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
