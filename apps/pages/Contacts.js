import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Platform, StyleSheet, TextInput, Image, CheckBox, Switch, Alert, ScrollView, TouchableWithoutFeedback} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Body, Title } from 'native-base';

import Tabbar from '../components/Tabbar';

export default class Contacts extends Component {
  constructor() {
      super();
      this.state = { loading: false, usernames: {}, error: null, refreshing: false, myusername: null, contact_list: [{"uname":"INIT", "name":"INIT"}] };
      var em = firebase.auth().currentUser.email;
      var db = firebase.database().ref();

      jsonParse = () => {
          var jsonObj = {};
          for (var key in this.state.usernames) {
              jsonObj = {"uname" : key, "name" : this.state.usernames[key]}
              this.state.contact_list.push(jsonObj);
          }
      }
      db.child("MAP").child(em.substring(0, em.length-4)).child("username").on('value', snapshot => {
          this.setState({ myusername: snapshot.val() }, function() {
              db.child("Users").child(this.state.myusername).child('Contacts').on('value', snapshot => {
                  this.setState({ usernames: snapshot.val() })
                  jsonParse();
              })
        });
      });
    }

    listClick = (item) => {
      alert(JSON.stringify(item));
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#8c8c8c",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <View style={{
          height: 55,
          backgroundColor: "black"}}>

          <Text style={{ fontSize: 26, textAlign: 'center', color:'#ffffff', marginTop: 10}}>Contacts</Text>

      </View>
      );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View style= {styles.cont}>
        <View style= {styles.cont}>
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }} style={{backgroundColor: '#d1e231'}}>
        <FlatList
          data={this.state.contact_list}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => Actions.contactdetails({pname: item["name"], username: item["uname"]})}>
              <ListItem
                title={item["name"]}
                subtitle={item["uname"]}
                containerStyle={{ borderBottomWidth: 0 }}
              />
            </TouchableWithoutFeedback>
          )}
          keyExtractor={item => item["uname"]}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
        </View>
      <Tabbar/>
      </View>
    );
  }
}

const styles= StyleSheet.create({
cont : {
   flex: 1,
   backgroundColor: "#d1e231",
}
});
