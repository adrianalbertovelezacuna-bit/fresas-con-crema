import React, { useState } from 'react';
import { Sparkles, Heart, Award, Smartphone, CheckCircle, Send, MessageSquare, Instagram } from 'lucide-react';
import { VerifiedCustomer } from '../types';

interface AboutAndValuesProps {
  customer: VerifiedCustomer | null;
  onOpenVerification: () => void;
}

export const AboutAndValues: React.FC<AboutAndValuesProps> = ({
  customer,
  onOpenVerification,
}) => {
  const [onlineOrderForm, setOnlineOrderForm] = useState({
    name: customer?.fullName || '',
    phone: customer?.phone || '',
    product: 'Sweet Berry Especial',
    quantity: '2',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmitOnlineForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer?.isVerified) {
      onOpenVerification();
      return;
    }

    const msg = `*NUEVO PEDIDO DIGITAL — SWEET BERRY* 🍓\nNombre: ${onlineOrderForm.name}\nTeléfono: ${onlineOrderForm.phone}\nProducto: ${onlineOrderForm.product}\nCantidad: ${onlineOrderForm.quantity}\nMensaje: ${onlineOrderForm.message || 'Sin observaciones'}\nCliente Verificado Shield: ${customer.badgeNumber}`;
    const url = `https://wa.me/573100000000?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <div id="conocenos" className="space-y-24 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Page 2 of PDF: CONÓCENOS — Una idea dulce con futuro */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EBE0D2] shadow-sm">
        <div className="max-w-3xl mb-10">
          <p className="text-xs uppercase tracking-widest text-[#E11D48] font-semibold mb-2">
            Conócenos
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C0B13] tracking-tight text-balance">
            Una idea dulce con futuro
          </h2>
          <p className="mt-4 text-base text-[#573A44] leading-relaxed">
            Sweet Berry nace como una oportunidad de emprendimiento enfocada en la venta de fresas con crema. Buscamos ofrecer un producto bien presentado, preparado con ingredientes seleccionados y acompañado de una atención cercana.
          </p>
        </div>

        {/* 3 Pillars from PDF Page 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#EDE3D6] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center font-bold">
              ■
            </div>
            <h3 className="text-base font-serif font-bold text-[#1C0B13]">
              Ingredientes
            </h3>
            <p className="text-xs text-[#573A44] leading-relaxed">
              Ingredientes frescos y seleccionados, cosechados a primera hora para garantizar textura y dulzura natural óptima en cada bocado.
            </p>
          </div>

          <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#EDE3D6] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center font-bold">
              ■
            </div>
            <h3 className="text-base font-serif font-bold text-[#1C0B13]">
              Presentación
            </h3>
            <p className="text-xs text-[#573A44] leading-relaxed">
              Presentaciones atractivas para nuestros clientes, en copas de cristal sustentable y cajas gourmet para regalos y momentos especiales.
            </p>
          </div>

          <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#EDE3D6] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center font-bold">
              ■
            </div>
            <h3 className="text-base font-serif font-bold text-[#1C0B13]">
              Pedidos Digitales
            </h3>
            <p className="text-xs text-[#573A44] leading-relaxed">
              Comunicación y pedidos mediante medios digitales inmediatos, con sincronización de inventario asistida por inteligencia artificial.
            </p>
          </div>
        </div>

        {/* Proposition quote from PDF Page 2 */}
        <div className="mt-10 p-6 bg-[#FFF5F7] rounded-2xl border border-[#FECDD3] text-center">
          <p className="text-sm sm:text-base font-serif italic text-[#881337]">
            "Nuestra propuesta: convertir un postre sencillo en una experiencia especial, cuidando el sabor, la presentación, el servicio y la organización del emprendimiento."
          </p>
        </div>
      </section>

      {/* 2. Page 4 of PDF: NUESTRO OBJETIVO — Crecer con calidad y sabor */}
      <section className="bg-gradient-to-br from-[#FAF7F2] to-[#F5ECE0] rounded-3xl p-8 sm:p-12 border border-[#E5D7C7]">
        <div className="max-w-3xl mb-10">
          <p className="text-xs uppercase tracking-widest text-[#E11D48] font-semibold mb-2">
            Nuestro Objetivo
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C0B13] tracking-tight text-balance">
            Crecer con calidad y sabor
          </h2>
          <p className="mt-4 text-base text-[#573A44] leading-relaxed">
            Crear y poner en marcha Sweet Berry, un emprendimiento dedicado a la elaboración y comercialización de fresas con crema, mediante una gestión organizada de compras, preparación, control de insumos, ventas y atención al cliente, con el propósito de ofrecer un producto de calidad y generar una oportunidad de negocio sostenible.
          </p>
        </div>

        {/* 3 Core Values from Page 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#E8DEC0] shadow-xs">
            <span className="text-xs font-mono font-bold text-[#E11D48] block mb-2">01. PILAR</span>
            <h3 className="text-lg font-serif font-bold text-[#1C0B13] mb-2">
              Emprender
            </h3>
            <p className="text-xs text-[#573A44] leading-relaxed">
              Crear y poner en marcha Sweet Berry con bases sólidas de negocio, eficiencia operativa y respeto absoluto por nuestros clientes.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8DEC0] shadow-xs">
            <span className="text-xs font-mono font-bold text-[#E11D48] block mb-2">02. PILAR</span>
            <h3 className="text-lg font-serif font-bold text-[#1C0B13] mb-2">
              Calidad
            </h3>
            <p className="text-xs text-[#573A44] leading-relaxed">
              Cuidar ingredientes, sabor y presentación. Cero conservantes artificiales y fresas de calibre exportación seleccionadas al alba.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8DEC0] shadow-xs">
            <span className="text-xs font-mono font-bold text-[#E11D48] block mb-2">03. PILAR</span>
            <h3 className="text-lg font-serif font-bold text-[#1C0B13] mb-2">
              Presencia Digital
            </h3>
            <p className="text-xs text-[#573A44] leading-relaxed">
              Promocionar y facilitar pedidos online inmediatos, con validación de identidad y trazabilidad de pedidos en tiempo real.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Page 5 of PDF: PEDIDOS ONLINE — ¡Haz tu pedido! */}
      <section id="pedidos-online" className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EBE0D2] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#E11D48] font-semibold mb-2">
                Pedidos Online
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C0B13] tracking-tight">
                ¡Haz tu pedido!
              </h2>
              <p className="mt-3 text-sm text-[#573A44] leading-relaxed">
                Completa el formulario oficial para despachos programados o envíos inmediatos. La orden se canaliza directamente a nuestro centro de preparación.
              </p>
            </div>

            {/* Channels from Page 5 of PDF */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE3D6]">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C0B13]">WhatsApp Oficial</p>
                  <p className="text-xs text-[#573A44] font-mono">+57 310 555 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE3D6]">
                <div className="w-9 h-9 rounded-lg bg-rose-100 text-[#E11D48] flex items-center justify-center">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C0B13]">Instagram Oficial</p>
                  <p className="text-xs text-[#573A44] font-mono">@sweetberry</p>
                </div>
              </div>
            </div>

            {!customer?.isVerified && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-[#881337] space-y-2">
                <p className="font-semibold">⚠️ Verificación de Seguridad Requerida</p>
                <p>
                  Antes de despachar pedidos es indispensable validar tu identidad para salvaguardar los datos personales y bancarios.
                </p>
                <button
                  onClick={onOpenVerification}
                  className="px-3 py-1.5 bg-[#E11D48] text-white rounded-lg font-medium hover:bg-[#BE123C] transition-colors"
                >
                  Registrarme y Verificarme
                </button>
              </div>
            )}
          </div>

          {/* Form from Page 5 of PDF */}
          <div className="lg:col-span-6 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E9DFCE]">
            <form onSubmit={handleSubmitOnlineForm} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#4A323B] block mb-1">
                  Nombre:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={onlineOrderForm.name}
                  onChange={e => setOnlineOrderForm({ ...onlineOrderForm, name: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-[#DFD4C5] rounded-xl focus:ring-1 focus:ring-[#E11D48] focus:outline-none text-[#1C0B13]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#4A323B] block mb-1">
                  Teléfono:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+57 310 0000000"
                  value={onlineOrderForm.phone}
                  onChange={e => setOnlineOrderForm({ ...onlineOrderForm, phone: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-[#DFD4C5] rounded-xl focus:ring-1 focus:ring-[#E11D48] focus:outline-none text-[#1C0B13]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#4A323B] block mb-1">
                  Producto:
                </label>
                <select
                  value={onlineOrderForm.product}
                  onChange={e => setOnlineOrderForm({ ...onlineOrderForm, product: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-[#DFD4C5] rounded-xl focus:ring-1 focus:ring-[#E11D48] focus:outline-none text-[#1C0B13]"
                >
                  <option value="Fresa Clásica">Fresa Clásica ($14,500 COP)</option>
                  <option value="Sweet Berry Especial">Sweet Berry Especial ($19,900 COP)</option>
                  <option value="Presentación Personalizada">Presentación Personalizada ($26,000 COP)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#4A323B] block mb-1">
                  Cantidad:
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  required
                  value={onlineOrderForm.quantity}
                  onChange={e => setOnlineOrderForm({ ...onlineOrderForm, quantity: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-[#DFD4C5] rounded-xl focus:ring-1 focus:ring-[#E11D48] focus:outline-none text-[#1C0B13]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#4A323B] block mb-1">
                  Mensaje o Especificaciones:
                </label>
                <textarea
                  rows={3}
                  placeholder="Detalles sobre toppings, dirección o dedicatoria..."
                  value={onlineOrderForm.message}
                  onChange={e => setOnlineOrderForm({ ...onlineOrderForm, message: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-[#DFD4C5] rounded-xl focus:ring-1 focus:ring-[#E11D48] focus:outline-none text-[#1C0B13] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>ENVIAR PEDIDO ■</span>
              </button>

              {isSent && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>¡Pedido enviado a WhatsApp con éxito!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
