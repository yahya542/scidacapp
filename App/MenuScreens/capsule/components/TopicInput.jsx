import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TopicInput = ({ topic, setTopic }) => (
  <View style={styles.inputContainer}>
    <TextInput
      placeholder="Contoh: Sistem Tata Surya, Perang Dunia II..."
      value={topic}
      onChangeText={setTopic}
      style={styles.input}
      placeholderTextColor="#999"
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
});

export default TopicInput;
