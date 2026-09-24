import React from 'react';
import { Package, Clock, CheckCircle2, Truck, Sparkles, ChefHat } from 'lucide-react';

interface CustomerOrdersTrackerProps {
  orders: any[];
}

export const CustomerOrdersTracker: React.FC<CustomerOrdersTrackerProps> = ({ orders }) => {
  if (orders.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC0] shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EFE5D8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#1C0B13]">
                Tus Pedidos Gourmet Activos ({orders.length})
              </h3>
              <p className="text-xs text-[#7A5A65]">
                Trazabilidad en tiempo real desde cocina de montaje hasta tu puerta
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            EN PREPARACIÓN ACTIVA
          </span>
        </div>

        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div key={idx} className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#EDE3D6] space-y-4">
              <div className="flex flex-wrap justify-between items-center text-xs gap-2">
                <div>
                  <span className="font-bold text-[#1C0B13] font-mono">{order.orderId}</span>
                  <span className="text-[#7A5A65] ml-2">· {order.timestamp}</span>
                </div>
                <div className="font-mono font-bold text-[#1C0B13]">
                  Total: ${order.total.toLocaleString()} COP
                </div>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-white rounded-xl border border-emerald-300 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-[#1C0B13]">1. Verificado</p>
                    <p className="text-[10px] text-[#7A5A65]">Identidad Shield OK</p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-300 flex items-center gap-2.5">
                  <ChefHat className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-[#1C0B13]">2. En Cocina</p>
                    <p className="text-[10px] text-[#7A5A65]">Batido crema fresco</p>
                  </div>
                </div>

                <div className="p-3 bg-white/70 rounded-xl border border-[#E2D6C6] flex items-center gap-2.5 opacity-80">
                  <Truck className="w-4 h-4 text-[#8A717B] shrink-0" />
                  <div>
                    <p className="text-[11px] font-medium text-[#1C0B13]">3. Ruta Fría</p>
                    <p className="text-[10px] text-[#7A5A65]">Transporte térmico</p>
                  </div>
                </div>

                <div className="p-3 bg-white/70 rounded-xl border border-[#E2D6C6] flex items-center gap-2.5 opacity-80">
                  <Sparkles className="w-4 h-4 text-[#8A717B] shrink-0" />
                  <div>
                    <p className="text-[11px] font-medium text-[#1C0B13]">4. Entrega</p>
                    <p className="text-[10px] text-[#7A5A65]">En tu puerta</p>
                  </div>
                </div>
              </div>

              {/* Order items mini list */}
              <div className="text-xs text-[#573A44] pt-2 border-t border-[#EAE0D3]">
                <p className="font-semibold mb-1 text-[#1C0B13]">Productos en este pedido:</p>
                <ul className="space-y-1 text-[11px]">
                  {order.items.map((it: any, i: number) => (
                    <li key={i} className="flex justify-between">
                      <span>• {it.quantity}x {it.name} ({it.portionName})</span>
                      <span className="font-mono">${(it.price * it.quantity).toLocaleString()} COP</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
