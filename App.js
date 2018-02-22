import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';

import firebase from 'react-native-firebase';

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
    if (this.state.loading) alert("he");
    if (this.state.user) alert("user");
    return (
      <View style={styles.container}>
        <Image source={require('./assets/RNFirebase512x512.png')} style={[styles.logo]} />
        <Text style={styles.welcome}>
          Welcome to the React Native{'\n'}Firebase starter project!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        {Platform.OS === 'ios' ? (
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        ) : (
          <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            Cmd+M or shake for dev menu
          </Text>
        )}
        <View style={styles.modules}>
          <Text style={styles.modulesHeader}>The following Firebase modules are enabled:</Text>
          {firebase.admob.nativeModuleExists && <Text style={styles.module}>Admob</Text>}
          {firebase.analytics.nativeModuleExists && <Text style={styles.module}>Analytics</Text>}
          {firebase.auth.nativeModuleExists && <Text style={styles.module}>Authentication</Text>}
          {firebase.fabric.crashlytics.nativeModuleExists && <Text style={styles.module}>Crashlytics</Text>}
          {firebase.crash.nativeModuleExists && <Text style={styles.module}>Crash Reporting</Text>}
          {firebase.firestore.nativeModuleExists && <Text style={styles.module}>Cloud Firestore</Text>}
          {firebase.messaging.nativeModuleExists && <Text style={styles.module}>Messaging</Text>}
          {firebase.perf.nativeModuleExists && <Text style={styles.module}>Performance Monitoring</Text>}
          {firebase.database.nativeModuleExists && <Text style={styles.module}>Realtime Database</Text>}
          {firebase.config.nativeModuleExists && <Text style={styles.module}>Remote Config</Text>}
          {firebase.storage.nativeModuleExists && <Text style={styles.module}>Storage</Text>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
