# Typedly

## Usage / Configuration
The types in this library can accessed in one of the following methods:
* ### Namespace import:
  ```ts
  // index.ts
  import { typedly } from "typedly"

  type MyUnion = { a: string, common: boolean } | { b: string, common: boolean }
  export type Usage = typedly.DistributiveOmit<MyUnion, "common">
  ```

* ### Direct import:
  ```ts
  // index.ts
  import { DistributiveOmit } from "typedly/dist/typedly"

  type MyUnion = { a: string, common: boolean } | { b: string, common: boolean }
  export type Usage = DistributiveOmit<MyUnion, "common">
  ```
* ### Injecting the types globally using `tsconfig.json`:
  * Injecting the types globally using `tsconfig.json`:
  ```json
  // tsconfig.json
  {
  	"types": ["typedly/dist/types/global.d.ts"]
  }
  ```
  ```ts
  // index.ts
  type MyUnion = { a: string, common: boolean } | { b: string, common: boolean }
  export type Usage = DistributiveOmit<MyUnion, "common">
  ```
