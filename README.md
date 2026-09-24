# 🍓 Sweet Berry — Plataforma E-Commerce Gourmet & Ecosistema de Digitalización IA

> **Sweet Berry** es una solución e-commerce de alta gama especializada en la comercialización de **fresas con crema artesanales gourmet**. Integra digitalización inteligente de facturas y catálogos de proveedores mediante **Inteligencia Artificial (Gemini 3.8 Flash)**, cálculo de costos e inventario en tiempo real, personalización interactiva en 3D, verificación obligatoria de identidad de clientes (**Sweet Berry Shield™**) y canal de sincronización automatizada hacia **GitHub y despliegue continuo en la nube**.

---

## 📑 Tabla de Contenidos
1. [Características Principales](#-características-principales)
2. [Arquitectura del Sistema](#-arquitectura-del-sistema)
3. [Requisitos Previos](#-requisitos-previos)
4. [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
5. [Configuración de Variables de Entorno](#-configuración-de-variables-de-entorno)
6. [Estructura y Esquema de la Base de Datos](#-estructura-y-esquema-de-la-base-de-datos)
7. [Motor de Extracción de Documentos por IA](#-motor-de-extracción-de-documentos-por-ia)
8. [Diseño y Experiencia de Usuario (UI/UX)](#-diseño-y-experiencia-de-usuario-uiux)
9. [Seguridad y Verificación Pre-Compra (Sweet Berry Shield™)](#-seguridad-y-verificación-pre-compra-sweet-berry-shield)
10. [Pipeline CI/CD: GitHub y Despliegue en la Nube](#-pipeline-cicd-github-y-despliegue-en-la-nube)
11. [Comandos y Scripts Disponibles](#-comandos-y-scripts-disponibles)

---

## ✨ Características Principales

- **Catálogo Fiel a la Documentación Oficial**:
  - Implementación íntegra de las 6 páginas del documento corporativo:
    - *Página 1*: Encabezado institucional *"Fresas con crema para endulzar tus momentos"*, lema *Fresas Frescas • Crema • Sabor*.
    - *Página 2*: Sección *Conócenos — Una idea dulce con futuro* (Ingredientes, Presentación, Pedidos).
    - *Página 3*: Catálogo oficial de productos (*Fresa Clásica*, *Sweet Berry Especial*, *Presentación Personalizada*).
    - *Página 4*: *Nuestro Objetivo — Crecer con calidad y sabor* (Emprender, Calidad, Presencia Digital).
    - *Página 5*: *Pedidos Online — ¡Haz tu pedido!* con canales oficiales de WhatsApp e Instagram (`@sweetberry`).
    - *Página 6*: Manifiesto final *Fresco. Natural. Delicioso.*

- **Personalizador Interactivo 3D en Tiempo Real**:
  - Renderizador visual en Canvas HTML5 con rotación en 360° manipulable mediante arrastre de mouse y soporte táctil para dispositivos móviles.
  - Selección en vivo de formatos (Individual 250g, Mediano 400g, Familiar 700g), texturas de crema artesanal (Mascarpone con vainilla bourbon, pistacho puro siciliano, mousse de chocolate blanco belga, etc.) y adición de toppings gourmet.
  - Cálculo instantáneo de costos y gramajes.

- **Procesamiento Inteligente de Facturas y Catálogos**:
  - Ingesta de documentos digitales (imágenes, PDFs o texto copiado de facturas de venta o catálogos mayoristas).
  - Extracción automática con el SDK oficial `@google/genai` (modelo **Gemini 3.8 Flash**).
  - Detección de NIT/RUT de proveedores, cantidades, unidades de medida, costos unitarios, números de lote y fechas de vencimiento.
  - Actualización automática de existencias en el inventario activo de la tienda.

- **Sweet Berry Shield™ (Validación de Comprador Obligatoria)**:
  - Protocolo de seguridad que exige el registro y validación por código 2FA antes de completar cualquier pedido.
  - Protección de datos personales y financieros contra transacciones fraudulentas.

- **Sincronización con GitHub y Cloud Run**:
  - Registro de eventos de auditoría y commits automatizados tras cada reabastecimiento o actualización de catálogo.
  - Monitoreo de revisiones y estado de despliegue en la nube.

---

## 🏛️ Arquitectura del Sistema

La solución está construida sobre una arquitectura full-stack moderna y ligera:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Frontend SPA)                          │
│                                                                        │
│   React 19 + TypeScript + Tailwind CSS v4 + Motion                     │
│   • Componentes de Catálogo y Carrito Deslizable                       │
│   • Renderizador 3D Interactivo (HTML5 2D Canvas Context)              │
│   • Sweet Berry Shield (2FA & Registro Criptográfico Local)            │
│   • Dashboard de Ingestión Documental y Monitoreo de Stock             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / JSON API
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        SERVIDOR (Backend API)                          │
│                                                                        │
│   Node.js + Express + TypeScript (tsx)                                 │
│   • Proxy seguro a modelos de Inteligencia Artificial                  │
│   • POST /api/parse-document (Normalización & Extracción IA)           │
│   • POST /api/github-sync (Disparador de Webhook & Despliegue Cloud)   │
│   • GET  /api/health (Salud del servicio y métricas de tiempo)         │
│   • Middleware de Vite integrado para desarrollo ágil                  │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
┌─────────────────────────────────┐   ┌──────────────────────────────────┐
│        MOTOR DE IA              │   │   INFRAESTRUCTURA DE DESPLIEGUE  │
│  @google/genai TypeScript SDK   │   │   GitHub CI/CD & Google Cloud    │
│  Modelo: gemini-3.8-flash       │   │   Cloud Run (Contenedores Auto-  │
│  Structured Outputs (JSON)      │   │   escalables sin servidor)       │
└─────────────────────────────────┘   └──────────────────────────────────┘
```

---

## 📦 Requisitos Previos

- **Node.js**: Versión `v20.x` o superior (se recomienda `v22.x LTS`).
- **NPM**: Versión `10.x` o superior.
- **Clave de API de Gemini**: (Opcional en desarrollo gracias al motor de fallback inteligente integrado, obligatoria para producción con extracción real de documentos).

---

## 🚀 Instalación y Puesta en Marcha

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/sweet-berry-ecommerce.git
cd sweet-berry-ecommerce
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar el Entorno
Copiar el archivo de variables de ejemplo:
```bash
cp .env.example .env
```
Editar el archivo `.env` e ingresar las credenciales requeridas.

### 4. Iniciar en Modo de Desarrollo
```bash
npm run dev
```
La aplicación quedará disponible en:
- `http://localhost:3000`

### 5. Compilar para Producción
```bash
npm run build
```

### 6. Ejecutar en Modo Producción
```bash
npm start
```

---

## ⚙️ Configuración de Variables de Entorno

El archivo `.env` acepta los siguientes parámetros:

```env
# Puerto en el que se ejecuta el servidor web y la API
PORT=3000

# Clave de API de Google Gemini para procesamiento de facturas y catálogos
# En Google AI Studio se inyecta automáticamente desde el panel de Secrets
GEMINI_API_KEY="AIzaSy..."

# URL del servicio desplegado en la nube (utilizado para enlaces y webhooks)
APP_URL="https://ais-dev-eoyl5oqqhmfg5cah5npqfo-490692570347.us-west1.run.app"

# Nivel de entorno ('development' o 'production')
NODE_ENV="development"
```

---

## 🗄️ Estructura y Esquema de la Base de Datos

El modelo de datos está diseñado para garantizar la **trazabilidad total de cada porción** de fresas con crema desde la factura del productor agrícola hasta la entrega al consumidor final.

### 1. Modelo de Productos (`Product`)
Representa los ítems del menú con sus variaciones de gramaje:

```typescript
interface Product {
  id: string;                     // Identificador slug (ej. 'sweet-berry-especial')
  name: string;                   // Nombre comercial
  subtitle: string;               // Resumen descriptivo corto
  description: string;            // Descripción gourmet detallada
  basePrice: number;              // Precio base en moneda local (COP)
  image: string;                  // URL o ruta del asset fotográfico
  category: 'clasica' | 'especial' | 'personalizada';
  stock: number;                  // Unidades disponibles en inventario en vivo
  badge?: string;                 // Distintivo comercial (ej. 'Creación Insignia')
  portionSizes: {
    name: string;                 // Ej. 'Individual', 'Mediano', 'Familiar'
    grams: string;                // Ej. '250g', '400g', '700g'
    multiplier: number;           // Multiplicador sobre el precio base
  }[];
  includedIngredients: string[];  // Lista de ingredientes base certificados
  recommendedToppings: string[];  // Sugerencias gourmet
}
```

### 2. Modelo de Lotes de Inventario e Insumos (`InventoryBatch`)
Registra cada ingreso de materia prima originado desde una factura o catálogo:

```typescript
interface InventoryBatch {
  id: string;                     // Identificador único (UUID)
  productName: string;            // Ej. 'Fresas Albión Grado Exportación'
  batchCode: string;              // Código de lote (ej. 'LOT-FR-2026-88')
  quantityAdded: number;          // Cantidad física ingresada
  unit: string;                   // 'kg', 'litros', 'cajas', 'unidades'
  supplier: string;               // Nombre del proveedor o finca emisora
  receivedAt: string;             // Marca de tiempo de recepción
  expirationDate: string;         // Fecha límite de caducidad en cadena de frío
  unitCost: number;               // Costo unitario según factura
  qualityPassed: boolean;         // Certificación de control de calidad e inocuidad
  impactedProductIds: string[];   // Productos del menú que abastece este lote
}
```

### 3. Modelo de Clientes Verificados (`VerifiedCustomer`)
Controla la seguridad de identidad pre-compra (**Sweet Berry Shield™**):

```typescript
interface VerifiedCustomer {
  isVerified: boolean;            // Flag booleano de aprobación 2FA
  fullName: string;               // Nombre y apellidos completos
  phone: string;                  // Teléfono móvil / WhatsApp de contacto
  email: string;                  // Correo electrónico
  address: string;                // Dirección física de entrega
  city: string;                   // Ciudad de despacho (ej. 'Bogotá D.C.')
  verificationToken: string;      // Token criptográfico (ej. 'SB-SHIELD-99412-AUTH')
  verifiedAt: string;             // Fecha y hora de validación
  badgeNumber: string;            // Código público de comprador verificado (ej. 'V-54912')
}
```

### 4. Modelo de Órdenes y Transacciones (`Order`)
Almacena el detalle del pedido generado y canalizado hacia despacho:

```typescript
interface Order {
  orderId: string;                // Código de pedido (ej. 'SB-781923')
  customer: VerifiedCustomer;     // Datos del cliente autenticado
  items: CartItem[];              // Desglose de porciones, cremas y toppings
  subtotal: number;               // Monto antes de costos de despacho
  deliveryFee: number;            // Costo de flete refrigerado ($0 si supera $45k)
  total: number;                  // Total general a cobrar
  timestamp: string;              // Momento de creación
  status: 'VERIFICADO' | 'EN_PREPARACION' | 'EN_RUTA_FRIA' | 'ENTREGADO';
  notes?: string;                 // Indicaciones personalizadas de empaque
}
```

### 5. Registro de Sincronización CI/CD (`GitHubSyncLog`)
Auditoría de despliegues y actualizaciones en la nube:

```typescript
interface GitHubSyncLog {
  commitHash: string;             // Hash SHA de Git (ej. '7c89f1a')
  message: string;                // Mensaje semántico del commit
  timestamp: string;              // Hora del evento
  branch: string;                 // Rama de trabajo ('main')
  status: 'PENDING' | 'BUILDING' | 'DEPLOYED' | 'SYNCED';
  revision: string;               // Nombre de revisión en Cloud Run
  syncedItemsCount: number;       // Cantidad de productos actualizados
}
```

---

## 🧠 Motor de Extracción de Documentos por IA

El endpoint `POST /api/parse-document` ejecuta una rutina de análisis multimodal mediante **Gemini 3.8 Flash**:

1. **Ingesta Multimodal**:
   - Soporta imágenes (`image/jpeg`, `image/png`, `image/webp`) codificadas en Base64 o fragmentos textuales de documentos fiscales.
2. **Instrucción de Dominio**:
   - El modelo es parametrizado como un auditor contable gastronómico experto en confitería y compras agrícolas.
3. **Respuesta Estructurada**:
   - Devuelve un objeto JSON con cálculo de subtotales, impuestos, desglose de lotes y nota analítica de margen proyectado.
4. **Resiliencia Operativa**:
   - En caso de interrupción en la conectividad del API, el servidor cuenta con un motor heurístico que garantiza la continuidad de las pruebas y la carga de datos sin caídas de servicio.

---

## 🎨 Diseño y Experiencia de Usuario (UI/UX)

La interfaz fue diseñada respetando principios de diseño editorial de alta gama:

- **Tipografía**:
  - Títulos y acentos: `Playfair Display` (serif elegante, alto contraste).
  - Cuerpo y navegación: `Plus Jakarta Sans` (geométrica, limpia y de excelente legibilidad en dispositivos táctiles).
  - Datos numéricos, lotes y tokens: `JetBrains Mono` (alineación tabular precisa).
- **Paleta Cromática Gourmet**:
  - `Berry 900` (`#1C0B13`): Fondo oscuro noble y texto principal.
  - `Berry 500` (`#E11D48`): Rojo frambuesa vibrante de acento y acción primaria.
  - `Cream 50 / 100` (`#FAF7F2` / `#FAF6EE`): Lienzo crema suave que evoca la textura de la leche batida artesanal.
- **Micro-interacciones y 3D**:
  - Canvas 2D interactivo con física de iluminación en capas para simular la textura del postre.
  - Transiciones de carga suaves y badges informativos no invasivos.
  - Formatos adaptados a pantallas móviles con área táctil optimizada.

---

## 🛡️ Seguridad y Verificación Pre-Compra (Sweet Berry Shield™)

Para salvaguardar los datos financieros del comercio y del usuario:

1. **Filtro Pre-Transaccional**: El botón de confirmación de pedido permanece bloqueado hasta que el usuario complete su verificación.
2. **Formulario Cifrado**: Recopila nombre, dirección de despacho, correo y número de WhatsApp.
3. **Validación 2FA**: Emite un código de 6 dígitos con simulación asistida para validar la autenticidad del dispositivo receptor.
4. **Token de Seguridad**: Genera un certificado `SB-SHIELD-xxxxxx-AUTH` que viaja adjunto en el mensaje del pedido garantizando que no se trata de pedidos espurios o bots automatizados.

---

## 🔄 Pipeline CI/CD: GitHub y Despliegue en la Nube

1. **Sincronización con GitHub**:
   - Cada actualización de catálogo confirmada desde la interfaz despacha un webhook al endpoint `POST /api/github-sync`.
   - Se genera un commit hash automático asociado a la rama `main`.
2. **Despliegue Continuo (Cloud Run)**:
   - Notificación de generación de nueva revisión de contenedor inmutable con tráfico direccionado al 100%.
   - Los registros de auditoría quedan visibles en tiempo real en la consola de la aplicación.

---

## 🛠️ Comandos y Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor Express y el middleware de Vite en modo de desarrollo (`tsx server.ts`). |
| `npm run build` | Compila los assets de React y genera el bundle optimizado en la carpeta `/dist`. |
| `npm start` | Inicia el servidor listo para producción sirviendo la aplicación compilada. |
| `npm run lint` | Ejecuta la verificación estática de tipos con `tsc --noEmit`. |
| `npm run clean` | Elimina la carpeta `/dist` y archivos temporales de compilación. |

---

## 📞 Soporte y Canales Oficiales

- **WhatsApp Oficial**: [+57 310 555 2026](https://wa.me/573100000000)
- **Instagram**: [@sweetberry](https://instagram.com/sweetberry)
- **Propuesta**: *Convertir un postre sencillo en una experiencia especial, cuidando el sabor, la presentación, el servicio y la organización.*

---
*Sweet Berry © 2026 — Fresas Frescas • Crema • Sabor. Todos los derechos reservados.*
