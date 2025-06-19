// firebase/firebaseconfig.jsx
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';


// --- Konfigurasi proyek Firebase ---

// --- Inisialisasi Firebase & Auth ---
const app  = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db   = getFirestore(app);

// --- Satu kali ekspor, cukup di sini saja ---
export { app, auth, db };
