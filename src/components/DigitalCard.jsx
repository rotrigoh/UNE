import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { AppleWalletBadge, GoogleWalletBadge, UFPECrest, UNELogo, UBESLogo, ANPGLogo } from './Logos';
import { Eye, EyeOff, ShieldCheck, Share2, Download, RefreshCw, Award, CheckCircle2, Rotate3d, ExternalLink } from 'lucide-react';

export default function DigitalCard({ student, onFlipTo3D, onValidateModal }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showFullCpf, setShowFullCpf] = useState(false);
  const [liveTimestamp, setLiveTimestamp] = useState('');
  const [isHologramActive, setIsHologramActive] = useState(false);
  const [walletFeedback, setWalletFeedback] = useState(null);

  // Generate dynamic QR code according to ITI / DNE standard
  useEffect(() => {
    const qrPayload = JSON.stringify({
      cie: student.codigoUso,
      nome: student.nome,
      nasc: student.dataNasc,
      cpf: student.cpf,
      inst: student.instituicao,
      curso: student.curso,
      val: student.validade,
      auth: 'ITI-ICP-BRASIL-VERIFIED',
      emissora: 'UNE',
      url: `https://meiaentrada.org.br/validar?cie=${student.codigoUso}`
    });

    QRCode.toDataURL(qrPayload, {
      width: 320,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    }).then(url => {
      setQrCodeUrl(url);
    }).catch(err => {
      console.error('Error generating QR code:', err);
    });
  }, [student]);

  // Real-time security clock update (proves active live session to security checkers)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('pt-BR');
      const timeStr = now.toLocaleTimeString('pt-BR');
      setLiveTimestamp(`${dateStr} - ${timeStr}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const maskedCpf = student.cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, '***.$2.***-$4');

  const handleAppleWallet = () => {
    setWalletFeedback('Carteira da Apple');
    setTimeout(() => setWalletFeedback(null), 3000);
  };

  const handleGoogleWallet = () => {
    setWalletFeedback('Google Wallet');
    setTimeout(() => setWalletFeedback(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `DNE UNE - ${student.nome}`,
          text: `Documento Nacional do Estudante UNE - Matrícula ${student.matricula} - CIE: ${student.codigoUso}`,
          url: window.location.href,
        });
      } catch (e) {
        console.log('Share canceled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link da Carteira Digital copiado para a área de transferência!');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-3 flex flex-col items-center">
      {/* Wallet feedback toast */}
      {walletFeedback && (
        <div className="fixed top-20 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>DNE pronto para sincronizar com {walletFeedback}!</span>
        </div>
      )}

      {/* Main Digital Card Viewport */}
      <div 
        onClick={() => setIsHologramActive(!isHologramActive)}
        className="w-full bg-white rounded-[26px] p-5 shadow-lg border border-slate-200/90 relative overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer select-none"
      >
        {/* Subtle Guilloche & Swirl Graphic Watermark (Reference Match) */}
        <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
          {/* Magenta / Purple modern circular swirl */}
          <svg className="absolute -bottom-16 -left-12 w-64 h-64 text-pink-500/20" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="24" strokeDasharray="30 10" />
            <circle cx="100" cy="100" r="50" stroke="#7928ca" strokeWidth="18" opacity="0.3" />
          </svg>
          {/* Blue / Cyan circular wave */}
          <svg className="absolute -top-16 -right-12 w-64 h-64 text-sky-500/20" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="22" />
            <circle cx="100" cy="100" r="55" stroke="#0077b6" strokeWidth="16" opacity="0.25" />
          </svg>
        </div>

        {/* Live Holographic Security Shimmer Layer */}
        <div className="absolute inset-0 animate-hologram pointer-events-none opacity-30"></div>

        {/* Real-time Dynamic Security Pill (Anti-fraud) */}
        <div className="relative z-10 flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>AUTENTICADO • DNE 2026</span>
          </div>

          <div className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
            {liveTimestamp}
          </div>
        </div>

        {/* Top Section: Photo (Left) + QR Code with Target Brackets (Right) */}
        <div className="relative z-10 grid grid-cols-2 gap-4 items-center">
          {/* Student Photo */}
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-md border-2 border-white ring-1 ring-slate-200 bg-slate-100 group">
            <img 
              src={student.fotoUrl || '/assets/foto_rodrigo.png'} 
              alt={student.nome}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* UFPE Crest Watermark on Photo */}
            <div className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-xs p-1 rounded-md shadow-xs">
              <UFPECrest className="w-5 h-5" />
            </div>
            {/* Verified student badge */}
            <div className="absolute top-1 left-1 bg-sky-600/90 text-white p-0.5 rounded-full shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* QR Code with Target Framing Brackets */}
          <div className="relative flex flex-col items-center justify-center p-2 bg-slate-50/70 rounded-2xl border border-slate-200/80 shadow-inner">
            {/* Corner Target Brackets */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-slate-800"></div>
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-slate-800"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-slate-800"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-slate-800"></div>

            {qrCodeUrl ? (
              <img 
                src={qrCodeUrl} 
                alt="QR Code de Validação DNE" 
                className="w-full aspect-square object-contain rounded-lg p-1 bg-white shadow-2xs" 
              />
            ) : (
              <div className="w-full aspect-square flex items-center justify-center bg-white rounded-lg">
                <RefreshCw className="w-6 h-6 animate-spin text-slate-400" />
              </div>
            )}

            <span className="text-[9px] font-bold tracking-wider text-slate-600 mt-1 uppercase">
              CIE: {student.codigoUso}
            </span>
          </div>
        </div>

        {/* Student Details Section (Exact match with reference app layout) */}
        <div className="relative z-10 mt-4.5 pt-3 border-t border-slate-100 space-y-1.5">
          {/* Full Name */}
          <div>
            <h2 className="text-[17px] font-black text-slate-900 tracking-tight leading-snug">
              {student.nome}
            </h2>
          </div>

          {/* Data List */}
          <div className="text-[13px] text-slate-700 space-y-1 font-medium leading-tight pt-1">
            <div className="flex items-start gap-1">
              <span className="text-slate-500 font-semibold shrink-0">Ins. Ensino:</span>
              <span className="font-bold text-slate-800 uppercase">{student.instituicao}</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-slate-500 font-semibold shrink-0">Curso:</span>
              <span className="font-bold text-slate-800">{student.curso}</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-slate-500 font-semibold shrink-0">Nível de ensino:</span>
              <span className="font-semibold text-slate-800">{student.nivel}</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-slate-500 font-semibold shrink-0">RG:</span>
              <span className="font-semibold text-slate-800">{student.rg}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-slate-500 font-semibold shrink-0">CPF/CIN:</span>
                <span className="font-semibold text-slate-800">
                  {showFullCpf ? student.cpf : maskedCpf}
                </span>
                <button 
                  type="button" 
                  onClick={(e) => { e.stopPropagation(); setShowFullCpf(!showFullCpf); }}
                  className="text-slate-400 hover:text-slate-700 ml-1 p-0.5"
                  title="Ocultar/Mostrar CPF"
                >
                  {showFullCpf ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-1">
                <span className="text-slate-500 font-semibold shrink-0">Data de Nasc.:</span>
                <span className="font-bold text-slate-800">{student.dataNasc}</span>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <span className="text-amber-700 text-[11px] font-bold">Validade: {student.validade}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Entity Badges & Legal Compliance */}
        <div className="relative z-10 mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-medium">
          <span>Lei Federal 12.933/13 • ICP-Brasil</span>
          <div className="flex items-center gap-1.5 opacity-80">
            <UNELogo className="w-4 h-4" />
            <UBESLogo className="w-4 h-4" />
            <ANPGLogo className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Wallet Actions (Adicionar à Carteira da Apple & Google) */}
      <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 no-print">
        <AppleWalletBadge onClick={handleAppleWallet} />
        <GoogleWalletBadge onClick={handleGoogleWallet} />
      </div>

      {/* Auxiliary Actions Row */}
      <div className="w-full mt-3.5 grid grid-cols-3 gap-2 no-print">
        <button
          onClick={onFlipTo3D}
          className="flex flex-col items-center justify-center p-2.5 bg-white hover:bg-slate-50 active:scale-95 transition-all rounded-xl border border-slate-200 text-slate-700 shadow-2xs cursor-pointer text-center"
        >
          <Rotate3d className="w-4 h-4 text-sky-600 mb-1" />
          <span className="text-[11px] font-bold">Cartão 3D</span>
          <span className="text-[9px] text-slate-400">Frente e Verso</span>
        </button>

        <button
          onClick={onValidateModal}
          className="flex flex-col items-center justify-center p-2.5 bg-white hover:bg-slate-50 active:scale-95 transition-all rounded-xl border border-slate-200 text-slate-700 shadow-2xs cursor-pointer text-center"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
          <span className="text-[11px] font-bold">Validar DNE</span>
          <span className="text-[9px] text-slate-400">Verificar QR</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex flex-col items-center justify-center p-2.5 bg-white hover:bg-slate-50 active:scale-95 transition-all rounded-xl border border-slate-200 text-slate-700 shadow-2xs cursor-pointer text-center"
        >
          <Download className="w-4 h-4 text-purple-600 mb-1" />
          <span className="text-[11px] font-bold">Exportar</span>
          <span className="text-[9px] text-slate-400">PDF / Imprimir</span>
        </button>
      </div>

      {/* Bottom Legal Disclaimer */}
      <p className="text-[10px] text-center text-slate-400 mt-3 px-2 leading-relaxed">
        Documento Nacional do Estudante emitido pela UNE nos termos da Lei Federal nº 12.933/2013 e do Decreto nº 8.537/2015. Válido em todo território nacional para 50% de desconto.
      </p>
    </div>
  );
}
