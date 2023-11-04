import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, FlatList, TouchableOpacity, View, Button, Platform, StatusBar, SafeAreaView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationEvents  } from 'react-navigation';
import { Context } from '../context/ProductContext';
import axios from "axios";
import { BASE_URL, PRODUCTS_URL } from "../../constants";

const HomeScreen = ({navigation}) => {
   const [learningPaths, setLearningPaths] = useState([])
   useEffect(() => {
      const fetchLearningPaths = async () => {
        const learningPathsAllData = await axios.get(`${BASE_URL}${PRODUCTS_URL}`);
        const learningPathsData = learningPathsAllData.data;
        setLearningPaths(learningPathsData);
      };
      fetchLearningPaths();
    },[]);

    const renderCourseItem = ({ item }) => (
      <TouchableOpacity
        style={styles.courseItem}
        onPress={() => navigation.navigate('LearningpathDetails', item)} >
        <Text style={styles.Name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.rating}>Rating:{item.rating}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </TouchableOpacity>
    );
    // console.log(learningPaths)

    // React.useEffect(() => {
    //   const fetchLearningPaths = navigation.addListener('focus', async () => {
    //     await axios.get(`${BASE_URL}${PRODUCTS_URL}`);
    //   });
    //   return fetchLearningPaths;
    // }, [navigation]);

  // console.log(learningPaths)

  // const { state, fetchLearningpaths } = useContext(Context);
  // console.log(state);
  // const fetchLearningPaths = async () => {
  //   let response = await fetch(`${BASE_URL}${PRODUCTS_URL}`);
  //   learningPaths = await response.json();
  //   return learningPaths
  // }

  return (
    <>
    {/* <NavigationEvents onWillFocus={fetchLearningpaths}/> */}
    {/* // <SafeAreaView style={styles.AndroidSafeArea}>  
    //   <Text style={{fontSize: 48}}>HomeScreen</Text>
    //   <FlatList 
    //     data={learningPaths} 
    //     keyExtractor={item => item._id} 
    //     renderItem={({item}) => { 
    //       return (
    //       <TouchableOpacity>
    //         <ListItem chevron title={item.name}/>
    //       </TouchableOpacity>
    //       )
    //     }}>
    //   </FlatList>
    // </SafeAreaView> */}
      <SafeAreaView style={styles.container}>
      <View >
        <FlatList
          data={learningPaths}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      </SafeAreaView>
    </>
    )
}

HomeScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  Name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#444',
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  }
});

export default HomeScreen