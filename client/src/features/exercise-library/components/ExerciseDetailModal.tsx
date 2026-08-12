import type { Exercise } from '../types/exercise.types';
import { Modal } from '../../../shared/components/ui/Modal';
import { Badge } from '../../../shared/components/ui/Badge';

export interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal de Detalhes do Exercício.
 * Exibe instruções de execução, foco muscular e histórico recente de cargas.
 */
export function ExerciseDetailModal({
  exercise,
  isOpen,
  onClose,
}: ExerciseDetailModalProps) {
  if (!exercise) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={exercise.exercise_name}>
      <div className="flex flex-col gap-5">
        {/* Badges de Grupos e Equipamentos */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary" size="md">
            <span>🎯 Alvo Principal:</span> {exercise.primary_muscle}
          </Badge>
          <Badge variant="outline" size="md">
            <span>🏋️ Equipamento:</span> {exercise.equipment_name}
          </Badge>
          {exercise.user_id && (
            <Badge variant="success" size="md">
              Criado por você
            </Badge>
          )}
        </div>

        {/* Músculos Secundários */}
        {exercise.secondary_muscles.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs uppercase font-bold text-text-secondary tracking-wider">
              Músculos Secundários / Sinergistas:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {exercise.secondary_muscles.map((sec, idx) => (
                <Badge key={idx} variant="secondary" size="sm">
                  {sec}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Instruções de Execução */}
        <div className="bg-background p-4 rounded-xl border border-border">
          <h4 className="text-sm font-bold text-text mb-1 flex items-center gap-1.5">
            <span>💡</span> Guia de Execução
          </h4>
          <p className="text-sm text-text-secondary leading-relaxed">
            {exercise.description ||
              'Nenhuma instrução cadastrada para este exercício.'}
          </p>
        </div>

        {/* Histórico / Recorde Recente de Carga */}
        <div className="bg-card p-4 rounded-xl border border-card-border">
          <h4 className="text-sm font-bold text-text mb-2 flex items-center gap-1.5">
            <span>📊</span> Histórico Recente de Carga (Sobrecarga)
          </h4>
          {exercise.last_record ? (
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary font-medium">
                  Última marca ({exercise.last_record.date})
                </span>
                <span className="text-base font-extrabold text-primary font-mono">
                  {exercise.last_record.weight} kg × {exercise.last_record.reps} reps
                </span>
              </div>
              <Badge variant="success" size="sm">
                Melhor Marca
              </Badge>
            </div>
          ) : (
            <p className="text-xs text-text-secondary italic">
              Nenhum treino registrado ainda com este exercício.
            </p>
          )}
        </div>

        {/* Ações do Modal */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2 bg-primary text-button-text font-semibold rounded-xl hover:bg-primary-hover transition-colors text-sm shadow-sm active:scale-95"
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
}
