# Typedly

## Usage

Use namespace imports from the package root:

```ts
import { typedly } from "typedly"

type MyUnion = { a: string; common: boolean } | { b: string; common: boolean }
export type Usage = typedly.Object.DistributiveOmit<MyUnion, "common">
```

## Overview

Typedly is split into focused namespaces:

- `typedly.Object`, `typedly.Array`, `typedly.Function`: object, tuple/union, and function utility types.
- `typedly.Guard` (via `typedly.Type`): composable runtime type guards.
- `typedly.Promise`: async utility types and helpers (`create`, `lazy`, `awaitLatest`, `promisify`).
- `typedly.Json`: typed and untyped JSON parse/stringify helpers.
- `typedly.Collection`, `typedly.Stack`, `typedly.Vector`: collection interfaces and base abstractions.
- `typedly.IterableWeakMap`, `typedly.IterableWeakSet`: iterable weak-reference collections.
- `typedly.String`, `typedly.Undefined`, `typedly.Inverse`: small focused helper namespaces.
