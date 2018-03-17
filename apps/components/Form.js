import React from 'react';
import { onChangeText, value, StyleSheet, Platform, Image, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
//import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID } from 'react-native-dotenv';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';


export default class Form extends React.Component {

  state = { email: '', password: '', error: '', loading: false };
  // firebase state constructor
  constructor() {
      super();
      this.state = {
          loading: true, //set loading state
      };

      getEmail = () => {
          AsyncStorage.getItem('email').then((value) => {
            this.setState({email: value})
          });
          AsyncStorage.getItem('password').then((value) => {
            this.setState({password: value})
          });
      }
      getEmail();
  }

  onSignInPress() {
    var db = firebase.database().ref();
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;
    em = this.state.email;
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
    this.setState({ error: '', loading: false });
    AsyncStorage.setItem("email", this.state.email);
    AsyncStorage.setItem("password", this.state.password);
    /*db.update({
        "Current": this.state.email,
    });*/
    //alert(this.state.password);
    var a = firebase.database().ref("/Users/");
    a.once('value').then(snapshot => {
        //alert("YOUR USERNAME: " + snapshot.child("MAP").child(em.substring(0, em.length-4)).val());//.child("Email").val());
    })
    Actions.qr();
}).catch(function(error) {
    // Handle Errors here.
    alert(error.code);
    alert(error.message);
        // ...
    });
  //})
  /*.catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
  });*/
}

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <View><ActivityIndicator/></View>
    }
  }

  render(){
    return(
      <View style={styles.container}>
          <TextInput style={styles.inputBox}
                      placeholder="Email"
                      placeholderTextColor="#808080"
                      onChangeText={email => this.setState({email})}
                      value={this.state.email}
                      />
          <TextInput style={styles.inputBox}
                      placeholder="Password"
                      secureTextEntry={true}
                      placeholderTextColor="#808080"
                      onChangeText={password => this.setState({password})}
                      value={this.state.password}
                      />
          <TouchableOpacity onPress={() => this.onSignInPress()} style={styles.button}>
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
