import React from 'react';
import { StyleSheet, Platform, Image, Text, View, StatusBar } from 'react-native';


export default class Logo extends React.Component {
  render(){
    return(
      <View style={styles.container}>
      <Image style={{width:150, height: 150}}
      source={require('../images/PearLogo.png')}/>
      <Text></Text>
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
