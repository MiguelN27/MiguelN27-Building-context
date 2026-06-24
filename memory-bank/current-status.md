# Current Status
## Implemented Features

- A new dashboard that doesn't affect the old one That is used just to test the solve features based on the risky practices done on the repository, these implementations were:
  - No runtime validation on `reponse.json()` from any function returning data from the API
  - Silent fullback for the API base URL on `APP.tsx` because of the empty string after the `??`
  - Unresolved TS because the server do not type-check on `main.tsx` where the type-check (the purpose of typescript) is being omitted.
  - Page do not show the real error thats ocurring because it set to receive nothing on it in all `.catch` handlers like `.catch(() => { setError("")})` where the parenthesis next inside are empty - so always log the caught error with `.console.error(err)`
  - Inconsistent format with the use of semicolon all across files.

## Known Gaps

- The current page only consumes the base metrics endpoint and does not expose the broader backend capabilities already available for summaries, top categories, comparisons, alerts, or B2B/B2C segmentation.
- There are no user-facing filters yet for date range, category, operation type, or business type, so the dashboard is locked to a fixed annual overview.
- The product still runs on seeded mock financial data instead of a real persistence layer or third-party financial integration.
- The webpage has no transaction drill-down or tabular detail view, which limits trust and makes it harder to explain where KPI values come from.
- The current Risky Practices Checkboard is useful for repository training and engineering review, but it is not a strong end-user feature for a production financial dashboard.
- There is no comparison workflow on the page for current period vs previous period, even though the backend already supports it.
- There is no alerting surface in the UI for unusual expense spikes or anomaly detection, even though the backend already supports alerts.
- There is no saved state, bookmarkable filtering, export flow, or sharing/reporting workflow for users who need recurring reviews.
- Error handling is visible, but recovery is still basic: there is no retry control, degraded fallback, or guided troubleshooting for non-technical users.
- The repo does not show authentication, user roles, audit visibility, or privacy controls, which would matter for a real financial product.


## Next priorities

- Add core dashboard filters for date range, business type, category, and operation type so users can answer targeted questions instead of only reading a static yearly snapshot.
- Bring the existing backend analytics into the webpage by adding period comparison cards, top category breakdowns, and alerts for unusual outcomes.
- Replace or demote the engineering-oriented Risky Practices panel in the main experience and use that space for business insights, recommendations, or exceptions that matter to end users.
- Add a drill-down section with transaction-level or grouped-detail data so users can validate KPI movements and investigate the cause of spikes or drops.
- Improve the decision-making flow of the page by supporting B2B vs B2C comparisons and trend views that help frequent users monitor performance changes over time.
- Improve resilience and usability with retry actions, better empty states, and clearer messaging when data is unavailable or filters return no results.
- Plan the transition from mock data to a real data source, because the webpage’s long-term value depends on trusted and current financial information.
- Add export and sharing options such as CSV/PDF summaries or shareable filtered views for occasional users who need to report findings to other stakeholders.