import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const DummyQuestion = ({ question, myAns, setMyAns, onCheck }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionLabel}>Pertanyaan:</Text>
      <Text style={styles.question}>{question}</Text>

      <TextInput
        placeholder="Masukkan jawabanmu..."
        value={myAns}
        onChangeText={setMyAns}
        style={styles.input}
        multiline
        textAlignVertical="top"
      />

      <Pressable onPress={onCheck} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Text style={styles.buttonText}>Periksa Jawaban</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    width: '100%',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    elevation: 2,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  question: {
    fontSize: 18,
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    minHeight: 60,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonPressed: {
    backgroundColor: '#45a049',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DummyQuestion;
