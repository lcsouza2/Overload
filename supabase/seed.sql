-- =============================================================================
-- Seed Data Supabase: Overload Initial System Catalog (user_id IS NULL)
-- Popula o banco com Grupos Musculares, Equipamentos e Exercícios padrão do sistema
-- =============================================================================

-- 1. Grupos Musculares Padrão
INSERT INTO public.muscle_group (group_name, user_id) VALUES
  ('Peito', NULL),
  ('Costas', NULL),
  ('Pernas', NULL),
  ('Ombros', NULL),
  ('Braços', NULL),
  ('Antebraço', NULL),
  ('Abdômen', NULL)
ON CONFLICT (group_name) DO NOTHING;

-- 2. Músculos Específicos Padrão
INSERT INTO public.muscle (group_name, muscle_name, user_id) VALUES
  ('Peito', 'Peitoral Maior (Superior)', NULL),
  ('Peito', 'Peitoral Maior (Médio)', NULL),
  ('Peito', 'Peitoral Maior (Inferior)', NULL),
  ('Costas', 'Latíssimo do Dorso', NULL),
  ('Costas', 'Trapézio', NULL),
  ('Pernas', 'Quadríceps', NULL),
  ('Pernas', 'Isquiotibiais', NULL),
  ('Pernas', 'Glúteo Máximo', NULL),
  ('Ombros', 'Deltoide Lateral', NULL),
  ('Ombros', 'Deltoide Anterior', NULL),
  ('Ombros', 'Deltoide Posterior', NULL),
  ('Antebraço', 'Braquiorradial', NULL),
  ('Antebraço', 'Flexores do Antebraço', NULL),
  ('Antebraço', 'Extensores do Antebraço', NULL),
  ('Braços', 'Bíceps Braquial', NULL),
  ('Braços', 'Tríceps Braquial', NULL),
  ('Abdômen', 'Reto Abdominal', NULL)
ON CONFLICT (muscle_name, group_name) DO NOTHING;

-- 3. Equipamentos Padrão
INSERT INTO public.equipment (group_name, equipment_name, user_id) VALUES
  ('Peito', 'Halteres', NULL),
  ('Peito', 'Barra', NULL),
  ('Costas', 'Polia', NULL),
  ('Pernas', 'Máquina', NULL),
  ('Abdômen', 'Peso Corporal', NULL)
ON CONFLICT (equipment_name, user_id) DO NOTHING;

-- 4. Exercícios Padrão do Sistema (user_id IS NULL)
INSERT INTO public.exercise (exercise_name, description, user_id) VALUES
  (
    'Supino Inclinado com Halteres',
    'Ajuste o banco em uma inclinação de 30º a 45º. Mantenha os escápulas aduzidas e desça os halteres de forma controlada até a linha do peito.',
    NULL
  ),
  (
    'Puxada Frontal na Polia',
    'Puxe a barra em direção ao peito mantendo o tórax estufado e os cotovelos apontados para baixo. Evite balançar o tronco.',
    NULL
  ),
  (
    'Agachamento Livre com Barra',
    'Posicione a barra sobre os trapézios. Mantenha os joelhos alinhados com as pontas dos pés e desça até pelo menos 90º de flexão.',
    NULL
  ),
  (
    'Elevação Lateral com Halteres',
    'Mantenha uma leve flexão nos cotovelos e eleve os braços até a altura dos ombros focando na abdução do ombro sem impulsionar.',
    NULL
  ),
  (
    'Tríceps Corda na Polia Alta',
    'Mantenha os cotovelos fixos ao lado do corpo. Estenda os braços completamente para baixo e abra a corda no final do movimento.',
    NULL
  ),
  (
    'Abdominal Supra na Prancha Inclinada',
    'Mantenha a lombar apoiada ao subir e concentre a força na flexão do tronco, aproximando as costelas da pelve.',
    NULL
  )
ON CONFLICT (exercise_name, user_id) DO NOTHING;
