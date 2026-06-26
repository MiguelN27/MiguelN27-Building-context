import type { BusinessType, Category, OperationType } from '../src/lib/financial-types'

export interface FacetsResponse {
	/**
	 * Operation types the backend exposes for filtering and aggregating metrics.
	 * Valid values: `income`, `outcome`.
	 * Format: array of operation type strings.
	 */
	operation_types: OperationType[]
	/**
	 * Business lines available in the dataset.
	 * Valid values: `B2B`, `B2C`.
	 * Format: array of business type strings.
	 */
	business_types: BusinessType[]
	/**
	 * Transaction categories present in the available metrics data.
	 * Valid values: `suppliers`, `sales`, `operational`, `administrative`, `others`.
	 * Format: array of category strings.
	 */
	categories: Category[]
	/**
	 * Earliest transaction date available for filtering.
	 * Valid values: any date included in the backend dataset.
	 * Format: `YYYY-MM-DD`.
	 */
	min_date: string
	/**
	 * Latest transaction date available for filtering.
	 * Valid values: any date included in the backend dataset.
	 * Format: `YYYY-MM-DD`.
	 */
	max_date: string
}

export interface AlertEntry {
	/**
	 * Time bucket where the anomaly was detected.
	 * Valid values: period labels returned by the backend for the selected aggregation.
	 * Format: backend-generated period string, typically a month label such as `2024-05`.
	 */
	period: string
	/**
	 * Total outcome amount recorded for the reported period.
	 * Valid values: non-negative decimal numbers.
	 * Format: numeric currency amount.
	 */
	outcome_total: number
	/**
	 * Rolling average outcome calculated from the previous three periods.
	 * Valid values: non-negative decimal numbers.
	 * Format: numeric currency amount.
	 */
	baseline_average: number
	/**
	 * Relative increase of the current outcome versus the rolling baseline.
	 * Valid values: decimal ratios greater than or equal to `0`.
	 * Format: ratio number where `0.3` means a 30% increase.
	 */
	increase_ratio: number
}

export interface AlertsResponse extends Array<AlertEntry> {}

export interface CategoryEntry {
	/**
	 * Category ranked in the top-categories response.
	 * Valid values: `suppliers`, `sales`, `operational`, `administrative`, `others`.
	 * Format: category string.
	 */
	category: Category
	/**
	 * Operation type associated with the ranked category totals.
	 * Valid values: `income`, `outcome`.
	 * Format: operation type string.
	 */
	operation_type: OperationType
	/**
	 * Aggregated monetary total for the category.
	 * Valid values: decimal numbers, usually non-negative.
	 * Format: numeric currency amount.
	 */
	total_amount: number
}

export interface TopCategoriesResponse extends Array<CategoryEntry> {}
