/**
 * Configuración de Firebase Admin SDK
 * Utiliza el mismo proyecto Firebase existente (horas-datalab)
 */
const admin = require('firebase-admin');
require('dotenv').config();

// Configuración del service account usando variables de entorno
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
};

// Inicializar Firebase Admin solo si no está ya inicializado
if (!admin.apps.length) {
  // En desarrollo, si no hay credenciales válidas, usar mock
  if (process.env.NODE_ENV === 'development' && 
      process.env.FIREBASE_PRIVATE_KEY?.includes('placeholder')) {
    console.log('🔧 Development mode: Using mock Firebase configuration');
    // Inicializar con configuración mínima para desarrollo
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'development-project',
    });
  } else {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }
}

// Exportar instancias de Firestore y Auth
const db = admin.firestore();
const auth = admin.auth();

module.exports = {
  admin,
  db,
  auth,
};
