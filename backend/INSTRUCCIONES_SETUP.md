# 🔧 Instrucciones de Configuración - Backend DataLab

## 📋 Pasos para configurar el backend

### 1. Variables de Entorno

Crea un archivo `.env` en el directorio `backend/` con el siguiente contenido:

```env
# Puerto del servidor
PORT=3001

# Firebase Configuration (usar el mismo proyecto existente)
FIREBASE_PROJECT_ID=horas-datalab
FIREBASE_PRIVATE_KEY_ID=tu_private_key_id_aqui
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\ntu_private_key_aqui\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@horas-datalab.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=tu_client_id_aqui
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token

# JWT Configuration
JWT_SECRET=datalab_super_secret_key_2024
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Environment
NODE_ENV=development
```

### 2. Obtener Credenciales de Firebase

1. Ve a la [Consola de Firebase](https://console.firebase.google.com/)
2. Selecciona el proyecto `horas-datalab`
3. Ve a **Configuración del proyecto** > **Cuentas de servicio**
4. Haz clic en **Generar nueva clave privada**
5. Descarga el archivo JSON
6. Copia los valores del JSON a tu archivo `.env`

### 3. Ejecutar el Backend

```bash
# Instalar dependencias (si no se hizo antes)
npm install

# Ejecutar en modo desarrollo
npm run dev

# O ejecutar en modo producción
npm start
```

### 4. Verificar que funciona

El servidor debería estar ejecutándose en `http://localhost:3001`

Puedes probar los endpoints:
- `GET http://localhost:3001/` - Información básica de la API
- `GET http://localhost:3001/api/health` - Health check
- `GET http://localhost:3001/api/content/hero` - Contenido del hero
- `GET http://localhost:3001/api/projects` - Lista de proyectos

### 5. Estructura de Firestore

El backend creará automáticamente datos por defecto si no existen en Firestore. Las colecciones que se utilizan son:

- `content` - Contenido de la página (hero, about, contact)
- `projects` - Proyectos de DataLab
- `team` - Miembros del equipo
- `news` - Artículos del blog
- `contact_messages` - Mensajes de contacto

### 6. Troubleshooting

#### Error de autenticación Firebase
- Verifica que las credenciales en `.env` sean correctas
- Asegúrate de que el service account tenga permisos de Firestore

#### Error de CORS
- Verifica que `CORS_ORIGIN` en `.env` coincida con la URL del frontend

#### Puerto en uso
- Cambia el `PORT` en `.env` si el puerto 3001 está ocupado
