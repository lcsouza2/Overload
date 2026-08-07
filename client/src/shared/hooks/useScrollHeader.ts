import { useState, useEffect } from 'react';

interface UseScrollHeaderOptions {
  /**
   * Distância mínima de rolagem (em pixels) para disparar a alternância.
   * Evita oscilações indesejadas no scroll de dispositivos móveis.
   */
  threshold?: number;
}

export function useScrollHeader({ threshold = 10 }: UseScrollHeaderOptions = {}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Sempre exibe o header quando o usuário está próximo do topo da página
      if (currentScrollY <= 15) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollY;

      // Altera a visibilidade somente se a rolagem ultrapassar o threshold estipulado
      if (Math.abs(delta) >= threshold) {
        if (delta > 0) {
          // Rolando para BAIXO -> Esconde o header
          setIsVisible(false);
        } else {
          // Rolando para CIMA -> Reaparece imediatamente de qualquer ponto da tela
          setIsVisible(true);
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { isVisible };
}
