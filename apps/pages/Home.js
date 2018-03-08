import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Platform, StyleSheet, Text, View, TextInput, Image, CheckBox, Switch, Alert, ScrollView } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, TouchableOpacity } from 'native-base';
//import { Col, Row, Grid } from "react-native-easy-grid";

export default class Home extends Component {

  constructor() {
    super();
    var db = firebase.database().ref();
    var em = firebase.auth().currentUser.email;
    db.once('value').then(snapshot => {
        this.username = snapshot.child("MAP").child(em.substring(0, em.length-4)).val();
        //alert("USERNAME: " + this.username);
    });
  }

  //sets initial condition of switches
  state = {
    snapSwitchVal: true,
    faceSwitchVal: true,
    instaSwitchVal: true,
    twitSwitchVal: true
  }

  snapChangeFunction() {
    this.setState(state => ({
      snapSwitchVal: !state.snapSwitchVal
    }))
    Alert.alert("Changed", "==> " + !this.state.snapSwitchVal);
  }

  faceChangeFunction() {
    this.setState(state => ({
      faceSwitchVal: !state.faceSwitchVal
    }))
    Alert.alert("Changed", "==> " + !this.state.faceSwitchVal);
  }

  instaChangeFunction() {
    this.setState(state => ({
      instaSwitchVal: !state.instaSwitchVal
    }))
    Alert.alert("Changed", "==> " + !this.state.instaSwitchVal);
  }

  twitChangeFunction() {
    this.setState(state => ({
     twitSwitchVal: !state.twitSwitchVal
    }))
    Alert.alert("Changed", "==> " + !this.state.twitSwitchVal);
  }

  _onSaveFunction() {
    //Add Firebase code here.
    //On Save, send OPPOSITE of state value, since we're "notting" the value for the switches to work.
    Alert.alert("Saved.");
  }

  // //functions to handle state changes
  // _handleToggleSnap = () => this.setState(state => ({
  //   snapSwitchVal: !state.snapSwitchVal
  // }))

  // _handleToggleFace = () => this.setState(state => ({
  //   faceSwitchVal: !state.faceSwitchVal
  // }))

  // _handleToggleInsta = () => this.setState(state => ({
  //   instaSwitchVal: !state.instaSwitchVal
  // }))

  // _handleToggleTwitter = () => this.setState(state => ({
  //   twitterSwitchVal: !state.twitterSwitchVal
  // }))

  onSignOut() {
    this.setState({ error: '', loading: true });
    firebase.auth().signOut()
    .then(
      () => {
        this.setState({ error: '', loading: false });
        alert("signed out!");
      })
    .catch(function(error) {
    // Handle Errors here.
      alert(error.code);
      alert(error.message);
    // ...
    });
  }

  render() {
    return (




      <View style={styles.container}>
        <View>
          <Header style={styles.header}>
            <Left style={{flex: 1}}></Left>
            <Body style={{flex: 1}}>
              <Text style={styles.title}>Settings</Text>
            </Body>
            <Right style={{flex: 1}}>
              <Button style={styles.buttons} onPress={this._onSaveFunction}>
                <Text style={styles.buttonText}>Save</Text>
              </Button>
            </Right>
          </Header>
        </View>

        <ScrollView style={styles.body}>

          <View>
            <Text style={styles.profileInfoHeading}>User Info</Text>
          </View>
          <View>
            <Text style={styles.profileInfo}>Username: {this.username}</Text>
            <Text style={styles.profileValues}>Put variable here!</Text>
            <Text style={styles.profileInfo}>Email: {em}</Text>
            <Text style={styles.profileValues}>Put variable here!</Text>
          </View>

          <View>
            <Text style={styles.profileInfoHeading}>Pearing Apps</Text>
          </View>

          <View>
            <View>
              <Text style={styles.pearingInfo}>Snapchat:</Text>
            </View>
            <View style={styles.inline}>
              <TextInput style={styles.editable}
                placeholder="Snapchat Username"
              />
              <View style={styles.switch}>
                <Switch
                  onValueChange={(value) => this.snapChangeFunction()}
                  value={this.state.snapSwitchVal}
                />
              </View>
            </View>
          </View>

          <View>
            <View>
              <Text style={styles.pearingInfo}>Facebook:</Text>
            </View>
            <View style={styles.inline}>
              <TextInput style={styles.editable}
                placeholder="Facebook Profile Link"
              />
              <View style={styles.switch}>
                <Switch
                  onValueChange={(value) => this.faceChangeFunction()}
                  value={this.state.faceSwitchVal}
                />
              </View>
            </View>
          </View>

          <View>
            <View>
              <Text style={styles.pearingInfo}>Instagram:</Text>
            </View>
            <View style={styles.inline}>
              <TextInput style={styles.editable}
                placeholder="Instagram Handle"
              />
              <View style={styles.switch}>
                <Switch
                  onValueChange={(value) => this.instaChangeFunction()}
                  value={this.state.instaSwitchVal}
                />
              </View>
            </View>
          </View>

          <View>
            <View>
              <Text style={styles.pearingInfo}>Twitter:</Text>
            </View>
            <View style={styles.inline}>
              <TextInput style={styles.editable}
                placeholder="Twitter Username"
              />
              <View style={styles.switch}>
                <Switch
                  onValueChange={(value) => this.twitChangeFunction()}
                  value={this.state.twitSwitchVal}
                />
              </View>
            </View>
          </View>

          {/* <View>
          <Text style={styles.pearingInfo}>Facebook:</Text>
          </View>
          <View style={styles.switch}>
            <Switch
              onValueChange={(value) => this.faceChangeFunction()}
              value={this.state.faceSwitchVal}
            />
          </View>

          <View>
          <Text style={styles.pearingInfo}>Instagram:</Text>
          </View>
          <View style={styles.switch}>
            <Switch
              onValueChange={(value) => this.instaChangeFunction()}
              value={this.state.instaSwitchVal}
            />
          </View>

          <View>
          <Text style={styles.twitterInfo}>Twitter:</Text>
          </View>
          <View style={styles.switch}>
            <Switch
              onValueChange={(value) => this.twitChangeFunction()}
              value={this.state.twitSwitchVal}
            />
          </View> */}


        </ScrollView>
      </View>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e231',
  },
  body: {
    padding: 5,
  },
  title: {
    fontSize: 35,
    color: '#ffffff',
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#006600',
  },
  buttons: {
    backgroundColor: '#006600',
    elevation: 0,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
  profileInfoHeading: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 15,
    color: '#333333',
  },
  profileInfo: {
    margin: 10,
    textDecorationLine: 'underline',
    fontSize: 15,
    color: '#333333',
    // width:
  },
  profileValues: {
    marginLeft: 15,
    color: '#000000'
  },
  pearingInfo: {
    margin: 10,
    textDecorationLine: 'underline',
    fontSize: 15,
    color: '#333333',
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  editable: {
    minWidth: 150,
    maxWidth: 300,
    marginLeft: 15,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderRadius: 10,
    height: 40,
  },

});
