-- =============================================================================
-- Migration Supabase: Adiciona user_id às tabelas associativas e filhas
-- Permite checagens de RLS diretas em tempo constante O(1) sem necessidade de JOINs
-- =============================================================================

-- 1. Adicionar user_id na tabela associativa: exercise_muscle
ALTER TABLE public.exercise_muscle
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_exercise_muscle_user_id ON public.exercise_muscle(user_id);

-- 2. Adicionar user_id na tabela associativa: exercise_equipment
ALTER TABLE public.exercise_equipment
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_exercise_equipment_user_id ON public.exercise_equipment(user_id);

-- 3. Adicionar user_id na tabela filha: workout_split
ALTER TABLE public.workout_split
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_workout_split_user_id ON public.workout_split(user_id);

-- 4. Adicionar user_id na tabela associativa: split_exercise
ALTER TABLE public.split_exercise
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_split_exercise_user_id ON public.split_exercise(user_id);

-- 5. Adicionar user_id na tabela filha: split_set_report
ALTER TABLE public.split_set_report
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_split_set_report_user_id ON public.split_set_report(user_id);
