# $PEPS – Peptide Perps

> **Leverage the Future of the Human Body**

Una plataforma DeFi avanzada para trading de perpetuals basada en el Peptide Oracle Index. Diseño premium estilo Hyperliquid con Next.js 15, TypeScript y CSS Modules.

---

## 🎨 Características de Diseño

### Estilo Visual
- **Dark Premium**: Paleta oscura profesional con neon accents
- **Colores principales**:
  - Background: `#0a0a0a` (negro profundo)
  - Neon Blue: `#00f0ff`
  - Neon Purple: `#c026d3`
  - Neon Green: `#00ff88`
- **Glassmorphism**: Efectos de vidrio esmerilado con blur
- **Animaciones suaves**: Framer Motion para transiciones fluidas
- **Tipografía**: Orbitron (display) + JetBrains Mono (monospace)

---

## 📦 Stack Tecnológico

### Core
- **Next.js 15** (App Router)
- **TypeScript**
- **CSS Modules** (sin Tailwind)

### Blockchain
- **Wagmi** - React hooks para Ethereum
- **Viem** - TypeScript interface para Ethereum

### Charts & Visualización
- **lightweight-charts** - Gráficos de trading profesionales

### UI & Animaciones
- **Framer Motion** - Animaciones fluidas
- **lucide-react** - Iconos modernos

---

## 🗂️ Estructura del Proyecto

```
peps-defi/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Landing page
│   │   ├── page.module.css
│   │   └── trade/
│   │       ├── page.tsx        # Dashboard de trading
│   │       └── page.module.css
│   ├── components/
│   │   ├── PeptideMolecule.tsx       # Animación 3D de molécula
│   │   ├── StatsCard.tsx             # Tarjetas de estadísticas
│   │   ├── TopBar.tsx                # Barra superior del dashboard
│   │   ├── Sidebar.tsx               # Navegación lateral
│   │   ├── TradingChart.tsx          # Gráfico de trading
│   │   ├── TradingPanel.tsx          # Panel de leverage
│   │   └── PositionsTable.tsx        # Tabla de posiciones
│   ├── styles/
│   │   └── globals.css         # Estilos globales y variables
│   ├── lib/                    # Utilidades y helpers
│   ├── types/                  # Tipos de TypeScript
│   └── hooks/                  # Custom hooks
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

---

## 🚀 Instalación y Setup

### 1. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 2. Configurar variables de entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar .env.local y agregar:
# - WalletConnect Project ID (requerido)
# - Contract addresses (después de deployment)
```

**Ver [ENV_SETUP.md](ENV_SETUP.md) para guía completa de configuración.**

### 3. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📄 Páginas Implementadas

### 1. **Landing Page** (`/`) ✅
- Hero section con molécula de péptido animada en 3D
- Tagline principal: "Leverage the Future of the Human Body"
- Stats cards con TVL, Oracle Price, Volumen 24h
- Features section
- CTA section
- Footer completo

**Componentes:**
- `PeptideMolecule` - Animación 3D con canvas
- `StatsCard` - Tarjetas con estadísticas y efectos hover

### 2. **Trading Dashboard** (`/trade`) ✅
- **TopBar**: Wallet connection, PEPS price, Oracle price
- **Sidebar**: Navegación (Trade, Positions, Staking, Oracle)
- **TradingChart**: Gráfico de velas del Peptide Oracle Index
- **TradingPanel**: Terminal de trading con:
  - Toggle Long/Short
  - Leverage selector (2x, 3x, 4x, 5x)
  - Input de collateral (ETH o PEPS)
  - Cálculos en tiempo real:
    - Position Size
    - Entry Price
    - Liquidation Price
    - Health Factor
    - Estimated Fee
  - Botón de ejecución (Open Long/Short)
- **PositionsTable**: Tabla de posiciones abiertas

### 3. **Oracle Page** (`/oracle`) ✅
- **OraclePriceCard**: Precio destacado hero con precio actual, cambio 24h, high/low
- **IndexBreakdown**: Composición del índice con peso de cada componente:
  - GLP-1 Peptides (35%)
  - BPC-157 (25%)
  - TB-500 (20%)
  - Thymosin Beta (12%)
  - Others (8%)
- **TradingChart**: Gráfico histórico de precios
- **Info Section**: Sobre el oracle, frecuencia de actualización, fuentes de datos

**Componentes:**
- `OraclePriceCard` - Hero card con precio y stats 24h
- `IndexBreakdown` - Grid de componentes con weights y precios

### 4. **Staking Page** (`/stake`) ✅
- **StakingPanel**: Panel para stake/unstake con:
  - Toggle Stake/Unstake
  - Lock period selector (30, 90, 180, 365 días)
  - APY por lock period (12.5% a 35%)
  - Input de cantidad PEPS
  - Cálculo de rewards estimados
  - Fecha de unlock
- **StakingStats**: Estadísticas de staking:
  - Total Value Locked
  - Average APY
  - Total Stakers
  - Your Staked + Rewards
  - Botón Claim Rewards
  - APY bars por tier
- **Benefits Section**: Por qué stakear $PEPS
- **FAQ Section**: Preguntas frecuentes

**Componentes:**
- `StakingPanel` - Panel de stake/unstake
- `StakingStats` - Stats cards y user info

---

## 🎯 Próximos Pasos

### Funcionalidades a implementar:
- [ ] Integración con Wagmi para wallet connection real
- [ ] Conexión con smart contracts:
  - [ ] Open/Close positions
  - [ ] Stake/Unstake tokens
  - [ ] Claim rewards
- [ ] Sistema de notificaciones toast
- [ ] Página de Positions detallada (`/positions`)
- [ ] Modo mobile mejorado con bottom navigation
- [ ] Histórico de trades y analytics
- [ ] Oracle real-time websocket feeds
- [ ] Liquidation warnings
- [ ] Portfolio tracking

---

## 🎨 Variables CSS Disponibles

Usa estas variables en tus CSS Modules:

```css
/* Colores */
var(--color-bg-primary)
var(--color-bg-secondary)
var(--color-neon-blue)
var(--color-neon-purple)
var(--color-neon-green)

/* Gradientes */
var(--gradient-primary)
var(--gradient-glow)

/* Tipografía */
var(--font-display)
var(--font-mono)
var(--font-body)

/* Espaciado */
var(--spacing-xs) hasta var(--spacing-2xl)

/* Border Radius */
var(--radius-sm) hasta var(--radius-xl)

/* Transiciones */
var(--transition-fast)
var(--transition-base)
var(--transition-slow)

/* Efectos glass */
var(--glass-bg)
var(--glass-border)
```

---

## 🌐 Responsive Design

El diseño es completamente responsive con breakpoints en:
- **Desktop**: >1024px (vista completa)
- **Tablet**: 768px - 1024px (sidebar colapsado)
- **Mobile**: <768px (sin sidebar, nav móvil)

---

## 🔥 Características Destacadas

### Animaciones
- **Molécula 3D**: Canvas animado en el hero con rotación 3D
- **Hover effects**: Glows y transformaciones en cards
- **Scroll animations**: Elementos que aparecen al hacer scroll
- **Button animations**: Transiciones suaves en hover

### UX Details
- **Sticky positioning**: Trading panel se mantiene visible al scroll
- **Live calculations**: Actualizaciones en tiempo real de PnL y liquidation
- **Color coding**: Verde para long, rojo para short
- **Monospace fonts**: Para números y precios

---

## 📝 Notas de Desarrollo

### Mock Data
Actualmente todos los datos son mock. Los puntos de integración están marcados con:
```typescript
// Aquí se conectará con el smart contract
```

### Próximas integraciones:
1. **Wagmi hooks** para wallet connection
2. **Smart contracts** para trading operations
3. **Oracle feeds** para precio real del índice
4. **TheGraph** para histórico y analytics

---

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

---

## 🎯 Filosofía de Diseño

Este proyecto sigue el principio de **"Hyperliquid-style"**:
- Minimalismo premium
- Velocidad perceptual
- Información densa pero clara
- Sin elementos decorativos innecesarios
- Funcionalidad sobre forma

---

## 📞 Soporte

Para preguntas o sugerencias sobre el desarrollo:
- Revisa la documentación de Next.js 15
- Consulta los tipos de TypeScript en `/src/types`
- Los componentes tienen comentarios en el código

---

**Built with 💙 for the DeFi community**

*Peptide Perps - Where Biology Meets Finance*
