import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ShieldAlert, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { CartItem, VerifiedCustomer } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  customer: VerifiedCustomer | null;
  onOpenVerification: () => void;
  onOrderPlaced: (orderSummary: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  customer,
  onOpenVerification,
  onOrderPlaced,
}) => {
  const [customerNotes, setCustomerNotes] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 45000;
  const deliveryFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 5000;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!customer?.isVerified) {
      onOpenVerification();
      return;
    }

    setIsCheckingOut(true);

    // Build the exact WhatsApp message structured from Page 5 of the PDF
    const itemsList = cartItems
      .map(
        item =>
          `• ${item.quantity}x ${item.name} (${item.portionName}) - $${(item.price * item.quantity).toLocaleString()} COP\n  Crema: ${item.selectedCream}\n  Toppings: ${item.selectedToppings.join(', ')}`
      )
      .join('\n');

    const whatsappMessage = `*PEDIDO GOURMET — SWEET BERRY* 🍓✨
--------------------------------------
*CLIENTE VERIFICADO (Sweet Berry Shield):*
*Nombre:* ${customer.fullName}
*Teléfono:* ${customer.phone}
*Dirección:* ${customer.address}, ${customer.city}
*Token Seguridad:* ${customer.verificationToken}

*DETALLE DEL PEDIDO:*
${itemsList}

*Subtotal:* $${subtotal.toLocaleString()} COP
*Envío:* ${deliveryFee === 0 ? 'GRATIS (Superó $45k)' : `$${deliveryFee.toLocaleString()} COP`}
*TOTAL A PAGAR:* $${total.toLocaleString()} COP

*Mensaje / Instrucciones de entrega:*
${customerNotes || 'Sin notas adicionales. Entregar bien refrigerado.'}
--------------------------------------
_Generado desde la plataforma ecommerce oficial Sweet Berry_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/573100000000?text=${encodedMessage}`;

    const orderData = {
      orderId: `SB-${Math.floor(100000 + Math.random() * 900000)}`,
      customer,
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      timestamp: new Date().toLocaleTimeString(),
      status: 'CONFIRMADO_EN_PREPARACION',
      notes: customerNotes
    };

    onOrderPlaced(orderData);
    setOrderCompleted(true);
    setIsCheckingOut(false);

    // Also trigger opening WhatsApp in new tab safely
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#EAE0D3] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EFE5D8] flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E11D48]" />
              <h2 className="text-lg font-serif font-bold text-[#1C0B13]">
                Tu Carrito Gourmet ({cartItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-200 text-[#7A5A65] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3 bg-[#FFF5F7] border-b border-[#FECDD3] text-xs">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-emerald-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>¡Genial! Tienes Envío Refrigerado Gratis.</span>
              </p>
            ) : (
              <div>
                <div className="flex justify-between text-[#881337] mb-1 text-[11px]">
                  <span>Faltan ${(freeShippingThreshold - subtotal).toLocaleString()} COP para envío gratis</span>
                  <span className="font-semibold">{Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#FCE7F3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E11D48] transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] border border-[#EBE0D2] flex items-center justify-center text-[#9E828E] mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-serif font-bold text-base text-[#1C0B13]">Tu carrito está vacío</p>
                <p className="text-xs text-[#7A5A65] max-w-xs mt-1">
                  Elige tus fresas con crema favoritas o diseña una copa en el creador 3D.
                </p>
              </div>
            ) : (
              cartItems.map(item => (
                <div
                  key={item.id}
                  className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EDE3D6] flex gap-3 items-start"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-xl object-cover shrink-0 border border-[#E5D7C7]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#1C0B13] truncate">{item.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#9E828E] hover:text-rose-600 transition-colors p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#7A5A65] mt-0.5">{item.portionName}</p>

                    {item.selectedCream && (
                      <p className="text-[10px] text-[#881337] mt-0.5 truncate">
                        Crema: {item.selectedCream}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EAE0D3]">
                      <div className="flex items-center gap-1.5 bg-white border border-[#E0D4C5] rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#573A44] hover:bg-[#FAF7F2] rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-semibold px-2 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-[#573A44] hover:bg-[#FAF7F2] rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold font-serif text-[#1C0B13] tabular-nums">
                        ${(item.price * item.quantity).toLocaleString()} COP
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <div>
                <label className="text-[11px] font-semibold text-[#6E4D57] block mb-1">
                  Notas para la preparación o dedicatoria:
                </label>
                <textarea
                  rows={2}
                  value={customerNotes}
                  onChange={e => setCustomerNotes(e.target.value)}
                  placeholder="Ej. Entregar después de las 4 PM, incluir cucharas biodegradables..."
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#E2D6C6] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E11D48] text-[#1C0B13] resize-none"
                />
              </div>
            )}
          </div>

          {/* Footer & Checkout Gate */}
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#FAF7F2] border-t border-[#EFE5D8] space-y-4">
              {/* Mandatory Customer Verification Status Banner */}
              {customer?.isVerified ? (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-emerald-900">Cliente Verificado</p>
                      <p className="text-[10px] text-emerald-700 font-mono">
                        {customer.fullName} · {customer.badgeNumber}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenVerification}
                    className="text-[10px] text-emerald-800 underline font-medium"
                  >
                    Detalles
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-[#E11D48] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#881337]">Verificación Requerida Pre-Compra</p>
                    <p className="text-[11px] text-[#7A5A65] mt-0.5 leading-tight">
                      Para proteger los datos financieros y personales de todos los usuarios, debes registrarte y validar tu número antes de ordenar.
                    </p>
                    <button
                      onClick={onOpenVerification}
                      className="mt-2 text-xs font-bold text-[#E11D48] underline underline-offset-2 flex items-center gap-1"
                    >
                      <span>Verificar mi Identidad Ahora</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Pricing Totals */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#7A5A65]">
                  <span>Subtotal productos:</span>
                  <span className="font-mono tabular-nums">${subtotal.toLocaleString()} COP</span>
                </div>
                <div className="flex justify-between text-[#7A5A65]">
                  <span>Envío refrigerado especializado:</span>
                  <span className="font-mono tabular-nums">
                    {deliveryFee === 0 ? 'GRATIS' : `$${deliveryFee.toLocaleString()} COP`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#EAE0D3] flex justify-between items-baseline">
                  <span className="font-bold text-sm text-[#1C0B13]">Total a Pagar:</span>
                  <span className="text-xl font-bold font-serif text-[#1C0B13] tabular-nums">
                    ${total.toLocaleString()} COP
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 px-6 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {customer?.isVerified
                    ? 'Confirmar Pedido vía WhatsApp / Sistema'
                    : 'Verificarme para Completar Pedido'}
                </span>
              </button>

              <p className="text-[10px] text-center text-[#7A5A65]">
                🔒 Pagos protegidos contra fraude · Frescura garantizada en transporte térmico
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
