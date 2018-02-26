import React from 'react';
import { StyleSheet, Platform, Image, Text, View, StatusBar } from 'react-native';

import firebase from 'react-native-firebase';

import Login from './apps/pages/Login';
import Signup from './apps/pages/Signup';
import Routes from './apps/Routes';

import { Router, Scene } from 'react-native-router-flux';

export default class App extends React.Component {
  // firebase things?
  constructor() {
    super();
    this.state = {
      loading: true, //set loading state
    };
  }

  // firebase things?
  //when component mounts, listen for state changes and reset state
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  //stop listening to state changes when component unmounts
  componentWillUnmount() {
    this.authSubscription();
  }

  onLogin = () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      //If you need to do anything with the user, do it here.
      //User will be logged in automatically by the onAuthStateChanged listener
    })
    .catch((error) => {
      const { code, message } = error;
      //Error message
    });
  }

  onRegister = () => {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
  }

  onLoginOrRegister = () => {
    const { phoneNumber } = this.state;
    firebase.auth().signInWithPhoneNumber(phoneNumber).then((confirmResult) => {
      // This means that the SMS has been sent to the user
      // You need to:
      //   1) Save the `confirmResult` object to use later
      this.setState({ confirmResult });
      //   2) Hide the phone number form
      //   3) Show the verification code form
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
  }

  onVerificationCode = () => {
    const { confirmResult, verificationCode } = this.state;
    confirmResult.confirm(verificationCode).then((user) => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
  }

  render() {
    if (this.state.loading) alert("hello");
    if (this.state.user) alert("user");
    return(
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="login" component={Login} initial={true}/>
          <Scene key="register" component={Signup}/>
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
