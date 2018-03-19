import React, { Component } from 'react';
import { Platform, StyleSheet, Image, View, TextInput, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class Tabbar extends Component {
  render() {
    return (

        <Footer>
          <FooterTab style={styles.container}>
            <Button vertical onPress={() => Actions.contacts()}>
              <Icon style={{color:"#FFFFFF"}} name="person"/>
            </Button>
            <Button vertical onPress={() => Actions.cam()}>
              <Icon style={{color:"#FFFFFF"}} name="camera" />
            </Button>
            <Button vertical onPress={() => Actions.qr()}>
              <Icon style={{color:"#FFFFFF"}} name="barcode" />
            </Button>
            <Button vertical onPress={() => Actions.home()}>
              <Icon style={{color:"#FFFFFF"}} name="settings" />
            </Button>
          </FooterTab>
        </Footer>

    );
  }
}

const styles= StyleSheet.create({
  container : {
      backgroundColor: "#000000"
}});
