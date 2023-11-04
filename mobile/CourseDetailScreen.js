// Import required modules
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const CourseDetailScreen = ({ route }) => {
  // Extract the course details from the route params
  const { id, name, description, rating, price } = route.params;

  return (
    <SafeAreaView style={styles.safearea}>
    <ScrollView >
    <View style={styles.container} >
      <Text style={styles.heading}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Rating
        imageSize={20}
        readonly
        startingValue={rating}
        style={styles.rating}
      />
      <Text style={styles.price}>Price: ${price}</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safearea:{
        flex:1
    },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  rating: {
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#009900', // You can change the color as per your design
  },
});

export default CourseDetailScreen;
