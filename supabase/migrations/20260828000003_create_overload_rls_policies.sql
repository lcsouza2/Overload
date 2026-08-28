-- =============================================================================
-- Migration Supabase: Políticas de RLS O(1) de Alta Performance - Overload
-- Todas as checagens utilizam auth.uid() = user_id direto (sem JOINs / EXISTS)
-- Baseado nas especificações declaradas em supabase/temp/rls-policies.txt
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. TABELA: muscle_group
-- -----------------------------------------------------------------------------
CREATE POLICY "muscle_group_select_policy" ON public.muscle_group
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "muscle_group_insert_policy" ON public.muscle_group
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "muscle_group_update_policy" ON public.muscle_group
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "muscle_group_delete_policy" ON public.muscle_group
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 2. TABELA: muscle
-- -----------------------------------------------------------------------------
CREATE POLICY "muscle_select_policy" ON public.muscle
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "muscle_insert_policy" ON public.muscle
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "muscle_update_policy" ON public.muscle
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "muscle_delete_policy" ON public.muscle
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 3. TABELA: equipment
-- -----------------------------------------------------------------------------
CREATE POLICY "equipment_select_policy" ON public.equipment
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "equipment_insert_policy" ON public.equipment
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "equipment_update_policy" ON public.equipment
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "equipment_delete_policy" ON public.equipment
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 4. TABELA: exercise
-- -----------------------------------------------------------------------------
CREATE POLICY "exercise_select_policy" ON public.exercise
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "exercise_insert_policy" ON public.exercise
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "exercise_update_policy" ON public.exercise
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "exercise_delete_policy" ON public.exercise
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 5. TABELA ASSOCIATIVA: exercise_muscle (Checagem Direta O(1))
-- -----------------------------------------------------------------------------
CREATE POLICY "exercise_muscle_select_policy" ON public.exercise_muscle
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "exercise_muscle_insert_policy" ON public.exercise_muscle
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "exercise_muscle_update_policy" ON public.exercise_muscle
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "exercise_muscle_delete_policy" ON public.exercise_muscle
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 6. TABELA ASSOCIATIVA: exercise_equipment (Checagem Direta O(1))
-- -----------------------------------------------------------------------------
CREATE POLICY "exercise_equipment_select_policy" ON public.exercise_equipment
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "exercise_equipment_insert_policy" ON public.exercise_equipment
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "exercise_equipment_update_policy" ON public.exercise_equipment
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "exercise_equipment_delete_policy" ON public.exercise_equipment
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 7. TABELA: workout_plan
-- -----------------------------------------------------------------------------
CREATE POLICY "workout_plan_select_policy" ON public.workout_plan
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "workout_plan_insert_policy" ON public.workout_plan
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "workout_plan_update_policy" ON public.workout_plan
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "workout_plan_delete_policy" ON public.workout_plan
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 8. TABELA FILHA: workout_split (Checagem Direta O(1))
-- -----------------------------------------------------------------------------
CREATE POLICY "workout_split_select_policy" ON public.workout_split
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "workout_split_insert_policy" ON public.workout_split
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "workout_split_update_policy" ON public.workout_split
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "workout_split_delete_policy" ON public.workout_split
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 9. TABELA ASSOCIATIVA: split_exercise (Checagem Direta O(1))
-- -----------------------------------------------------------------------------
CREATE POLICY "split_exercise_select_policy" ON public.split_exercise
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "split_exercise_insert_policy" ON public.split_exercise
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "split_exercise_update_policy" ON public.split_exercise
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "split_exercise_delete_policy" ON public.split_exercise
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 10. TABELA: workout_report
-- -----------------------------------------------------------------------------
CREATE POLICY "workout_report_select_policy" ON public.workout_report
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "workout_report_insert_policy" ON public.workout_report
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "workout_report_update_policy" ON public.workout_report
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "workout_report_delete_policy" ON public.workout_report
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 11. TABELA FILHA: split_set_report (Checagem Direta O(1))
-- -----------------------------------------------------------------------------
CREATE POLICY "split_set_report_select_policy" ON public.split_set_report
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "split_set_report_insert_policy" ON public.split_set_report
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "split_set_report_update_policy" ON public.split_set_report
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "split_set_report_delete_policy" ON public.split_set_report
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
