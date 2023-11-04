import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import LearningPathScreen from './screens/LearningPathScreen';
import CourseScreen from './screens/CourseScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/adminonly/OrderListScreen';
import LearningPathListScreen from './screens/adminonly/LearningPathListScreen';
import CourseListScreen from './screens/adminonly/CourseListScreen';
import LearningPathEditScreen from './screens/adminonly/LearningPathEditScreen';
import CourseEditScreen from './screens/adminonly/CourseEditScreen';
import UserListScreen from './screens/adminonly/UserListScreen';
import UserEditScreen from './screens/adminonly/UserEditScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

      <Route index={true} path='/learningpaths' element={<HomeScreen/>}/>
      <Route path='/learningpaths/search/:keyword' element={<HomeScreen/>}/>
      <Route path='/learningpaths/page/:pageNumber' element={<HomeScreen/>}/>
      <Route path='/learningpaths/search/:keyword/page/:pageNumber' element={<HomeScreen/>}/>
      <Route path='/learningpaths/:learningPathId/courses' element={<LearningPathScreen/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/learningpaths/:learningPathId/courses/:courseId/quizzes' element={<CourseScreen/>}/>
        <Route path='/payment' element={<PaymentScreen/>}/>
        <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
        <Route path='/orders/:orderId' element={<OrderScreen/>}/>
        <Route path='/profile' element={<ProfileScreen/>}/>
      </Route>

      <Route path='' element={<AdminRoute/>}>
        <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
        <Route path='/admin/learningpathlist' element={<LearningPathListScreen/>}/>
        <Route path='/admin/learningpathlist/:pageNumber' element={<LearningPathListScreen/>}/>
        <Route path='/admin/learningpath/:learningPathId/courselist' element={<CourseListScreen/>}/>
        <Route path='/admin/learningpath/:learningPathId/edit' element={<LearningPathEditScreen/>}/>
        <Route path='/admin/learningpath/:learningPathId/course/:courseId/edit' element={<CourseEditScreen/>}/>
        <Route path='/admin/userlist' element={<UserListScreen/>}/>
        <Route path='/admin/user/:userId/edit' element={<UserEditScreen/>}/>
      </Route>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router}/>
    </PayPalScriptProvider>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();

