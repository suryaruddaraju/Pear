import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Image,
        CheckBox, Switch, Alert, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { Header, Body, Icon, Title } from 'native-base';

export default class Init extends Component {
  constructor() {
    super();
    var em = firebase.auth().currentUser.email;
  }

  //sets initial condition of switches
  state = {
    Snapchat: "",
    Facebook: "",
    Intagram: "",
    Twitter: "",
    LinkedIn: "",
    WhatsApp: ""
  }



  onSaveFunction = () => {
      if (!this.state.Facebook && !this.state.Snapchat && !this.state.Instagram && !this.state.Twitter && !this.state.LinkedIn && !this.state.WhatsApp) {
          alert("Please fill out at least one field.");
          return;
      }
      var db = firebase.database().ref();
      var em = firebase.auth().currentUser.email;
      db.child("MAP").child(em.substring(0, em.length-4)).child("username").on('value', snapshot => {
          db.child("Users").child(snapshot.val()).child("Profile").update({
              "Facebook": {"account" :  this.state.Facebook, "status" : false},
              "Instagram": {"account" : this.state.Instagram, "status" : false},
              "Twitter": {"account" : this.state.Twitter, "status" : false},
              "Snapchat": {"account" : this.state.Snapchat, "status" : false},
              "LinkedIn": {"account" : this.state.LinkedIn, "status" : false},
              "WhatsApp": {"account" : this.state.WhatsApp, "status" : false},
          });
      })
      Actions.home();
      //Add Firebase code here.
      //On Save, send OPPOSITE of state value, since we're "notting" the value for the switches to work.
      //Alert.alert("Saved.");
    }

  render() {

    const tableData = [
      ['Snapchat:', <View style={{height:50 }}><TextInput style={styles.editable}
                               placeholder={" Snapchat Handle"}
                               onChangeText={(Snapchat) => this.setState({Snapchat})}
                               value={this.state.Snapchat}/></View>],
      ['Facebook:', <View style={{height:50 }}><TextInput style={styles.editable}
                               placeholder={" Facebook Profile Link"}
                               onChangeText={(Facebook) => this.setState({Facebook})}
                               value={this.state.Facebook}/></View>],
      ['Instagram:', <View style={{height:50 }}><TextInput style={styles.editable}
                                placeholder={" Instagram Handle"}
                                onChangeText={(Instagram) => this.setState({Instagram})}
                                value={this.state.Instagram}/></View>],
      ['Twitter:', <View style={{height:50 }}><TextInput style={styles.editable}
                              placeholder={" Twitter handle"}
                              onChangeText={(Twitter) => this.setState({Twitter})}
                              value={this.state.Twitter}/></View>],
      ['LinkedIn:', <View style={{height:50 }}><TextInput style={styles.editable}
                               placeholder={" LinkedIn Profile Link"}
                               onChangeText={(LinkedIn) => this.setState({LinkedIn})}
                               value={this.state.LinkedIn}/></View>],
      ['WhatsApp:', <View style={{height:50 }}><TextInput style={styles.editable}
                               placeholder={" Whats App Phone #"}
                               onChangeText={(WhatsApp) => this.setState({WhatsApp})}
                               value={this.state.WhatsApp}/></View>]
    ]

    return (
      <View style={styles.container}>
      <View>
        <Header style={styles.header}>
          <Body style={{flex: 1}}>
            <Text style={styles.title}>Add Information</Text>
          </Body>
        </Header>
      </View>
        <View style={styles.body}>

          <View style={styles.spacing}>
            <Table style={styles.table} borderStyle={{borderWidth: 0, borderColor: '#000000'}}>
              <Rows data={tableData} textStyle={styles.text} widthArr={[100, 300]}/>
            </Table>
          </View>

          <View style={styles.spacing2}>
            <TouchableOpacity style={styles.saveButton}
                              onPress={this.onSaveFunction}>
                              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

    )
  }

}


const styles = StyleSheet.create({
  table: { width: 360 },
  text: { textAlign: 'center' },
  row: { height: 28 },
  container: {
    flex: 1,
    backgroundColor: '#d1e231',
  },
  body: {
    margin: 10,
  },
  spacing: {
    marginTop: 50
  },
  spacing2: {
    marginTop:30
  },
  body: {
    padding: 5,
  },
  button: {
    flex: 1,
    borderRadius: 5,
    width: 100,
    backgroundColor: '#006600',
    elevation: 0,
  },
  editable: {
    minWidth: 250,
    maxWidth: 250,
    // marginLeft: 15,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderRadius: 10,
    height: 40,
  },
  saveButton: {
    //backgroundColor:'#1E6738',
    backgroundColor: '#000000',
    borderRadius:10,
    alignContent: 'center',
    height: 40
  },
  saveText:{
    color:'#fff',
    textAlign:'center',
    fontSize: 20,
    marginTop: 4
  },
  title: {
    fontSize: 26,
    color: '#ffffff',
    textAlign: 'center',
  },
  header: {
    backgroundColor: 'black',
  }
});
