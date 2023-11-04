import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import codedojoApi from "../api/codedojo";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage: '', token: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'signout':
            return {errorMessage: '', token: null};
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('LearningpathList');
    } else {
        navigate('authFlow')
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message'});
};

const signup = dispatch => async ({ name, email, password }) => {
        try {
            const response = await codedojoApi.post('/api/users', {name, email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signin', payload: response.data.token})
            navigate('LearningpathList');
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Sign up failed'})
        }
    };

const signin = dispatch => async ({ email, password }) => {
        try {
            const response = await codedojoApi.post('/api/users/login', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signin', payload: response.data.token})
            navigate('LearningpathList');
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Sign in failed'})
        }
    }

const signout = dispatch => async () => {
        await codedojoApi.post('/api/users/logout');
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'signout' })
        navigate('authFlow');
    }

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, clearErrorMessage, tryLocalSignin, signout },
    { token: null , errorMessage: ''}
);