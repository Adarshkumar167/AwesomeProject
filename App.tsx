import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Navbar from './components/navbar';
import ExampleThree from './components/table';

const App = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <Navbar onDownloadClick={undefined} />
      <ExampleThree />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});

export default App;
