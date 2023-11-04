import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import QuizScreen from './QuizScreen';
import SearchScreen from './SearchScreen';


//Screen names
const homeName = "Learning Path";
const searchname = "Search";
const quizname = "Quiz";
const profilename = "Profile";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    
      <Tab.Navigator independent ={true}
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === searchname) {
              iconName = focused ? 'search' : 'search-outline';

            } else if (rn === quizname) {
              iconName = focused ? 'list' : 'list-outline';
            }
            else if (rn === profilename) {
                iconName = focused ? 'person' : 'person-outline';
              }


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color}/>;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'grey',
          labelStyle: {fontSize: 10},
          style: {padding: 15, height: 50}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={searchname} component={SearchScreen} />
        <Tab.Screen name={quizname} component={QuizScreen} />
        <Tab.Screen name={profilename} component={ProfileScreen} />
      </Tab.Navigator>
      
    
  );
}

export default MainContainer;