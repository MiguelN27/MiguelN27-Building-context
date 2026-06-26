import type { OperationType } from '../src/lib/financial-types'

// Expected API date format: YYYY-MM-DD
export type ApiDateString = `${number}-${number}-${number}`

export interface DateRangeFilter {
	/**
	 * Inclusive lower bound for the requested metrics range.
	 * Valid values: omitted or any calendar date accepted by the backend.
	 * Format: `YYYY-MM-DD`.
	 */
	start_date?: ApiDateString
	/**
	 * Inclusive upper bound for the requested metrics range.
	 * Valid values: omitted or any calendar date accepted by the backend.
	 * Format: `YYYY-MM-DD`.
	 */
	end_date?: ApiDateString
}

export interface AlertsParams extends DateRangeFilter {
	/**
	 * Minimum ratio increase required for a period to be considered anomalous.
	 * Valid values: decimal numbers from `0.01` to `1.0` based on the component spec.
	 * Format: ratio number where `0.3` means a 30% increase threshold.
	 */
	threshold: number
}

export interface TopCategoriesParams extends DateRangeFilter {
	/**
	 * Operation types to include when ranking categories.
	 * Valid values: arrays containing `income`, `outcome`, or both.
	 * Format: array of operation type strings.
	 */
	operation_types: OperationType[]
	/**
	 * Maximum number of categories the API should return.
	 * Valid values: positive integers.
	 * Format: whole number.
	 */
	limit: number
}
