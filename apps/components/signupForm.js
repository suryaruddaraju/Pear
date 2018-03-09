import React from 'react';
import { onChangeText, value, StyleSheet, Platform, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

export default class signupForm extends React.Component {

  // firebase state constructor
  constructor() {
    super();
    this.state = {
      loading: true, //set loading state
    };
  }

  state = { username: '', email: '', password: '', r_password: '', error: '', loading: false };

  //on signup --> create new user, push initial data to DB, goto home page
  onSignUpPress() {
      this.setState({ error: '', loading: true });
      const { username, email, password, r_password } = this.state;
      const db = firebase.database().ref();
      db.child("Users").once('value', snapshot => {
          if (snapshot.hasChild(this.state.username)){
            this.setState({
                error: "TRUE"
            })
            alert("This username is already taken. Please choose another.");
          }
      })
      if (this.state.error === ''){
          firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
              this.setState({ error: '', loading: false });
              var root = firebase.database().ref();

              var uname = this.state.username;
              var email = this.state.email;
              root.child("Users").update({
                [uname]: {
                    "Profile": {
                      "Email": email,
                      "Facebook": "",
                      "Instagram": "",
                      "Twitter": "",
                      "Snapchat": "",
                      "LinkedIn": "",
                      "WhatsApp": "",
                    }
                }
              })
              root.child("MAP").update({
                  [email.substring(0, email.length-4)]: uname
              })

              root.once('value').then(snapshot => {
                  //alert("Hello:  " + snapshot.hasChild("Profile"));
                  //alert("testing");
              })
              Actions.login();
          })
          .catch(function(error) {
          // Handle Errors here.
            alert(error.code);
            alert(error.message);
          // ...
        });
    }
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
                  placeholder="Username"
                  placeholderTextColor="#808080"
                  onChangeText={username => this.setState({username})}
                  value={this.state.username}
                  />
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
          <TextInput style={styles.inputBox}
                      placeholder="Re-Enter Password"
                      secureTextEntry={true}
                      placeholderTextColor="#808080"
                      onChangeText={r_password => this.setState({r_password})}
                      value={this.state.r_password}
                      />
          <TouchableOpacity onPress={() => this.onSignUpPress()} style={styles.button}>
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
     alignItems:'center'
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
