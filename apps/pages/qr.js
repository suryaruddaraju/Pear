'use strict';
import React, { Component } from 'react'
import { Platform, StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Body, Title } from 'native-base';


import Tabbar from '../components/Tabbar';

export default class QRcode extends React.Component {

  state = {
    text: firebase.auth().currentUser.email,
  };

//generates qrcode
  render() {
    return (

      <View style = {styles.cont}>
      <Container>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.title}>Pear Code</Title>
            </Body>
          </Header>
      </Container>


  <View style = {styles.container}>

        <QRCode
          value={this.state.text}
          size={230}
          bgColor='black'
          fgColor='#d1e231'/>




      </View>
    <Tabbar/>
      </View>


    );
  };
}


const styles= StyleSheet.create({
  container : {
     flex: 1,
     backgroundColor: "#d1e231",
     justifyContent:'center',
     alignItems:'center',
     marginBottom: 150

  },
  cont : {
     flex: 1,
     backgroundColor: "#d1e231",
  },

      button : {
        width:300,
        height:40,
        backgroundColor:'black',
        borderRadius: 50,
        marginVertical: 12,
        paddingVertical: 12,

      },

      buttonText : {
        fontSize: 16,
        fontWeight:'500',
        color:'rgba(255,255,255,0.8)',
        textAlign:'center'
      },

      title: {
        fontSize: 26,
        color:'white',
        textAlign: 'center',
        marginBottom: 10
      },

      header: {
        backgroundColor: 'black',
        marginTop: 20,
        height: 55
      }
});
