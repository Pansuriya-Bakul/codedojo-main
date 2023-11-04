import React, { useState, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity  } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';

const SignupScreen = ({ navigation }) => {

    const {state, signup, clearErrorMessage } = useContext(AuthContext);
    const [name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

  return (
    
    <View style={styles.container}>

    <NavigationEvents onWillFocus={clearErrorMessage} onWillBlur={clearErrorMessage} />
    
      <Spacer>
        <Text h3>Sign Up</Text>
      </Spacer>

      <Spacer>
        <Input label='Full Name' value={name} onChangeText={setFullName}/>
      </Spacer>

      <Spacer>
        <Input label='Email Address' value={email} onChangeText={setEmail} autoCapitalize='none' autoCorrect={false}/>
      </Spacer>

      <Spacer>
        <Input secureTextEntry label='Password' value={password} onChangeText={setPassword} autoCapitalize='none' autoCorrect={false}/>
      </Spacer>

      {/* <Spacer>
        <Input secureTextEntrylabel='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword} autoCapitalize='none' autoCorrect={false}/>
      </Spacer> */}

      {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
      <Spacer>
        <Button title='Register' onPress={() => signup({ name, email, password })}/>
      </Spacer>

      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Spacer>
          <Text style={styles.link}>Already have an account? Sign in instead.</Text>
        </Spacer>
      </TouchableOpacity>
     

    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    errorMessage: {
      fontSize: 16,
      color: 'red',
      marginLeft: 17
    },
    link: {
      color: 'blue'
    }
});

export default SignupScreen