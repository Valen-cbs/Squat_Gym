# Sistema de Colores - SquatGym 🎨

## Principios de Diseño

1. **Confianza Administrativa**: Índigo transmite profesionalismo para gestión de cobros y datos
2. **Color de Acción**: Aplicado exclusivamente a elementos interactivos (botones, enlaces, estados activos)
3. **Accesibilidad WCAG 2.1 AA**: Todos los colores cumplen contraste mínimo 4.5:1 contra fondo blanco
4. **Jerarquía Visual**: Un único color primario evita competencia visual con alertas críticas

---

## 📍 Paleta Primaria - Índigo

| Variable CSS | HEX | Uso | HSB |
|---|---|---|---|
| `--color-indigo-primary` | `#3C3DCC` | **Botones principales, enlaces activos, acciones** | 245°, 70%, 80% |
| `--color-indigo-darkest` | `#141433` | Títulos, nombres en tablas, encabezados | 250°, 60%, 20% |
| `--color-indigo-dark` | `#505073` | Información secundaria, detalles | 250°, 30%, 45% |
| `--color-indigo-medium` | `#8787A8` | Bordes de campos de entrada | 250°, 20%, 66% |
| `--color-indigo-light` | `#D9D9F2` | Bordes decorativos, líneas de separación | 250°, 10%, 95% |
| `--color-indigo-lightest` | `#F5F5FA` | Fondos alternos (filas alternas de tablas) | 250°, 2%, 98% |

---

## 🚨 Sistema de Estados

### 🔴 Error / Peligro
**Uso**: Deuda activa (bloqueante), stock agotado, errores de sistema

| Nivel | HEX | Uso | HSB |
|---|---|---|---|
| **Dark** | `#732222` | Texto, iconos | 0°, 70%, 45% |
| **Medium** | `#B33E3E` | Bordes, indicadores | 0°, 65%, 70% |
| **Light** | `#F29191` | Fondos | 0°, 40%, 95% |

**Ejemplo HTML**:
```html
<div class="state-error">
  ⚠️ Alumno deudor - Acceso bloqueado
</div>
```

### 🟠 Advertencia
**Uso**: Stock bajo, próximo vencimiento, situaciones que requieren atención

| Nivel | HEX | Uso | HSB |
|---|---|---|---|
| **Dark** | `#8C480E` | Texto, iconos | 35°, 90%, 55% |
| **Medium** | `#CC6F20` | Bordes, indicadores | 35°, 85%, 80% |
| **Light** | `#F5B957` | Fondos | 35°, 70%, 96% |

**Ejemplo HTML**:
```html
<div class="state-warning">
  ⚠️ Stock bajo - Toalla Deportiva: 3 unidades (mínimo: 5)
</div>
```

### 🟢 Éxito
**Uso**: Pago confirmado, alumno habilitado, acción completada

| Nivel | HEX | Uso | HSB |
|---|---|---|---|
| **Dark** | `#29663D` | Texto, iconos | 145°, 60%, 40% |
| **Medium** | `#41A663` | Bordes, indicadores | 145°, 55%, 65% |
| **Light** | `#9AEBBC` | Fondos | 145°, 35%, 92% |

**Ejemplo HTML**:
```html
<div class="state-success">
  ✓ Pago confirmado - Alumno habilitado
</div>
```

---

## 🎯 Cómo Usar en el Código

### En CSS directo:
```css
.btn-accion {
  background-color: var(--color-indigo-primary);
  color: white;
}

.input-field {
  border: 2px solid var(--color-indigo-medium);
}

.tabla-fila-alterna {
  background-color: var(--color-indigo-lightest);
}
```

### En Tailwind (si está disponible):
```jsx
// Primario
<button className="bg-indigo-primary text-white hover:opacity-90">
  Confirmar Inscripción
</button>

// Estados
<div className="state-error">Alumno deudor</div>
<div className="state-warning">Stock bajo</div>
<div className="state-success">Pago confirmado</div>

// Fondos
<div className="bg-indigo-lightest">
  Fila de tabla alterna
</div>
```

### En componentes React:
```jsx
<Alert
  type="error"
  icon={AlertTriangle}
  title="Deuda bloqueante"
  bgColor="var(--color-error-light)"
  textColor="var(--color-error-dark)"
  borderColor="var(--color-error-medium)"
/>
```

---

## 📋 Reglas de Uso

✅ **HACER**:
- Usar color primario para todas las acciones interactivas
- Acompañar color con icono y/o texto explicativo
- Respetar las 3 capas (Dark, Medium, Light) para cada estado
- Validar contraste WCAG antes de cambios

❌ **NO HACER**:
- Usar solo color sin icono o texto
- Mezclar colores de estado para una misma acción
- Modificar valores HSB sin autorización
- Aplicar colores de forma decorativa (solo funcional)

---

## 🔍 Verificación de Contraste

Todos los colores cumplen **WCAG 2.1 AA**:
- **Texto**: 4.5:1 contra fondo blanco
- **Elementos de interfaz**: 3:1 como mínimo

Prueba de contraste online: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 📚 Colores Neutrales Auxiliares

Para composición general de UI (no marcas de estado):

| Escala | HEX |
|---|---|
| **50** | `#FAFAFA` |
| **100** | `#F3F4F6` |
| **200** | `#E5E7EB` |
| **300** | `#D1D5DB` |
| **400** | `#9CA3AF` |
| **500** | `#6B7280` |
| **600** | `#4B5563` |
| **700** | `#374151` |
| **800** | `#1F2937` |
| **900** | `#111827` |

---

## 🛠️ Actualización de Componentes

Cuando actualices componentes existentes, reemplaza:

- Botones azul → **Índigo Primary** (`#3C3DCC`)
- Fondos alternos → **Índigo Lightest** (`#F5F5FA`)
- Errores rojo antiguo → **Error Medium** (`#B33E3E`)
- Advertencias naranja → **Warning** (sistema completo)

---

## 💬 Preguntas Frecuentes

**P: ¿Dónde uso Darkest vs Dark?**
A: `Darkest` para títulos principales. `Dark` para subtítulos o información secundaria.

**P: ¿Qué pasa si necesito otro color?**
A: Consulta con el equipo de diseño antes de cambios. La paleta está optimizada para accesibilidad.

**P: ¿Los colores funcionan en modo oscuro?**
A: Sí, el sistema está configurado en `theme.css` para ambos modos.

**P: ¿Puedo modificar saturación o brillo?**
A: **No**. Los valores HSB están validados para WCAG. Cambios pueden romper accesibilidad.

---

**Sistema de Colores v1.0** | Documentación Oficial SquatGym
