import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Easing,
  Pressable,
  Image,
  Text,
  TextInput,
  Alert
} from 'react-native';

import { db } from '@/firebase/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const CapsuleScreen = () => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [broken, setBroken] = useState(false);
  const [topic, setTopic] = useState('');

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
      Alert.alert('Error', 'Topic tidak boleh kosong.');
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
      Alert.alert('Sukses', 'Topik berhasil disimpan!');
      setTopic('');
    } catch (error) {
      console.error('Error adding topic:', error);
      Alert.alert('Error', 'Gagal menyimpan topik.');
    }
  };

  return (
    <View style={styles.container}>
      {!broken ? (
        <Pressable onPress={handlePress}>
          <Animated.Image
            source={require('../../../assets/images/pills.png')}
            style={[
              styles.capsule,
              {
                transform: [{ rotate }, { scale: scaleAnim }],
              },
            ]}
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

      {broken && (
        <>
          <TextInput
            placeholder="Masukkan Topik"
            value={topic}
            onChangeText={setTopic}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <Pressable style={styles.capsuleButton} onPress={handleSubmitTopic}>
            <Text style={styles.buttonText}>Kirim Topik</Text>
          </Pressable>
        </>
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
  capsuleButton: {
    marginTop: 30,
    backgroundColor: '#FF4D4D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    elevation: 3,
    shadowColor: '#FF4D4D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default CapsuleScreen;
