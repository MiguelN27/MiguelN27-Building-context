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
  - No runtime validation on `reponse.json()` from any function returning data from the API
  - Silent fullback for the API base URL on `APP.tsx` because of the empty string after the `??`
- ### DX Risky practices:
  - Unresolved TS because the server do not type-check on `main.tsx` where the type-check (the purpose of typescript) is being omitted.
  - Page do not show the real error thats ocurring because it set to receive nothing on it in all `.catch` handlers like `.catch(() => { setError("")})` where the parenthesis next inside are empty - so always log the caught error with `.console.error(err)`
  - Inconsistent format with the use of semicolon all across files.