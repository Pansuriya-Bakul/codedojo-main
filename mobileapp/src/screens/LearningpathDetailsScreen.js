import React from 'react'
import { StatusBar, StyleSheet, Button, Text, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';

const LearningpathDetailsScreen = ( { navigation } ) => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Text style={{fontSize: 48}}>LearningpathDetailsScreen</Text>
      <Button title='Go to Course Details' onPress={() => navigation.navigate('CourseDetails') }/>
    </SafeAreaView>
  )
}

LearningpathDetailsScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default LearningpathDetailsScreen