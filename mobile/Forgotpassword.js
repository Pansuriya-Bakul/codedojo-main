import React from 'react';
import { View, TextInput, StyleSheet, Text,Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Forgotpassword =()=>{
  const navigation = useNavigation();
  const handlelink = () => {
    // Perform login logic here
  
    // Redirect to HomeScreen
  navigation.navigate('Forgotlink');
  };
  return(
    <SafeAreaView style={styles.container}>
    <View >
    <View style={styles.formContainer}>
    <Text style={styles.text1}>We will sent a link to reset your password at your mail address.
      </Text>
      <View style={styles.direction}>
      <Icon name="envelope" style={styles.icon} />
      <TextInput style={styles.input} placeholder="Enter your email address here" />
      </View>
      <Pressable style={styles.ForgotButton} onPress={handlelink}>
        <Text style={styles.ForgotText} >Forgot password</Text>
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
  
  icon: {
    marginRight: 10,
    fontSize: 30,
    alignSelf:'center',
    color: 'black',
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingLeft: 10,
    borderRadius: 5,
    
  },
  ForgotButton: {
    width:'80%',
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft:25,
    marginRight:25,
    marginTop:'4%'
    
  },
  ForgotText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  direction:{
    flexDirection:'row',
    marginTop:'10%'
  },
  text1:{
    marginTop:'50%',
    alignSelf:'center',
    color:'black',
    fontSize:20,
    margin:10,
    
  },

});

export default Forgotpassword;