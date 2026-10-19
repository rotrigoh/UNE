import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { DNELogo, UNELogo, UBESLogo, ANPGLogo, UFPECrest } from './Logos';
import { RotateCw, Sparkles, CheckCircle2, Shield, Download, ArrowLeft } from 'lucide-react';

export default function PhysicalCard3D({ student, onBack }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const payload = `CIE:${student.codigoUso}|NOME:${student.nome}|CPF:${student.cpf}|INST:${student.instituicao}|VAL:${student.validade}|ITI:ICP-BRASIL`;
    QRCode.toDataURL(payload, {
      width: 250,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    }).then(setQrCodeUrl).catch(console.error);
  }, [student]);

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-4 flex flex-col items-center">
      {/* Top Controls */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <span>Voltar ao App</span>
        </button>

        <span className="text-xs font-bold text-sky-900 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          DNE Físico Modelo 2026
        </span>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-xl shadow-xs cursor-pointer active:scale-95 transition-all"
        >
          <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
          <span>{isFlipped ? 'Ver Frente' : 'Girar Verso'}</span>
        </button>
      </div>

      <p className="text-[11px] text-slate-400 mb-3 text-center">
        Toque no cartão para girar entre Frente e Verso (Padrão Oficial ITI / UNE)
      </p>

      {/* 3D Card Container */}
      <div 
        className="w-full aspect-[1.586/1] perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className={`w-full h-full relative transform-style-3d transition-transform duration-700 ease-out ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ===================== FRONT OF CARD ===================== */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 flex flex-col justify-between overflow-hidden select-none">
            {/* Background Guilloche Graphics matching the reference image */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              {/* Cyan / Blue Waves */}
              <svg className="absolute -bottom-10 -right-10 w-64 h-64 text-sky-500/25" viewBox="0 0 200 200" fill="none">
                <circle cx="120" cy="120" r="90" stroke="currentColor" strokeWidth="20" />
                <circle cx="120" cy="120" r="60" stroke="#004e89" strokeWidth="15" opacity="0.3" />
              </svg>
              {/* Magenta / Violet Waves */}
              <svg className="absolute -bottom-14 left-1/4 w-72 h-72 text-purple-600/20" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="22" />
              </svg>
            </div>

            {/* Hologram security overlay */}
            <div className="absolute inset-0 animate-hologram pointer-events-none opacity-20"></div>

            {/* Top Bar of Front: DNE Logo + Entity Logos */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DNELogo className="h-6" />
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50/80 px-2 py-0.5 rounded-full border border-slate-200">
                <UNELogo className="w-4 h-4" />
                <UBESLogo className="w-4 h-4" />
                <ANPGLogo className="w-4 h-4" />
              </div>
            </div>

            {/* Student Name */}
            <div className="relative z-10 mt-1">
              <h3 className="text-[13px] sm:text-[15px] font-black text-slate-900 tracking-tight leading-tight">
                {student.nome}
              </h3>
            </div>

            {/* Middle Section: Photo (Left), Data (Center), QR Code & 2026 Graphic (Right) */}
            <div className="relative z-10 grid grid-cols-12 gap-2.5 items-center flex-1 my-1">
              {/* Student Photo */}
              <div className="col-span-3 aspect-[3/4] rounded-lg overflow-hidden border border-slate-300 shadow-sm relative bg-slate-100">
                <img 
                  src={student.fotoUrl || '/assets/foto_rodrigo.png'} 
                  alt={student.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0.5 right-0.5 bg-white/90 p-0.5 rounded-xs">
                  <UFPECrest className="w-3 h-3" />
                </div>
              </div>

              {/* Student Academic Info */}
              <div className="col-span-5 text-[9px] sm:text-[10px] text-slate-700 space-y-0.5 leading-tight font-medium">
                <div>
                  <span className="text-slate-400 font-semibold block text-[8px]">CPF / CIN</span>
                  <span className="font-bold text-slate-800">{student.cpf}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[8px]">Data Nasc.</span>
                  <span className="font-bold text-slate-800">{student.dataNasc}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[8px]">Curso</span>
                  <span className="font-bold text-slate-900">{student.curso}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[8px]">Instituição de Ensino</span>
                  <span className="font-bold text-slate-800 line-clamp-1">{student.instituicao}</span>
                </div>
              </div>

              {/* Right Side: QR Code + CIE + Stylized 2026 */}
              <div className="col-span-4 flex flex-col items-center justify-between h-full py-0.5">
                <div className="bg-white p-1 rounded-md border border-slate-200 shadow-2xs w-16 h-16 flex items-center justify-center">
                  {qrCodeUrl && (
                    <img src={qrCodeUrl} alt="QR Code DNE" className="w-full h-full object-contain" />
                  )}
                </div>
                
                <div className="text-center mt-0.5">
                  <span className="text-[7.5px] font-bold text-slate-500 block leading-none">
                    Cod. uso / CIE
                  </span>
                  <span className="text-[8.5px] font-black text-slate-800 tracking-wider">
                    {student.codigoUso}
                  </span>
                </div>

                {/* Stylized Year 2026 (exact style from reference card) */}
                <div className="relative mt-auto">
                  <span className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black italic tracking-tighter bg-gradient-to-r from-[#005596] via-[#1e88e5] to-[#7b1fa2] bg-clip-text text-transparent">
                    2026
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Validity and Security seal */}
            <div className="relative z-10 pt-1 border-t border-slate-100 flex items-center justify-between text-[8px] text-slate-500 font-semibold">
              <span className="text-sky-700">Validade: {student.validade}</span>
              <span className="text-slate-400">Padrão Nacional ICP-Brasil ITI</span>
            </div>
          </div>

          {/* ===================== BACK OF CARD ===================== */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-2xl p-4 flex flex-col justify-between overflow-hidden select-none">
            {/* Magnetic Stripe */}
            <div className="-mx-4 -mt-4 h-9 bg-slate-900 border-b border-slate-800 mb-2 flex items-center justify-end px-4">
              <span className="text-[7px] text-slate-400 font-mono tracking-widest">
                DNE-BR-2026-UNE-78G-AM4F6
              </span>
            </div>

            {/* Back Details Grid */}
            <div className="grid grid-cols-12 gap-2 text-[8px] text-slate-600 leading-tight">
              {/* Left Column: Official certification details */}
              <div className="col-span-8 space-y-1.5">
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1 text-[8.5px] font-bold text-slate-800 mb-0.5">
                    <Shield className="w-3 h-3 text-sky-600" />
                    <span>Certificação Digital ICP-Brasil</span>
                  </div>
                  <p className="text-[7.5px] text-slate-500">
                    Emitido conforme Medida Provisória nº 2.200-2/2001, Lei Federal nº 12.933/2013 e Decreto nº 8.537/2015.
                  </p>
                  <p className="text-[7.5px] font-mono text-slate-600 mt-0.5">
                    Hash SHA-256: 7f8a9e01...b4c3d2
                  </p>
                </div>

                <div className="text-[7.5px] text-slate-500">
                  <span className="font-bold text-slate-700 block">Observação Legal:</span>
                  Este documento comprova a condição de estudante para concessão de 50% de desconto em eventos artístico-culturais e esportivos.
                </div>
              </div>

              {/* Right Column: Signature & Validation */}
              <div className="col-span-4 flex flex-col items-center justify-between">
                <div className="w-full bg-white p-1.5 rounded-lg border border-slate-200 text-center shadow-2xs">
                  <span className="text-[6.5px] uppercase font-bold text-slate-400 block">
                    Assinatura do Titular
                  </span>
                  <div className="h-6 flex items-center justify-center font-['Satisfy',cursive] text-xs font-semibold text-slate-800 italic">
                    Rodrigo B. Silva
                  </div>
                  <div className="w-full border-t border-dashed border-slate-300"></div>
                </div>

                <div className="text-center mt-1">
                  <UFPECrest className="w-6 h-6 mx-auto mb-0.5" />
                  <span className="text-[6.5px] font-bold text-slate-600 block">UFPE</span>
                </div>
              </div>
            </div>

            {/* Bottom Entity Identification */}
            <div className="pt-1 border-t border-slate-200 flex items-center justify-between text-[7.5px] text-slate-500">
              <span className="font-bold text-slate-700">Entidade Emissora: UNE (União Nacional dos Estudantes)</span>
              <span className="font-mono">www.une.org.br</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons below 3D card */}
      <div className="w-full flex items-center justify-center gap-3 mt-4">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-300 text-xs font-bold shadow-2xs cursor-pointer active:scale-95 transition-all"
        >
          <Download className="w-4 h-4 text-sky-600" />
          <span>Imprimir Cartão Físico</span>
        </button>
      </div>
    </div>
  );
}
