// firebase/firebaseconfig.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD1lyhon0RJ2i8l-0iKv2fqVgrh1yiyDYw",
  authDomain: "studora-backend.firebaseapp.com",
  projectId: "studora-backend",
  storageBucket: "studora-backend.firebasestorage.app",
  messagingSenderId: "314425749835",
  appId: "1:314425749835:web:f7733c9e40c40d521878ce",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
