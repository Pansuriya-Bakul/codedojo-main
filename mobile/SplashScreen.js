import React, { useEffect } from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const splashscreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 1000); // Adjust the delay time as needed
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <View>
        <Text style={styles.nameText1}>codeDOJO</Text>
        <Text style={styles.nameText2}>Online Learing Path</Text>
    </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
    justifyContent:'center',
    alignItems:'center',
  },
  nameText1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  nameText2: {
    fontSize: 24,
    color: 'white',
  }
});


export default splashscreen;
