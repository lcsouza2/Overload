import type { Exercise } from '../types/exercise.types';
import { Card } from '../../../shared/components/ui/Card';
import { Badge } from '../../../shared/components/ui/Badge';

export interface ExerciseCardProps {
  exercise: Exercise;
  onClick: (exercise: Exercise) => void;
}

/**
 * Componente de Card para um Exercício da Biblioteca.
 * Reutiliza os componentes genéricos Card e Badge (Pills).
 */
export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  const isCustom = Boolean(exercise.user_id);

  return (
    <Card
      hoverable
      onClick={() => onClick(exercise)}
      className="flex flex-col justify-between h-full group"
    >
      <div className="flex flex-col gap-3">
        {/* Cabeçalho do Card: Nome e Tag Customizado */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-base text-text group-hover:text-primary transition-colors line-clamp-2">
            {exercise.exercise_name}
          </h3>
          {isCustom && (
            <Badge variant="success" size="sm" className="shrink-0">
              Custom
            </Badge>
          )}
        </div>

        {/* Badges / Pills de Músculos (Primário e Secundários) */}
        <div className="flex flex-wrap gap-1.5">
          {/* Músculo Primário (Roxo) */}
          <Badge variant="primary" size="sm">
            <span>🎯</span> {exercise.primary_muscle}
          </Badge>

          {/* Músculos Secundários (Laranja) */}
          {exercise.secondary_muscles.map((sec, idx) => (
            <Badge key={idx} variant="secondary" size="sm">
              {sec}
            </Badge>
          ))}
        </div>
      </div>

      {/* Rodapé do Card: Equipamento & Carga Recente */}
      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2 text-xs">
        {/* Equipamento */}
        <span className="text-text-secondary flex items-center gap-1 font-medium">
          <span>🏋️</span> {exercise.equipment_name}
        </span>

        {/* Marca de Carga Recente */}
        {exercise.last_record ? (
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-semibold font-mono">
            {exercise.last_record.weight}kg × {exercise.last_record.reps}
          </span>
        ) : (
          <span className="text-text-secondary/60 italic">Sem registros</span>
        )}
      </div>
    </Card>
  );
}
