import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import Forgotpassword from './Forgotpassword';
import SplashScreen from './SplashScreen';
import Signup from './Signup';
import Forgotlink from './Forgotlink';
import MainContainer from './MainContainer';  
import CourseDetailScreen from './CourseDetailScreen';
import PurchaseScreen from './PurchaseScreen';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="Forgotpassword" component={Forgotpassword}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Forgotlink" component={Forgotlink}/>
        <Stack.Screen name="MainContainer" component={MainContainer} headershown="false"/>
        <Stack.Screen name='CourseDetailScreen' component={CourseDetailScreen}/>
        <Stack.Screen name='PurchaseScreen' component={PurchaseScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
