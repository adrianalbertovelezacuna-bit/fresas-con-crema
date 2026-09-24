import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, Phone, Mail, MapPin, User, X, KeyRound, AlertCircle } from 'lucide-react';
import { VerifiedCustomer } from '../types';

interface CustomerVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: (customer: VerifiedCustomer) => void;
  currentCustomer: VerifiedCustomer | null;
}

export const CustomerVerificationModal: React.FC<CustomerVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerified,
  currentCustomer,
}) => {
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [fullName, setFullName] = useState(currentCustomer?.fullName || '');
  const [phone, setPhone] = useState(currentCustomer?.phone || '');
  const [email, setEmail] = useState(currentCustomer?.email || '');
  const [address, setAddress] = useState(currentCustomer?.address || '');
  const [city, setCity] = useState(currentCustomer?.city || 'Bogotá D.C.');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('782914');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSendVerificationCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      setErrorMsg('Por favor completa todos los campos requeridos para la verificación.');
      return;
    }
    setErrorMsg('');
    // Generate simulated 6 digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    const enteredCode = otpCode.join('');
    if (enteredCode !== generatedOtp && enteredCode !== '123456') {
      setErrorMsg('El código ingresado es incorrecto. Prueba con el código de simulación.');
      return;
    }

    const verifiedProfile: VerifiedCustomer = {
      isVerified: true,
      fullName,
      phone,
      email,
      address,
      city,
      verificationToken: `SB-SHIELD-${Date.now().toString().slice(-6)}-AUTH`,
      verifiedAt: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      badgeNumber: `V-${Math.floor(10000 + Math.random() * 90000)}`
    };

    onVerified(verifiedProfile);
    setStep('success');
  };

  const fillTestOtp = () => {
    setOtpCode(generatedOtp.split(''));
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EBE0D2] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7A5A65] hover:text-[#1C0B13] rounded-full hover:bg-[#F6EFE6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step 1: Registration Form */}
        {step === 'form' && (
          <div>
            <div className="flex items-center gap-2.5 mb-3 text-[#E11D48]">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xs uppercase tracking-widest font-bold">Sweet Berry Shield™</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1C0B13]">
              Registro y Verificación de Cliente
            </h3>
            <p className="text-xs text-[#6B4B55] mt-1.5 leading-relaxed">
              Para garantizar la seguridad de tus transacciones y la entrega puntual de pedidos frescos refrigerados, valida tus datos antes de continuar.
            </p>

            <form onSubmit={handleSendVerificationCode} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#4A323B] flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5 text-[#E11D48]" />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Valentina Morales Gómez"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#E0D4C5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E11D48] text-[#1C0B13]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#4A323B] flex items-center gap-1.5 mb-1">
                    <Phone className="w-3.5 h-3.5 text-[#E11D48]" />
                    WhatsApp / Celular
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+57 310 9876543"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#E0D4C5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E11D48] text-[#1C0B13]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#4A323B] flex items-center gap-1.5 mb-1">
                    <Mail className="w-3.5 h-3.5 text-[#E11D48]" />
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="valentina@ejemplo.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#E0D4C5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E11D48] text-[#1C0B13]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#4A323B] flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
                    Dirección de Entrega
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Calle 93 # 12-45 Apto 402"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#E0D4C5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E11D48] text-[#1C0B13]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#4A323B] block mb-1">Ciudad</label>
                  <input
                    type="text"
                    required
                    placeholder="Bogotá D.C."
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#E0D4C5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E11D48] text-[#1C0B13]"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors mt-4 shadow-sm"
              >
                <Lock className="w-4 h-4" />
                <span>Enviar Código de Verificación 2FA</span>
              </button>

              <p className="text-[11px] text-center text-[#7A5A65] flex items-center justify-center gap-1">
                <span>Cifrado SSL 256-bit y protección de datos financieros</span>
              </p>
            </form>
          </div>
        )}

        {/* Step 2: 2FA Verification Code */}
        {step === 'otp' && (
          <div>
            <div className="flex items-center gap-2 text-[#E11D48] mb-2">
              <KeyRound className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Paso 2 de 2: Código 2FA</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1C0B13]">
              Verifica tu Número Celular
            </h3>
            <p className="text-xs text-[#6B4B55] mt-1.5 leading-relaxed">
              Hemos emitido un código de autenticación al WhatsApp <span className="font-semibold text-[#1C0B13]">{phone}</span>.
            </p>

            {/* Test Simulation Helper Box */}
            <div className="my-4 p-3 bg-[#FFF5F7] border border-[#FECDD3] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#881337] block font-medium">Código Simulado de Prueba:</span>
                <span className="font-mono text-base font-bold text-[#E11D48] tracking-widest">{generatedOtp}</span>
              </div>
              <button
                type="button"
                onClick={fillTestOtp}
                className="text-xs font-semibold bg-white border border-[#FECDD3] text-[#881337] px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
              >
                Autocompletar Código
              </button>
            </div>

            {/* 6 Digit Input */}
            <div className="flex justify-center gap-2 my-6">
              {otpCode.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => {
                    const val = e.target.value;
                    const newOtp = [...otpCode];
                    newOtp[idx] = val;
                    setOtpCode(newOtp);
                    if (val && idx < 5) {
                      document.getElementById(`otp-${idx + 1}`)?.focus();
                    }
                  }}
                  className="w-11 h-13 text-center font-mono text-lg font-bold bg-[#FAF7F2] border border-[#DFD2C2] rounded-xl focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] text-[#1C0B13]"
                />
              ))}
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-700 text-center mb-4">{errorMsg}</p>
            )}

            <button
              onClick={handleVerifyOtp}
              className="w-full py-3.5 px-6 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Validar Código & Habilitar Compras</span>
            </button>

            <div className="text-center mt-4">
              <button
                onClick={() => setStep('form')}
                className="text-xs text-[#7A5A65] hover:text-[#1C0B13] underline underline-offset-2"
              >
                Volver a corregir número o dirección
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Badge */}
        {step === 'success' && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-9 h-9" />
            </div>

            <span className="text-[11px] uppercase tracking-widest font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full inline-block mb-3">
              Cliente Verificado Sweet Berry
            </span>

            <h3 className="text-2xl font-serif font-bold text-[#1C0B13]">
              ¡Tu Cuenta ha sido Certificada!
            </h3>
            <p className="text-xs text-[#573A44] max-w-sm mx-auto mt-2 leading-relaxed">
              Hola <span className="font-bold text-[#1C0B13]">{fullName}</span>, tu cuenta está autorizada para pedidos inmediatos y transacciones seguras.
            </p>

            <div className="bg-[#FAF7F2] border border-[#EAE0D3] rounded-2xl p-4 my-5 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-[#7A5A65]">WhatsApp:</span>
                <span className="font-semibold text-[#1C0B13]">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A5A65]">Despacho:</span>
                <span className="font-semibold text-[#1C0B13] truncate max-w-[200px]">{address}, {city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A5A65]">Insignia Shield:</span>
                <span className="font-semibold text-emerald-700">{currentCustomer?.badgeNumber || 'V-99412'}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 bg-[#1C0B13] hover:bg-[#2D101E] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
            >
              Entendido · Volver a la Tienda y Comprar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
