import React from 'react';
import { TextInput } from 'react-native';

const TopicInput = ({ topic, setTopic }) => (
  <TextInput
    placeholder="Masukkan Topik"
    value={topic}
    onChangeText={setTopic}
    style={{
      width: '80%',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      borderRadius: 10,
      fontSize: 16,
      color: '#000',
    }}
    placeholderTextColor="#888"
  />
);

export default TopicInput;
