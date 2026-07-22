# Coding Standards

## General

- Use TypeScript; avoid `any`.
- Prefer explicit types for public APIs and shared structures.
- Keep types close to the feature that owns them.
- Prefer readable code over clever abstractions.
- Keep changes focused — do not refactor unrelated code.
- Avoid new dependencies unless clearly needed.

## Naming

- Components: `PascalCase`
- Functions/variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

Avoid generic names (`utils.ts`, `helpers.ts`, `common.ts`).  
Prefer descriptive names (`formatCurrency.ts`, `productMapper.ts`, `queryKeys.ts`).

## Structure

- One responsibility per file.
- Follow existing patterns before introducing new ones.
- Do not create duplicate solutions or move files unnecessarily.
