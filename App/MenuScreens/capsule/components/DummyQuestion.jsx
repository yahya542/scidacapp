import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

const DummyQuestion = ({ dummyQA, userAnswer, setUserAnswer, onCheckAnswer, result }) => {
  return (
    <View style={{ width: '100%', alignItems: 'center', gap: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
        {dummyQA.question}
      </Text>
      <TextInput
        placeholder="Jawaban kamu"
        value={userAnswer}
        onChangeText={setUserAnswer}
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
      <Pressable
        style={{
          marginTop: 10,
          backgroundColor: '#FF4D4D',
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 50,
        }}
        onPress={onCheckAnswer}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Cek Jawaban</Text>
      </Pressable>
      {result && (
        <Text style={{ fontSize: 16, color: result === 'Benar!' ? 'green' : 'red' }}>
          {result}
        </Text>
      )}
    </View>
  );
};

export default DummyQuestion;
