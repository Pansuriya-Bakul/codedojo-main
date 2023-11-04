import { setNavigator } from './src/navigationRef';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import LearningpathDetailsScreen from './src/screens/LearningpathDetailsScreen';
import CourseDetailsScreen from './src/screens/CourseDetailsScreen'
import { Provider as AuthProvider } from './src/context/AuthContext';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';


const switchNavigator = createSwitchNavigator ({
  ResolveAuth: ResolveAuthScreen,
  authFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createMaterialBottomTabNavigator({
    learningpathFlow: createStackNavigator({
      LearningpathList: HomeScreen,
      // LearningpathDetailsFlow: createStackNavigator({
      LearningpathDetails: LearningpathDetailsScreen,
      CourseDetails: CourseDetailsScreen
      // })
      // ,
      // LearningpathDetails: LearningpathDetailsScreen
    }),
    Profile: ProfileScreen
  })
});

const App = createAppContainer(switchNavigator);

export default ()  => {
  return (
    <AuthProvider>
      <App ref={(navigator) => {setNavigator(navigator)}}/>
    </AuthProvider>
  )
};