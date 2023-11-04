import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Navbar = ({onDownloadClick}) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarTitle}>Excel</Text>
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
});

export default Navbar;
