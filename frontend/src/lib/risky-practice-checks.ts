export type RiskCheckCategory = 'Architecture' | 'DX'
export type RiskCheckStatus = 'pass' | 'fail' | 'warning'

export interface RiskCheck {
  id: string
  title: string
  category: RiskCheckCategory
  status: RiskCheckStatus
  details: string
  evidence: string
}

interface BuildRiskChecksOptions {
  apiBaseUrl?: string
  hadFetchError: boolean
}

export function buildRiskPracticeChecks({ apiBaseUrl, hadFetchError }: BuildRiskChecksOptions): RiskCheck[] {
  const hasApiBaseUrl = Boolean(apiBaseUrl?.trim())

  return [
    {
      id: 'architecture-runtime-validation',
      title: 'Runtime Validation on API JSON',
      category: 'Architecture',
      status: 'pass',
      details: 'API payload is checked with a runtime type guard before computing KPIs and charts.',
      evidence: 'isFinancialMovementArray validates each movement shape from /api/metrics.',
    },
    {
      id: 'architecture-api-base-url',
      title: 'API Base URL Fallback Removed',
      category: 'Architecture',
      status: hasApiBaseUrl ? 'pass' : 'fail',
      details: hasApiBaseUrl
        ? 'VITE_API_BASE_URL is configured, so requests are built from explicit environment config.'
        : 'VITE_API_BASE_URL is missing, so the dashboard surfaces a configuration error.',
      evidence: hasApiBaseUrl
        ? 'Configured URL is used to build requests to /api/metrics.'
        : 'The app throws before fetch when the environment variable is not provided.',
    },
    {
      id: 'dx-typesafe-root-mount',
      title: 'Type-Safe Root Mount',
      category: 'DX',
      status: 'pass',
      details: 'Root element lookup is validated before mounting React, avoiding non-null assertion shortcuts.',
      evidence: 'main.tsx throws a descriptive error if #root is unavailable.',
    },
    {
      id: 'dx-visible-error-logging',
      title: 'Error Visibility in Catch Handlers',
      category: 'DX',
      status: 'pass',
      details: hadFetchError
        ? 'A fetch error occurred and was logged to the browser console with context.'
        : 'Catch handlers now include the error object and log diagnostic context.',
      evidence: 'App fetch pipeline uses .catch((err) => console.error(..., err)).',
    },
    {
      id: 'dx-semicolon-format-consistency',
      title: 'Semicolon Formatting Consistency',
      category: 'DX',
      status: 'warning',
      details: 'The project still has mixed semicolon styles and should enforce one format automatically.',
      evidence: 'Use ESLint or Prettier formatting rules to enforce a single semicolon policy.',
    },
  ]
}