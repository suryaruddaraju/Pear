import React from 'react';
import { onChangeText, value, StyleSheet, Platform, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
//import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID } from 'react-native-dotenv';
import firebase from 'react-native-firebase';

export default class Form extends React.Component {

  // firebase state constructor
  constructor() {
    super();
    this.state = {
      loading: true, //set loading state
    };
    alert("login form");
  }

  /*componentWillMount() {
    firebase.initializeApp({ //initializeApp
      apiKey: APIKEY,
      authDomain: AUTHDOMAIN,
      databaseURL: DATABASEURL,
      projectId: PROJECTID,
      storageBucket: STORAGEBUCKET,
      messagingSenderId: MESSAGINGSENDERID
    });
  }*/

  state = { email: '', password: '', error: '', loading: false };

  onSignInPress() {
    this.setState({ error: '', loading: true });
    //alert(this.state.email);
    //alert(this.state.password);
    const { email, password } = this.state;
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
    .then(
      () => {
        this.setState({ error: '', loading: false });
        alert(this.state.password);
      })
    .catch(function(error) {
    // Handle Errors here.
      alert(error.code);
      alert(error.message);
    // ...
    });
    /*.catch(
      () => {
        alert("errrrrr");
        this.setState({ error: 'Authentication failed.', loading: false });
        alert(this.state.error);

      })*/
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <View><ActivityIndicator/></View>
    }
    //return <Button onPress={this.onSignInPress.bind(this)} title="Login" />;
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
