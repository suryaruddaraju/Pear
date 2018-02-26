import React from 'react';
import { StyleSheet, Platform, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default class Form extends React.Component {



  render(){
    return(
      <View style={styles.container}>
          <TextInput style={styles.inputBox}
                      placeholder="Email"
                      placeholderTextColor="#808080"
                      />
          <TextInput style={styles.inputBox}
                      placeholder="Password"
                      secureTextEntry={true}
                      placeholderTextColor="#808080"
                      />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{this.props.type}</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container : {
     flexGrow: 1,
     justifyContent:'center',
     alignItems:'center',
  },

  inputBox : {
    width:300,
    height:40,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#808080',
    marginVertical: 10,
  },

  button : {
    width:300,
    height:40,
    backgroundColor:'rgba(128,128,128,0.4)',
    borderRadius: 20,
    marginVertical: 12,
    paddingVertical: 12,

  },

  buttonText : {
    fontSize: 16,
    fontWeight:'500',
    color:'rgba(255,255,255,0.8)',
    textAlign:'center'
  }
});
