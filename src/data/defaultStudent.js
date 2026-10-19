export const DEFAULT_STUDENT = {
  nome: 'RODRIGO BEZERRA DA SILVA',
  dataNasc: '06/09/2001',
  cpf: '118.492.384-42',
  rg: '9.876.543 SDS/PE',
  instituicao: 'UNIVERSIDADE FEDERAL DE PERNAMBUCO',
  siglaInstituicao: 'UFPE',
  curso: 'Administração',
  nivel: 'Graduação',
  matricula: '20210084729',
  codigoUso: '78G-AM4F6',
  validade: '31/03/2027',
  anoExercicio: '2026',
  fotoUrl: '/assets/foto_rodrigo.png',
  emissora: 'UNE - União Nacional dos Estudantes',
  status: 'Ativa / Provisória Homologada',
  dataEmissao: '19/10/2026'
};

export function getStudentData() {
  try {
    const saved = localStorage.getItem('une_student_profile');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading localStorage:', e);
  }
  return DEFAULT_STUDENT;
}

export function saveStudentData(data) {
  try {
    localStorage.setItem('une_student_profile', JSON.stringify(data));
  } catch (e) {
    console.error('Error saving localStorage:', e);
  }
}
