import React from 'react';
import { onChangeText, value, StyleSheet, Platform, Image, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
//import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID } from 'react-native-dotenv';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import TabNavigator from 'react-native-tab-navigator';

export default class Tab_Bar extends React.Component {

  // firebase state constructor
  constructor() {
      super();
      this.state = {
          selectedTab: "QR" //set loading state
      };
  }

  render(){
    return(
      <View style={styles.container}>
        <TabNavigator>
        </TabNavigator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  }
});
