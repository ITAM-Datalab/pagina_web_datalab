# 🎨 Guía de Marca - DataLab ITAM

## 🎯 Logo y Identidad Visual

### Logo Principal
El logo de DataLab está basado en un cubo 3D dentro de un hexágono, representando:
- **Cubo**: Datos estructurados y análisis multidimensional
- **Hexágono**: Conexión y colaboración (forma que se conecta naturalmente)
- **Colores**: Teal y naranja que representan tecnología y creatividad

### 🎨 Paleta de Colores

#### Colores Principales
```css
/* Teal - Color primario */
--primary: #2d7d7d
--accent: #34a0a4 (teal más claro)

/* Naranja - Color secundario */
--secondary: #f39c12
--warning: #f39c12
```

#### Colores de Soporte
```css
/* Grises y neutros */
--text: #2d3748
--text-light: #718096
--text-dark: #1a202c
--text-white: #ffffff

/* Fondos */
--background: #ffffff
--background-alt: #f7fafc
--background-dark: #1a202c

/* Bordes */
--border: #e2e8f0
--border-light: #f1f5f9
--border-dark: #cbd5e0

/* Estados */
--success: #38a169
--error: #e53e3e
```

### 📐 Uso del Logo

#### Tamaños Recomendados
- **Header**: 40px
- **Footer**: 48px  
- **Hero Section**: 64px
- **Favicon**: 32px, 16px

#### Variantes
- **Con texto**: Para headers y footers
- **Solo símbolo**: Para espacios reducidos o decorativo
- **Monocromático**: Para casos especiales

### 🎨 Gradientes

#### Gradiente Principal (Teal → Naranja)
```css
background: linear-gradient(135deg, #2d7d7d, #f39c12);
```

#### Gradiente Hexágono (Logo)
```css
/* SVG Gradient */
<linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stopColor="#2d7d7d" />
  <stop offset="100%" stopColor="#f39c12" />
</linearGradient>
```

### 💡 Significado de los Colores

#### Teal (#2d7d7d)
- **Tecnología**: Representa innovación y análisis de datos
- **Confianza**: Transmite profesionalismo y confiabilidad
- **Equilibrio**: Entre lo técnico y lo humano

#### Naranja (#f39c12)
- **Creatividad**: Soluciones innovadoras y pensamiento lateral
- **Energía**: Pasión por el cambio social
- **Calidez**: Enfoque humano en la tecnología

### 🎯 Aplicaciones

#### Headers y Navegación
- Fondo blanco con logo en colores originales
- Hover effects con gradientes sutiles
- Sticky header con transparencia

#### Footer
- Fondo con gradiente principal (teal → naranja)
- Logo en blanco o colores originales
- Texto en blanco con opacidades

#### Botones
- **Primario**: Gradiente teal → naranja
- **Secundario**: Naranja sólido
- **Outline**: Borde teal, texto teal
- **Ghost**: Transparente con hover teal

#### Cards y Componentes
- Bordes sutiles en grises
- Hover effects con colores principales
- Sombras suaves para profundidad

### 📱 Responsividad

El logo se adapta automáticamente:
- **Desktop**: Tamaño completo con texto
- **Tablet**: Tamaño medio con texto
- **Mobile**: Tamaño reducido, opcionalmente solo símbolo

### ✅ Buenas Prácticas

#### ✅ Hacer
- Usar los colores exactos especificados
- Mantener proporciones del logo
- Usar gradientes para elementos destacados
- Aplicar hover effects consistentes

#### ❌ Evitar
- Modificar las proporciones del logo
- Usar colores similares pero no exactos
- Sobrecargar con demasiados gradientes
- Cambiar la estructura del hexágono/cubo

### 🔧 Implementación Técnica

#### Componente Logo
```tsx
import Logo from '../components/common/Logo';

// Con texto
<Logo size={40} showText={true} />

// Solo símbolo
<Logo size={32} showText={false} />
```

#### Tema (styled-components)
```tsx
const theme = {
  colors: {
    primary: '#2d7d7d',
    secondary: '#f39c12',
    accent: '#34a0a4',
    // ... resto de colores
  }
};
```

### 🎨 Inspiración del Diseño

El logo de DataLab combina:
- **Geometría**: Formas limpias y matemáticas
- **Dimensionalidad**: Representación 3D de los datos
- **Conexión**: El hexágono como forma que se conecta naturalmente
- **Modernidad**: Colores contemporáneos y diseño minimalista

---

**DataLab ITAM** - Donde los datos cobran vida para el cambio social 🚀
