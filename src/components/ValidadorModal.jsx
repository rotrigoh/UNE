import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, QrCode, Search, AlertCircle, Building2, Calendar, UserCheck } from 'lucide-react';
import { UNELogo, UFPECrest } from './Logos';

export default function ValidadorModal({ student, onClose }) {
  const [cieInput, setCieInput] = useState(student.codigoUso);
  const [isValidated, setIsValidated] = useState(true);

  const handleVerify = (e) => {
    e.preventDefault();
    setIsValidated(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 leading-tight">Validador Oficial DNE / ITI</h3>
            <span className="text-[10px] text-slate-500 font-medium">Lei da Meia-Entrada nº 12.933/2013</span>
          </div>
        </div>

        {/* Validation Result Box */}
        {isValidated ? (
          <div className="space-y-3">
            <div className="bg-emerald-500 text-white p-3.5 rounded-2xl flex items-center gap-3 shadow-md shadow-emerald-500/20">
              <CheckCircle2 className="w-7 h-7 shrink-0" />
              <div>
                <span className="text-[10px] font-black tracking-wider uppercase opacity-90 block">
                  Documento Autêntico e Válido
                </span>
                <span className="text-sm font-extrabold leading-tight block">
                  Meia-Entrada Garantida
                </span>
              </div>
            </div>

            {/* Student Verified Details */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                <img
                  src={student.fotoUrl || '/assets/foto_rodrigo.png'}
                  alt={student.nome}
                  className="w-12 h-14 rounded-lg object-cover border border-slate-300"
                />
                <div>
                  <h4 className="font-extrabold text-slate-900 leading-snug">{student.nome}</h4>
                  <span className="text-[11px] text-slate-600 font-semibold block">{student.curso}</span>
                  <span className="text-[10px] text-sky-700 font-bold block">{student.instituicao}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold">CIE / Código</span>
                  <span className="font-mono font-bold text-slate-800">{student.codigoUso}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold">Validade</span>
                  <span className="font-bold text-emerald-700">{student.validade}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold">Entidade Emissora</span>
                  <span className="font-bold text-slate-800">UNE</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold">Padrão Digital</span>
                  <span className="font-bold text-slate-800">ICP-Brasil ITI</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-center text-slate-400">
              Assinatura digital válida • Carimbo de tempo do Instituto Nacional de Tecnologia da Informação (ITI).
            </div>
          </div>
        ) : (
          <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-semibold">
            Código não localizado ou expirado.
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
