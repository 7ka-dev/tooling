# @7ka/eslint-config

Shared ESLint flat config for 7ka collective projects. Built for strict TypeScript + React + FSD codebases.

---

## Install

```bash
npm install -D @7ka/eslint-config \
  eslint \
  typescript-eslint \
  eslint-plugin-react-hooks \
  eslint-plugin-react-refresh \
  eslint-plugin-import \
  eslint-plugin-unicorn \
  @feature-sliced/eslint-config
```

---

## Usage

### Base (no FSD)
```ts
// eslint.config.ts
import config from '@7ka/eslint-config'
export default config
```

### Strict FSD
```ts
import config from '@7ka/eslint-config/fsd-strict'
export default config
```

### Light FSD
```ts
import config from '@7ka/eslint-config/fsd-light'
export default config
```

---

## Rules

### TypeScript

---

#### `consistent-type-imports`
Forces `import type` when importing only a type. Type-only imports are stripped at compile time — faster builds, cleaner output, signals to readers that the import disappears at runtime.

```ts
// bad
import { User } from './types'

// good
import type { User } from './types'
```

---

#### `no-explicit-any`
Bans `any` as a type. Forces you to properly type values or use `unknown` when the shape is genuinely unknown.

```ts
// bad
function parse(data: any): any {
  return data.value
}

// good
function parse(data: unknown): string {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return String(data.value)
  }
  throw new Error('Invalid data shape')
}
```

---

#### `no-unused-vars`
Errors on variables, imports, or arguments that are declared but never used. Prefix with `_` to explicitly mark something as intentionally unused.

```ts
// bad
import { useEffect, useState } from 'react'
// useState imported but never used

// good — remove unused import
import { useEffect } from 'react'

// good — underscore prefix for intentionally unused args
const handler = (_event: MouseEvent, value: string): void => {
  console.warn(value)
}
```

---

#### `no-floating-promises`
Errors when a Promise is not awaited or handled with `.catch()`. Unhandled promises fail silently.

```ts
// bad
function loadData(): void {
  fetchUser() // promise result ignored, errors swallowed
}

// good
async function loadData(): Promise<void> {
  await fetchUser()
}

// also good
void fetchUser().catch(console.error)
```

---

#### `no-unsafe-assignment`
Errors when a value typed as `any` is assigned to a variable. Prevents `any` from spreading through the codebase from third-party boundaries.

```ts
// bad
const data = JSON.parse(response) // JSON.parse returns any
const name = data.name            // name is now silently any

// good
const raw: unknown = JSON.parse(response)
// TypeScript now forces you to validate before using
```

---

#### `no-misused-promises`
Errors when a Promise is used where a non-Promise is expected — most commonly async callbacks passed to event handlers that don't await them.

```ts
// bad
<button onClick={async () => {
  await saveData() // onClick doesn't await — errors are swallowed
}} />

// good
const handleClick = (): void => {
  void saveData().catch(console.error)
}
<button onClick={handleClick} />
```

---

#### `explicit-function-return-type`
Forces explicit return type annotations on all functions. No accidental `any` returns, and readers know immediately what a function produces.

```ts
// bad
function getUser(id: string) {
  return users.find(u => u.id === id)
}

// good
function getUser(id: string): User | undefined {
  return users.find(u => u.id === id)
}
```

---

#### `naming-convention`
Enforces consistent naming patterns across the codebase.

| Selector | Format | Example |
|---|---|---|
| Types / Interfaces | `PascalCase` | `UserProfile`, `ApiResponse` |
| Variables | `camelCase` or `UPPER_CASE` | `userName`, `MAX_RETRIES` |
| Functions | `camelCase` or `PascalCase` | `getUser`, `UserCard` |
| React components | `PascalCase` | `ProfilePage`, `AuthButton` |

```ts
// bad
interface user_profile { name: string }
const Max_Retries = 3
function get_user(): User { ... }

// good
interface UserProfile { name: string }
const MAX_RETRIES = 3
function getUser(): User { ... }
```

---

### General JavaScript

---

#### `no-console`
Warns on `console.log`. Allows `console.warn` and `console.error` since those are intentional. Prevents debug leftovers reaching production.

```ts
// warned
console.log('user loaded', user)

// allowed
console.warn('Deprecated method called')
console.error('Failed to fetch user', error)
```

---

#### `no-magic-numbers`
Bans raw numbers in logic. Forces named constants so intent is clear. `0`, `1`, and `-1` are allowed as common neutral values.

```ts
// bad
if (response.status === 403) { ... }
setTimeout(sync, 86400000)

// good
const FORBIDDEN = 403
const ONE_DAY_MS = 86_400_000

if (response.status === FORBIDDEN) { ... }
setTimeout(sync, ONE_DAY_MS)
```

---

#### `eqeqeq`
Forces `===` instead of `==`. Prevents silent type coercion bugs.

```ts
// bad — all of these are true with ==
0 == false
'' == false
null == undefined
'1' == 1

// good
value === null
count === 0
```

---

#### `prefer-const`
Forces `const` when a variable is never reassigned. Signals intent — `let` implies mutation is coming.

```ts
// bad
let userId = getUserId() // never reassigned below

// good
const userId = getUserId()
```

---

#### `no-var`
Bans `var` entirely. `var` is function-scoped and hoisted — a source of subtle bugs. `let` and `const` are block-scoped and predictable.

```ts
// bad
var count = 0

// good
let count = 0
const MAX = 10
```

---

### React Hooks

---

#### `react-hooks/rules-of-hooks`
Enforces the Rules of Hooks. Hooks must be called at the top level — never inside conditions, loops, or nested functions. React relies on hook call order being stable between renders.

```tsx
// bad
function Component({ isAdmin }: Props): JSX.Element {
  if (isAdmin) {
    const [data, setData] = useState(null) // conditional hook
  }
}

// good
function Component({ isAdmin }: Props): JSX.Element {
  const [data, setData] = useState(null)
  if (!isAdmin) return <AccessDenied />
  ...
}
```

---

#### `react-hooks/exhaustive-deps`
Warns when `useEffect`, `useCallback`, or `useMemo` has missing dependencies. Missing deps cause stale closures — the effect runs but sees old values.

```tsx
// bad — userId missing from deps, effect uses stale value
useEffect(() => {
  fetchUser(userId)
}, [])

// good
useEffect(() => {
  void fetchUser(userId)
}, [userId])
```

---

### Imports

---

#### `import/order`
Enforces consistent import ordering. Groups are separated by a blank line.

Order:
1. Node built-ins (`path`, `fs`)
2. External packages (`react`, `effector`)
3. Internal / FSD layers (`@/shared`, `@/entities`)
4. Parent imports (`../foo`)
5. Sibling imports (`./bar`)
6. Index imports (`./`)

```ts
// bad
import { useState } from 'react'
import path from 'path'
import { UserCard } from './UserCard'
import type { User } from '@/entities/user'

// good
import path from 'path'
import { useState } from 'react'
import type { User } from '@/entities/user'
import { UserCard } from './UserCard'
```

---

### Unicorn

---

#### `unicorn/prefer-early-return`
Forces early returns instead of deeply nested `if` blocks. Flatter code is easier to read and reason about.

```ts
// bad
function processUser(user: User | undefined): string {
  if (user) {
    if (user.isActive) {
      return user.name
    }
  }
  return 'unknown'
}

// good
function processUser(user: User | undefined): string {
  if (!user) return 'unknown'
  if (!user.isActive) return 'unknown'
  return user.name
}
```

---

#### `unicorn/no-array-for-each`
Forces `for...of` instead of `.forEach()`. `for...of` supports `break`, `continue`, and `await` — `.forEach` does not.

```ts
// bad
users.forEach(user => {
  processUser(user)
})

// good
for (const user of users) {
  processUser(user)
}
```

---

#### `unicorn/prefer-query-selector`
Forces `querySelector` / `querySelectorAll` over older DOM methods. Consistent, composable, works with any CSS selector.

```ts
// bad
document.getElementById('app')
document.getElementsByClassName('card')

// good
document.querySelector('#app')
document.querySelectorAll('.card')
```

---

### FSD Layer Boundaries

Enforced in `fsd-strict` and `fsd-light` variants only.

Layers can only import from layers **below** them. Cross-layer upward imports are banned.

```
app → pages → widgets → features → entities → shared
```

```ts
// bad — features importing from pages (upward)
// src/features/auth/model.ts
import { HomePage } from '@/pages/home'

// bad — entities importing from features (upward)
// src/entities/user/model.ts
import { loginFeature } from '@/features/auth'

// good — features importing from entities (downward)
// src/features/auth/model.ts
import type { User } from '@/entities/user'
```

**Light FSD** omits `widgets` and `entities` — suitable for smaller projects:
```
app → pages → features → shared
```