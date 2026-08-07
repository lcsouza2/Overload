import { useScrollHeader } from '../hooks/useScrollHeader';
import { useTheme } from '../hooks/useTheme';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface CustomHeaderProps {
  /** Título principal (padrão: "OVERLOAD") */
  title?: string;
  /** Subtítulo opcional abaixo do título */
  subtitle?: string;
  /** Exibe o botão de alternar tema escuro/claro */
  showThemeToggle?: boolean;
  /** Exibe o botão de voltar na extrema esquerda */
  showBackButton?: boolean;
  /** Callback executado ao clicar no botão de voltar (se não fornecido, executa history.back()) */
  onBack?: () => void;
  /** Lista de itens para navegação por breadcrumbs (ex: [{ label: 'Home' }, { label: 'Treinos' }]) */
  breadcrumbs?: BreadcrumbItem[];
  /** Exibe o ícone de engrenagem de configurações na extrema direita */
  showSettings?: boolean;
  /** Callback executado ao clicar nas configurações */
  onSettingsClick?: () => void;
}

export default function CustomHeader({
  title = 'OVERLOAD',
  subtitle,
  showThemeToggle = true,
  showBackButton = false,
  onBack,
  breadcrumbs,
  showSettings = true,
  onSettingsClick,
}: CustomHeaderProps) {
  const { isVisible } = useScrollHeader({ threshold: 12 });
  const { theme, toggleTheme } = useTheme();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      // =========================================================================
      // 📍 TODO: ROTA DE CONFIGURAÇÕES (/settings)
      // Substituir este alert/console pelo hook de navegação do seu router:
      // Exemplo: navigate('/settings') ou <Link to="/settings">
      // =========================================================================
      console.log('Navegar para a página de configurações (/settings)');
      alert('Página de configurações em desenvolvimento (/settings)');
    }
  };

  const hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border shadow-sm transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* =====================================================================
            LADO ESQUERDO: Botão Voltar + Brand Logo ou Breadcrumbs Clicáveis
           ===================================================================== */}
        <div className="flex items-center gap-2 overflow-hidden min-w-0">
          {/* Botão de Voltar na Extrema Esquerda (se ativo) */}
          {showBackButton && (
            <button
              onClick={handleBackClick}
              type="button"
              aria-label="Voltar para a página anterior"
              className="w-9 h-9 p-2 rounded-lg bg-background hover:bg-card border border-border text-text-secondary hover:text-text transition-colors flex items-center justify-center shrink-0 active:scale-95"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Se houver breadcrumbs, renderiza o caminho dinâmico no lugar do logo */}
          {hasBreadcrumbs ? (
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm overflow-x-auto whitespace-nowrap scrollbar-none py-1"
            >
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <div key={index} className="flex items-center gap-1.5">
                    {index > 0 && (
                      <span className="text-text-secondary/60 text-xs font-bold">
                        /
                      </span>
                    )}
                    {isLast ? (
                      <span className="font-bold text-text truncate max-w-[150px] sm:max-w-xs">
                        {item.label}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          if (item.onClick) {
                            item.onClick();
                          } else if (item.href && typeof window !== 'undefined') {
                            window.location.href = item.href;
                          }
                        }}
                        className="text-text-secondary hover:text-primary transition-colors font-medium hover:underline truncate max-w-[120px] sm:max-w-none"
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                );
              })}
            </nav>
          ) : (
            /* Título Padrão / Logo Marca */
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl font-extrabold tracking-wider text-primary flex items-center gap-1.5 truncate">
                <span>{title}</span>
                <span className="h-2 w-2 rounded-full bg-secondary inline-block shrink-0" />
              </h1>
              {subtitle && (
                <span className="text-xs text-text-secondary font-medium truncate">
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>

        {/* =====================================================================
            LADO DIREITO: Alternador de Tema + Ícone de Configurações (Engrenagem)
            Ambos os botões utilizam exatamente as mesmas dimensões (w-9 h-9 p-2).
           ===================================================================== */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Botão de Troca de Tema (À esquerda da Engrenagem) */}
          {showThemeToggle && (
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Alternar Tema"
              title="Alternar Tema Escuro / Claro"
              className="w-9 h-9 p-2 rounded-lg bg-background hover:bg-card border border-border text-text-secondary hover:text-text transition-colors flex items-center justify-center shrink-0 active:scale-95"
            >
              {theme === 'dark' ? (
                /* Ícone de Sol (Modo Claro) */
                <svg
                  className="w-5 h-5 text-warning"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                /* Ícone de Lua (Modo Escuro) */
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          )}

          {/* =================================================================
              📍 ÍCONE DE ENGRENAGEM (EXTREMA DIREITA - CONFIGURAÇÕES)
             ================================================================= */}
          {showSettings && (
            <button
              onClick={handleSettingsClick}
              type="button"
              aria-label="Configurações da Aplicação"
              title="Configurações (/settings)"
              className="w-9 h-9 p-2 rounded-lg bg-background hover:bg-card border border-border text-text-secondary hover:text-primary transition-colors flex items-center justify-center shrink-0 active:scale-95"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}