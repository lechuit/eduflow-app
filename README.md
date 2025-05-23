# 🎓 EduFlow Frontend

> **Plataforma inteligente para generación y personalización de contenido educativo con IA**

[![Made with Ionic](https://img.shields.io/badge/Made%20with-Ionic-3880FF?style=flat-square&logo=ionic)](https://ionicframework.com/)
[![Angular](https://img.shields.io/badge/Angular-16+-DD0031?style=flat-square&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3+-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

## ✨ Características Principales

- 🤖 **Generación de Clases con IA**: Crea contenido educativo personalizado usando Claude AI
- 👥 **Gestión de Estudiantes**: Perfiles de aprendizaje individualizados con adaptaciones automáticas
- 📊 **Analytics Inteligente**: Seguimiento del progreso y insights de aprendizaje
- 📱 **Multiplataforma**: PWA + Apps nativas iOS/Android
- 🎨 **Diseño Moderno**: UI/UX optimizada para educadores
- ⚡ **Rendimiento**: Lazy loading, optimizaciones y experiencia fluida

## 🚀 Quick Start

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Ionic CLI: `npm install -g @ionic/cli`

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/lechuit/eduflow-app.git
cd eduflow-app

# Instalar dependencias
npm install

# Servir en desarrollo
ionic serve
```

### Build para producción

```bash
# Build web
ionic build --prod

# Build para móvil
ionic capacitor build ios
ionic capacitor build android
```

## 🛠️ Stack Tecnológico

### Frontend Core
- **Framework**: Angular 16+ con TypeScript
- **UI Framework**: Ionic 7 
- **Estilos**: Tailwind CSS + Custom Design System
- **Estado**: RxJS + Services (sin NgRx para simplicidad)
- **HTTP**: Angular HttpClient con interceptors

### Mobile & PWA
- **Capacitor**: Para apps nativas iOS/Android
- **PWA**: Service Worker + Manifest para experiencia web
- **Storage**: Ionic Storage (IndexedDB/SQLite)

### Desarrollo
- **Bundler**: Angular CLI + Webpack
- **Testing**: Jasmine + Karma
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky para pre-commit

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                 # Servicios principales, guards, interceptors
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   ├── shared/               # Componentes, pipes, modelos compartidos
│   │   ├── components/
│   │   ├── models/
│   │   └── pipes/
│   ├── features/             # Módulos de características
│   │   ├── auth/             # Autenticación
│   │   ├── classes/          # Generación y gestión de clases
│   │   ├── students/         # Gestión de estudiantes
│   │   ├── dashboard/        # Dashboard principal
│   │   └── tabs/             # Navegación por tabs
│   └── layouts/              # Layouts de página
├── assets/                   # Recursos estáticos
├── environments/             # Configuraciones de entorno
└── global.scss              # Estilos globales
```

## 🎨 Design System

### Colores Principales
```css
--primary: #6366f1      /* Indigo moderno */
--secondary: #10b981    /* Verde educativo */
--accent: #f59e0b       /* Amber para highlights */
--success: #22c55e
--warning: #f59e0b
--danger: #ef4444
```

### Componentes Custom
- `edu-button`: Botones con estados de loading
- `edu-card`: Cards con hover effects
- `edu-input`: Inputs con validación visual
- `class-card`: Tarjetas específicas para clases
- `student-avatar`: Avatares con indicadores de progreso

## 🔧 Configuración

### Variables de Entorno

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  features: {
    analytics: true,
    darkMode: true,
    notifications: true
  }
};
```

### Configuración de Ionic

```typescript
// Configuración optimizada para EduFlow
IonicModule.forRoot({
  rippleEffect: true,
  mode: 'ios', // Consistencia entre plataformas
  backButtonText: 'Atrás'
})
```

## 📚 Guías de Desarrollo

### Crear Nuevo Feature

```bash
# Generar módulo de feature
ionic generate module features/mi-feature --routing

# Generar página
ionic generate page features/mi-feature/pages/mi-pagina

# Generar servicio
ionic generate service features/mi-feature/services/mi-servicio
```

### Convenciones de Código

- **Componentes**: PascalCase (`ClassGeneratorComponent`)
- **Servicios**: PascalCase + Service (`AuthService`)
- **Interfaces**: PascalCase (`User`, `ClassGenerationRequest`)
- **Enums**: PascalCase (`UserRole`, `TeachingStyle`)
- **Archivos**: kebab-case (`class-generator.component.ts`)

### Estructura de Componentes

```typescript
@Component({
  selector: 'app-class-generator',
  templateUrl: './class-generator.component.html',
  styleUrls: ['./class-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassGeneratorComponent implements OnInit, OnDestroy {
  // Properties
  // Constructor
  // Lifecycle hooks
  // Public methods
  // Private methods
}
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run e2e

# Coverage
npm run test:coverage
```

## 📱 Deployment

### Web (Vercel/Netlify)
```bash
ionic build --prod
# Deploy dist/ folder
```

### iOS
```bash
ionic capacitor build ios
# Abrir en Xcode y distribuir
```

### Android
```bash
ionic capacitor build android
# Generar APK/AAB desde Android Studio
```

## 🔒 Seguridad

- ✅ JWT tokens con refresh automático
- ✅ HTTP interceptors para autenticación
- ✅ Guards de rutas protegidas
- ✅ Sanitización de inputs
- ✅ HTTPS en producción

## 🎯 Roadmap

### Fase 1 - MVP (Completado)
- [x] Autenticación básica
- [x] Generación de clases
- [x] Gestión de estudiantes
- [x] Dashboard inicial

### Fase 2 - Features Avanzadas (En desarrollo)
- [ ] Analytics detallados
- [ ] Exportación a PDF/Word
- [ ] Integración Google Classroom
- [ ] Sistema de evaluaciones

### Fase 3 - Escalamiento
- [ ] Modo offline
- [ ] Colaboración entre profesores
- [ ] Marketplace de plantillas
- [ ] Multi-idioma

## 🤝 Contribución

1. Fork el proyecto
2. Crear branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Team

- **Frontend Lead**: [Tu nombre]
- **Backend**: [Backend dev]
- **Design**: [Designer]

## 🆘 Soporte

- 📧 Email: support@eduflow.app
- 💬 Discord: [Invitación al servidor]
- 📚 Docs: [Documentación completa]

---

**¡Construyendo el futuro de la educación personalizada! 🚀**