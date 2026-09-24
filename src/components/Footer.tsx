import React from 'react';
import { Heart, Instagram, MessageSquare, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C0B13] text-white pt-16 pb-12 border-t border-[#361726]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#361726]">
          {/* Brand Column honoring Page 6 of the PDF */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-[#E11D48] inline-block"></span>
              <span className="text-2xl font-serif font-bold tracking-tight">
                SWEET BERRY
              </span>
            </div>
            <p className="text-sm font-serif italic text-rose-200">
              Fresco. Natural. Delicioso.
            </p>
            <p className="text-xs text-rose-100/70 leading-relaxed max-w-sm">
              Gracias por apoyar nuestro emprendimiento dedicado a la elaboración y comercialización de fresas con crema artesanal gourmet.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/sweetberry"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 hover:bg-[#E11D48] rounded-xl transition-colors text-white"
                title="Instagram @sweetberry"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/573100000000"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 hover:bg-[#E11D48] rounded-xl transition-colors text-white"
                title="WhatsApp Sweet Berry"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-rose-300">
              Menú & Carta
            </h4>
            <ul className="space-y-2 text-xs text-rose-100/80">
              <li>
                <a href="#coleccion" className="hover:text-white transition-colors">
                  Fresa Clásica
                </a>
              </li>
              <li>
                <a href="#coleccion" className="hover:text-white transition-colors">
                  Sweet Berry Especial
                </a>
              </li>
              <li>
                <a href="#coleccion" className="hover:text-white transition-colors">
                  Presentación Personalizada
                </a>
              </li>
              <li>
                <a href="#personalizador-3d" className="hover:text-white transition-colors">
                  Creador 3D Interactivo
                </a>
              </li>
            </ul>
          </div>

          {/* Technology & Security Infrastructure */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-rose-300">
              Infraestructura & Seguridad
            </h4>
            <div className="space-y-2 text-xs text-rose-100/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sweet Berry Shield™ (2FA Verificación Obligatoria)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Motor IA Gemini 3.8 Flash (Extracción de Facturas)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Sincronización GitHub CI/CD & Despliegue en la Nube</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Baseline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-200/60">
          <p>© {new Date().getFullYear()} Sweet Berry • Fresas con Crema. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#pedidos-online" className="hover:text-white transition-colors">
              Pedidos Online
            </a>
            <span aria-hidden="true">·</span>
            <span>Garantía de Frescura Cosecha del Día</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
