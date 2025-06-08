import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const CustomTabButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState?.selected ?? false;


  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: focused ? 'orange' : 'lightblue',
        }}
      >
        <Ionicons
          name="home"
          size={30}
          color="white"
          style={{ alignSelf: 'center', marginTop: 18 }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default CustomTabButton;
