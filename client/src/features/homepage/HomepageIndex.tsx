import CustomHeader from "../../shared/components/CustomHeader";

export default function HomepageIndex() {
  return (
    <div className="min-h-screen bg-background text-text">
      <CustomHeader subtitle="Gerenciamento de Treino & Sobrecarga" />

      {/* Exemplo de conteúdo com altura suficiente para testar a rolagem */}
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16 flex flex-col gap-6">
        <section className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-primary mb-2">Treino de Hoje</h2>
          <p className="text-text-secondary mb-4">
            Treino A - Peito, Ombro e Tríceps
          </p>
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-3 bg-button text-button-text font-semibold rounded-xl hover:bg-primary-hover transition-colors shadow-sm"
          >
            🏋️‍♂️ Iniciar Treino Ativo
          </button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card p-5 rounded-xl border border-card-border">
            <h3 className="font-semibold text-lg text-text mb-1">
              Sobrecarga Progressiva
            </h3>
            <p className="text-sm text-text-secondary">
              Acompanhe suas marcas máximas e volume de treino semanal.
            </p>
          </div>
          <div className="bg-card p-5 rounded-xl border border-card-border">
            <h3 className="font-semibold text-lg text-text mb-1">
              Suporte Offline (PWA)
            </h3>
            <p className="text-sm text-text-secondary">
              Registre suas séries na academia mesmo sem conexão com a internet.
            </p>
          </div>
        </section>

        {/* Blocos repetidos para gerar scroll funcional */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface p-6 rounded-xl border border-border"
          >
            <h4 className="font-medium text-text mb-2">
              Seção Informativa #{i + 1}
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Role a página para baixo para observar o header se ocultando suavemente.
              Em seguida, role um pouco para cima de qualquer ponto para ver o header reaparecer instantaneamente!
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}