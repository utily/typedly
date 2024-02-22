# Typely

## Usage / Configuration
The types in this library can accessed in one of the following methods:
* Namespace import:
  ```ts
  // index.ts
  import { typely } from "typely"

  type MyUnion = { a: string, common: boolean } | { b: string, common: boolean }
  export type Usage = typely.DistributiveOmit<MyUnion, "common">
  ```

* Direct import:
  ```ts
  // index.ts
  import { DistributiveOmit } from "typely/dist/typely"

  type MyUnion = { a: string, common: boolean } | { b: string, common: boolean }
  export type Usage = DistributiveOmit<MyUnion, "common">
  ```
* Injecting the types globally using `tsconfig.json`:
  ```json
  // tsconfig.json
  {
  	"types": ["typely/dist/global.d.ts"]
  }
  ```
  ```ts
  // index.ts
  type MyUnion = { a: string, common: boolean } | { b: string, common: boolean }
  export type Usage = DistributiveOmit<MyUnion, "common">
  ```
