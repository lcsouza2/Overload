import { useState } from 'react';

export interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
}

export interface BottomNavProps {
  /** Chave da aba ativa atualmente (padrão: "hoje") */
  activeTab?: string;
  /** Callback acionado ao trocar de aba */
  onTabChange?: (key: string) => void;
}

export default function BottomNav({
  activeTab = 'hoje',
  onTabChange,
}: BottomNavProps) {
  const [internalTab, setInternalTab] = useState(activeTab);

  const currentActiveTab = onTabChange ? activeTab : internalTab;

  const navItems: NavItem[] = [
    {
      key: 'hoje',
      label: 'Hoje',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ícone de Halter / Dumbbell para o treino de Hoje */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6.5 6.5h11M6.5 17.5h11M4 9h16v6H4zM2 10.5h2v3H2zM20 10.5h2v3h-2z"
          />
        </svg>
      ),
    },
    {
      key: 'planos',
      label: 'Planos',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ícone de Fichas / Planos */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
    {
      key: 'evolucao',
      label: 'Evolução',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ícone de Gráfico de Progresso / Overload */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      key: 'biblioteca',
      label: 'Biblioteca',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ícone de Livro / Acervo de Exercícios */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
  ];

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.key === currentActiveTab)
  );

  const handleSelect = (key: string) => {
    setInternalTab(key);
    if (onTabChange) {
      onTabChange(key);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border shadow-lg">
      <div className="relative max-w-md mx-auto flex items-center justify-around">
        {/* =====================================================================
            BORDA INFERIOR DE DESTAQUE (2px) QUE NAVEGA SUAVEMENTE ENTRE AS SEÇÕES
           ===================================================================== */}
        <div
          className="absolute bottom-0 h-[2px] bg-primary transition-transform duration-300 cubic-bezier(0.4,0,0.2,1)"
          style={{
            width: `${100 / navItems.length}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />

        {/* Itens de Navegação com Ícones acima dos textos */}
        {navItems.map((item) => {
          const isActive = item.key === currentActiveTab;
          return (
            <button
              key={item.key}
              onClick={() => handleSelect(item.key)}
              type="button"
              aria-label={`Navegar para ${item.label}`}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 px-1 transition-colors relative active:scale-95 ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-text-secondary hover:text-text'
              }`}
            >
              {/* Ícone acima da descrição */}
              <div
                className={`transition-transform duration-200 ${
                  isActive ? 'scale-110 text-primary' : 'scale-100 text-text-secondary'
                }`}
              >
                {item.icon}
              </div>

              {/* Texto descritivo da seção */}
              <span className="text-[11px] mt-1 tracking-tight leading-none font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
