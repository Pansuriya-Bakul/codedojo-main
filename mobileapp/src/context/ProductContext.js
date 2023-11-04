import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import codedojoApi from "../api/codedojo";
import { navigate } from "../navigationRef";

const learningpathReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_learningpaths':
            return action.payload;
        default:
            return state;
    }
};

const fetchLearningpaths = dispatch => async () => {
    const response = await codedojoApi.get('/api/learningpaths');
    dispatch({ type: 'fetch_learningpaths', payload: response.data})
    // console.log(response.data)
};

const fetchCourses = dispatch => async () => {
};

export const { Provider, Context } = createDataContext(
    learningpathReducer,
    { fetchLearningpaths, fetchCourses },
    { learningPath: null}
);