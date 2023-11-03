import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import ExampleOne from './components/table';

const App = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <ExampleOne />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});

export default App;
