# Rules for coding
## Good practices to preserve on the code:
- ### Architecture practices:
  - Good and clear file organization feature-based files
  - Small focused components and data logic on `/lib`
- ### DX practices:
  - Proper async handling and explicit UI states
- ### Accesibility practices:
  - Semantic use of sectiions
  - Aria-label for the sections
- ### Naming practices:
  - Descriptive comopnent names

## Risky/bad practices to solve/fix on the code:
- ### Architecture Risky practices:
  - No runtime validation of shape on reponse.json
  - Silent fullback for the API base URL
- ### DX Risky practices:
  - Unresolved TS because the server do not type-check
  - Page do not show the real error thats ocurring because it set to receive nothing on it (empty parenthesis)
  - Inconsistent format witht he use of semicolon all across files