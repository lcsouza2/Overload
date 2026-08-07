import type { BreadcrumbItem } from './CustomHeader';

export interface DesktopBreadcrumbProps {
  breadcrumbs?: BreadcrumbItem[];
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function DesktopBreadcrumb({
  breadcrumbs,
  showBackButton = false,
  onBack,
}: DesktopBreadcrumbProps) {
  const hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;

  if (!hasBreadcrumbs && !showBackButton) return null;

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    // Visível estritamente em desktops (hidden md:flex) alinhado ao topo da área principal de conteúdo
    <div className="hidden md:flex items-center gap-2.5 pb-2 mb-2 border-b border-border/40">
      {/* Botão de Voltar para Desktop */}
      {showBackButton && (
        <button
          onClick={handleBackClick}
          type="button"
          aria-label="Voltar para a página anterior"
          className="p-1.5 rounded-lg bg-surface hover:bg-card border border-border text-text-secondary hover:text-text transition-colors flex items-center justify-center shrink-0 active:scale-95 text-xs font-medium gap-1"
        >
          <svg
            className="w-4 h-4"
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
          <span>Voltar</span>
        </button>
      )}

      {/* Caminho Clicável de Breadcrumbs */}
      {hasBreadcrumbs && (
        <nav aria-label="Desktop Breadcrumb" className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-text-secondary/50 text-xs font-bold">
                    /
                  </span>
                )}
                {isLast ? (
                  <span className="font-bold text-text truncate">
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
                    className="text-text-secondary hover:text-primary transition-colors font-medium hover:underline truncate"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            );
          })}
        </nav>
      )}
    </div>
  );
}
