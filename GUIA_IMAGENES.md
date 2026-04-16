# 📸 Guía para Agregar Imágenes y Recursos - DataLab

## 📁 **Estructura de Carpetas Creada**

```
pagina_web_datalab/frontend/
├── public/                          # Para imágenes estáticas (acceso directo)
│   ├── images/                      # Crear esta carpeta
│   │   ├── logo/                    # Logos y favicons
│   │   ├── hero/                    # Imágenes de fondo
│   │   ├── projects/                # Screenshots de proyectos
│   │   └── team/                    # Fotos del equipo
│   ├── favicon.ico
│   └── manifest.json
└── src/
    ├── assets/                      # ✅ YA CREADA
    │   ├── images/                  # ✅ YA CREADA
    │   │   ├── logo/                # ✅ YA CREADA
    │   │   ├── hero/                # ✅ YA CREADA
    │   │   ├── projects/            # ✅ YA CREADA
    │   │   └── team/                # ✅ YA CREADA
    │   └── icons/                   # ✅ YA CREADA
    └── components/
```

## 🎯 **Dónde Colocar Cada Tipo de Imagen**

### 1. **Logo de DataLab** 🏷️

#### **Opción A: `public/images/logo/` (Recomendada)**
```
public/images/logo/
├── datalab-logo.svg          # Logo principal (vectorial)
├── datalab-logo.png          # Logo en PNG (alta resolución)
├── datalab-icon.svg          # Solo el ícono del cubo
├── datalab-icon.png          # Ícono en PNG
├── favicon-32x32.png         # Para favicon
└── favicon-16x16.png         # Para favicon pequeño
```

**Uso en código:**
```tsx
// En cualquier componente
<img src="/images/logo/datalab-logo.svg" alt="DataLab ITAM" />
```

#### **Opción B: `src/assets/images/logo/`**
```tsx
// Importar la imagen
import datalabLogo from '../assets/images/logo/datalab-logo.svg';

// Usar en JSX
<img src={datalabLogo} alt="DataLab ITAM" />
```

### 2. **Imágenes del Hero Section** 🌟
```
public/images/hero/
├── hero-background.jpg       # Fondo principal
├── hero-pattern.svg          # Patrones decorativos
└── data-visualization.png    # Gráficos de datos
```

### 3. **Proyectos** 💼
```
public/images/projects/
├── horas-servicio.jpg        # Screenshot del sistema de horas
├── datos-ambientales.jpg     # Visualización ambiental
├── desigualdad-social.jpg    # Análisis social
└── proyecto-placeholder.jpg  # Imagen por defecto
```

### 4. **Equipo** 👥
```
public/images/team/
├── member-1.jpg              # Foto de miembro 1
├── member-2.jpg              # Foto de miembro 2
├── team-placeholder.jpg      # Imagen por defecto
└── team-group.jpg            # Foto grupal
```

### 5. **Iconos y Recursos** 🎨
```
src/assets/icons/
├── social/
│   ├── github.svg
│   ├── linkedin.svg
│   └── twitter.svg
├── tech/
│   ├── react.svg
│   ├── firebase.svg
│   └── python.svg
└── ui/
    ├── arrow-right.svg
    └── check.svg
```

## 🔧 **Cómo Usar las Imágenes**

### **Método 1: Imágenes en `public/` (Más Simple)**

```tsx
// En cualquier componente React
function MyComponent() {
  return (
    <div>
      {/* Logo principal */}
      <img src="/images/logo/datalab-logo.svg" alt="DataLab" />
      
      {/* Imagen de proyecto */}
      <img src="/images/projects/horas-servicio.jpg" alt="Sistema de Horas" />
      
      {/* Foto de equipo */}
      <img src="/images/team/member-1.jpg" alt="Miembro del equipo" />
    </div>
  );
}
```

### **Método 2: Imágenes en `src/assets/` (Optimizadas por Webpack)**

```tsx
// Importar las imágenes
import datalabLogo from '../assets/images/logo/datalab-logo.svg';
import projectImage from '../assets/images/projects/horas-servicio.jpg';
import memberPhoto from '../assets/images/team/member-1.jpg';

function MyComponent() {
  return (
    <div>
      <img src={datalabLogo} alt="DataLab" />
      <img src={projectImage} alt="Sistema de Horas" />
      <img src={memberPhoto} alt="Miembro del equipo" />
    </div>
  );
}
```

### **Método 3: Con Styled Components**

```tsx
import styled from 'styled-components';

const HeroSection = styled.section`
  background-image: url('/images/hero/hero-background.jpg');
  background-size: cover;
  background-position: center;
`;

// O importando
import heroBackground from '../assets/images/hero/hero-background.jpg';

const HeroSection = styled.section`
  background-image: url(${heroBackground});
  background-size: cover;
`;
```

## 📝 **Recomendaciones de Formato y Tamaño**

### **Logos**
- **Formato**: SVG (preferido) o PNG con fondo transparente
- **Tamaños**: 
  - Logo completo: 200x60px, 400x120px
  - Ícono: 32x32px, 64x64px, 128x128px

### **Fotos del Equipo**
- **Formato**: JPG o WebP
- **Tamaño**: 400x400px (cuadradas)
- **Peso**: < 100KB por imagen

### **Proyectos**
- **Formato**: JPG o WebP
- **Tamaño**: 800x600px o 1200x800px
- **Peso**: < 200KB por imagen

### **Hero/Fondos**
- **Formato**: JPG o WebP
- **Tamaño**: 1920x1080px o superior
- **Peso**: < 500KB

## 🚀 **Pasos para Agregar Tus Imágenes**

### **1. Preparar las Imágenes**
- Optimiza el tamaño y peso
- Usa nombres descriptivos: `datalab-logo.svg`, `proyecto-horas-servicio.jpg`
- Mantén consistencia en formatos

### **2. Colocar en las Carpetas**
```bash
# Ejemplo de estructura final
public/images/
├── logo/
│   ├── datalab-logo.svg          # ← Tu logo aquí
│   └── datalab-icon.png          # ← Ícono aquí
├── projects/
│   ├── horas-servicio.jpg        # ← Screenshots de proyectos
│   └── datos-ambientales.jpg
└── team/
    ├── miembro-1.jpg             # ← Fotos del equipo
    └── miembro-2.jpg
```

### **3. Actualizar Componentes**
```tsx
// Ejemplo: Actualizar el componente Logo
export const Logo = () => (
  <img 
    src="/images/logo/datalab-logo.svg" 
    alt="DataLab ITAM"
    width="200"
    height="60"
  />
);
```

### **4. Actualizar Favicon**
```html
<!-- En public/index.html -->
<link rel="icon" href="/images/logo/datalab-icon.png" />
```

## 💡 **Tips Adicionales**

### **Optimización**
- Usa herramientas como TinyPNG para comprimir imágenes
- Considera WebP para mejor compresión
- Usa SVG para logos e iconos

### **Lazy Loading**
```tsx
<img 
  src="/images/projects/proyecto.jpg"
  alt="Proyecto"
  loading="lazy"  // ← Carga diferida
/>
```

### **Responsive Images**
```tsx
<img 
  src="/images/hero/hero-mobile.jpg"
  srcSet="/images/hero/hero-mobile.jpg 768w, /images/hero/hero-desktop.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 1200px"
  alt="Hero"
/>
```

---

## 📋 **Checklist de Imágenes para DataLab**

- [ ] Logo principal de DataLab (.svg y .png)
- [ ] Ícono de DataLab para favicon
- [ ] Fotos del equipo (cuadradas, 400x400px)
- [ ] Screenshots de proyectos principales
- [ ] Imagen de fondo para hero section
- [ ] Iconos de redes sociales
- [ ] Placeholders para contenido futuro

**¡Listo para agregar tus imágenes! 📸✨**
