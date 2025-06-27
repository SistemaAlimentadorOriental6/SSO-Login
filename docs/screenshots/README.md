# 📸 Screenshots del Proyecto Enterprise Login

Esta carpeta contiene todas las capturas de pantalla utilizadas en la documentación del proyecto.

## 📁 Estructura de Archivos

### 🔐 **Login y Autenticación**
- `login-desktop.png` - Pantalla de login en escritorio (1920x1080)
- `login-mobile.png` - Pantalla de login en móvil (375x667)
- `login-forgot-password.png` - Formulario de recuperación de contraseña

### 📱 **Dashboard Principal**
- `dashboard-overview.png` - Vista general del dashboard (1920x1080)
- `dashboard-search.png` - Funcionalidad de búsqueda activa
- `dashboard-favorites.png` - Sección de aplicaciones favoritas
- `dashboard-stats.png` - Estadísticas y métricas del usuario

### 🚀 **Aplicaciones**
- `applications-grid.png` - Grid completo de aplicaciones (1920x1080)
- `applications-categories.png` - Filtros por categorías
- `app-carrotaller.png` - Screenshot de la aplicación Carrotaller (400x300)
- `app-inspecciones.png` - Screenshot de la aplicación Inspecciones (400x300)
- `app-activos.png` - Screenshot del Control de Activos (400x300)

### 📊 **Administración**
- `admin-dashboard.png` - Panel principal de administración (1920x1080)
- `admin-users.png` - Gestión de usuarios
- `admin-applications.png` - Configuración de aplicaciones
- `admin-permissions.png` - Panel de permisos y roles
- `admin-audit.png` - Logs de auditoría

### 📱 **Responsive Design**
- `mobile-dashboard.png` - Dashboard en móvil (375x667)
- `mobile-menu.png` - Menú hamburguesa móvil
- `tablet-view.png` - Vista en tablet (768x1024)
- `tablet-landscape.png` - Tablet en modo horizontal (1024x768)

### 🔄 **Flujos de Trabajo**
- `sso-flow-demo.gif` - Animación del flujo SSO completo
- `login-flow.gif` - Proceso de login animado
- `app-access-flow.gif` - Acceso a aplicación externa

### ⚙️ **Configuración**
- `config-panel.png` - Panel de configuración general (1920x1080)
- `config-security.png` - Configuraciones de seguridad
- `config-integrations.png` - Configuración de integraciones

### 📈 **Monitoreo**
- `monitoring-dashboard.png` - Dashboard de monitoreo (1920x1080)
- `monitoring-alerts.png` - Panel de alertas activas
- `monitoring-metrics.png` - Gráficos de métricas en tiempo real
- `monitoring-logs.png` - Visualización de logs

### 🎯 **Estados y Notificaciones**
- `app-states.png` - Diferentes estados de aplicaciones
- `notifications-panel.png` - Panel de notificaciones
- `toast-messages.png` - Mensajes toast en acción
- `error-states.png` - Pantallas de error

## 📐 Especificaciones Técnicas

### 🎨 **Resoluciones Estándar**
- **Desktop**: 1920x1080 (Full HD)
- **Tablet**: 1024x768 (4:3) o 768x1024 (3:4)
- **Mobile**: 375x667 (iPhone) o 414x896 (iPhone Plus)
- **Thumbnails**: 400x300 para previsualizaciones

### 🎭 **Guías de Estilo**
- **Formato**: PNG para capturas estáticas, GIF para animaciones
- **Calidad**: Alta resolución, compresión optimizada
- **Contenido**: Datos de demostración realistas pero no sensibles
- **UI**: Capturar con UI limpia, sin errores visibles
- **Timing**: Capturas durante horas de baja actividad

### 🔧 **Herramientas Recomendadas**
- **Capturas**: Windows Snipping Tool, macOS Screenshot, o herramientas especializadas
- **Edición**: Adobe Photoshop, GIMP, o Canva para retoques
- **Animaciones**: LICEcap, Kap, o OBS para GIFs
- **Optimización**: TinyPNG o ImageOptim para reducir tamaño

## 📝 Checklist para Screenshots

### ✅ **Antes de Capturar**
- [ ] Limpiar datos de prueba y usar datos demo consistentes
- [ ] Cerrar notificaciones y elementos temporales
- [ ] Verificar que todos los elementos UI estén cargados
- [ ] Configurar resolución de pantalla apropiada
- [ ] Usar navegador en modo incógnito para UI limpia

### ✅ **Durante la Captura**
- [ ] Capturar área completa necesaria
- [ ] Incluir elementos interactivos relevantes
- [ ] Mostrar diferentes estados (hover, focus, etc.)
- [ ] Verificar que el texto sea legible
- [ ] Capturar con scroll en posición apropiada

### ✅ **Después de Capturar**
- [ ] Revisar calidad y claridad
- [ ] Optimizar tamaño de archivo
- [ ] Renombrar con convención establecida
- [ ] Agregar metadatos si es necesario
- [ ] Probar visualización en diferentes tamaños

## 🚀 Cómo Contribuir Screenshots

1. **Preparar Entorno**
   ```bash
   # Levantar el proyecto
   npm run dev
   cd backend && npm run dev
   
   # Usar datos de demo
   npm run seed-demo-data
   ```

2. **Capturar Screenshots**
   - Seguir las especificaciones de resolución
   - Usar nombres de archivo descriptivos
   - Mantener consistencia visual

3. **Optimizar Imágenes**
   ```bash
   # Instalar herramientas de optimización
   npm install -g imagemin-cli
   
   # Optimizar PNGs
   imagemin docs/screenshots/*.png --out-dir=docs/screenshots/optimized
   ```

4. **Actualizar Documentación**
   - Actualizar referencias en README.md principal
   - Agregar descripciones en esta guía
   - Verificar que las rutas estén correctas

## 🎯 Screenshots Prioritarios

### 🔥 **Críticos** (Deben existir)
1. `login-desktop.png` - Primera impresión del sistema
2. `dashboard-overview.png` - Vista principal del usuario
3. `applications-grid.png` - Funcionalidad core del sistema
4. `sso-flow-demo.gif` - Demostración del valor principal

### ⭐ **Importantes** (Altamente recomendados)
1. `mobile-dashboard.png` - Experiencia móvil
2. `admin-dashboard.png` - Panel administrativo
3. `app-carrotaller.png` - Integración con aplicación real
4. `monitoring-dashboard.png` - Capacidades de monitoreo

### 💡 **Opcionales** (Nice to have)
1. `config-panel.png` - Configuraciones avanzadas
2. `notifications-panel.png` - Sistema de notificaciones
3. `error-states.png` - Manejo de errores
4. `tablet-view.png` - Experiencia en tablet

---

> **💡 Tip**: Mantén un balance entre mostrar funcionalidad y mantener las capturas actualizadas. Es mejor tener pocas capturas de alta calidad que muchas desactualizadas.

> **🔄 Actualización**: Revisa y actualiza screenshots con cada release mayor del proyecto. 