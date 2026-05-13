# $PEPS Project Structure

## 📁 Complete File Tree

```
peps-defi/
│
├── 📄 package.json                 # Dependencias del proyecto
├── 📄 tsconfig.json                # Configuración de TypeScript
├── 📄 next.config.js               # Configuración de Next.js
├── 📄 .gitignore                   # Archivos ignorados por Git
├── 📄 README.md                    # Documentación principal
└── 📄 STRUCTURE.md                 # Este archivo
│
└── src/
    │
    ├── 📂 app/                     # Next.js 15 App Router
    │   ├── 📄 layout.tsx           # Layout raíz con metadata
    │   ├── 📄 page.tsx             # Landing page (/)
    │   ├── 📄 page.module.css      # Estilos de la landing
    │   │
    │   └── 📂 trade/               # Ruta /trade
    │       ├── 📄 page.tsx         # Trading dashboard
    │       └── 📄 page.module.css  # Estilos del dashboard
    │
    ├── 📂 components/              # Componentes React
    │   ├── 📄 PeptideMolecule.tsx          # Animación 3D con Canvas
    │   ├── 📄 PeptideMolecule.module.css   # Estilos de la molécula
    │   ├── 📄 StatsCard.tsx                # Card de estadísticas
    │   ├── 📄 StatsCard.module.css         # Estilos del stats card
    │   ├── 📄 TopBar.tsx                   # Barra superior
    │   ├── 📄 TopBar.module.css            # Estilos del topbar
    │   ├── 📄 Sidebar.tsx                  # Navegación lateral
    │   ├── 📄 Sidebar.module.css           # Estilos del sidebar
    │   ├── 📄 TradingChart.tsx             # Gráfico de velas
    │   ├── 📄 TradingChart.module.css      # Estilos del chart
    │   ├── 📄 TradingPanel.tsx             # Panel de leverage
    │   ├── 📄 TradingPanel.module.css      # Estilos del panel
    │   ├── 📄 PositionsTable.tsx           # Tabla de posiciones
    │   └── 📄 PositionsTable.module.css    # Estilos de la tabla
    │
    ├── 📂 styles/
    │   └── 📄 globals.css          # Variables CSS y estilos globales
    │
    ├── 📂 types/
    │   └── 📄 index.ts             # Tipos de TypeScript
    │
    ├── 📂 lib/                     # Utilidades (por crear)
    │   └── (helpers, utils)
    │
    └── 📂 hooks/                   # Custom hooks (por crear)
        └── (useWallet, usePositions, etc.)
```

---

## 🎨 Componentes Creados

### Landing Page (`/`)
1. **PeptideMolecule**
   - Animación 3D de molécula de péptido con Canvas API
   - Rotación automática y efectos de glow
   - Responsive y optimizado

2. **StatsCard**
   - Tarjetas glassmorphic con estadísticas
   - Animaciones staggered con Framer Motion
   - Efectos hover con glow

### Trading Dashboard (`/trade`)
3. **TopBar**
   - Logo $PEPS
   - Stats en vivo (PEPS price, Oracle price)
   - Wallet connection button
   - Responsive con menú móvil

4. **Sidebar**
   - Navegación vertical
   - Active states
   - Icons con lucide-react
   - Colapsable en tablet/mobile

5. **TradingChart**
   - Gráfico de velas con lightweight-charts
   - Timeframe selector (1H, 4H, 1D, 1W, 1M)
   - Precios en tiempo real
   - Crosshair personalizado

6. **TradingPanel**
   - Toggle Long/Short con efectos visuales
   - Leverage selector (2x, 3x, 4x, 5x)
   - Input de collateral con toggle ETH/PEPS
   - Cálculos automáticos:
     - Position Size
     - Entry Price
     - Liquidation Price
     - Health Factor
     - Estimated Fee
   - Botón de ejecución con estados

7. **PositionsTable**
   - Tabla responsive de posiciones
   - Color coding (green=long, red=short)
   - PnL en tiempo real
   - Botón close position
   - Empty state

---

## 🎯 Páginas por Crear

### 1. Oracle Page (`/oracle`)
**Componentes necesarios:**
- `OraclePriceCard` - Precio actual destacado
- `IndexBreakdown` - Componentes del índice
- `PriceHistory` - Gráfico histórico
- `DataSources` - Fuentes de datos

**Layout sugerido:**
```
┌─────────────────────────────────────┐
│         TopBar + Sidebar            │
├─────────────────────────────────────┤
│  Current Oracle Price (Hero)        │
├─────────────────────────────────────┤
│  Index Breakdown (Grid de cards)    │
│  - GLP-1 Peptides: 35%             │
│  - BPC-157: 25%                     │
│  - TB-500: 20%                      │
│  - Otros: 20%                       │
├─────────────────────────────────────┤
│  Historical Price Chart             │
└─────────────────────────────────────┘
```

### 2. Staking Page (`/stake`)
**Componentes necesarios:**
- `StakingPanel` - Input y botones
- `StakingStats` - APY, rewards, etc.
- `UnstakingQueue` - Posiciones en unstake
- `RewardsHistory` - Histórico de rewards

**Layout sugerido:**
```
┌─────────────────────────────────────┐
│         TopBar + Sidebar            │
├───────────────┬─────────────────────┤
│  Staking      │  Stats & Info       │
│  Input Panel  │  - APY              │
│               │  - TVL              │
│               │  - Your Balance     │
├───────────────┴─────────────────────┤
│  Unstaking Queue                    │
│  (tabla de pending unstakes)        │
└─────────────────────────────────────┘
```

### 3. Positions Page (`/positions`)
**Componentes necesarios:**
- `PositionDetailsModal` - Modal con detalles
- `PositionHistory` - Histórico completo
- `PnLChart` - Gráfico de PnL acumulado
- `FilterBar` - Filtros y búsqueda

---

## 🔧 Arquitectura Técnica

### Routing (App Router)
```
/                 → src/app/page.tsx
/trade            → src/app/trade/page.tsx
/oracle           → src/app/oracle/page.tsx (por crear)
/stake            → src/app/stake/page.tsx (por crear)
/positions        → src/app/positions/page.tsx (por crear)
```

### Component Pattern
Cada componente sigue este patrón:
1. `Component.tsx` - Lógica y JSX
2. `Component.module.css` - Estilos aislados
3. Props tipadas con TypeScript
4. Exportación con `export default`

### CSS Architecture
```
globals.css                  # Variables, reset, utility classes
├── CSS Variables
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Border Radius
│   └── Transitions
│
└── Component.module.css     # Scoped styles por componente
    ├── Layout
    ├── States (hover, active, disabled)
    ├── Responsive breakpoints
    └── Animations
```

---

## 📊 Data Flow (Futuro)

```
Smart Contracts
      ↓
   Wagmi Hooks
      ↓
  React Context
      ↓
   Components
      ↓
    UI Updates
```

### Hooks a crear:
- `useWallet()` - Gestión de wallet
- `usePositions()` - CRUD de posiciones
- `useOraclePrice()` - Precio del oracle
- `useStaking()` - Staking operations
- `useCalculations()` - Cálculos de trading

---

## 🎨 Design System

### Colors
```css
Primary:    #00f0ff (Neon Blue)
Secondary:  #c026d3 (Neon Purple)
Success:    #00ff88 (Neon Green)
Danger:     #ff4444 (Red)
Warning:    #ff9800 (Orange)
```

### Typography Scale
```
h1: clamp(2.5rem, 5vw, 4.5rem)
h2: clamp(2rem, 4vw, 3.5rem)
h3: clamp(1.5rem, 3vw, 2.5rem)
Body: 1rem
Small: 0.85rem
```

### Spacing Scale
```
xs:  0.25rem (4px)
sm:  0.5rem  (8px)
md:  1rem    (16px)
lg:  1.5rem  (24px)
xl:  2rem    (32px)
2xl: 3rem    (48px)
```

---

## 🚀 Performance Optimizations

### Implementadas:
- ✅ CSS Modules (no runtime CSS-in-JS)
- ✅ Next.js 15 con Turbopack
- ✅ Lazy loading de componentes pesados
- ✅ Optimización de Canvas con requestAnimationFrame
- ✅ Memoización de cálculos con useMemo

### Por implementar:
- ⏳ Image optimization con next/image
- ⏳ Code splitting por ruta
- ⏳ Service Worker para cache
- ⏳ Web Workers para cálculos pesados

---

## 📱 Responsive Strategy

### Breakpoints:
```css
Mobile:  < 768px   (Single column, no sidebar)
Tablet:  768-1024px (Collapsed sidebar, adjusted grids)
Desktop: > 1024px   (Full layout)
```

### Mobile-First Approach:
1. Base styles para mobile
2. Media queries para tablet/desktop
3. Touch-friendly buttons (min 44px)
4. Swipe gestures (por implementar)

---

*Documento actualizado: 2024*
*Versión: 1.0*
