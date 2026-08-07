import { useState } from 'react';
import CustomHeader from '../../shared/components/CustomHeader';
import BottomNav from '../../shared/components/BottomNav';

export default function HomepageIndex() {
  const [currentView, setCurrentView] = useState<'home' | 'subpage'>('home');
  const [activeTab, setActiveTab] = useState<string>('hoje');
  const [logMessage, setLogMessage] = useState<string>('Pronto para testar.');

  const showLog = (msg: string) => {
    setLogMessage(msg);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    showLog(`Navegou para a aba "${key.toUpperCase()}" na Bottom Bar!`);
  };

  return (
    <div className="min-h-screen bg-background text-text">
      {/* =========================================================================
          CUSTOM HEADER ADAPTATIVO
         ========================================================================= */}
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
          breadcrumbs={[
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
          ]}
          showSettings={true}
          onSettingsClick={() => showLog('Clicou nas configurações dentro da sub-página (/settings)!')}
        />
      )}

      {/* Conteúdo Principal de Teste */}
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-24 md:pb-16 flex flex-col gap-6">
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

            {/* Alternador de Visão para Testar o Header */}
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

        {/* Informações sobre a Bottom Nav */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card p-5 rounded-xl border border-card-border">
            <h3 className="font-semibold text-lg text-text mb-2 flex items-center gap-2">
              <span>📱</span> Bottom Bar Mobile (Fixa)
            </h3>
            <p className="text-sm text-text-secondary">
              Contém obrigatoriamente a aba <strong>"Hoje"</strong>, além de <em>Planos</em>, <em>Evolução</em> e <em>Biblioteca</em>. Possui uma <strong>borda inferior de destaque (2px)</strong> que desliza com animação suave de 60 FPS ao trocar de aba!
            </p>
          </div>

          <div className="bg-card p-5 rounded-xl border border-card-border">
            <h3 className="font-semibold text-lg text-text mb-2 flex items-center gap-2">
              <span>🎯</span> Aba Ativa: <span className="text-primary uppercase">{activeTab}</span>
            </h3>
            <p className="text-sm text-text-secondary">
              Em dispositivos móveis (`&lt; 768px`), veja a barra fixa na parte inferior da tela com ícones alinhados acima de cada texto.
            </p>
          </div>
        </section>

        {/* Blocos repetidos para gerar Scroll */}
        <div className="pt-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-3">
            Role para testar a rolagem e o comportamento dos menus:
          </h3>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface p-6 rounded-xl border border-border"
              >
                <h4 className="font-medium text-text mb-1">
                  Card de Demonstração #{i + 1}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Ao rolar para baixo, o header se oculta. Ao rolar um pouco para cima, ele reaparece.
                  A Bottom Nav permanece fixa e acessível no mobile com o indicador deslizante na cor de destaque (`--color-primary`).
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* =========================================================================
          BOTTOM NAVIGATION BAR (MOBILE PWA)
         ========================================================================= */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}