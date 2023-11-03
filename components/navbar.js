import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Navbar = ({onDownloadClick}) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarTitle}>Excel</Text>
      <TouchableOpacity style={styles.downloadButton} onPress={onDownloadClick}>
        <Text style={styles.buttonText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    padding: 10,
  },
  navbarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  downloadButton: {
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Navbar;
