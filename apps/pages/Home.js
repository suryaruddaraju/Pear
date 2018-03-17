import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Platform, StyleSheet, Text, View, TextInput, Image, CheckBox, Switch, Alert, ScrollView } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, TouchableOpacity } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Tabbar from '../components/Tabbar';


export default class Home extends Component {

  constructor() {
    super();
    const em = firebase.auth().currentUser.email;

    var db = firebase.database().ref();
    this.state = { eml: em, username: null, facebook: null, instagram: null, snapchat: null, twitter: null, linkedin: null, whatsapp: null,
                  snapSwitchVal: false, faceSwitchVal: false, instaSwitchVal: false, twitSwitchVal: false, linkSwitchVal: false, whatSwitchVal: false, };


    db.child("MAP").child(em.substring(0, em.length-4)).child("username").on('value', snapshot => {
        this.setState({
            username: snapshot.val()
        })
        db.child("Users").child(this.state.username).child("Profile").child("Facebook").on('value', snapshot => {
            this.setState({
                facebook: snapshot.val()["account"],
                faceSwitchVal: snapshot.val()["status"]
            })
        })
        db.child("Users").child(this.state.username).child("Profile").child("Instagram").on('value', snapshot => {
            this.setState({
                instagram: snapshot.val()["account"],
                instaSwitchVal: snapshot.val()["status"]
            })
        })
        db.child("Users").child(this.state.username).child("Profile").child("Snapchat").on('value', snapshot => {
            this.setState({
                snapchat: snapshot.val()["account"],
                snapSwitchVal: snapshot.val()["status"]
            })
        })
        db.child("Users").child(this.state.username).child("Profile").child("Twitter").on('value', snapshot => {
            this.setState({
                twitter: snapshot.val()["account"],
                twitSwitchVal: snapshot.val()["status"]
            })
        })
        db.child("Users").child(this.state.username).child("Profile").child("LinkedIn").on('value', snapshot => {
            this.setState({
                linkedin: snapshot.val()["account"],
                linkSwitchVal: snapshot.val()["status"]
            })
        })
        db.child("Users").child(this.state.username).child("Profile").child("WhatsApp").on('value', snapshot => {
            this.setState({
                whatsapp: snapshot.val()["account"],
                whatSwitchVal: snapshot.val()["status"]
            })
        })
    })

  }

  componentWillMount() {

  }

  //sets initial condition of switches


  snapChangeFunction() {
    this.setState(state => ({
      snapSwitchVal: !this.state.snapSwitchVal
    }))
    var db = firebase.database().ref();
    db.child("MAP").child(this.state.eml.substring(0, this.state.eml.length-4)).child("username").on('value', snapshot => {
        db.child("Users").child(snapshot.val()).child("Profile").child("Snapchat").update({
              "status" : this.state.snapSwitchVal
        });
    })
  }

  faceChangeFunction() {
    this.setState(state => ({
      faceSwitchVal: !this.state.faceSwitchVal
    }))
    var db = firebase.database().ref();
    db.child("MAP").child(this.state.eml.substring(0, this.state.eml.length-4)).child("username").on('value', snapshot => {
        db.child("Users").child(snapshot.val()).child("Profile").child("Facebook").update({
              "status" : this.state.faceSwitchVal
        });
    })

  }

  instaChangeFunction() {
    this.setState(state => ({
      instaSwitchVal: !this.state.instaSwitchVal
    }))
    var db = firebase.database().ref();
    db.child("MAP").child(this.state.eml.substring(0, this.state.eml.length-4)).child("username").on('value', snapshot => {
        db.child("Users").child(snapshot.val()).child("Profile").child("Instagram").update({
              "status" : this.state.instaSwitchVal
        });
    })

  }

  twitChangeFunction() {
    this.setState(state => ({
      twitSwitchVal: !this.state.twitSwitchVal
    }))
    var db = firebase.database().ref();
    db.child("MAP").child(this.state.eml.substring(0, this.state.eml.length-4)).child("username").on('value', snapshot => {
        db.child("Users").child(snapshot.val()).child("Profile").child("Twitter").update({
              "status" : this.state.twitSwitchVal
        });
    })
  }

  linkChangeFunction() {
    this.setState(state => ({
     linkSwitchVal: !this.state.linkSwitchVal
    }))
    var db = firebase.database().ref();
    db.child("MAP").child(this.state.eml.substring(0, this.state.eml.length-4)).child("username").on('value', snapshot => {
        db.child("Users").child(snapshot.val()).child("Profile").child("LinkedIn").update({
              "status" : this.state.linkSwitchVal
        });
    })

  }

  whatChangeFunction() {
    this.setState(state => ({
     whatSwitchVal: !state.this.whatSwitchVal
    }))
    var db = firebase.database().ref();
    db.child("MAP").child(this.state.eml.substring(0, this.state.eml.length-4)).child("username").on('value', snapshot => {
        db.child("Users").child(snapshot.val()).child("Profile").child("WhatsApp").update({
              "status" : this.state.whatSwitchVal
        });
    })

  }

  _onSaveFunction = () => {
        var db = firebase.database().ref();
        db.child("MAP").child(this.state.eml.substring(0, this.state.eml.length-4)).child("username").on('value', snapshot => {
            db.child("Users").child(snapshot.val()).child("Profile").child("Facebook").update({
                "account": this.state.facebook,
            });
            db.child("Users").child(snapshot.val()).child("Profile").child("Instagram").update({
                "account": this.state.instagram,
            });
            db.child("Users").child(snapshot.val()).child("Profile").child("Snapchat").update({
                "account": this.state.snapchat,
            });
            db.child("Users").child(snapshot.val()).child("Profile").child("Twitter").update({
                "account": this.state.twitter,
            });
            db.child("Users").child(snapshot.val()).child("Profile").child("LinkedIn").update({
                "account": this.state.linkedin,
            });
            db.child("Users").child(snapshot.val()).child("Profile").child("WhatsApp").update({
                "account": this.state.whatsapp,
            });
        })

    }

  _onSignOutFunction() {
    firebase.auth().signOut()
    .then(() => {
        Actions.login();
      })
    .catch(function(error) {
    // Handle Errors here.
      alert(error.code);
      alert(error.message);
    // ...
    });
  }

  handleSnap = (typedText) => {
      this.setState({snapchat: typedText});
  }

  handleFB = (typedText) => {
      this.setState({facebook: typedText});
  }

  handleTweet = (typedText) => {
      this.setState({twitter: typedText});
  }

  handleLink = (typedText) => {
      this.setState({linkedin: typedText});
  }

  handleInsta = (typedText) => {
      this.setState({instagram: typedText});
  }

  handleWhat = (typedText) => {
      this.setState({whatsapp: typedText});
  }

  render() {
        return (
          <View style={styles.container}>
            <View>
              <Header style={styles.header}>
                <Left style={{flex: 1}}>
                  <Button style={styles.buttons} onPress={this._onSignOutFunction}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                  </Button>
                </Left>
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

              <View style={{marginTop: 13}}></View>
              <View style={styles.inlineUserInfo}>
                <Text style={styles.profileInfo}>Username: {this.state.username}</Text>
              </View>
              <View style={styles.inlineUserInfo}>
                <Text style={styles.profileInfo}>Email: {this.state.eml}</Text>
              </View>
              {/* PEARING APPLICATIONS START HERE ---------------------------------------------------------- */}
              <View style={{marginTop: 20}}></View>
              <View>
                <View>
                  <Text style={styles.pearingInfo}>Snapchat:</Text>
                </View>
                <View style={styles.inline}>
                  <TextInput style={styles.editable}
                    placeholder="Snapchat Username"
                    value={this.state.snapchat}
                    onChangeText={this.handleSnap}
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
                    onChangeText={this.handleFB}
                    value={this.state.facebook}
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
                    value={this.state.instagram}
                    onChangeText={this.handleInsta}
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
                    value={this.state.twitter}
                    onChangeText={this.handleTweet}
                  />
                  <View style={styles.switch}>
                    <Switch
                      onValueChange={(value) => this.twitChangeFunction()}
                      value={this.state.twitSwitchVal}
                    />
                  </View>
                </View>
              </View>

              <View>
                <View>
                  <Text style={styles.pearingInfo}>Linkedin:</Text>
                </View>
                <View style={styles.inline}>
                  <TextInput style={styles.editable}
                    placeholder="Linkedin Profile Link"
                    value={this.state.linkedin}
                    onChangeText={this.handleLink}
                  />
                  <View style={styles.switch}>
                    <Switch
                      onValueChange={(value) => this.linkChangeFunction()}
                      value={this.state.linkSwitchVal}
                    />
                  </View>
                </View>
              </View>

              <View>
                <View>
                  <Text style={styles.pearingInfo}>WhatsApp:</Text>
                </View>
                <View style={styles.inline}>
                  <TextInput style={styles.editable}
                    placeholder="WhatsApp Phone #"
                    value={this.state.whatsapp}
                    onChangeText={this.handleWhat}
                  />
                  <View style={styles.switch}>
                    <Switch
                      onValueChange={(value) => this.whatChangeFunction()}
                      value={this.state.whatSwitchVal}
                    />
                  </View>
                </View>
              </View>

              <View>
                <Text style={{fontSize: 47}}>  </Text>
              </View>

            </ScrollView>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
            </View>
            <Tabbar/>
          </View>
        )
      }
    }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e231',
  },
  cont: {
    flex: 1,
    backgroundColor: '#d1e231',
  },
  body: {
    padding: 5,
  },
  title: {
    fontSize: 26,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10
  },
  header: {
    backgroundColor: 'black',
    marginTop: 20
  },
  buttons: {
    backgroundColor: 'black',
    elevation: 0,
    marginBottom: 5
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
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
    fontSize: 18,
    color: '#333333',
    // width:
  },
  profileValues: {
    fontSize: 20,

    marginLeft: 10,
    color: '#000000'
  },
  pearingInfo: {
    margin: 10,
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
    fontSize: 15,
    color: '#333333',
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inlineUserInfo: {
    marginTop: 10,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
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
