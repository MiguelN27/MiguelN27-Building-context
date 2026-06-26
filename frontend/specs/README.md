# Documentation
## 1. Date Range Filter Component
### Endpoints
`GET /api/metrics/facets`
### Typescript Types
- Request types:
	- `DateRangeFilter` from `param-types.ts`
		- `start_date?: ApiDateString`
		- `end_date?: ApiDateString`
- Response types:
	- `FacetsResponse` from `api-types.ts`
		- `operation_types: OperationType[]`
		- `business_types: BusinessType[]`
		- `categories: Category[]`
		- `min_date: string`
		- `max_date: string`

### Valida Values and Constraints
- `start_date`
	- Optional.
	- Format must be `YYYY-MM-DD`.
	- Should not be earlier than `min_date` returned by `GET /api/metrics/facets`.
- `end_date`
	- Optional.
	- Format must be `YYYY-MM-DD`.
	- Should not be later than `max_date` returned by `GET /api/metrics/facets`.
- Range rules
	- Both bounds are inclusive.
	- Empty inputs are valid and mean the dashboard stays unfiltered.
	- If both dates are present, `start_date` must be less than or equal to `end_date`.
	- The UI should use the facets response to show the available minimum and maximum dates near the inputs.

### Edge cases and UI for each case
- Edge case 1: user selects a `start_date` later than `end_date`.
	- UI must show an inline validation message such as `Start date must be before or equal to end date`, mark the inputs as invalid, and prevent refetching until the range is corrected.
- Edge case 2: user clears both inputs.
	- UI must show the full unfiltered dashboard state and keep the available date range visible using `min_date` and `max_date` from the facets response.



## 2. Anomaly alerts table on the home dashboard
### Endpoints
`GET /api/metrics/alerts?threshold=<ratio>`
### Typescript Types
- Request types:
	- `AlertsParams` from `param-types.ts`
		- Inherits `DateRangeFilter`
		- `threshold: number`
- Response types:
	- `AlertsResponse` from `api-types.ts`
	- Each row is an `AlertEntry`
		- `period: string`
		- `outcome_total: number`
		- `baseline_average: number`
		- `increase_ratio: number`

### Valida Values and Constraints
- `threshold`
	- Required in the frontend request type.
	- Component spec constraint: ratio from `0.01` to `1.0`.
	- Backend constraint: accepts numbers greater than or equal to `0`, with default `0.3`.
	- UI should default the input to `0.3` and restrict user input to the component range `0.01` to `1.0`.
- `start_date`
	- Optional.
	- Format must be `YYYY-MM-DD`.
	- Inclusive lower bound.
- `end_date`
	- Optional.
	- Format must be `YYYY-MM-DD`.
	- Inclusive upper bound.
- Response data rules
	- `period` is a backend-generated label, typically monthly such as `2024-05`.
	- `outcome_total` and `baseline_average` should be rendered as currency values.
	- `increase_ratio` should be rendered as a percentage, where `0.3` means `30%`.

### Edge cases and UI for each case
- Edge case 1: the API returns an empty `AlertsResponse` because no anomalies match the selected dates and threshold.
	- UI must replace the table body with the exact message `Not anomalies found for selected period`.
- Edge case 2: user enters a threshold outside the supported UI range, such as `0` or `1.5`.
	- UI must show inline validation, clamp or block submission to stay within `0.01` to `1.0`, and keep the previous valid table data visible until the input is corrected.



## 3. B2B vs B2C comparison view
### Endpoints
- `GET /api/metrics/categories/top?operation_type=income&limit=5`
- `GET /api/metrics/facets`
### Typescript Types
- Request types:
	- `DateRangeFilter` from `param-types.ts` for the shared page-level date filter.
	- The top-categories request also uses backend query parameters that are not fully captured in `param-types.ts` today:
		- `operation_type: OperationType`
		- `limit: number`
		- `business_type: BusinessType`
- Response types:
	- `TopCategoriesResponse` from `api-types.ts`
	- Each item is a `CategoryEntry`
		- `category: Category`
		- `operation_type: OperationType`
		- `total_amount: number`
	- `FacetsResponse` from `api-types.ts` for date boundaries and available business types.
- Derived UI data
	- The percentage shown beside each category is derived in the UI from `total_amount / sum(total_amount for the selected business type)`.
	- The comparison chart can be derived by summing the returned `total_amount` values for the B2B request and the B2C request.

### Valida Values and Constraints
- `operation_type`
	- Must be `income` for this view.
	- The backend accepts `income` or `outcome`, but the component spec requires income-only rankings.
- `limit`
	- Must be `5` for the requested UX.
	- Backend constraint: integer from `1` to `20`.
- `business_type`
	- Must be either `B2B` or `B2C`.
	- The page should call the endpoint once per business line.
- `start_date` and `end_date`
	- Optional.
	- Format must be `YYYY-MM-DD`.
	- When provided, they must respect the same inclusive date range rules as Component 1.
- Response data rules
	- `total_amount` should be rendered as currency.
	- Category percentages should total approximately `100%` per business section, allowing for normal rounding differences.

### Edge cases and UI for each case
- Edge case 1: one business line returns no categories for the selected date range.
	- UI must show an empty state inside that section such as `No income categories found for this period`, while still rendering the other business section if it has data.
- Edge case 2: both B2B and B2C requests return empty arrays for the selected period.
	- UI must show empty states in both sections and render the comparison chart area with a no-data message instead of a misleading zero-height chart.


