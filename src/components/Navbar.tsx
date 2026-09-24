import React from 'react';
import { ShoppingBag, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { VerifiedCustomer } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenVerification: () => void;
  customer: VerifiedCustomer | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenVerification,
  customer,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E9E0D3] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#1C0B13] hover:opacity-90 transition-opacity"
        >
          Sweet Berry
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#573A44]">
          <a href="#coleccion" className="hover:text-[#E11D48] transition-colors">
            Nuestros Productos
          </a>
          <a href="#personalizador-3d" className="hover:text-[#E11D48] transition-colors">
            Personalizador 3D
          </a>
          <a href="#ecosistema-ia" className="hover:text-[#E11D48] transition-colors">
            Digitalización IA & Inventario
          </a>
          <a href="#conocenos" className="hover:text-[#E11D48] transition-colors">
            Conócenos & Objetivos
          </a>
          <a href="#pedidos-online" className="hover:text-[#E11D48] transition-colors">
            Pedidos Online
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Security Verification Button */}
          <button
            onClick={onOpenVerification}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition-all whitespace-nowrap ${
              customer?.isVerified
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-white text-[#573A44] border-[#DECFC0] hover:bg-[#F4ECE0]'
            }`}
            title={customer?.isVerified ? 'Cliente Verificado' : 'Requiere Verificación'}
          >
            {customer?.isVerified ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="hidden sm:inline">Verificado</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-[#E11D48] shrink-0" />
                <span className="hidden sm:inline">Verificar Identidad</span>
              </>
            )}
          </button>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 bg-[#1C0B13] hover:bg-[#2D101E] text-white rounded-xl transition-transform active:scale-95 shadow-sm"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#E11D48] text-white text-[10px] font-bold font-mono rounded-full flex items-center justify-center border-2 border-white tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
