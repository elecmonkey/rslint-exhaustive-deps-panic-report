# rslint exhaustive-deps panic report

Minimal stable reproduction for a rslint `react-hooks/exhaustive-deps` panic.

The important conditions are:

- `react-hooks/exhaustive-deps` is enabled.
- Type checking is enabled with `parserOptions.project`.
- `tsconfig.json` includes `types: ["node"]`, so global `setTimeout` resolves through Node ambient types.
- `src/components/RoutePrefetcher.tsx` adds global `setTimeout` to hook dependency arrays.

## Install

```bash
pnpm install
```

## Reproduce

```bash
pnpm run lint:rslint
```

Expected buggy behavior: rslint panics with:

```text
panic: runtime error: slice bounds out of range [:2286303] with length 1407
```

For comparison, ESLint reports ordinary `setTimeout` dependency warnings instead
of crashing:

```bash
pnpm run lint:eslint
```
