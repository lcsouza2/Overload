-- =============================================================================
-- Migration Supabase: Índices Críticos de Performance (Overload)
-- Otimiza consultas frequentes, navegação RLS e acompanhamento de sobrecarga
-- =============================================================================

-- 1. Índices para isolamento e rápida filtragem de usuários (Essenciais para RLS)
CREATE INDEX IF NOT EXISTS idx_workout_plan_user_id ON public.workout_plan(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_report_user_id ON public.workout_report(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_user_id ON public.exercise(user_id);
CREATE INDEX IF NOT EXISTS idx_equipment_user_id ON public.equipment(user_id);
CREATE INDEX IF NOT EXISTS idx_muscle_user_id ON public.muscle(user_id);
CREATE INDEX IF NOT EXISTS idx_muscle_group_user_id ON public.muscle_group(user_id);

-- 2. Índices de Relatórios e Execução de Treino (Frequência Alta na Academia)
-- Busca de relatórios por usuário e data ordenados cronologicamente
CREATE INDEX IF NOT EXISTS idx_workout_report_user_date ON public.workout_report(user_id, report_date DESC);

-- Chave estrangeira de séries por relatório de treino
CREATE INDEX IF NOT EXISTS idx_split_set_report_workout_report ON public.split_set_report(workout_report_id);

-- Busca de evolução de carga (1RM e histórico) por exercício específico
CREATE INDEX IF NOT EXISTS idx_split_set_report_exercise_progression ON public.split_set_report(exercise_id, created_at DESC);

-- 3. Índices de Estrutura de Fichas e Splits (Planos & Divisões)
-- Busca de divisões (splits) por plano de treino
CREATE INDEX IF NOT EXISTS idx_workout_split_plan_id ON public.workout_split(workout_plan_id);

-- Busca de exercícios alocados em um split ordenados pela sequência de execução
CREATE INDEX IF NOT EXISTS idx_split_exercise_plan_split_order ON public.split_exercise(workout_plan_id, split, execution_order);

-- 4. Índices da Biblioteca de Exercícios (Busca & Filtros)
-- Busca rápida de exercícios por nome
CREATE INDEX IF NOT EXISTS idx_exercise_name ON public.exercise(exercise_name);

-- Lookups reversos nas tabelas de associação N:N (Exercício <-> Músculo <-> Equipamento)
CREATE INDEX IF NOT EXISTS idx_exercise_muscle_muscle_id ON public.exercise_muscle(muscle_id);
CREATE INDEX IF NOT EXISTS idx_exercise_equipment_equipment_id ON public.exercise_equipment(equipment_id);

-- Lookups de músculos e equipamentos por grupo muscular
CREATE INDEX IF NOT EXISTS idx_muscle_group_name ON public.muscle(group_name);
CREATE INDEX IF NOT EXISTS idx_equipment_group_name ON public.equipment(group_name);
