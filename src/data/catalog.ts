import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'fresa-clasica',
    name: 'Fresa Clásica',
    subtitle: 'La esencia pura del postre tradicional',
    description: 'Fresas frescas de montaña rigurosamente seleccionadas, acompañadas de nuestra emblemática crema dulce artesanal batida a mano.',
    basePrice: 14500,
    image: '/src/assets/images/product_fresa_clasica_1790288756963.jpg',
    category: 'clasica',
    stock: 48,
    badge: 'Favorito Tradicional',
    portionSizes: [
      { name: 'Individual', grams: '250g', multiplier: 1 },
      { name: 'Mediano', grams: '400g', multiplier: 1.45 },
      { name: 'Familiar', grams: '700g', multiplier: 2.2 }
    ],
    includedIngredients: [
      'Fresas de altura cosecha del día',
      'Crema dulce batida de la casa',
      'Toque sutil de azúcar de caña orgánica'
    ],
    recommendedToppings: ['Lluvia de chocolate', 'Leche condensada artesanal', 'Chispas de colores']
  },
  {
    id: 'sweet-berry-especial',
    name: 'Sweet Berry Especial',
    subtitle: 'Nuestra creación insignia para compartir',
    description: 'Una presentación especial para disfrutar y compartir. Capas generosas de fresas jugosas, crema chantilly con notas de vainilla bourbon, ganache de chocolate belga y crumble crocante.',
    basePrice: 19900,
    image: '/src/assets/images/product_berry_especial_1790288765664.jpg',
    category: 'especial',
    stock: 36,
    badge: 'Creación Insignia',
    portionSizes: [
      { name: 'Copa Gourmet', grams: '320g', multiplier: 1 },
      { name: 'Bowl Doble', grams: '520g', multiplier: 1.55 },
      { name: 'Master Box', grams: '850g', multiplier: 2.3 }
    ],
    includedIngredients: [
      'Fresas jumbo seleccionadas',
      'Crema Chantilly con vainilla bourbon',
      'Ganache tibio de chocolate semiamargo',
      'Wafers artesanales triturados'
    ],
    recommendedToppings: ['Pistacho tostado de Sicilia', 'Avellanas caramelizadas', 'Coulis de mora silvestre']
  },
  {
    id: 'presentacion-personalizada',
    name: 'Presentación Personalizada Gourmet',
    subtitle: 'Diseñado a la medida de tus momentos especiales',
    description: 'Alternativas exclusivas según las necesidades del cliente. Ideal para regalos, celebraciones o antojos únicos con empaque de lujo y trío de cremas para dippear.',
    basePrice: 26000,
    image: '/src/assets/images/product_personalizada_box_1790288775742.jpg',
    category: 'personalizada',
    stock: 24,
    badge: 'Edición Regalo & Lujo',
    portionSizes: [
      { name: 'Box Degustación', grams: '450g', multiplier: 1 },
      { name: 'Luxury Gift Box', grams: '750g', multiplier: 1.65 },
      { name: 'Catering Premium', grams: '1.2kg', multiplier: 2.6 }
    ],
    includedIngredients: [
      'Fresas premium glaseadas y enteras',
      'Trío de cremas artesanales en frasco de vidrio',
      'Lazo de satén y tarjeta de dedicatoria caligrafiada'
    ],
    recommendedToppings: ['Oro comestible 24k en escamas', 'Lajas de chocolate ruby', 'Pistachos y nueces pecanas']
  }
];

export const AVAILABLE_CREAMS = [
  { id: 'tradicional', name: 'Crema Tradicional Sweet Berry', notes: 'Textura ligera, dulce equilibrado y sutil toque cítrico', price: 0 },
  { id: 'mascarpone', name: 'Crema de Mascarpone & Vainilla', notes: 'Untuosa, notas a madera de Madagascar', price: 2500 },
  { id: 'pistacho', name: 'Crema Pura de Pistacho Siciliano', notes: 'Verde esmeralda, tostado aromático suave', price: 3500 },
  { id: 'chocolate-blanco', name: 'Mousse de Chocolate Blanco Belga', notes: 'Seda pura, dulzor cremoso y elegante', price: 3000 },
  { id: 'stevia-fit', name: 'Crema Ligera con Stevia & Proteína', notes: '0% azúcar refinada añadida, digestiva y esponjosa', price: 2000 }
];

export const AVAILABLE_TOPPINGS = [
  { id: 'top-pistacho', name: 'Pistacho Siciliano Crocante', price: 2500, icon: '🥜' },
  { id: 'top-choc-belga', name: 'Lajas de Chocolate Belga 70%', price: 2200, icon: '🍫' },
  { id: 'top-biscoff', name: 'Crumble de Galleta Lotus Biscoff', price: 2000, icon: '🍪' },
  { id: 'top-nutella', name: 'Hilos Tibios de Nutella Original', price: 2500, icon: '🌰' },
  { id: 'top-coulis-frutos', name: 'Coulis Artesanal de Frutos Rojos', price: 1800, icon: '🍒' },
  { id: 'top-leche-condensada', name: 'Leche Condensada Artesanal', price: 1500, icon: '🥛' },
  { id: 'top-oreo', name: 'Polvo Crocante de Oreo Black', price: 1800, icon: '🍪' },
  { id: 'top-oro', name: 'Destellos de Oro Comestible', price: 4000, icon: '✨' }
];

export const SAMPLE_DOCUMENTS = [
  {
    id: 'doc-factura-fresas',
    title: 'Factura #FAC-2026-1049 — Cosecha Finca El Manantial',
    date: '2026-03-24',
    provider: 'Agropecuaria El Manantial SAS',
    type: 'Factura Electrónica de Insumos Frescos',
    snippet: `FACTURA ELECTRÓNICA DE VENTA: FAC-2026-1049
EMISOR: Agropecuaria El Manantial SAS - NIT: 900.832.119-1
RECEPTOR: Sweet Berry Gourmet - NIT: 102049381-0
FECHA DE EMISIÓN: 2026-03-24
ITEMS:
1. Fresa Variedad Albión Grado Exportación (Calibre 35mm+) | Cant: 50 Kg | Valor Unit: $8,500 COP | Total: $425,000 COP | Lote: LOT-FR-2026-88
2. Mora Silvestre Andina Seleccionada | Cant: 15 Kg | Valor Unit: $7,200 COP | Total: $108,000 COP | Lote: LOT-MO-2026-12
SUBTOTAL: $533,000 COP
IVA (Exento Ley Frutas Frescas): $0 COP
TOTAL PAGADO: $533,000 COP
OBSERVACIONES: Control fitosanitario aprobado. Caducidad en frío: 7 días.`
  },
  {
    id: 'doc-factura-lacteos',
    title: 'Factura #FAC-L-4491 — Lácteos & Cremas del Valle',
    date: '2026-03-23',
    provider: 'Lácteos Artesanales del Valle Ltda',
    type: 'Factura de Materia Prima Láctea',
    snippet: `FACTURA COMERCIAL #FAC-L-4491
PROVEEDOR: Lácteos Artesanales del Valle Ltda - NIT: 890.312.441-9
CLIENTE: Sweet Berry - Fresas con Crema
FECHA: 2026-03-23
DETALLE:
- Crema de Leche Pastelera Fresca 38% M.G. | Cant: 35 Litros | Unitario: $12,400 COP | Total: $434,000 COP | Lote: LOT-CRM-992
- Queso Mascarpone Italiano Artesanal | Cant: 12 Kg | Unitario: $24,500 COP | Total: $294,000 COP | Lote: LOT-MASC-14
- Vainas de Vainilla Bourbon Madagascar | Cant: 50 Unidades | Unitario: $4,000 COP | Total: $200,000 COP
SUBTOTAL: $928,000 COP
IVA 19%: $176,320 COP
TOTAL: $1,104,320 COP
CADUCIDAD ESTIMADA: 21 días en refrigeración a 4°C.`
  },
  {
    id: 'doc-catalogo-toppings',
    title: 'Catálogo de Proveedor — Toppings & Packaging Gourmet',
    date: '2026-03-20',
    provider: 'Chocolaterie & Packaging Solutions SAS',
    type: 'Catálogo de Precios y Stock Mayorista',
    snippet: `CATÁLOGO OFICIAL Y LISTA DE PRECIOS MAYORISTA - TEMPORADA 2026
DISTRIBUIDOR: Chocolaterie & Packaging Solutions SAS
LÍNEA CONFITERÍA GOURMET:
- Pistacho Siciliano Tostado Sin Sal Granulado (Bolsa 5kg) - Ref: TOP-PIST - $125,000 COP / Bolsa ($25,000/kg)
- Gotas de Chocolate Belga Semiamargo 70% Callebaut (Caja 10kg) - Ref: TOP-BELG - $280,000 COP ($28,000/kg)
- Galleta Lotus Biscoff en Polvo Crocante (Caja 8kg) - Ref: TOP-LTS - $140,000 COP ($17,500/kg)
LÍNEA PACKAGING ECOLÓGICO:
- Copas de Cristal Reciclable 350ml c/ Tapa Cúpula (Pack 100u) - Ref: PKG-CUP - $48,000 COP
- Cajas de Madera Paulownia Regalo c/ Lazo Seda (Pack 25u) - Ref: PKG-BOX - $125,000 COP
TIEMPO DE ENTREGA: Inmediato 24h.`
  }
];
