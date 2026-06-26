import type { OperationType } from '../src/lib/financial-types'

// Expected API date format: YY-MM-DD
export type ApiDateString = `${number}-${number}-${number}`

export interface DateRangeFilter {
	start_date?: ApiDateString
	end_date?: ApiDateString
}

export interface AlertsParams extends DateRangeFilter {
	threshold: number
}

export interface TopCategoriesParams extends DateRangeFilter {
	operation_types: OperationType[]
	limit: number
}
