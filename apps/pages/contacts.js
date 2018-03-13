import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator,   Platform,
  StyleSheet,
  TextInput,
  Image,
  CheckBox,
  Switch,
  Alert,
  ScrollView} from "react-native";
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
    this.state = {
      loading: false,
      usernames: [],
      error: null,
      refreshing: false,
      myusername: "c"
    };
    var em = firebase.auth().currentUser.email;
    var db = firebase.database().ref();
    /*db.child("MAP").child(em.substring(0, em.length-4)).on('value', snapshot => {
        //alert("BEFORE: " + this.state.my_username);
        this.setState({
            myusername: snapshot.val()
        })
        //alert("AFTER: " + this.state.my_username);
    })
    db.child("Users").child(this.state.myusername).child('Contacts').on('value', snapshot => {
        //alert(JSON.stringify(snapshot.val()));
        alert(Object.keys(JSON.stringify(snapshot.val())));
    })*/

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
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
              avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
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
