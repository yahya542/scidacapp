import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Easing,
  Pressable,
  Image,
  Alert,
} from 'react-native';

import { db } from '@/firebase/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { generateDummyQA, checkAnswer } from '../../utils/dummy';
import TopicInput from './components/TopicInput';
import DummyQuestion from './components/DummyQuestion';
import SubmitButton from './components/SubmitButton';
import { doc, updateDoc, increment, deleteDoc, getDocs,  query, orderBy, limit } from 'firebase/firestore';
import { getScore } from '../../utils/scoring'; // kamu bisa taruh getScore di file baru atau langsung di file ini


const CapsuleScreen = () => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [broken, setBroken] = useState(false);
  const [topic, setTopic] = useState('');
  const [dummyQA, setDummyQA] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -1,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shakeAnim]);

  const rotate = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-4deg', '4deg'],
  });

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setBroken(true));
  };

  const handleSubmitTopic = async () => {
    if (!topic.trim()) {
      Alert.alert('Error', 'Topik tidak boleh kosong.');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'User belum login.');
      return;
    }

    try {
      const userId = user.uid;

      await addDoc(collection(db, 'users', userId, 'topics'), {
        topic,
        createdAt: new Date(),
      });

      const generated = generateDummyQA(topic);
      setDummyQA(generated);
      setTopic('');
      setResult(null);
    } catch (error) {
      console.error('Error adding topic:', error);
      Alert.alert('Error', 'Gagal menyimpan topik.');
    }
  };

  const handleCheckAnswer = async () => {
  if (!dummyQA || !userAnswer) {
    Alert.alert('Error', 'Pertanyaan atau jawaban tidak valid.');
    return;
  }

  const score = getScore(userAnswer, dummyQA.answer);

  let resultMsg = '';
  if (score === 10) resultMsg = 'Benar!';
  else if (score === 8) resultMsg = 'Hampir benar!';
  else resultMsg = 'Salah!';

  setResult(resultMsg);

  Alert.alert('Hasil Jawaban', `Jawaban benar: ${dummyQA.answer}\nSkor kamu: ${score}`);

  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userId = user.uid;

    //  Tambahkan poin
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      points: increment(score),
    });

    // Ambil dokumen topik terbaru & hapus
    const topicsRef = collection(db, 'users', userId, 'topics');
    const q = query(topicsRef, orderBy('createdAt', 'desc'), limit(1));
    const snapshot = await getDocs(q);

    snapshot.forEach(async docSnap => {
      await deleteDoc(docSnap.ref);
    });

    //  Reset UI
    setDummyQA(null);
    setUserAnswer('');
  } catch (error) {
    console.error('Gagal saat memproses jawaban:', error);
    Alert.alert('Error', 'Terjadi kesalahan saat menyimpan hasil.');
  }
};


  return (
    <View style={styles.container}>
      {!broken ? (
        <Pressable onPress={handlePress}>
          <Animated.Image
            source={require('../../../assets/images/pills.png')}
            style={[styles.capsule, { transform: [{ rotate }, { scale: scaleAnim }] }]}
            resizeMode="contain"
          />
        </Pressable>
      ) : (
        <Image
          source={require('../../../assets/images/pecah.png')}
          style={styles.capsule}
          resizeMode="contain"
        />
      )}

      {broken && !dummyQA && (
        <>
          <TopicInput topic={topic} setTopic={setTopic} />
          <SubmitButton onPress={handleSubmitTopic} />
        </>
      )}

      {broken && dummyQA && (
        <DummyQuestion
          dummyQA={dummyQA}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          onCheckAnswer={handleCheckAnswer}
          result={result}
        />
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
