# Configuración de Variables de Entorno

## Crear archivo .env

Copia el contenido siguiente en un nuevo archivo llamado `.env` en la carpeta `backend/`:

```env
# Puerto del servidor
PORT=3001

# Firebase Admin SDK Configuration (Proyecto: datalab-itam-17c87)
FIREBASE_PROJECT_ID=datalab-itam-17c87
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@datalab-itam-17c87.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id

# Seguridad
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# CORS
CORS_ORIGIN=http://localhost:3000

# Entorno
NODE_ENV=development

# Logging
LOG_LEVEL=debug
ENABLE_FILE_LOGGING=false

# Rate Limiting (opcional)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Obtener Credenciales de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `datalab-itam-17c87`
3. Ve a **Project Settings** > **Service Accounts**
4. Haz clic en **Generate New Private Key**
5. Copia los valores del archivo JSON descargado al `.env`

## Importante

- **NUNCA** commitees el archivo `.env` a Git
- Cambia el `JWT_SECRET` en producción
- En producción, usa el `NODE_ENV=production`

