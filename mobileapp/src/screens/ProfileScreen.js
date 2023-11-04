import React, { useContext } from 'react'
import { StatusBar, StyleSheet, Text, View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-navigation';

const ProfileScreen = () => {

  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
        <Text style={{fontSize: 48}}>ProfileScreen</Text>
        <Spacer>
          <Button title='Sign Out' onPress={signout}/>
        </Spacer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default ProfileScreen