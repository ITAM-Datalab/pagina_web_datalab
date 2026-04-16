# Configuración de Variables de Entorno - Frontend

## Crear archivo .env

Crea un nuevo archivo llamado `.env` en la carpeta `frontend/` con el siguiente contenido:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSyAJ-nNZ1QUMjNz9BVlaeUA3jrsdzxV3tCQ
REACT_APP_FIREBASE_AUTH_DOMAIN=datalab-itam-17c87.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=datalab-itam-17c87
REACT_APP_FIREBASE_STORAGE_BUCKET=datalab-itam-17c87.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=292946482820
REACT_APP_FIREBASE_APP_ID=1:292946482820:web:348d78d82ee96bb9fb54d1
REACT_APP_FIREBASE_MEASUREMENT_ID=G-CMV0XWLTEW

# API Configuration
REACT_APP_API_URL=http://localhost:3001/api

# Entorno
REACT_APP_ENV=development
```

## Para Producción

Crea un archivo `.env.production`:

```env
# Firebase Configuration (mismas keys, Firebase tiene restricciones de dominio)
REACT_APP_FIREBASE_API_KEY=AIzaSyAJ-nNZ1QUMjNz9BVlaeUA3jrsdzxV3tCQ
REACT_APP_FIREBASE_AUTH_DOMAIN=datalab-itam-17c87.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=datalab-itam-17c87
REACT_APP_FIREBASE_STORAGE_BUCKET=datalab-itam-17c87.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=292946482820
REACT_APP_FIREBASE_APP_ID=1:292946482820:web:348d78d82ee96bb9fb54d1
REACT_APP_FIREBASE_MEASUREMENT_ID=G-CMV0XWLTEW

# API Configuration (cambiar a tu URL de producción)
REACT_APP_API_URL=https://api.datalab-itam.com/api

# Entorno
REACT_APP_ENV=production
```

## Importante

- Las API keys de Firebase son seguras para usar en el cliente
- Firebase usa restricciones de dominio para seguridad
- **NUNCA** commitees archivos `.env` o `.env.production` a Git
- Configura estas variables en tu plataforma de deploy (Vercel, Netlify, etc.)

