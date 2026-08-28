Overload é uma aplicação voltada para gerência da rotina de treinos e acompanhamento de desempenho (sobrecarga progressiva), com suporte a uso em dispositivos móveis via PWA e sincronização em tempo real. Futuramente pode contar com módulos de tracking de nutrição e consumo de água.

## Arquitetura do Projeto

O projeto adota uma arquitetura **Client-Side Only / Serverless (BaaS)** visando custo zero de infraestrutura 24/7, manutenção simplificada e execução de alta performance:

### Tecnologias no Cliente (Web / PWA):
* **Core:** ReactJS 19 + TypeScript + Vite Server.
* **PWA & Offline:** Suporte a PWA para instalação em dispositivos móveis e cache local.
* **Estilização:** Tailwind CSS v4 com paleta customizada no design system (`useTheme.ts`).
* **Validação & Estado:** Zod (validação de formulários e schemas) + TanStack Query (gerenciamento de cache, estado assíncrono e sincronização).

### Backend & Persistência (Serverless BaaS):
* **Supabase (PostgreSQL + Auth + RLS):**
  * Banco de dados PostgreSQL hospedado sem custos de servidor.
  * **Row Level Security (RLS):** Garantia de isolamento de dados no nível do banco (cada usuário acessa estritamente seus próprios treinos e fichas).
  * **Autenticação:** Gerenciamento nativo de usuários (e-mail/senha).
  * **Constraints & FKs:** Validação estrita de integridade relacional entre `workout_plan`, `workout_split` e `split_set_report`.

### Observação sobre a API legada em Python/FastAPI:
* O código em `api/` (FastAPI + SQLAlchemy + Redis) está mantido no repositório como arquivo de referência dos modelos relacionais, mas não é necessário para o funcionamento nem para a hospedagem do projeto.