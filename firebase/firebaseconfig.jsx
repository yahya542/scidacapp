// firebase/firebaseconfig.jsx
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Konfigurasi proyek Firebase ---
const firebaseConfig = {
  apiKey: 'AIzaSyD1lyhon0RJ2i8l-0iKv2fqVgrh1yiyDYw',
  authDomain: 'studora-backend.firebaseapp.com',
  projectId: 'studora-backend',
  storageBucket: 'studora-backend.appspot.com',      // <- biasanya .appspot.com
  messagingSenderId: '314425749835',
  appId: '1:314425749835:web:f7733c9e40c40d521878ce',
};

// --- Inisialisasi Firebase & Auth ---
const app  = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// --- Satu kali ekspor, cukup di sini saja ---
export { app, auth };
