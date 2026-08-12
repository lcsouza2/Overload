import type { Exercise } from '../types/exercise.types';

export const INITIAL_EXERCISES: Exercise[] = [
  {
    id: 1,
    user_id: null,
    exercise_name: 'Supino Inclinado com Halteres',
    muscle_group: 'Peito',
    primary_muscle: 'Peitoral Maior (Superior)',
    secondary_muscles: ['Deltoide Anterior', 'Tríceps Braquial'],
    equipment_name: 'Halteres',
    description:
      'Ajuste o banco em uma inclinação de 30º a 45º. Mantenha os escápulas aduzidas e desça os halteres de forma controlada até a linha do peito.',
    last_record: {
      weight: 32,
      reps: 8,
      date: '10/05/2026',
    },
  },
  {
    id: 2,
    user_id: null,
    exercise_name: 'Puxada Frontal na Polia',
    muscle_group: 'Costas',
    primary_muscle: 'Latíssimo do Dorso',
    secondary_muscles: ['Bíceps Braquial', 'Braquiorradial', 'Deltoide Posterior'],
    equipment_name: 'Polia',
    description:
      'Puxe a barra em direção ao peito mantendo o tórax estufado e os cotovelos apontados para baixo. Evite balançar o tronco.',
    last_record: {
      weight: 75,
      reps: 10,
      date: '11/05/2026',
    },
  },
  {
    id: 3,
    user_id: null,
    exercise_name: 'Agachamento Livre com Barra',
    muscle_group: 'Pernas',
    primary_muscle: 'Quadríceps',
    secondary_muscles: ['Glúteo Máximo', 'Isquiotibiais', 'Eretores da Espinha'],
    equipment_name: 'Barra',
    description:
      'Posicione a barra sobre os trapézios. Mantenha os joelhos alinhados com as pontas dos pés e desça até pelo menos 90º de flexão.',
    last_record: {
      weight: 110,
      reps: 6,
      date: '08/05/2026',
    },
  },
  {
    id: 4,
    user_id: null,
    exercise_name: 'Elevação Lateral com Halteres',
    muscle_group: 'Ombros',
    primary_muscle: 'Deltoide Lateral',
    secondary_muscles: ['Trapézio Superior'],
    equipment_name: 'Halteres',
    description:
      'Mantenha uma leve flexão nos cotovelos e eleve os braços até a altura dos ombros focando na abdução do ombro sem impulsionar com o corpo.',
    last_record: {
      weight: 14,
      reps: 12,
      date: '12/05/2026',
    },
  },
  {
    id: 5,
    user_id: 1, // Exercício customizado pelo usuário
    exercise_name: 'Rosca Martelo Alternada no Banco 45º',
    muscle_group: 'Braços',
    primary_muscle: 'Braquial & Braquiorradial',
    secondary_muscles: ['Bíceps Braquial'],
    equipment_name: 'Halteres',
    description:
      'Sentado no banco inclinado, mantenha a pegada neutra (palmas viradas uma para a outra) e eleve os halteres focando na contração do braquial.',
    last_record: {
      weight: 18,
      reps: 10,
      date: '09/05/2026',
    },
  },
  {
    id: 6,
    user_id: null,
    exercise_name: 'Tríceps Corda na Polia Alta',
    muscle_group: 'Braços',
    primary_muscle: 'Tríceps Braquial (Cabeça Lateral)',
    secondary_muscles: ['Tríceps Braquial (Cabeça Longa)'],
    equipment_name: 'Polia',
    description:
      'Mantenha os cotovelos fixos ao lado do corpo. Estenda os braços completamente para baixo e abra a corda no final do movimento.',
    last_record: {
      weight: 45,
      reps: 12,
      date: '09/05/2026',
    },
  },
  {
    id: 7,
    user_id: null,
    exercise_name: 'Abdominal Supra na Prancha Inclinada',
    muscle_group: 'Abdômen',
    primary_muscle: 'Reto Abdominal',
    secondary_muscles: ['Oblíquos Externos'],
    equipment_name: 'Peso Corporal',
    description:
      'Mantenha a lombar apoiada ao subir e concentre a força na flexão do tronco, aproximando as costelas da pelve.',
    last_record: {
      weight: 10,
      reps: 15,
      date: '07/05/2026',
    },
  },
];
