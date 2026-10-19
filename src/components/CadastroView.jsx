import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, User, GraduationCap, FileText, ArrowRight, ArrowLeft, Sparkles, RefreshCcw, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveStudentData, DEFAULT_STUDENT } from '../data/defaultStudent';

export default function CadastroView({ student, onSave, onCancel }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ ...student });
  const [photoPreview, setPhotoPreview] = useState(student.fotoUrl || '/assets/foto_rodrigo.png');
  const [docUploaded, setDocUploaded] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({ ...prev, fotoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToDefault = () => {
    setFormData({ ...DEFAULT_STUDENT });
    setPhotoPreview(DEFAULT_STUDENT.fotoUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Step 3 completed: Save & Emit
    saveStudentData(formData);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.3 }
    });
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4">
      {/* Header of Form */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-sky-700 uppercase bg-sky-50 px-2 py-0.5 rounded-md">
              Etapa {step} de 3
            </span>
            <h2 className="text-base font-extrabold text-slate-900 mt-1">
              {step === 1 && 'Dados Pessoais'}
              {step === 2 && 'Dados Acadêmicos'}
              {step === 3 && 'Foto 3x4 & Documentação'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetToDefault}
            className="text-[11px] font-semibold text-slate-500 hover:text-sky-700 flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 cursor-pointer"
            title="Preencher com os dados oficiais de Rodrigo"
          >
            <RefreshCcw className="w-3 h-3" />
            <span>Dados Rodrigo</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-300 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ================= STEP 1: DADOS PESSOAIS ================= */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Nome Completo</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none uppercase font-semibold text-slate-800"
                placeholder="Ex: RODRIGO BEZERRA DA SILVA"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Data de Nascimento</label>
                <input
                  type="text"
                  name="dataNasc"
                  value={formData.dataNasc}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-800"
                  placeholder="06/09/2001"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-800"
                  placeholder="118.492.384-42"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">RG com Órgão Emissor</label>
                <input
                  type="text"
                  name="rg"
                  value={formData.rg}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-800"
                  placeholder="9.876.543 SDS/PE"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Código CIE (DNE)</label>
                <input
                  type="text"
                  name="codigoUso"
                  value={formData.codigoUso}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 font-mono font-bold"
                  placeholder="78G-AM4F6"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">E-mail para Notificação</label>
              <input
                type="email"
                defaultValue="rodrigo.bezerra@ufpe.br"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-800"
                placeholder="seuemail@ufpe.br"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 2: DADOS ACADÊMICOS ================= */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Instituição de Ensino</label>
              <input
                type="text"
                name="instituicao"
                value={formData.instituicao}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 outline-none uppercase font-semibold text-slate-800"
                placeholder="Ex: UNIVERSIDADE FEDERAL DE PERNAMBUCO"
              />
              <div className="flex gap-1.5 mt-1.5">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, instituicao: 'UNIVERSIDADE FEDERAL DE PERNAMBUCO', siglaInstituicao: 'UFPE' }))}
                  className="text-[10px] bg-slate-100 hover:bg-sky-50 text-sky-800 px-2 py-0.5 rounded font-bold"
                >
                  UFPE
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, instituicao: 'UNIVERSIDADE DE PERNAMBUCO', siglaInstituicao: 'UPE' }))}
                  className="text-[10px] bg-slate-100 hover:bg-sky-50 text-sky-800 px-2 py-0.5 rounded font-bold"
                >
                  UPE
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, instituicao: 'UNIVERSIDADE FEDERAL RURAL DE PERNAMBUCO', siglaInstituicao: 'UFRPE' }))}
                  className="text-[10px] bg-slate-100 hover:bg-sky-50 text-sky-800 px-2 py-0.5 rounded font-bold"
                >
                  UFRPE
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Curso</label>
              <input
                type="text"
                name="curso"
                value={formData.curso}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 outline-none font-semibold text-slate-800"
                placeholder="Ex: Administração"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nível de Ensino</label>
                <select
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 font-medium"
                >
                  <option value="Graduação">Graduação</option>
                  <option value="Pós-Graduação">Pós-Graduação</option>
                  <option value="Mestrado">Mestrado</option>
                  <option value="Doutorado">Doutorado</option>
                  <option value="Técnico">Ensino Técnico</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Matrícula</label>
                <input
                  type="text"
                  name="matricula"
                  value={formData.matricula}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 font-mono"
                  placeholder="20210084729"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Validade do Documento</label>
              <input
                type="text"
                name="validade"
                value={formData.validade}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 font-medium"
                placeholder="31/03/2027"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 3: FOTO & COMPROVANTE ================= */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-4">
            {/* Foto 3x4 Section */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Foto 3x4 do Estudante
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-sky-600 shadow-md relative bg-slate-100 shrink-0">
                  <img
                    src={photoPreview}
                    alt="Foto Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 right-1 bg-emerald-500 text-white p-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <label className="flex items-center justify-center gap-2 px-3 py-2 bg-sky-50 text-sky-800 rounded-xl border border-sky-200 text-xs font-bold cursor-pointer hover:bg-sky-100 active:scale-95 transition-all">
                    <Camera className="w-4 h-4" />
                    <span>Alterar Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setPhotoPreview('/assets/foto_rodrigo.png');
                      setFormData(p => ({ ...p, fotoUrl: '/assets/foto_rodrigo.png' }));
                    }}
                    className="w-full text-center text-[10px] text-slate-500 hover:text-sky-700 underline font-medium"
                  >
                    Usar foto original de Rodrigo
                  </button>
                </div>
              </div>
            </div>

            {/* Comprovante de Matrícula */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Comprovante de Matrícula (UFPE)
              </label>
              <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/50 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">comprovante_matricula_2026.pdf</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Validado eletronicamente UFPE</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Anexado
                </span>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-2 border-t border-slate-100 flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
              />
              <label htmlFor="terms" className="text-[11px] text-slate-600 leading-tight">
                Declaro que as informações prestadas são verdadeiras e estou ciente das sanções da Lei Federal nº 12.933/2013 sobre emissão de DNE.
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs bg-white hover:bg-slate-50 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-2 cursor-pointer"
            >
              Cancelar
            </button>
          )}

          <button
            type="submit"
            disabled={step === 3 && !agreedTerms}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-bold text-xs shadow-md shadow-sky-600/30 cursor-pointer active:scale-95 transition-all disabled:opacity-50"
          >
            {step < 3 ? (
              <>
                <span>Avançar</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Emitir Carteira Provisória</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
