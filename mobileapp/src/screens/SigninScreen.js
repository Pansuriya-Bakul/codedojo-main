import React, { useState, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity  } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';

const SigninScreen = ({ navigation }) => {

    const {state, signin, clearErrorMessage } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    
    <View style={styles.container}>

      <NavigationEvents onWillFocus={clearErrorMessage} onWillBlur={clearErrorMessage} />
    
      <Spacer>
        <Text h3>Sign In</Text>
      </Spacer>

      <Spacer>
        <Input label='Email Address' value={email} onChangeText={setEmail} autoCapitalize='none' autoCorrect={false}/>
      </Spacer>

      <Spacer>
        <Input secureTextEntry label='Password' value={password} onChangeText={setPassword} autoCapitalize='none' autoCorrect={false}/>
      </Spacer>


      {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
      <Spacer>
        <Button title='Login' onPress={() => signin({ email, password })}/>
      </Spacer>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Spacer>
          <Text style={styles.link}>Don't have an account? Go back to log in.</Text>
        </Spacer>
      </TouchableOpacity>
     

    </View>
  );
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen