import React from 'react';
import { View, TextInput, StyleSheet, Image, Text,Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import { useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {

  const navigation = useNavigation();
  const handleLogin = () => {
    // Perform login logic here
  
    // Redirect to HomeScreen
    navigation.navigate('MainContainer');
  };
  const handleForgorpassword = () => {
    // Perform login logic here
  
    // Redirect to Forgotscreen
    navigation.navigate('Forgotpassword');
  };
  const handleSignup = () => {
    // Perform login logic here
  
    // Redirect to Signupscreen
    navigation.navigate('Signup');
  };


  return (
    <SafeAreaView style={styles.container}>
    <View >
      <View style={styles.formContainer}>
      <Text style={styles.text1}>Welcome to codeDOJO</Text>  
      <Text style={styles.text2}>Enter your login credential here..</Text>
        <View style={styles.direction}>
        <Icon name="user" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Enter your email address" placeholderTextColor={'grey'} />
        </View>
        <View style={styles.direction}>
        <Icon name="lock" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor={'grey'}secureTextEntry />
        </View>
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText} >Login</Text>
        </Pressable>
        <Pressable onPress={handleForgorpassword}>
        <Text style={styles.text3}>Forgot you Password ?</Text>
        </Pressable>
        <Text style={styles.text4}>Don't have account yet ?</Text>
        <Text style={styles.text5}>Create an account here!</Text>
        <Pressable style={styles.signup} onPress={handleSignup}>
          <Text style={styles.loginButtonText}>Sign up</Text>
        </Pressable>
      </View>
    </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10%',
  },
  icon: {
    marginRight: 10,
    fontSize: 30,
    alignSelf:'center',
    color: 'black',
  },
  input: {
    width: '85%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingLeft: 10,
    borderRadius: 5,
    marginTop:'3%',
  },
  loginButton: {
    width:'80%',
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft:25,
    marginRight:25,
    marginTop:'10%'
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  direction:{
    flexDirection:'row',
  },
  text1:{
    marginTop:'30%',
    alignSelf:'center',
    color:'black',
    fontSize:30,
  },

  text2:{
    color:'black',
    fontSize:15,
    marginTop:'10%',
  },
  text3:{
    color:'black',
    alignSelf:'center',
    marginTop:'5%',
    
  },
  text4:{
    color:'black',
    marginTop:'10%',
    
  },
  text5:{
    marginTop:'auto',
    color:'black',
  },
  signup:{
    marginTop:'5%',
    width:'50%',
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft:25,
    marginRight:25,
  },
});


export default LoginScreen;
