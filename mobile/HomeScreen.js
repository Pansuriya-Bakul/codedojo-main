import * as React from 'react';
import { View, Text,StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';



 const HomeScreen=()=>{
    const navigation = useNavigation();
    
    const courses = [
        {
          id: 1,
          Name: 'Introduction to React Native',
          description: 'Learn the basics of React Native development',
          rating: 4.5,
          price: '$49.99',
        },
        {
          id: 2,
          Name: 'JavaScript Fundamentals',
          description: 'Master JavaScript fundamentals for web development',
          rating: 4.8,
          price: '$29.99',
        },
        {
            id: 3,
            Name: 'Introduction to React Native',
            description: 'Learn the basics of React Native development',
            rating: 4.5,
            price: '$49.99',
          },
          {
            id: 4,
            Name: 'JavaScript Fundamentals',
            description: 'Master JavaScript fundamentals for web development',
            rating: 4.8,
            price: '$29.99',
          },
          {
            id: 5,
            Name: 'Introduction to React Native',
            description: 'Learn the basics of React Native development',
            rating: 4.5,
            price: '$49.99',
          },
    ]
    
      const renderCourseItem = ({ item }) => (
        <TouchableOpacity
          style={styles.courseItem}
          onPress={() => navigation.navigate('CourseDetailScreen', item)}
        >
          <Text style={styles.Name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.rating}>Rating:{item.rating}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </TouchableOpacity>
      );
    
      return (
        <SafeAreaView style={styles.container}>
        <View >
          <FlatList
            data={courses}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        </SafeAreaView>
      );
    };

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
        courseItem: {
          padding:'5%',
          backgroundColor: '#f0f0f0',
          borderRadius: 8,
          margin:'3%'
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

export default HomeScreen;