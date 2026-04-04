import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Easing,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { generateQuestion, checkAnswer } from '../../utils/api';

import TopicInput from './components/TopicInput';
import DummyQuestion from './components/DummyQuestion';
import SubmitButton from './components/SubmitButton';

const CapsuleScreen = () => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  const [broken, setBroken] = useState(false);
  const [topic, setTopic] = useState('');
  const [dummyQA, setDummyQA] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('capsule');

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 1, duration: 80, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -1, duration: 80, easing: Easing.linear, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const rotate = shakeAnim.interpolate({ inputRange: [-1, 1], outputRange: ['-4deg', '4deg'] });

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      setBroken(true);
      setStep('input');
    });
  };

  const handleSubmitTopic = async () => {
    if (!topic.trim()) return Alert.alert('Error', 'Topik tidak boleh kosong.');

    try {
      setLoading(true);
      const generated = await generateQuestion(topic);

      if (generated.success) {
        setDummyQA({
          question: generated.question,
          answer: generated.answer,
          questionId: generated.question_id,
        });
        setStep('question');
        setTopic('');
        setResult(null);
      } else {
        Alert.alert('Error', generated.error || 'Gagal memproses topik.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Gagal memproses topik.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckAnswer = async () => {
    if (!dummyQA || !userAnswer.trim()) return Alert.alert('Error', 'Jawaban tidak boleh kosong.');

    try {
      setLoading(true);
      const checkResult = await checkAnswer(dummyQA.questionId, userAnswer);

      if (checkResult.success) {
        const score = checkResult.score || 0;
        let message = 'Salah!';
        if (checkResult.verdict === 'benar') {
          message = 'Jawaban kamu benar!';
        } else if (checkResult.verdict === 'hampir') {
          message = 'Hampir benar!';
        }

        setResult({
          msg: message,
          correctAnswer: checkResult.correct_answer,
          score: score,
        });
        setStep('result');
        setDummyQA(null);
        setUserAnswer('');
      } else {
        Alert.alert('Error', checkResult.error || 'Gagal mengevaluasi jawaban.');
      }
    } catch (error) {
      console.error('Gagal evaluasi jawaban:', error);
      Alert.alert('Error', 'Gagal mengevaluasi jawaban.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {step === 'capsule' && (
        <Pressable onPress={handlePress}>
          <Animated.Image
            source={require('../../../assets/images/pills.png')}
            style={[styles.capsule, { transform: [{ rotate }, { scale: scaleAnim }] }]}
            resizeMode="contain"
          />
        </Pressable>
      )}

      {broken && step !== 'capsule' && (
        <Image source={require('../../../assets/images/pecah.png')} style={styles.capsule} resizeMode="contain" />
      )}

      {step === 'input' && !loading && (
        <>
          <TopicInput topic={topic} setTopic={setTopic} />
          <SubmitButton onPress={handleSubmitTopic} />
        </>
      )}

      {loading && <ActivityIndicator size="large" color="#4CAF50" />}

      {step === 'question' && dummyQA && (
        <DummyQuestion
          question={dummyQA.question}
          myAns={userAnswer}
          setMyAns={setUserAnswer}
          onCheck={handleCheckAnswer}
        />
      )}

      {step === 'result' && result && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Image source={require('../../../assets/images/studora.png')} style={{ width: 80, height: 80 }} />
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{result.msg}</Text>
          <Text>Jawaban benar: {result.correctAnswer}</Text>
          <Text>Skor kamu: {result.score}</Text>
          <Pressable
            onPress={() => navigation.navigate('Dashboard')}
            style={{
              marginTop: 20,
              paddingVertical: 12,
              paddingHorizontal: 24,
              backgroundColor: '#2196F3',
              borderRadius: 10,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
              Kembali ke Dashboard
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  capsule: {
    width: 220,
    height: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default CapsuleScreen;
