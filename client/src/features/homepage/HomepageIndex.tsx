import { useState } from 'react';
import CustomHeader from '../../shared/components/CustomHeader';
import BottomNav from '../../shared/components/BottomNav';
import SidebarNav from '../../shared/components/SidebarNav';
import DesktopBreadcrumb from '../../shared/components/DesktopBreadcrumb';
import { ExerciseLibraryView } from '../exercise-library';

export default function HomepageIndex() {
  const [currentView, setCurrentView] = useState<'home' | 'subpage'>('home');
  const [activeTab, setActiveTab] = useState<string>('hoje');
  const [logMessage, setLogMessage] = useState<string>('Pronto para testar.');

  const showLog = (msg: string) => {
    setLogMessage(msg);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    showLog(`Navegou para a aba "${key.toUpperCase()}"!`);
  };

  const subpageBreadcrumbs = [
    {
      label: 'Home',
      onClick: () => {
        setCurrentView('home');
        showLog('Navegou para Home pelo Breadcrumb!');
      },
    },
    {
      label: 'Treinos',
      onClick: () => showLog('Clicou no nó "Treinos" do Breadcrumb!'),
    },
    {
      label: 'Editar Treino A',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text">
      {/* =========================================================================
          SIDEBAR DESKTOP (Visível estritamente em md:flex / >= 768px)
         ========================================================================= */}
      <SidebarNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSettingsClick={() => showLog('Clicou nas configurações da Sidebar Desktop!')}
      />

      {/* =========================================================================
          CUSTOM HEADER MOBILE (Visível estritamente em md:hidden)
         ========================================================================= */}
      <div className="md:pl-64 transition-all">
        {currentView === 'home' ? (
          <CustomHeader
            title="OVERLOAD"
            subtitle="Gerenciamento de Treino & Sobrecarga"
            showSettings={true}
            onSettingsClick={() => showLog('Clicou na engrenagem de configurações (/settings)!')}
          />
        ) : (
          <CustomHeader
            showBackButton={true}
            onBack={() => {
              setCurrentView('home');
              showLog('Voltou para a Home pelo botão [ ← ]!');
            }}
            breadcrumbs={subpageBreadcrumbs}
            showSettings={true}
            onSettingsClick={() => showLog('Clicou nas configurações dentro da sub-página (/settings)!')}
          />
        )}

        {/* Conteúdo Principal da Aplicação */}
        <main className="max-w-5xl mx-auto px-4 pt-20 md:pt-8 pb-24 md:pb-12 flex flex-col gap-6">
          {/* Breadcrumb Contextual para Desktop */}
          {currentView === 'subpage' && (
            <DesktopBreadcrumb
              showBackButton={true}
              onBack={() => {
                setCurrentView('home');
                showLog('Voltou para a Home pelo botão [Voltar] do Desktop!');
              }}
              breadcrumbs={subpageBreadcrumbs}
            />
          )}

          {/* RENDERIZAÇÃO CONDICIONAL POR ABA DA NAVEGAÇÃO */}
          {activeTab === 'biblioteca' ? (
            /* VISÃO DE BIBLIOTECA DE EXERCÍCIOS */
            <ExerciseLibraryView />
          ) : (
            /* VISÃO DASHBOARD / HOJE */
            <div className="flex flex-col gap-6">
              {/* Painel de Controle de Testes */}
              <section className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-secondary">
                      Ambiente de Teste de Navegação
                    </span>
                    <h2 className="text-2xl font-bold text-primary">
                      {currentView === 'home' ? 'Visão: Home / Dashboard' : 'Visão: Sub-página / Formulário'}
                    </h2>
                  </div>

                  {/* Alternador de Visão para Testar a Navegação */}
                  <button
                    type="button"
                    onClick={() => {
                      const nextView = currentView === 'home' ? 'subpage' : 'home';
                      setCurrentView(nextView);
                      showLog(`Alternou visão para ${nextView === 'home' ? 'Home' : 'Sub-página'}`);
                    }}
                    className="px-5 py-2.5 bg-primary text-button-text font-semibold rounded-xl hover:bg-primary-hover transition-all active:scale-95 shadow-sm self-start sm:self-auto"
                  >
                    {currentView === 'home' ? '🔄 Simular Entrar em Sub-página' : '⬅️ Simular Voltar para Home'}
                  </button>
                </div>

                <div className="bg-background p-4 rounded-xl border border-border text-sm font-mono text-text-secondary flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-success animate-pulse shrink-0" />
                  <span>
                    <strong>Log de Ação:</strong> {logMessage}
                  </span>
                </div>
              </section>

              {/* Informações sobre a Arquitetura */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-5 rounded-xl border border-card-border">
                  <h3 className="font-semibold text-lg text-text mb-2 flex items-center gap-2">
                    <span>📚</span> Biblioteca de Exercícios
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    A aba <strong>"Biblioteca"</strong> já está implementada! Clique na aba <em>Biblioteca</em> no menu inferior (mobile) ou na Sidebar (desktop) para testar.
                  </p>
                  <button
                    onClick={() => handleTabChange('biblioteca')}
                    className="px-4 py-2 bg-primary text-button-text font-semibold text-xs rounded-xl hover:bg-primary-hover transition-colors"
                  >
                    Ir para a Biblioteca →
                  </button>
                </div>

                <div className="bg-card p-5 rounded-xl border border-card-border">
                  <h3 className="font-semibold text-lg text-text mb-2 flex items-center gap-2">
                    <span>📱</span> Componentes Genéricos
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Elementos como <code className="bg-background px-1.5 py-0.5 rounded text-primary">Badge</code> (Pill), <code className="bg-background px-1.5 py-0.5 rounded text-primary">Card</code>, <code className="bg-background px-1.5 py-0.5 rounded text-primary">Input</code> e <code className="bg-background px-1.5 py-0.5 rounded text-primary">Modal</code> foram isolados em <code className="bg-background px-1.5 py-0.5 rounded text-primary">shared/components/ui/</code>.
                  </p>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          BOTTOM NAVIGATION BAR (Visível estritamente em md:hidden)
         ========================================================================= */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}