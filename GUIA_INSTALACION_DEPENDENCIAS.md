# 📦 Guía de Instalación de Nuevas Dependencias

Este documento detalla las nuevas dependencias que deben instalarse para las mejoras de prioridad alta.

## 🔧 Backend

Navega a la carpeta del backend y ejecuta:

```bash
cd backend
npm install
```

### Nuevas Dependencias de Producción

```bash
npm install express-rate-limit express-validator winston
```

- **express-rate-limit**: Rate limiting para prevenir abuso de la API
- **express-validator**: Validación robusta de datos de entrada
- **winston**: Sistema profesional de logging

### Nuevas Dependencias de Desarrollo

```bash
npm install --save-dev jest supertest
```

- **jest**: Framework de testing
- **supertest**: Testing de APIs HTTP

---

## 🎨 Frontend

Navega a la carpeta del frontend y ejecuta:

```bash
cd frontend
npm install
```

**NOTA**: Las dependencias del frontend ya están instaladas. No es necesario instalar nada adicional.

---

## ✅ Verificar Instalación

### Backend

```bash
cd backend
node -e "console.log(require('./package.json').version)"
```

Debería mostrar: `2.0.0`

### Tests Backend

```bash
cd backend
npm test
```

### Servidor Backend

```bash
cd backend
npm run dev
```

Deberías ver:
```
🚀 Servidor DataLab ejecutándose en puerto 3001
🌍 Entorno: development
📡 CORS habilitado para: http://localhost:3000
🔒 Seguridad: Helmet, Rate Limiting, Validaciones activas
```

---

## 📝 Archivos de Configuración Necesarios

### Backend: .env

Crea el archivo `backend/.env` basándote en `backend/SETUP_ENV.md`

### Frontend: .env

Crea el archivo `frontend/.env` basándote en `frontend/SETUP_ENV.md`

---

## 🔍 Solución de Problemas

### Error: Cannot find module 'express-rate-limit'

```bash
cd backend
npm install express-rate-limit
```

### Error: Cannot find module 'winston'

```bash
cd backend
npm install winston
```

### Error al ejecutar tests

```bash
cd backend
rm -rf node_modules
npm install
npm test
```

---

## 📚 Documentación Adicional

- [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)
- [Express Validator](https://express-validator.github.io/docs/)
- [Winston](https://github.com/winstonjs/winston)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)

