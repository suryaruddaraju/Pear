import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Platform, StyleSheet, TextInput, Image, CheckBox, Switch, Alert, ScrollView, TouchableWithoutFeedback} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import Tabbar from 'react-native-tabbar-bottom';
import Icon from 'react-native-ionicons';

import NavigationBar from 'react-native-navbar';

// import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class Contacts extends Component {
  constructor() {
    super();
    this.state = { loading: false, usernames: {}, error: null, refreshing: false, myusername: null, contact_list: [] };
    var em = firebase.auth().currentUser.email;
    var db = firebase.database().ref();

    jsonParse = () => {
        var jsonObj = {};
        for (var key in this.state.usernames) {
            if (this.state.usernames.hasOwnProperty(key)) {
                jsonObj = {"uname" : key, "name" : this.state.usernames[key] }
                this.state.contact_list.push(jsonObj);
            }
        }
        /*for (var i = 0; i < this.state.contact_list.length; i++) {
            alert(JSON.stringify(this.state.contact_list[i]));
        }*/
    }

    //alert(em);
    db.child("MAP").child(em.substring(0, em.length-4)).on('value', snapshot => {
      this.setState({ myusername: snapshot.val() }, function() {
        db.child("Users").child(this.state.myusername).child('Contacts').on('value', snapshot => {
            this.setState({ usernames: snapshot.val() })
            jsonParse();
            //alert(JSON.stringify(snapshot.val()));
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
        <NavigationBar
          tintColor="#006600"
          title={titleConfig}
          leftButton={leftButtonConfig}
          rightButton={rightButtonConfig}
        />
      );
  };

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }} style={{backgroundColor: '#d1e231'}}>
        <FlatList
          data={this.state.contact_list}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => Actions.contactdetails({pname: item.name, username: item.uname})}>
              <ListItem
                title={item.name}
                subtitle={item.uname}
                containerStyle={{ borderBottomWidth: 0 }}
              />
            </TouchableWithoutFeedback>
          )}
          keyExtractor={item => item.uname}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
    );
  }
}

const rightButtonConfig = {
    title: 'QR',
    handler: () => Actions.qr(),
    tintColor: '#000000'
};

const leftButtonConfig = {
    title: 'Settings',
    handler: () => Actions.home(),
    tintColor: '#000000'
};

const titleConfig = {
    title: 'Contacts',
}
