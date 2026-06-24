export type OperationType = 'income' | 'outcome'
export type Category = 'suppliers' | 'sales' | 'operational' | 'administrative' | 'others'
export type BusinessType = 'B2B' | 'B2C'

export interface FinancialMovement {
  create_date: string // ISO date
  amount: number
  operation_type: OperationType
  category: Category
  business_type: BusinessType
}

export interface KPIMetrics {
  totalIncome: number
  totalOutcome: number
  profit: number
  profitPercent: number
}

export interface MonthlyDataPoint {
  month: string
  income: number
  outcome: number
  profitPercent: number
}

const OPERATION_TYPES: OperationType[] = ['income', 'outcome']
const CATEGORIES: Category[] = ['suppliers', 'sales', 'operational', 'administrative', 'others']
const BUSINESS_TYPES: BusinessType[] = ['B2B', 'B2C']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function isFinancialMovement(value: unknown): value is FinancialMovement {
  if (!isRecord(value)) {
    return false
  }

  const createDate = value.create_date
  const amount = value.amount
  const operationType = value.operation_type
  const category = value.category
  const businessType = value.business_type

  return (
    typeof createDate === 'string' &&
    Number.isFinite(Date.parse(createDate)) &&
    typeof amount === 'number' &&
    Number.isFinite(amount) &&
    OPERATION_TYPES.includes(operationType as OperationType) &&
    CATEGORIES.includes(category as Category) &&
    BUSINESS_TYPES.includes(businessType as BusinessType)
  )
}

export function isFinancialMovementArray(value: unknown): value is FinancialMovement[] {
  return Array.isArray(value) && value.every((item) => isFinancialMovement(item))
}
