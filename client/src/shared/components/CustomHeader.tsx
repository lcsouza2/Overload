import { useScrollHeader } from '../hooks/useScrollHeader';
import { useTheme } from '../hooks/useTheme';

export interface CustomHeaderProps {
  title?: string;
  subtitle?: string;
  showThemeToggle?: boolean;
}

export default function CustomHeader({
  title = 'OVERLOAD',
  subtitle,
  showThemeToggle = true,
}: CustomHeaderProps) {
  const { isVisible } = useScrollHeader({ threshold: 12 });
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border shadow-sm transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Marca / Título */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold tracking-wider text-primary flex items-center gap-1.5">
              <span>{title}</span>
              <span className="h-2 w-2 rounded-full bg-secondary inline-block" />
            </h1>
            {subtitle && (
              <span className="text-xs text-text-secondary font-medium">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Ações do Header */}
        <div className="flex items-center gap-3">
          {showThemeToggle && (
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Alternar Tema"
              className="p-2 rounded-lg bg-background hover:bg-card border border-border text-text-secondary hover:text-text transition-colors flex items-center justify-center text-sm font-medium"
            >
              {theme === 'dark' ? (
                <span className="flex items-center gap-1.5">
                  ☀️ <span className="hidden sm:inline text-xs">Claro</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  🌙 <span className="hidden sm:inline text-xs">Escuro</span>
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}