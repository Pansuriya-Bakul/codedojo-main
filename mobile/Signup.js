import React from 'react';

import { View, TextInput, StyleSheet, Image, Text,Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Signup= ()=>{

const navigation = useNavigation();
  const handlesignup = () => {
    // Perform login logic here
  
    // Redirect to HomeScreen
    navigation.navigate('LoginScreen');
  };
    return(
      <SafeAreaView style={styles.container}>
    <View >
      <View style={styles.formContainer}>
      <Text style={styles.text1}>Sign Up Here</Text>  
      
        <View style={styles.direction}>
        <Icon name="user" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Full Name" secureTextEntry />
        </View>
        <View style={styles.direction}>
        <Icon name="envelope" style={styles.icon} />
        <TextInput style={styles.input} placeholder="email id" secureTextEntry />
        </View>
        <View style={styles.direction}>
        <Icon name="lock" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        </View>
        <View style={styles.direction}>
        <Icon name="lock" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />
        </View>
        <Pressable style={styles.signupbutton} onPress={handlesignup}>
          <Text style={styles.loginButtonText} >Sign Up</Text>
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
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
    alignSelf:'center',
    color: 'black',
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingLeft: 10,
    borderRadius: 5,
    marginTop:'3%'
  },
  signupbutton: {
    width:'85%',
    height: 45,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop:10,
    marginLeft:30,
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
    marginTop:'50%',
    alignSelf:'center',
    color:'black',
    fontSize:30,
    
  },

 
});

export default Signup;