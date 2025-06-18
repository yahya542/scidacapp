import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultScreen = ({ route }) => {
  const { question, myAnswer, correctAnswer, verdict } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hasil Evaluasi</Text>
      <Text>Pertanyaan: {question}</Text>
      <Text>Jawaban Kamu: {myAnswer}</Text>
      <Text>Penilaian AI: {verdict}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});

export default ResultScreen;
