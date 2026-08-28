-- =============================================================================
-- Migration Supabase DDL: Overload Schema
-- Converte os modelos SQLAlchemy (api/src/models) para PostgreSQL / Supabase
-- Integração com auth.users via UUID para compatibilidade com RLS
-- =============================================================================

-- 1. Tabela: muscle_group (Grupo Muscular)
CREATE TABLE IF NOT EXISTS public.muscle_group (
    group_name VARCHAR(100) NOT NULL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- NULL para grupos globais do sistema
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 2. Tabela: muscle (Músculo Específico)
CREATE TABLE IF NOT EXISTS public.muscle (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL REFERENCES public.muscle_group(group_name) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- NULL para músculos do sistema
    muscle_name VARCHAR(100) NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_muscle_name_group UNIQUE (muscle_name, group_name)
);

-- 3. Tabela: equipment (Equipamento)
CREATE TABLE IF NOT EXISTS public.equipment (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- NULL para equipamentos do sistema
    group_name VARCHAR(100) NOT NULL REFERENCES public.muscle_group(group_name) ON DELETE CASCADE,
    equipment_name VARCHAR(100) NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_equipment_name_user UNIQUE (equipment_name, user_id)
);

CREATE INDEX IF NOT EXISTS idx_equipment_name ON public.equipment(equipment_name);

-- 4. Tabela: exercise (Exercício)
CREATE TABLE IF NOT EXISTS public.exercise (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- NULL para exercícios globais do sistema
    exercise_name VARCHAR(150) NOT NULL,
    description TEXT,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_exercise_name_user UNIQUE (exercise_name, user_id)
);

-- 5. Tabela de Associação: exercise_muscle (Exercício N:N Músculo)
CREATE TABLE IF NOT EXISTS public.exercise_muscle (
    exercise_id BIGINT NOT NULL REFERENCES public.exercise(id) ON DELETE CASCADE,
    muscle_id BIGINT NOT NULL REFERENCES public.muscle(id) ON DELETE CASCADE,
    PRIMARY KEY (exercise_id, muscle_id)
);

-- 6. Tabela de Associação: exercise_equipment (Exercício N:N Equipamento)
CREATE TABLE IF NOT EXISTS public.exercise_equipment (
    exercise_id BIGINT NOT NULL REFERENCES public.exercise(id) ON DELETE CASCADE,
    equipment_id BIGINT NOT NULL REFERENCES public.equipment(id) ON DELETE CASCADE,
    PRIMARY KEY (exercise_id, equipment_id)
);

-- 7. Tabela: workout_plan (Plano de Treino / Ficha)
CREATE TABLE IF NOT EXISTS public.workout_plan (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workout_plan_name VARCHAR(150) NOT NULL,
    workout_plan_goal VARCHAR(255) NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_workout_plan_name_user UNIQUE (workout_plan_name, user_id)
);

-- 8. Tabela: workout_split (Divisão de Treino ex: Treino A, Treino B)
CREATE TABLE IF NOT EXISTS public.workout_split (
    split VARCHAR(50) NOT NULL,
    workout_plan_id BIGINT NOT NULL REFERENCES public.workout_plan(id) ON DELETE CASCADE,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ,
    PRIMARY KEY (split, workout_plan_id)
);

-- 9. Tabela de Associação: split_exercise (Exercícios alocados no Split)
CREATE TABLE IF NOT EXISTS public.split_exercise (
    workout_plan_id BIGINT NOT NULL,
    split VARCHAR(50) NOT NULL,
    exercise_id BIGINT NOT NULL REFERENCES public.exercise(id) ON DELETE CASCADE,
    execution_order INT NOT NULL,
    sets INT NOT NULL,
    reps VARCHAR(50) DEFAULT 'Failure' NOT NULL,
    rest_time INT, -- Tempo de descanso em segundos
    advanced_technique VARCHAR(100),
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    PRIMARY KEY (workout_plan_id, split, exercise_id, execution_order),
    FOREIGN KEY (split, workout_plan_id) REFERENCES public.workout_split(split, workout_plan_id) ON DELETE CASCADE
);

-- 10. Tabela: workout_report (Sessão de Treino Executada no Dia)
CREATE TABLE IF NOT EXISTS public.workout_report (
    id BIGINT GENERATED ALWAYS AS IDENTITY UNIQUE,
    report_date DATE NOT NULL,
    workout_plan_id BIGINT NOT NULL,
    split VARCHAR(50) NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (report_date, workout_plan_id, split, user_id),
    FOREIGN KEY (split, workout_plan_id) REFERENCES public.workout_split(split, workout_plan_id) ON DELETE CASCADE
);

-- 11. Tabela: split_set_report (Registro da Série Executada: peso, reps, ordem)
CREATE TABLE IF NOT EXISTS public.split_set_report (
    workout_report_id BIGINT NOT NULL REFERENCES public.workout_report(id) ON DELETE CASCADE,
    exercise_id BIGINT NOT NULL REFERENCES public.exercise(id) ON DELETE CASCADE,
    split VARCHAR(50) NOT NULL,
    execution_order INT NOT NULL,
    set_number INT NOT NULL,
    reps VARCHAR(50) NOT NULL,
    weight NUMERIC(6, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (workout_report_id, exercise_id, set_number)
);

-- Habilitar RLS em todas as tabelas (Pronto para aplicação de políticas de acesso)
ALTER TABLE public.muscle_group ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.muscle ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_muscle ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_split ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.split_exercise ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_report ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.split_set_report ENABLE ROW LEVEL SECURITY;
