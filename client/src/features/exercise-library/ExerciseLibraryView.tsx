import { useState, useMemo } from 'react';
import type {
  Exercise,
  MuscleGroupFilter,
  EquipmentFilter,
  SourceFilter,
} from './types/exercise.types';
import { INITIAL_EXERCISES } from './data/mockExercises';
import { ExerciseCard } from './components/ExerciseCard';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { CreateExerciseModal } from './components/CreateExerciseModal';
import { Input } from '../../shared/components/ui/Input';
import { Badge } from '../../shared/components/ui/Badge';

export default function ExerciseLibraryView() {
  const [exercises, setExercises] = useState<Exercise[]>(INITIAL_EXERCISES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] =
    useState<MuscleGroupFilter>('Todos');
  const [selectedEquipment, setSelectedEquipment] =
    useState<EquipmentFilter>('Todos');
  const [selectedSource, setSelectedSource] = useState<SourceFilter>('Todos');

  // Modais State
  const [activeDetailExercise, setActiveDetailExercise] =
    useState<Exercise | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const muscleGroups: MuscleGroupFilter[] = [
    'Todos',
    'Peito',
    'Costas',
    'Pernas',
    'Ombros',
    'Braços',
    'Abdômen',
  ];

  const equipments: EquipmentFilter[] = [
    'Todos',
    'Halteres',
    'Barra',
    'Polia',
    'Máquina',
    'Peso Corporal',
  ];

  // Adicionar novo exercício customizado
  const handleCreateExercise = (newEx: Exercise) => {
    setExercises((prev) => [newEx, ...prev]);
  };

  // Filtro Reativo em Tempo Real
  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      // 1. Filtro por Busca de Texto
      const matchesSearch =
        searchQuery.trim() === '' ||
        ex.exercise_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.primary_muscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.secondary_muscles.some((m) =>
          m.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // 2. Filtro por Grupo Muscular
      const matchesMuscle =
        selectedMuscleGroup === 'Todos' ||
        ex.muscle_group === selectedMuscleGroup;

      // 3. Filtro por Equipamento
      const matchesEquipment =
        selectedEquipment === 'Todos' ||
        ex.equipment_name === selectedEquipment;

      // 4. Filtro por Origem (Sistema vs Customizado)
      const matchesSource =
        selectedSource === 'Todos' ||
        (selectedSource === 'Customizados' && Boolean(ex.user_id)) ||
        (selectedSource === 'Sistema' && !ex.user_id);

      return matchesSearch && matchesMuscle && matchesEquipment && matchesSource;
    });
  }, [
    exercises,
    searchQuery,
    selectedMuscleGroup,
    selectedEquipment,
    selectedSource,
  ]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* =========================================================================
          CABEÇALHO DA SEÇÃO & AÇÕES
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
            Biblioteca de Exercícios
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Acervo de exercícios com busca rápida, filtros e marcas de sobrecarga.
          </p>
        </div>

        {/* Botão Novo Exercício Customizado */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          type="button"
          className="px-4 py-2.5 bg-primary text-button-text font-semibold rounded-xl hover:bg-primary-hover transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2 text-sm self-start sm:self-auto shrink-0"
        >
          <span>✨</span>
          <span>Novo Exercício</span>
        </button>
      </div>

      {/* =========================================================================
          BARRA DE BUSCA & PAINEL DE FILTROS
         ========================================================================= */}
      <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex flex-col gap-4">
        {/* Campo de Busca */}
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por nome do exercício ou músculo (ex: Supino, Tríceps)..."
          leftIcon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
          rightIcon={
            searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs hover:text-text"
              >
                ✖
              </button>
            ) : undefined
          }
        />

        {/* Chips de Filtros por Grupo Muscular (Scroll Horizontal no Mobile) */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Grupo Muscular:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {muscleGroups.map((group) => {
              const isActive = selectedMuscleGroup === group;
              return (
                <Badge
                  key={group}
                  variant="primary"
                  size="md"
                  active={isActive}
                  clickable
                  onClick={() => setSelectedMuscleGroup(group)}
                >
                  {group}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Filtros Secundários: Equipamento & Origem */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60 text-xs">
          {/* Equipamentos */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="font-semibold text-text-secondary shrink-0">
              Equipamento:
            </span>
            {equipments.map((eq) => {
              const isActive = selectedEquipment === eq;
              return (
                <Badge
                  key={eq}
                  variant="outline"
                  size="sm"
                  active={isActive}
                  clickable
                  onClick={() => setSelectedEquipment(eq)}
                >
                  {eq}
                </Badge>
              );
            })}
          </div>

          {/* Origem (Sistema vs Customizado) */}
          <div className="flex items-center gap-1 shrink-0">
            {(['Todos', 'Sistema', 'Customizados'] as SourceFilter[]).map(
              (src) => (
                <Badge
                  key={src}
                  variant="ghost"
                  size="sm"
                  active={selectedSource === src}
                  clickable
                  onClick={() => setSelectedSource(src)}
                >
                  {src}
                </Badge>
              )
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          GRID DE EXERCÍCIOS / RESULTADOS
         ========================================================================= */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              onClick={(exercise) => setActiveDetailExercise(exercise)}
            />
          ))}
        </div>
      ) : (
        /* Estado Vazio */
        <div className="bg-surface p-8 rounded-2xl border border-border text-center flex flex-col items-center justify-center gap-3">
          <span className="text-4xl">🔍</span>
          <h3 className="font-bold text-lg text-text">
            Nenhum exercício encontrado
          </h3>
          <p className="text-sm text-text-secondary max-w-md">
            Não encontramos nenhum exercício com os filtros selecionados. Tente
            limpar a busca ou cadastrar um novo exercício customizado.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedMuscleGroup('Todos');
              setSelectedEquipment('Todos');
              setSelectedSource('Todos');
            }}
            type="button"
            className="px-4 py-2 bg-background border border-border hover:border-primary text-primary font-medium rounded-xl text-xs transition-colors"
          >
            Limpar Todos os Filtros
          </button>
        </div>
      )}

      {/* =========================================================================
          MODAIS (Detalhes e Criação)
         ========================================================================= */}
      <ExerciseDetailModal
        exercise={activeDetailExercise}
        isOpen={Boolean(activeDetailExercise)}
        onClose={() => setActiveDetailExercise(null)}
      />

      <CreateExerciseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateExercise}
      />
    </div>
  );
}
