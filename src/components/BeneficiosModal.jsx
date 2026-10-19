import React from 'react';
import { X, Film, Music, Trophy, Compass, CheckCircle2 } from 'lucide-react';

export default function BeneficiosModal({ onClose }) {
  const benefits = [
    {
      icon: Film,
      title: 'Cinemas (50% OFF)',
      desc: 'Válido em todas as redes do Brasil: Cinemark, UCI, Cinépolis, Kinoplex, salas VIP e 3D/IMAX.',
      color: 'text-rose-500 bg-rose-50'
    },
    {
      icon: Music,
      title: 'Shows & Festivais',
      desc: 'Cota de 40% garantida por lei em festivais de música (Rock in Rio, Lollapalooza) e shows nacionais/internacionais.',
      color: 'text-purple-500 bg-purple-50'
    },
    {
      icon: Trophy,
      title: 'Estádios de Futebol',
      desc: 'Acesso garantido com meia-entrada em todos os jogos do Campeonato Brasileiro, Copa do Brasil e estaduais.',
      color: 'text-emerald-500 bg-emerald-50'
    },
    {
      icon: Compass,
      title: 'Teatros, Museus & Parques',
      desc: '50% de desconto em peças teatrais, centros culturais, bienais, museus e atrações turísticas.',
      color: 'text-amber-500 bg-amber-50'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-4">
          <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md uppercase">
            Benefícios UNE
          </span>
          <h3 className="text-base font-black text-slate-900 mt-1">
            Seus Direitos com a Meia-Entrada
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            A Lei Federal nº 12.933/2013 garante 50% de desconto em eventos culturais e esportivos.
          </p>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className={`p-2 rounded-xl ${b.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{b.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
