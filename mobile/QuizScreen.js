import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const quizzes = [
  {
    id: '1',
    title: 'Quiz 1',
    description: 'Description of Quiz 1',
    // Add other quiz details as needed
  },
  {
    id: '2',
    title: 'Quiz 2',
    description: 'Description of Quiz 2',
    // Add other quiz details as needed
  },
  {
    id: '3',
    title: 'Quiz 1',
    description: 'Description of Quiz 1',
    // Add other quiz details as needed
  },
  {
    id: '4',
    title: 'Quiz 2',
    description: 'Description of Quiz 2',
    // Add other quiz details as needed
  },
  {
    id: '5',
    title: 'Quiz 1',
    description: 'Description of Quiz 1',
    // Add other quiz details as needed
  },
  {
    id: '6',
    title: 'Quiz 2',
    description: 'Description of Quiz 2',
    // Add other quiz details as needed
  },
  // Add more quizzes here...
];

const QuizScreen = () => {
  const navigation = useNavigation();

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity
      style={styles.quizItem}
      onPress={() =>navigation.navigate('Quiz')}
    >
      <Text style={styles.quizTitle}>{item.title}</Text>
      <Text style={styles.quizDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
    <View>
      <FlatList
        data={quizzes}
        renderItem={renderQuizItem}
        keyExtractor={(item) => item.id}
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
  quizItem: {
    padding:'5%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin:'1%'
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizDescription: {
    fontSize: 16,
  },
});

export default QuizScreen;
