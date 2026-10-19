import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DigitalCard from './components/DigitalCard';
import PhysicalCard3D from './components/PhysicalCard3D';
import CadastroView from './components/CadastroView';
import ValidadorModal from './components/ValidadorModal';
import BeneficiosModal from './components/BeneficiosModal';
import BottomNav from './components/BottomNav';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { getStudentData, saveStudentData } from './data/defaultStudent';

export default function App() {
  const [student, setStudent] = useState(getStudentData);
  const [activeTab, setActiveTab] = useState('carteira');
  const [showValidador, setShowValidador] = useState(false);
  const [showBeneficios, setShowBeneficios] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Listen for PWA install prompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setInstallPrompt(null);
  };

  const handleSaveStudent = (newData) => {
    setStudent(newData);
    setActiveTab('carteira');
  };

  const handleSelectTab = (tabId) => {
    if (tabId === 'validador') {
      setShowValidador(true);
    } else if (tabId === 'beneficios') {
      setShowBeneficios(true);
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Top Mobile Header */}
      <Header
        onInstallClick={handleInstallClick}
        canInstall={!!installPrompt}
        isInstalled={isInstalled}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20 pt-2">
        {activeTab === 'carteira' && (
          <DigitalCard 
            student={student} 
            onFlipTo3D={() => setActiveTab('cartao3d')}
            onValidateModal={() => setShowValidador(true)}
          />
        )}

        {activeTab === 'cartao3d' && (
          <PhysicalCard3D 
            student={student} 
            onBack={() => setActiveTab('carteira')} 
          />
        )}

        {activeTab === 'cadastro' && (
          <CadastroView 
            student={student}
            onSave={handleSaveStudent}
            onCancel={() => setActiveTab('carteira')}
          />
        )}
      </main>

      {/* Modals */}
      {showValidador && (
        <ValidadorModal 
          student={student} 
          onClose={() => setShowValidador(false)} 
        />
      )}

      {showBeneficios && (
        <BeneficiosModal 
          onClose={() => setShowBeneficios(false)} 
        />
      )}

      {/* PWA Floating Install Prompt */}
      <PWAInstallPrompt
        installPrompt={installPrompt}
        onInstall={handleInstallClick}
        onDismiss={() => setInstallPrompt(null)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />
    </div>
  );
}
