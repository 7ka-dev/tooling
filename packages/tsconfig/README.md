# @7ka/tsconfig

Shared TypeScript configs for 7ka collective projects.

---

## Install

```bash
npm install -D @7ka/tsconfig
```

---

## Usage

### React (Vite)
```json
// tsconfig.json
{
  "extends": "@7ka/tsconfig/react.json",
  "include": ["src"]
}
```

### Next.js
```json
// tsconfig.json
{
  "extends": "@7ka/tsconfig/next.json",
  "include": ["src", "next.config.ts"]
}
```

### Base (no DOM — shared logic, utilities)
```json
{
  "extends": "@7ka/tsconfig/base.json",
  "include": ["src"]
}
```

---

## What's enforced

### Compiler

| Option | Value | Why |
|---|---|---|
| `target` | `ES2022` | Modern JS, no over-polyfilling |
| `module` | `ESNext` | Native ESM |
| `moduleResolution` | `bundler` | Matches Vite resolution, no `.js` extensions required |
| `jsx` | `react-jsx` (react) / `preserve` (next) | Correct per framework |

### Strict flags

| Flag | Why |
|---|---|
| `strict` | Master switch — enables all core strict checks |
| `noUncheckedIndexedAccess` | Array index access returns `T \| undefined`, not just `T` |
| `noImplicitReturns` | All code paths must explicitly return |
| `noFallthroughCasesInSwitch` | Switch cases must break, return, or throw |
| `exactOptionalPropertyTypes` | Optional `?` means absent — not `undefined` |
| `noPropertyAccessFromIndexSignature` | Dynamic key access must use bracket notation |
| `noImplicitOverride` | Class overrides must be marked with `override` keyword |
| `forceConsistentCasingInFileNames` | Prevents casing bugs between macOS and Linux CI |

---

## Rule Details

### `strict`

This is not a single rule — it's a bundle. Enabling `strict: true` turns on all of the following at once: `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitAny`, `noImplicitThis`, and `alwaysStrict`.

The most important of these is `strictNullChecks` — without it, `null` and `undefined` are silently assignable to every type, which means TypeScript won't tell you when something might not exist. This is the single biggest source of runtime crashes that TypeScript is supposed to prevent. `strict` mode closes that gap.

---

### `noUncheckedIndexedAccess`

By default TypeScript assumes that if you access an array by index, you get a value of the array's element type. It does not account for the possibility that the array is empty or the index is out of bounds. This flag adds `| undefined` to every index access, forcing you to handle the case where nothing is there.

This matters most in React when mapping over API responses — you can't always guarantee the array has content.

```ts
const users: User[] = getUsers()

// without flag — TypeScript trusts you, runtime crash if empty
const first = users[0]
console.warn(first.name) // TypeError if array is empty

// with flag — TypeScript is honest
const first = users[0] // typed as User | undefined
if (!first) return
console.warn(first.name) // safe
```

---

### `noImplicitReturns`

When a function is supposed to return a value, TypeScript will error if any code path exits without an explicit return statement. Without this flag, a missing return silently produces `undefined` — which then propagates through your app as a hard-to-trace bug.

```ts
// bad — second path returns undefined implicitly, TypeScript silent
function getLabel(status: string): string {
  if (status === 'active') return 'Active'
  // forgot this path — returns undefined at runtime
}

// good — all paths accounted for
function getLabel(status: string): string {
  if (status === 'active') return 'Active'
  return 'Unknown'
}
```

---

### `noFallthroughCasesInSwitch`

In a `switch` statement, if a `case` block doesn't end with `break`, `return`, or `throw`, execution falls through to the next case. This is almost never intentional and causes logic bugs that are difficult to spot during review.

```ts
// bad — 'admin' falls through to 'user', both branches execute
switch (role) {
  case 'admin':
    grantAdminAccess()
  case 'user':
    showDashboard()
    break
}

// good — each case is isolated
switch (role) {
  case 'admin':
    grantAdminAccess()
    break
  case 'user':
    showDashboard()
    break
}
```

---

### `exactOptionalPropertyTypes`

When you mark an interface property as optional with `?`, TypeScript normally treats it as "this property may be absent or explicitly set to `undefined`." This flag tightens that — optional means the property is simply absent. Setting it to `undefined` explicitly becomes a type error.

This distinction matters when working with APIs or databases that treat a missing key differently from a key with a `null`/`undefined` value — which is common in REST and GraphQL responses.

```ts
interface Config {
  timeout?: number
}

// bad — property present but undefined, may behave differently at runtime
const config: Config = { timeout: undefined }

// good — property is simply not there
const config: Config = {}
```

---

### `noPropertyAccessFromIndexSignature`

When an interface has an index signature (a dynamic `[key: string]` definition), TypeScript normally lets you access those dynamic keys with dot notation — the same as known, static properties. This flag forces bracket notation for dynamic keys, making it visually obvious at the call site that you're doing a dynamic lookup that may or may not exist.

```ts
interface Env {
  [key: string]: string
  NODE_ENV: string   // known, static property
}

// bad — dot notation hides the fact this is a dynamic lookup
const val = env.SOME_KEY

// good — bracket notation signals "this might not be here"
const val = env['SOME_KEY']

// still fine — known property keeps dot notation
const mode = env.NODE_ENV
```

---

### `noImplicitOverride`

When a child class defines a method with the same name as a method in its parent class, it silently overrides it. This is fine when intentional but dangerous when it happens by accident — or when the parent method is later renamed or removed, leaving the child with an orphaned method that nobody notices.

This flag requires you to explicitly mark overriding methods with the `override` keyword. If the parent method is renamed or removed, TypeScript will error on the `override` annotation immediately.

```ts
class Base {
  render(): string {
    return 'base'
  }
}

// bad — silent override, nothing catches it if Base.render is renamed
class Child extends Base {
  render(): string {
    return 'child'
  }
}

// good — explicit intent, TypeScript errors if parent method disappears
class Child extends Base {
  override render(): string {
    return 'child'
  }
}
```

---

### `forceConsistentCasingInFileNames`

macOS and Windows file systems are case-insensitive — `UserCard.tsx` and `usercard.tsx` resolve to the same file. Linux (where CI runs) is case-sensitive — they are different files. This means code that works locally on a Mac can silently fail in CI or production.

This flag makes TypeScript error when an import's casing doesn't match the actual filename on disk, catching the mismatch before it reaches CI.

```ts
// file on disk: UserCard.tsx

// bad — works on Mac, breaks on Linux CI
import { UserCard } from './usercard'

// good
import { UserCard } from './UserCard'
```