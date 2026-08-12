import React, { useState } from 'react';
import type { Exercise, MuscleGroupFilter, EquipmentFilter } from '../types/exercise.types';
import { Modal } from '../../../shared/components/ui/Modal';
import { Input } from '../../../shared/components/ui/Input';

export interface CreateExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (exercise: Exercise) => void;
}

export function CreateExerciseModal({
  isOpen,
  onClose,
  onCreate,
}: CreateExerciseModalProps) {
  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroupFilter>('Peito');
  const [primaryMuscle, setPrimaryMuscle] = useState('');
  const [equipment, setEquipment] = useState<EquipmentFilter>('Halteres');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newExercise: Exercise = {
      id: Date.now(),
      user_id: 1, // Exercício criado pelo usuário
      exercise_name: name.trim(),
      muscle_group: muscleGroup === 'Todos' ? 'Peito' : muscleGroup,
      primary_muscle: primaryMuscle.trim() || 'Musculatura Principal',
      secondary_muscles: [],
      equipment_name: equipment === 'Todos' ? 'Halteres' : equipment,
      description: description.trim() || 'Exercício customizado adicionado pelo usuário.',
    };

    onCreate(newExercise);
    setName('');
    setPrimaryMuscle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Exercício Customizado">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Nome do Exercício */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Nome do Exercício *
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Supino Reto no Cabo..."
            required
          />
        </div>

        {/* Grupo Muscular & Equipamento (Grid 2 colunas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              Grupo Muscular
            </label>
            <select
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value as MuscleGroupFilter)}
              className="bg-background border border-border rounded-xl text-text p-2.5 text-sm focus:outline-none focus:border-primary"
            >
              <option value="Peito">Peito</option>
              <option value="Costas">Costas</option>
              <option value="Pernas">Pernas</option>
              <option value="Ombros">Ombros</option>
              <option value="Braços">Braços</option>
              <option value="Abdômen">Abdômen</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              Equipamento
            </label>
            <select
              value={equipment}
              onChange={(e) => setEquipment(e.target.value as EquipmentFilter)}
              className="bg-background border border-border rounded-xl text-text p-2.5 text-sm focus:outline-none focus:border-primary"
            >
              <option value="Halteres">Halteres</option>
              <option value="Barra">Barra</option>
              <option value="Polia">Polia</option>
              <option value="Máquina">Máquina</option>
              <option value="Peso Corporal">Peso Corporal</option>
            </select>
          </div>
        </div>

        {/* Músculo Específico Alvo */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Músculo Alvo Específico
          </label>
          <Input
            value={primaryMuscle}
            onChange={(e) => setPrimaryMuscle(e.target.value)}
            placeholder="Ex: Peitoral Superior, Latíssimo..."
          />
        </div>

        {/* Descrição / Instruções */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Guia de Execução / Dicas
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva a postura, pegada e amplitude do movimento..."
            rows={3}
            className="w-full bg-background border border-border rounded-xl text-text placeholder:text-text-secondary/70 p-3 text-sm focus:outline-none focus:border-primary transition-all resize-none"
          />
        </div>

        {/* Botões do Form */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-background border border-border text-text-secondary hover:text-text rounded-xl font-medium text-sm transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-primary text-button-text font-semibold rounded-xl hover:bg-primary-hover transition-colors text-sm shadow-sm active:scale-95"
          >
            Salvar Exercício
          </button>
        </div>
      </form>
    </Modal>
  );
}
