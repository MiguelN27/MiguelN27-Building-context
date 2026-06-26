# COMPONENTS
## 1. Date Range Filter Component
### What is it about?
A filter to focus on specific periods selected by the user on a start/end date inputs to see the data from the selected period without seeing all historical data at once
### Features
- Two inputs at the top of the home dashboard page: Start date and End date
- Dates will be sent to API in format `YYYY-MM-DD`
- Inputs will be optional, when inputs no filled with data, the dashboard shows all available data since newest to oldest
- Data must be shown near input for reference
### Endpoint
`GET/api/metrics/facets` (to retrieve the available date range) and the filters extension on the existing metrics endpoint.

## 2. Anomaly alerts table on the home dashboard
### What is it about?
A table that highlights periods where spending spiked unexpectedly to watch in a clear, organize and concise way anomalies on the spendings.
### Features
- Below existing charts create a table highlighting periods where spending spiked unexpectedly.
- The table must respect Component Number 1 `Date Range Filter` if active
- Table will consist of 4 columns ordered from left to right as:
    1. Period
    2. Recorded Outcome
    3. Rolling average of the previous 3 periods
    4. Percenteage increase
- Spike threshold configurable via a numeric input selected by user (ratio between 0.01 and 1.0, by default set to 0.3)
- If not anomalies found the table must shown a message to the user saying: "Not anomalies found for selected period"
### Endpoint
`GET /api/metrics/alerts?threshold=<ratio>`

## 3. B2B vs B2C comparison view
### What is it about?
A new page for comparing revenue performance between the two business lines: B2B AND B2C
### Features
- The page will have two sections side by side B2B on the left and B2C on the right
- Each side will show the top 5 income categories for each of the lines
- These categories will display to the user:
    1. Category Name
    2. Total Income
    3. Percentage of the group total
- Below ections a single chart comparing total income of B2B against B2C
- User can filter the date range for the comparison on the new page using the component inputs as the one on component number 1 `Date Range Filter` in the new page
### Endpoints
- `GET /api/metrics/categories/top?operation_type=income&limit=5`
- `GET /api/metrics/facets`
