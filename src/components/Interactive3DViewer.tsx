import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, RotateCw, Layers, Check, ShoppingBag, Eye, ShieldCheck, Heart } from 'lucide-react';
import { AVAILABLE_CREAMS, AVAILABLE_TOPPINGS } from '../data/catalog';
import { CartItem } from '../types';

interface Interactive3DViewerProps {
  onAddToCart: (item: CartItem) => void;
  onOpenVerification: () => void;
  isVerified: boolean;
}

export const Interactive3DViewer: React.FC<Interactive3DViewerProps> = ({
  onAddToCart,
  onOpenVerification,
  isVerified,
}) => {
  const [selectedCream, setSelectedCream] = useState(AVAILABLE_CREAMS[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['top-choc-belga', 'top-pistacho']);
  const [rotationAngle, setRotationAngle] = useState(25);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [cupSize, setCupSize] = useState<'individual' | 'mediano' | 'familiar'>('mediano');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);

  // Price calculation
  const basePrice = cupSize === 'individual' ? 14500 : cupSize === 'mediano' ? 19900 : 26000;
  const creamAddon = selectedCream.price;
  const toppingsAddon = selectedToppings.reduce((acc, topId) => {
    const found = AVAILABLE_TOPPINGS.find(t => t.id === topId);
    return acc + (found ? found.price : 0);
  }, 0);
  const totalPrice = basePrice + creamAddon + toppingsAddon;

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings(prev =>
      prev.includes(toppingId) ? prev.filter(id => id !== toppingId) : [...prev, toppingId]
    );
  };

  // 3D Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let localAngle = rotationAngle;

    const render = () => {
      if (isAutoRotating && !isDraggingRef.current) {
        localAngle = (localAngle + 0.5) % 360;
        setRotationAngle(localAngle);
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 + 30;
      const rad = (localAngle * Math.PI) / 180;

      // Soft ambient shadow
      const shadowGrad = ctx.createRadialGradient(centerX, centerY + 120, 20, centerX, centerY + 120, 160);
      shadowGrad.addColorStop(0, 'rgba(44, 16, 25, 0.28)');
      shadowGrad.addColorStop(1, 'rgba(44, 16, 25, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 120, 150, 28, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cup scale based on size
      const scale = cupSize === 'individual' ? 0.9 : cupSize === 'mediano' ? 1.05 : 1.2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);

      // 1. Crystal Bowl / Glass Body Back
      const glassGrad = ctx.createLinearGradient(-100, -120, 100, 100);
      glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      glassGrad.addColorStop(0.3, 'rgba(254, 242, 242, 0.45)');
      glassGrad.addColorStop(0.7, 'rgba(255, 228, 230, 0.3)');
      glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

      // Draw elegant flared glass cup
      ctx.beginPath();
      ctx.moveTo(-90, -70);
      ctx.bezierCurveTo(-95, 30, -50, 95, -35, 105);
      ctx.lineTo(35, 105);
      ctx.bezierCurveTo(50, 95, 95, 30, 90, -70);
      ctx.closePath();
      ctx.fillStyle = glassGrad;
      ctx.fill();

      // 2. Base Layer: Strawberries in Sweet Glaze
      const strawberryColor = '#E11D48';
      const strawberryDark = '#9F1239';

      const berryPositions = [
        { x: -50, y: 35, r: 24, offset: 0 },
        { x: -15, y: 55, r: 26, offset: 45 },
        { x: 25, y: 40, r: 25, offset: 90 },
        { x: 55, y: 15, r: 22, offset: 135 },
        { x: -45, y: -5, r: 27, offset: 180 },
        { x: 0, y: 10, r: 30, offset: 225 },
        { x: 45, y: -15, r: 26, offset: 270 },
      ];

      berryPositions.forEach((berry, idx) => {
        // Rotate dynamically around cup center
        const effectiveAngle = rad + (berry.offset * Math.PI) / 180;
        const depth = Math.sin(effectiveAngle);
        const bx = Math.cos(effectiveAngle) * 55;
        const by = berry.y + Math.sin(effectiveAngle) * 6;
        const bRadius = berry.r * (0.85 + depth * 0.18);

        // Gradient for juicy strawberry
        const bGrad = ctx.createRadialGradient(bx - bRadius * 0.3, by - bRadius * 0.3, 2, bx, by, bRadius);
        bGrad.addColorStop(0, '#FB7185');
        bGrad.addColorStop(0.4, strawberryColor);
        bGrad.addColorStop(1, strawberryDark);

        ctx.beginPath();
        // Strawberry heart-conical shape
        ctx.arc(bx, by, bRadius, 0, Math.PI * 2);
        ctx.fillStyle = bGrad;
        ctx.fill();

        // Strawberry seed specular points
        ctx.fillStyle = '#FFE4E6';
        ctx.beginPath();
        ctx.arc(bx + 4, by - 6, 1.8, 0, Math.PI * 2);
        ctx.arc(bx - 6, by + 4, 1.5, 0, Math.PI * 2);
        ctx.arc(bx + 5, by + 8, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Middle & Top Layer: Artisanal Swirled Whipped Cream
      let creamBaseColor = '#FFFBEB';
      let creamShadowColor = '#FDE68A';
      if (selectedCream.id === 'pistacho') {
        creamBaseColor = '#DCFCE7';
        creamShadowColor = '#86EFAC';
      } else if (selectedCream.id === 'chocolate-blanco') {
        creamBaseColor = '#FEF3C7';
        creamShadowColor = '#FCD34D';
      } else if (selectedCream.id === 'mascarpone') {
        creamBaseColor = '#FFFDF5';
        creamShadowColor = '#F5E6C8';
      }

      // Swirling Cream Volume
      const creamGrad = ctx.createRadialGradient(0, -60, 20, 0, -50, 110);
      creamGrad.addColorStop(0, '#FFFFFF');
      creamGrad.addColorStop(0.6, creamBaseColor);
      creamGrad.addColorStop(1, creamShadowColor);

      ctx.beginPath();
      // Wave crest 1
      ctx.moveTo(-85, -60);
      ctx.bezierCurveTo(-90, -110, -35, -115, -20, -85);
      // Center peak
      ctx.bezierCurveTo(-15, -135, 20, -140, 25, -95);
      // Wave crest 2
      ctx.bezierCurveTo(45, -125, 95, -100, 85, -60);
      // Base rim
      ctx.bezierCurveTo(80, -30, -80, -30, -85, -60);
      ctx.closePath();
      ctx.fillStyle = creamGrad;
      ctx.fill();

      // Soft cream texture folds
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(-30, -80, 25, 0.8, 2.3);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(20, -85, 30, 0.5, 2.1);
      ctx.stroke();

      // Crown Strawberry on Peak
      const crownAngle = rad + Math.PI / 4;
      const crownDepth = Math.sin(crownAngle);
      const cx = Math.cos(crownAngle) * 8;
      const cy = -115 + crownDepth * 4;

      const crownGrad = ctx.createRadialGradient(cx - 5, cy - 8, 3, cx, cy, 26);
      crownGrad.addColorStop(0, '#FF4D6D');
      crownGrad.addColorStop(0.5, '#E11D48');
      crownGrad.addColorStop(1, '#881337');

      ctx.beginPath();
      ctx.arc(cx, cy, 24, 0, Math.PI * 2);
      ctx.fillStyle = crownGrad;
      ctx.fill();

      // Fresh Green Calyx / Mint Crown
      ctx.fillStyle = '#15803D';
      ctx.beginPath();
      ctx.moveTo(cx, cy - 22);
      ctx.lineTo(cx - 12, cy - 32);
      ctx.lineTo(cx - 4, cy - 24);
      ctx.lineTo(cx + 8, cy - 34);
      ctx.lineTo(cx + 10, cy - 22);
      ctx.closePath();
      ctx.fill();

      // 4. Render Active Toppings dynamically
      if (selectedToppings.includes('top-choc-belga')) {
        // Dark chocolate ribbons / curls
        ctx.fillStyle = '#3E1F17';
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const tAngle = rad + i * 0.8;
          const tx = Math.cos(tAngle) * (30 + i * 5);
          const ty = -75 + Math.sin(tAngle) * 15 + (i % 3) * 8;
          ctx.ellipse(tx, ty, 7, 3, tAngle, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      if (selectedToppings.includes('top-pistacho')) {
        // Vibrant emerald pistachio crumbles
        ctx.fillStyle = '#84CC16';
        for (let i = 0; i < 14; i++) {
          const pAngle = rad + (i * 0.45);
          const px = Math.sin(pAngle * 2) * 55;
          const py = -65 + Math.cos(pAngle) * 20;
          ctx.fillRect(px, py, 3.5, 3.5);
        }
      }

      if (selectedToppings.includes('top-coulis-frutos') || selectedToppings.includes('top-nutella')) {
        // Glaze drip effect
        ctx.strokeStyle = selectedToppings.includes('top-nutella') ? '#542616' : '#9F1239';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-50, -65);
        ctx.bezierCurveTo(-45, -30, -35, -20, -35, 5);
        ctx.moveTo(10, -80);
        ctx.bezierCurveTo(15, -45, 25, -30, 20, -5);
        ctx.moveTo(45, -70);
        ctx.bezierCurveTo(45, -40, 55, -25, 50, 15);
        ctx.stroke();
      }

      if (selectedToppings.includes('top-oro')) {
        // 24k Gold flake shimmers
        ctx.fillStyle = '#F59E0B';
        for (let i = 0; i < 6; i++) {
          const ox = Math.sin(rad * 2 + i) * 45;
          const oy = -95 + (i * 12);
          ctx.beginPath();
          ctx.arc(ox, oy, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. Glass Reflections & Edge Rim (Front Highlight)
      const rimGrad = ctx.createLinearGradient(-90, -70, 90, -70);
      rimGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      rimGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
      rimGrad.addColorStop(1, 'rgba(255, 255, 255, 0.9)');

      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, -70, 90, 20, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Specular sheen along the glass curvature
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-75, -50);
      ctx.bezierCurveTo(-80, 20, -45, 75, -30, 90);
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotationAngle, isAutoRotating, selectedCream, selectedToppings, cupSize]);

  // Handle Drag / Rotate Interaction
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    setIsAutoRotating(false);
    lastMouseXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMouseXRef.current;
    setRotationAngle(prev => (prev + deltaX * 0.8 + 360) % 360);
    lastMouseXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch Support for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      setIsAutoRotating(false);
      lastMouseXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - lastMouseXRef.current;
    setRotationAngle(prev => (prev + deltaX * 0.8 + 360) % 360);
    lastMouseXRef.current = e.touches[0].clientX;
  };

  const handleAddToCart = () => {
    const customItem: CartItem = {
      id: `custom-${Date.now()}`,
      productId: 'presentacion-personalizada',
      name: `Copa Gourmet 3D (${cupSize.toUpperCase()})`,
      portionName: cupSize === 'individual' ? 'Individual 250g' : cupSize === 'mediano' ? 'Mediano 400g' : 'Familiar 700g',
      price: totalPrice,
      quantity: 1,
      image: '/src/assets/images/hero_sweet_berry_gourmet_1790288747094.jpg',
      selectedCream: selectedCream.name,
      selectedToppings: selectedToppings.map(id => AVAILABLE_TOPPINGS.find(t => t.id === id)?.name || id),
      customerNote: 'Creación personalizada con renderizador 3D',
    };

    onAddToCart(customItem);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2600);
  };

  return (
    <section id="personalizador-3d" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-xs uppercase tracking-widest text-[#E11D48] font-semibold mb-2">
          Experiencia Interactiva en Tiempo Real
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C0B13] tracking-tight text-balance">
          Diseña Tu Copa de Fresas con Crema en 3D
        </h2>
        <p className="mt-4 text-base text-[#573A44] leading-relaxed">
          Gira el bowl en 360°, selecciona la textura de crema artesanal y agrega toppings gourmet con cálculo instantáneo de porción y precio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E9DFCE] shadow-sm">
        {/* Left Column: 3D Canvas Viewport */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative bg-gradient-to-b from-[#FFFDF9] to-[#FBF5EC] rounded-2xl p-4 sm:p-6 border border-[#F2E8DA]">
          {/* Controls Bar */}
          <div className="w-full flex items-center justify-between text-xs text-[#6E4D57] mb-2 px-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium">Motor 3D Canvas Activo</span>
            </div>
            <button
              onClick={() => setIsAutoRotating(prev => !prev)}
              className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#F3ECE0] rounded-md border border-[#E5D9C8] transition-colors"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span>{isAutoRotating ? 'Pausar Rotación' : 'Auto-Giro'}</span>
            </button>
          </div>

          {/* Interactive Canvas */}
          <div className="relative cursor-grab active:cursor-grabbing select-none w-full flex justify-center">
            <canvas
              ref={canvasRef}
              width={480}
              height={440}
              className="max-w-full h-auto drop-shadow-md"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            />
            {/* Gesture Hint */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-white text-[11px] pointer-events-none flex items-center gap-1.5 opacity-80">
              <Eye className="w-3.5 h-3.5 text-rose-300" />
              <span>Arrastra con el dedo o mouse para rotar en 360°</span>
            </div>
          </div>

          {/* Live Nutrition & Freshness Strip */}
          <div className="w-full mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-[#EDE1D1] text-center">
            <div>
              <p className="text-[11px] text-[#7A5A65]">Frescura Frutal</p>
              <p className="text-sm font-semibold text-[#1C0B13]">100% Cosecha Día</p>
            </div>
            <div>
              <p className="text-[11px] text-[#7A5A65]">Gramos Fruta</p>
              <p className="text-sm font-semibold text-[#1C0B13] tabular-nums">
                {cupSize === 'individual' ? '180g' : cupSize === 'mediano' ? '280g' : '450g'}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#7A5A65]">Tenor Graso Crema</p>
              <p className="text-sm font-semibold text-[#1C0B13]">38% Artesanal</p>
            </div>
          </div>
        </div>

        {/* Right Column: Customizer Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Step 1: Format & Size */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-[#6E4D57] block mb-2">
              1. Selecciona el Formato
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'individual', name: 'Individual', grams: '250g', price: '$14,500' },
                { id: 'mediano', name: 'Mediano', grams: '400g', price: '$19,900' },
                { id: 'familiar', name: 'Familiar', grams: '700g', price: '$26,000' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setCupSize(item.id as any)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    cupSize === item.id
                      ? 'border-[#E11D48] bg-[#FFF5F7] shadow-sm ring-1 ring-[#E11D48]'
                      : 'border-[#EBE0D2] bg-white hover:bg-[#FAF7F2]'
                  }`}
                >
                  <p className="text-xs font-semibold text-[#1C0B13]">{item.name}</p>
                  <p className="text-[11px] text-[#7A5A65]">{item.grams}</p>
                  <p className="text-xs font-bold text-[#E11D48] mt-1 tabular-nums">{item.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Base Cream */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-[#6E4D57] block mb-2">
              2. Base de Crema Artesanal
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {AVAILABLE_CREAMS.map(cream => {
                const isSelected = selectedCream.id === cream.id;
                return (
                  <button
                    key={cream.id}
                    onClick={() => setSelectedCream(cream)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#E11D48] bg-[#FFF5F7] ring-1 ring-[#E11D48]'
                        : 'border-[#EAE1D4] bg-white hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#1C0B13] flex items-center gap-1.5">
                        {cream.name}
                        {cream.price > 0 && (
                          <span className="text-[10px] text-[#E11D48] font-mono tabular-nums">
                            (+${cream.price.toLocaleString()} COP)
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-[#7A5A65]">{cream.notes}</p>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#E11D48] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Toppings Gourmet */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-[#6E4D57] block mb-2">
              3. Toppings Gourmet ({selectedToppings.length} seleccionados)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_TOPPINGS.slice(0, 6).map(top => {
                const isSelected = selectedToppings.includes(top.id);
                return (
                  <button
                    key={top.id}
                    onClick={() => toggleTopping(top.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all text-xs ${
                      isSelected
                        ? 'border-[#E11D48] bg-[#FFF5F7] font-medium text-[#1C0B13]'
                        : 'border-[#EAE1D4] bg-white text-[#4A323B] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span className="text-sm">{top.icon}</span>
                    <span className="truncate flex-1">{top.name}</span>
                    <span className="text-[10px] text-[#881337] tabular-nums shrink-0">
                      +${top.price / 1000}k
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & Add to Cart Module */}
          <div className="pt-4 border-t border-[#EDE1D1]">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <span className="text-xs text-[#7A5A65]">Total de tu Creación:</span>
                <p className="text-2xl sm:text-3xl font-bold font-serif text-[#1C0B13] tabular-nums">
                  ${totalPrice.toLocaleString()} <span className="text-sm font-sans font-normal text-[#7A5A65]">COP</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Stock Disponible Hoy
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#E11D48] hover:bg-[#BE123C] text-white active:scale-[0.99]'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>¡Agregado al Carrito con Éxito!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Agregar al Carrito</span>
                </>
              )}
            </button>

            {!isVerified && (
              <p className="mt-2 text-center text-[11px] text-[#7A5A65]">
                🔒 Se requerirá verificación de cliente antes de completar el pedido.{' '}
                <button
                  onClick={onOpenVerification}
                  className="text-[#E11D48] font-semibold underline underline-offset-2"
                >
                  Verificarme ahora
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
