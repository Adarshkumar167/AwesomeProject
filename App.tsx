import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import ExampleOne from './components/table';
import Navbar from './components/navbar';

const App = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <Navbar onDownloadClick={undefined} />
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
