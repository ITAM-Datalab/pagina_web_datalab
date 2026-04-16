/**
 * Configuración de Firebase para el frontend
 * Utiliza variables de entorno para mayor seguridad
 */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Configuración Firebase desde variables de entorno
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAJ-nNZ1QUMjNz9BVlaeUA3jrsdzxV3tCQ",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "datalab-itam-17c87.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "datalab-itam-17c87",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "datalab-itam-17c87.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "292946482820",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:292946482820:web:348d78d82ee96bb9fb54d1",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-CMV0XWLTEW"
};

// Validar que las configuraciones estén presentes
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn('⚠️  Firebase config incompleta. Verifica las variables de entorno.');
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
