import React from 'react';
import { StyleSheet, Platform, Image, Text, View, StatusBar, ScrollView } from 'react-native';


export default class Logo_Signup extends React.Component {
  render(){
    return(
    
      <View style={styles.container}>
      <Image style={{width:150, height: 140}}
      source={require('../images/Profile.png')}/>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container : {
     flexGrow: 1,
     justifyContent:'flex-end',
     alignItems:'center'
  }
});
