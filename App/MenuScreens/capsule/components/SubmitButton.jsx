import React from 'react';
import { Pressable, Text } from 'react-native';

const SubmitButton = ({ onPress }) => (
  <Pressable
    style={{
      marginTop: 30,
      backgroundColor: '#FF4D4D',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 50,
    }}
    onPress={onPress}
  >
    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Kirim Topik</Text>
  </Pressable>
);

export default SubmitButton;
