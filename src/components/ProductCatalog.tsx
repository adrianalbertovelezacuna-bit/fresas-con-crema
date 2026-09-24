import React, { useState } from 'react';
import { ShoppingBag, Check, Sparkles, Info, Plus, ChevronRight } from 'lucide-react';
import { Product, CartItem } from '../types';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
  onOpenCustomizer: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onOpenCustomizer,
}) => {
  const [selectedPortions, setSelectedPortions] = useState<{ [key: string]: number }>({
    'fresa-clasica': 0,
    'sweet-berry-especial': 0,
    'presentacion-personalizada': 0,
  });
  const [addedItemIds, setAddedItemIds] = useState<{ [key: string]: boolean }>({});
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const handleSelectPortion = (productId: string, portionIndex: number) => {
    setSelectedPortions(prev => ({ ...prev, [productId]: portionIndex }));
  };

  const handleQuickAdd = (product: Product) => {
    const portionIdx = selectedPortions[product.id] || 0;
    const selectedPortion = product.portionSizes[portionIdx];
    const finalPrice = Math.round(product.basePrice * selectedPortion.multiplier);

    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      portionName: `${selectedPortion.name} (${selectedPortion.grams})`,
      price: finalPrice,
      quantity: 1,
      image: product.image,
      selectedCream: 'Crema Tradicional Sweet Berry',
      selectedToppings: product.recommendedToppings.slice(0, 2),
      customerNote: 'Preparación artesanal estándar',
    };

    onAddToCart(cartItem);

    setAddedItemIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section id="coleccion" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header from Page 3 of PDF */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-xs uppercase tracking-widest text-[#E11D48] font-semibold mb-2">
          Elige Tu Momento Dulce
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C0B13] tracking-tight text-balance">
          Nuestros Productos Insignia
        </h2>
        <p className="mt-4 text-base text-[#573A44] leading-relaxed">
          Fresas seleccionadas de la más alta calidad, combinadas con cremas artesanales montadas al día y toques gourmet pensados para elevar cualquier ocasión.
        </p>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => {
          const portionIdx = selectedPortions[product.id] || 0;
          const currentPortion = product.portionSizes[portionIdx];
          const calculatedPrice = Math.round(product.basePrice * currentPortion.multiplier);
          const isAdded = addedItemIds[product.id];

          return (
            <div
              key={product.id}
              className="flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-[#E9E0D3] shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Product Visual */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#FBF7F0]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Fallback pattern in case image is loading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Subtle Text Tag (Anti-pill: clean text) */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#1C0B13] border border-white/60">
                  {product.badge}
                </div>

                {/* Live Stock Indicator */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-mono tabular-nums">
                  Stock: {product.stock} un.
                </div>

                {/* Inspect Info Button */}
                <button
                  onClick={() => setActiveModalProduct(product)}
                  className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-[#1C0B13] rounded-full shadow-md transition-all active:scale-95"
                  title="Ver detalles e ingredientes"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#7A5A65] mb-1">
                    <span>Línea Gourmet</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentPortion.grams}</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#1C0B13]">
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#573A44] mt-2 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Portion Size Selector (Interactive segmented control) */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#7A5A65] block mb-1.5">
                    Tamaño de Porción
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FAF7F2] rounded-xl border border-[#EDE3D6]">
                    {product.portionSizes.map((portion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectPortion(product.id, idx)}
                        className={`py-1.5 px-2 text-[11px] font-medium rounded-lg transition-all text-center ${
                          portionIdx === idx
                            ? 'bg-white text-[#1C0B13] shadow-xs font-semibold'
                            : 'text-[#6E4E59] hover:text-[#1C0B13]'
                        }`}
                      >
                        <span className="block truncate">{portion.name}</span>
                        <span className="block text-[10px] text-[#8A717B] tabular-nums">{portion.grams}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price & Action Module */}
                <div className="pt-3 border-t border-[#EFE5D8] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7A5A65] block">Precio Total:</span>
                    <p className="text-xl font-bold font-serif text-[#1C0B13] tabular-nums">
                      ${calculatedPrice.toLocaleString()}{' '}
                      <span className="text-xs font-sans font-normal text-[#7A5A65]">COP</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleQuickAdd(product)}
                    disabled={product.stock <= 0}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                      product.stock <= 0
                        ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                        : isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#E11D48] hover:bg-[#BE123C] text-white active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Agregado!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Ordenar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Banner Linking to 3D Customizer */}
      <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-[#1C0B13] to-[#3B1225] rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-rose-300 text-xs uppercase tracking-wider font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>¿Buscas una Combinación Única?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Personaliza Cada Capa con Nuestro Diseñador 3D
          </h3>
          <p className="text-xs text-rose-100/80 mt-1 max-w-xl">
            Elige entre crema de pistacho siciliano, chocolate belga fundido, frutos rojos silvestres y galletas crujientes.
          </p>
        </div>

        <button
          onClick={onOpenCustomizer}
          className="py-3 px-6 bg-white hover:bg-rose-50 text-[#1C0B13] rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-sm flex items-center gap-2"
        >
          <span>Abrir Personalizador 3D</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#EAE0D3]">
            <div className="aspect-16/10 rounded-2xl overflow-hidden mb-4 bg-[#FAF7F2]">
              <img
                src={activeModalProduct.image}
                alt={activeModalProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1C0B13]">
              {activeModalProduct.name}
            </h3>
            <p className="text-xs text-[#573A44] mt-2 leading-relaxed">
              {activeModalProduct.description}
            </p>

            <div className="mt-4 pt-4 border-t border-[#EFE5D8]">
              <h4 className="text-xs font-semibold uppercase text-[#6E4D57] tracking-wider mb-2">
                Ingredientes Certificados:
              </h4>
              <ul className="space-y-1.5 text-xs text-[#1C0B13]">
                {activeModalProduct.includedIngredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]"></span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModalProduct(null)}
                className="py-2.5 px-5 bg-[#1C0B13] hover:bg-[#2D101E] text-white rounded-xl text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
