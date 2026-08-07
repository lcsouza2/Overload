import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

export interface SidebarNavProps {
  /** Chave da aba ativa atualmente (padrão: "hoje") */
  activeTab?: string;
  /** Callback acionado ao trocar de aba */
  onTabChange?: (key: string) => void;
  /** Callback para abrir configurações */
  onSettingsClick?: () => void;
}

export default function SidebarNav({
  activeTab = 'hoje',
  onTabChange,
  onSettingsClick,
}: SidebarNavProps) {
  const [internalTab, setInternalTab] = useState(activeTab);
  const { theme, toggleTheme } = useTheme();

  const currentActiveTab = onTabChange ? activeTab : internalTab;

  const navItems = [
    {
      key: 'hoje',
      label: 'Hoje',
      subtitle: 'Treino em Andamento',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.5 6.5h11M6.5 17.5h11M4 9h16v6H4zM2 10.5h2v3H2zM20 10.5h2v3h-2z" />
        </svg>
      ),
    },
    {
      key: 'planos',
      label: 'Planos & Fichas',
      subtitle: 'Estrutura de Treino',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      key: 'evolucao',
      label: 'Evolução',
      subtitle: 'Sobrecarga Progressiva',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      key: 'biblioteca',
      label: 'Biblioteca',
      subtitle: 'Exercícios & Músculos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  const handleSelect = (key: string) => {
    setInternalTab(key);
    if (onTabChange) {
      onTabChange(key);
    }
  };

  const handleSettings = () => {
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      console.log('Navegar para configurações (/settings)');
      alert('Página de configurações em desenvolvimento (/settings)');
    }
  };

  return (
    // Visível estritamente em telas de desktop (hidden md:flex)
    <aside className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 w-64 bg-surface border-r border-border shadow-sm z-40 p-4 justify-between">
      <div className="flex flex-col gap-6">
        {/* Logo / Marca */}
        <div className="px-2 pt-2 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-wider text-primary flex items-center gap-1.5">
            <span>OVERLOAD</span>
            <span className="h-2.5 w-2.5 rounded-full bg-secondary inline-block" />
          </h1>
        </div>

        {/* Links de Navegação */}
        <nav aria-label="Navegação Principal" className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = item.key === currentActiveTab;
            return (
              <button
                key={item.key}
                onClick={() => handleSelect(item.key)}
                type="button"
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all text-left group relative ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary'
                    : 'text-text-secondary hover:bg-background hover:text-text'
                }`}
              >
                <div
                  className={`transition-colors ${
                    isActive ? 'text-primary' : 'text-text-secondary group-hover:text-text'
                  }`}
                >
                  {item.icon}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm leading-snug">{item.label}</span>
                  <span className="text-[11px] text-text-secondary/70 font-normal">
                    {item.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Seção Inferior: Configurações e Alternador de Tema */}
      <div className="pt-4 border-t border-border flex flex-col gap-2">
        <button
          onClick={toggleTheme}
          type="button"
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-background hover:bg-card border border-border text-text-secondary hover:text-text transition-colors text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span>Tema {theme === 'dark' ? 'Escuro' : 'Claro'}</span>
          </span>
          <span className="text-xs text-text-secondary/60">Alternar</span>
        </button>

        <button
          onClick={handleSettings}
          type="button"
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-text-secondary hover:bg-background hover:text-primary transition-colors text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Configurações</span>
        </button>
      </div>
    </aside>
  );
}
