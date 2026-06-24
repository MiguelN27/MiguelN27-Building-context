# Tech Stack

## Frontend

### Main stack
- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4

### Main features
- Single-page financial dashboard focused on executive metrics.
- Fetches data from the backend `/api/metrics` endpoint.
- Validates API responses at runtime before computing UI metrics.
- Computes client-side KPI totals and monthly trend series.
- Renders KPI cards, trend charts, loading states, and visible error states.

### Structure
- `src/App.tsx`: app entry for data fetching, state handling, KPI calculation, and page composition.
- `src/components/dashboard/`: dashboard-specific UI such as header, KPI cards, charts, and risk panel.
- `src/components/ui/`: shared low-level UI primitives like cards and skeleton loaders.
- `src/lib/financial-types.ts`: financial domain types and runtime guards.
- `src/lib/financial-utils.ts`: KPI, monthly aggregation, currency, and percent formatting logic.
- `src/lib/risky-practice-checks.ts`: derives the engineering-quality status cards shown in the UI.
- `vite.config.ts`: Vite setup, `@` path alias, and `/api` proxy to the backend container.

## Backend

### Main stack
- Python 3.13
- FastAPI
- Uvicorn
- Pydantic

### Main features
- Exposes REST endpoints for financial metrics data.
- Generates deterministic mock financial movements for development and demo use.
- Supports filtering by date range, category, operation type, and business type.
- Provides summary, comparison, top-category, and anomaly-alert endpoints.
- Returns typed API responses through Pydantic models.

### Structure
- `app/main.py`: FastAPI app setup, CORS middleware, and router registration.
- `app/routes.py`: domain models, mock data generation, filtering logic, analytics helpers, and all routes.
- `tests/test_routes.py`: route coverage for filters, summaries, comparisons, and alert behavior.
- `tests/conftest.py`: ensures backend imports resolve correctly during test execution.

## Infra/Tooling

### Main stack
- Docker Compose
- Docker
- ESLint
- Vitest
- Pytest
- debugpy

### Main features
- Two-container local development setup for frontend and backend.
- Frontend runs with Vite dev server and hot reload.
- Backend runs with Uvicorn reload and remote debugging enabled through `debugpy`.
- Frontend proxies `/api` requests to the backend service over the internal Docker network.
- Includes separate JavaScript/TypeScript and Python test tooling.

### Structure
- `docker-compose.yml`: defines frontend/backend services, ports, bind mounts, and service dependency.
- `frontend/Dockerfile`: Node-based development image that installs dependencies and runs Vite.
- `backend/Dockerfile`: Python-based development image that installs requirements and runs FastAPI with reload/debugging.
- `frontend/eslint.config.js`: flat ESLint configuration for TypeScript + React.
- `frontend/tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript project configuration.

## Key Dependencies

### Frontend
- `react`, `react-dom`: UI runtime.
- `typescript`: static typing.
- `vite`, `@vitejs/plugin-react`: bundling and dev server.
- `tailwindcss`, `@tailwindcss/vite`, `postcss`, `autoprefixer`: styling pipeline.
- `recharts`: chart rendering.
- `lucide-react`: icon set.
- `clsx`, `tailwind-merge`, `class-variance-authority`: utility-driven class composition.
- `eslint`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`: linting and frontend code quality.
- `vitest`, `@vitest/coverage-v8`: unit tests and coverage.

### Backend
- `fastapi`: web framework.
- `uvicorn[standard]`: ASGI server.
- `debugpy`: remote debugging.
- `pytest`, `pytest-cov`: test runner and coverage.
- `httpx`: HTTP testing/client support.

## Notes

- The current product uses seeded mock financial data instead of a real database or third-party financial integration.
- The frontend currently exposes a narrower dashboard view than the backend API surface, which already includes additional analytical endpoints for future expansion.
