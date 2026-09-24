import React from 'react';
import { ArrowRight, Sparkles, Shield, Clock, Heart } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onCustomizerClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onCustomizerClick,
}) => {
  return (
    <section className="relative pt-6 pb-16 sm:pt-10 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Editorial Headline & Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
          {/* Subtle Unboxed Subtitle from PDF Page 1 */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E11D48]">
            <Sparkles className="w-4 h-4" />
            <span>Fresas Frescas · Crema · Sabor</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C0B13] tracking-tight leading-[1.08] text-balance">
            Fresas con crema para endulzar tus momentos.
          </h1>

          <p className="text-base sm:text-lg text-[#573A44] leading-relaxed max-w-xl">
            Emprendimiento gourmet dedicado a la elaboración y comercialización de fresas con crema, con una propuesta fresca, deliciosa, atractiva y accesible.
          </p>

          {/* Action CTAs from PDF Page 1 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={onExploreClick}
              className="py-3.5 px-7 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <span>Haz Tu Pedido</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onCustomizerClick}
              className="py-3.5 px-7 bg-white hover:bg-[#F5EDE1] text-[#1C0B13] border border-[#DFCFC0] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <span>Diseñar en 3D</span>
            </button>
          </div>

          {/* Unboxed Metadata Trust Indicators */}
          <div className="pt-6 border-t border-[#EAE0D3] flex flex-wrap items-center gap-y-2 gap-x-3 text-xs text-[#6E4E59]">
            <span className="font-medium text-[#1C0B13]">Cultivos de Altura 100% Frescos</span>
            <span aria-hidden="true" className="text-[#C6B4A3]">·</span>
            <span>Crema Artesanal 38% M.G.</span>
            <span aria-hidden="true" className="text-[#C6B4A3]">·</span>
            <span>Verificación de Transacción Segura</span>
            <span aria-hidden="true" className="text-[#C6B4A3]">·</span>
            <span className="text-emerald-700 font-medium">Stock en Vivo</span>
          </div>
        </div>

        {/* Right Column: Hero High-Fidelity Photography Showcase */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#EBE1D4] aspect-16/10 sm:aspect-16/11 group">
            <img
              src="/src/assets/images/hero_sweet_berry_gourmet_1790288747094.jpg"
              alt="Sweet Berry Fresas con Crema Gourmet"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Floating Info Strip */}
            <div className="absolute bottom-4 left-4 right-4 p-3 sm:p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/40 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#1C0B13] font-serif">Sweet Berry Edición de Temporada</p>
                <p className="text-[11px] text-[#6E4E59]">Fresas Albión seleccionadas a mano y crema batida</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#E11D48] font-mono tabular-nums">Desde $14,500 COP</span>
                <span className="block text-[10px] text-emerald-700 font-medium">Cosecha Hoy</span>
              </div>
            </div>
          </div>

          {/* Floating Subtle Quality Badge */}
          <div className="hidden sm:flex absolute -top-3 -right-3 p-3 bg-white rounded-2xl shadow-lg border border-[#E9DFCE] items-center gap-2 animate-float-slow">
            <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-[#E11D48]">
              <Heart className="w-4 h-4 fill-[#E11D48]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#1C0B13]">Receta de Autor</p>
              <p className="text-[10px] text-[#7A5A65]">100% Ingredientes Naturales</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
