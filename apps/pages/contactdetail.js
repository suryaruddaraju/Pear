import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Image, CheckBox, Switch, Alert, ScrollView,
   TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import firebase from 'react-native-firebase';


export default class ContactDetails extends Component {
  constructor(props) {
    //sets initial condition of switches
    //pull from FB!
    super(props);
    this.state = { snapchat:  null, facebook:  null, instagram: null, twitter:   null, linkedIn:  null, whatsApp:  null };
    var db = firebase.database().ref();
    db.child("Users").child(this.props.username).child("Profile").child("Facebook").on('value', snapshot => {
        if(snapshot.val()["status"]){
            this.setState({
                facebook: snapshot.val()["account"]
            })
        }
    })
    db.child("Users").child(this.props.username).child("Profile").child("Instagram").on('value', snapshot => {
        if(snapshot.val()["status"]){
            this.setState({
                instagram: snapshot.val()["account"]
            })
        }
        //alert(snapshot.val());
    })
    db.child("Users").child(this.props.username).child("Profile").child("Snapchat").on('value', snapshot => {
        if(snapshot.val()["status"]){
            this.setState({
                snapchat: snapshot.val()["account"]
            })
        }
    })
    db.child("Users").child(this.props.username).child("Profile").child("Twitter").on('value', snapshot => {
        if(snapshot.val()["status"]){
            this.setState({
                twitter: snapshot.val()["account"]
            })
        }
    })
    db.child("Users").child(this.props.username).child("Profile").child("LinkedIn").on('value', snapshot => {
        if(snapshot.val()["status"]){
            this.setState({
                linkedin: snapshot.val()["account"]
            })
        }
    })
    db.child("Users").child(this.props.username).child("Profile").child("WhatsApp").on('value', snapshot => {
        if(snapshot.val()["status"]){
            this.setState({
                whatsapp: snapshot.val()["account"]
            })
        }
    })
  }

  _onBackFunction = () => {
    Alert.alert("You have clicked back.");
  }

  render() {

    const tableData = [
      [<View>
        <Text style={{marginLeft: 80, margin: 10}}>Snapchat:</Text>
      </View>,
      <View>
        <Text>{this.state.snapchat}</Text>
      </View>],
      [<View>
        <Text style={{marginLeft: 80, margin: 10}}>Facebook:</Text>
      </View>,
      <View>
        <Text>{this.state.facebook}</Text>
      </View>],
      [<View>
        <Text style={{marginLeft: 80, margin: 10}}>Instagram:</Text>
      </View>,
      <View>
        <Text>{this.state.instagram}</Text>
      </View>],
      [<View>
        <Text style={{marginLeft: 80, margin: 10}}>Twitter:</Text>
      </View>,
      <View>
        <Text>{this.state.twitter}</Text>
      </View>],
      [<View>
        <Text style={{marginLeft: 80, margin: 10}}>LinkedIn:</Text>
      </View>,
      <View>
        <Text>{this.state.linkedin}</Text>
      </View>],
      [<View>
        <Text style={{marginLeft: 80, margin: 10}}>WhatsApp:</Text>
      </View>,
      <View>
        <Text>{this.state.whatsapp}</Text>
      </View>],
    ]

    return (

      <View style={styles.container}>
        <View>
          <Header style={styles.header}>
            <Left style={{flex: 1}}>
              <Button style={styles.buttons} onPress={this._onBackFunction}>
                <Text style={styles.buttonText}>Back</Text>
              </Button>
            </Left>
            <Body style={{flex: 1}}>
              <Text style={styles.title}>{this.state.Username}</Text>
            </Body>
            <Right style={{flex: 1}}>
              <Button style={styles.buttons}>

              </Button>
            </Right>
          </Header>
        </View>


        <View style={styles.body}>

          <View style={styles.spacing}>
            <Table style={styles.table} borderStyle={{borderWidth: 0, borderColor: '#000000'}}>
                 <Rows data={tableData} textStyle={styles.text} widthArr={[200, 200]}/>
            </Table>
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
    marginTop: 20
  },
  spacing2: {
    marginTop: 45
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
    backgroundColor:'#1E6738',
    borderRadius:10,
    alignContent: 'center',
    height: 40
  },
  saveText:{
    color:'#fff',
    textAlign:'center',
    fontSize: 25,
    marginTop: 4
  },
  title: {
    fontSize: 26,
    color: '#ffffff',
    textAlign: 'center',
  },
  header: {
    backgroundColor: 'black',
  },
  buttons: {
    backgroundColor: 'black',
    elevation: 0,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
});
