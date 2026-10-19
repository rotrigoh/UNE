# UNE - Aplicativo PWA Oficial Documento Nacional do Estudante (DNE)

Aplicativo PWA mobile-first desenvolvido para a **UNE (União Nacional dos Estudantes)**, permitindo o cadastro simplificado de estudantes e a emissão e visualização da **Carteira de Estudante Digital Provisória e Oficial (DNE 2026)**.

---

## 📱 Recursos Principais

1. **Carteira Digital Provisória (DNE):**
   - Layout fiel ao padrão nacional emitido pelas entidades **UNE, UBES e ANPG**.
   - Integração completa dos dados oficiais de **Rodrigo Bezerra da Silva**, estudante de **Administração** da **Universidade Federal de Pernambuco (UFPE)**, com Brasão da UFPE e foto personalizada.
   - **QR Code dinâmico** homologado no padrão ICP-Brasil / ITI (Lei Federal nº 12.933/2013).
   - **Mecanismos de Segurança em Tempo Real:**
     - Relógio de auditoria com carimbo de data e hora em tempo real (evita fraudes de prints estáticos em portarias e cinemas).
     - Selo holográfico animado.
     - Marcadores de mira no QR Code (conforme layout de referência).
   - Integração e botões para **Adicionar à Carteira da Apple** e **Google Wallet**.

2. **Cartão Físico 3D Interativo (Frente e Verso):**
   - Visualização em 3D do cartão rígido oficial com giro de 180º ao toque.
   - Grafismo em ondas "2026", tarja magnética simulada, dados da certificação digital ICP-Brasil e assinatura do titular.

3. **Fluxo de Cadastro de Estudantes:**
   - **Etapa 1:** Dados Pessoais (Nome completo, CPF com máscara, Data de Nascimento, RG e Órgão Emissor).
   - **Etapa 2:** Dados Acadêmicos (Instituição de Ensino com atalhos para UFPE/UPE/UFRPE, Curso, Nível e Matrícula).
   - **Etapa 3:** Upload de foto 3x4 (com preview dinâmico ou opção de manter a foto oficial de Rodrigo) e comprovante de matrícula.
   - Emissão imediata com animação festiva de confetes e salvamento em `localStorage`.

4. **Validador QR Code & Meia-Entrada:**
   - Tela de conferência de autenticidade para eventos culturais e esportivos.
   - Guia de benefícios com detalhes da Lei nº 12.933/2013 (50% de desconto em cinemas, teatros, shows e jogos de futebol).

5. **Suporte PWA (Progressive Web App):**
   - `manifest.webmanifest` completo com ícones oficiais da UNE em múltiplas resoluções.
   - `sw.js` (Service Worker) para cache inteligente e funcionamento 100% offline.
   - Banner de instalação automática na tela inicial em dispositivos móveis (Android e iOS).

---

## 🚀 Como Executar

### Desenvolvimento Local:
```bash
npm run dev
```
O app estará acessível em:
- **No computador:** `http://localhost:3000/`
- **No celular (mesma rede Wi-Fi):** Acesse o IP exibido pelo Vite no terminal (ex: `http://10.0.0.154:3000/`)

### Build de Produção:
```bash
npm run build
```

---

## 📲 Como Instalar no Celular

### No Android (Google Chrome):
1. Acesse o endereço do app no Chrome do celular.
2. Toque no banner inferior **"Instalar App"** ou no menu de 3 pontinhos do Chrome e selecione **"Adicionar à tela inicial"** / **"Instalar aplicativo"**.

### No iPhone (Apple Safari):
1. Abra o app no Safari.
2. Toque no botão de **Compartilhar** (ícone de quadrado com seta para cima).
3. Selecione **"Adicionar à Tela de Início"**.
