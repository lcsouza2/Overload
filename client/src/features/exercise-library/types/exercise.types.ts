export interface Exercise {
  id: number;
  user_id?: number | null; // null se for do sistema, number se for customizado pelo usuário
  exercise_name: string;
  description?: string | null;
  primary_muscle: string;
  muscle_group: string; // Ex: Peito, Costas, Pernas, Ombros, Braços, Abdômen
  secondary_muscles: string[];
  equipment_name: string; // Ex: Halteres, Barra, Polia, Máquina, Peso Corporal
  last_record?: {
    weight: number;
    reps: number;
    date: string;
  };
}

export type MuscleGroupFilter =
  | 'Todos'
  | 'Peito'
  | 'Costas'
  | 'Pernas'
  | 'Ombros'
  | 'Braços'
  | 'Abdômen';

export type EquipmentFilter =
  | 'Todos'
  | 'Halteres'
  | 'Barra'
  | 'Polia'
  | 'Máquina'
  | 'Peso Corporal';

export type SourceFilter = 'Todos' | 'Sistema' | 'Customizados';
