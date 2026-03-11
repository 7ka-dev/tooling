# @7ka/tooling

Shared tooling configs for the [7ka collective](https://7ka.dev). Published to npm under the `@7ka` scope.

---

## Packages

### [`@7ka/eslint-config`](./packages/eslint-config)

[![npm version](https://img.shields.io/npm/v/@7ka/eslint-config?style=flat-square&color=c8a84b&labelColor=0d0b08)](https://www.npmjs.com/package/@7ka/eslint-config)
[![npm downloads](https://img.shields.io/npm/dm/@7ka/eslint-config?style=flat-square&color=c8a84b&labelColor=0d0b08)](https://www.npmjs.com/package/@7ka/eslint-config)
[![license](https://img.shields.io/npm/l/@7ka/eslint-config?style=flat-square&color=c8a84b&labelColor=0d0b08)](./LICENSE)

Strict ESLint flat config for TypeScript + React + FSD projects.

```bash
npm install -D @7ka/eslint-config
```

Three variants:
- `@7ka/eslint-config` — base rules, no FSD
- `@7ka/eslint-config/fsd-strict` — full FSD layer enforcement
- `@7ka/eslint-config/fsd-light` — lightweight FSD (no widgets, no entities)

→ [Full documentation](./packages/eslint-config/README.md)

---

### [`@7ka/tsconfig`](./packages/tsconfig)

[![npm version](https://img.shields.io/npm/v/@7ka/tsconfig?style=flat-square&color=c8a84b&labelColor=0d0b08)](https://www.npmjs.com/package/@7ka/tsconfig)
[![npm downloads](https://img.shields.io/npm/dm/@7ka/tsconfig?style=flat-square&color=c8a84b&labelColor=0d0b08)](https://www.npmjs.com/package/@7ka/tsconfig)
[![license](https://img.shields.io/npm/l/@7ka/tsconfig?style=flat-square&color=c8a84b&labelColor=0d0b08)](./LICENSE)

Strict TypeScript configs for Vite, React, and Next.js projects.

```bash
npm install -D @7ka/tsconfig
```

Three variants:
- `@7ka/tsconfig/base.json` — no DOM, for shared logic packages
- `@7ka/tsconfig/react.json` — React + Vite projects
- `@7ka/tsconfig/next.json` — Next.js projects

→ [Full documentation](./packages/tsconfig/README.md)

---

## Repository structure

```
tooling/
├── packages/
│   ├── eslint-config/       # @7ka/eslint-config
│   │   ├── index.js         # base rules
│   │   ├── fsd-strict.js    # strict FSD layer boundaries
│   │   ├── fsd-light.js     # light FSD layer boundaries
│   │   ├── package.json
│   │   ├── CHANGELOG.md
│   │   └── README.md
│   └── tsconfig/            # @7ka/tsconfig
│       ├── base.json
│       ├── react.json
│       ├── next.json
│       ├── package.json
│       ├── CHANGELOG.md
│       └── README.md
├── LICENSE
├── README.md
└── package.json             # npm workspaces root
```

---

## Requirements

- Node.js `>=18`
- npm `>=9`

---

## Branch rules

The `master` branch is protected. All changes must go through a pull request.

- No direct pushes to `master`
- No force pushes
- Linear history required — rebase before merging
- At least 1 approval required before merging
- Stale approvals dismissed when new commits are pushed

### Branch naming

All branches must follow this convention:

| Prefix | When to use |
|---|---|
| `feature/` | New rules, new config variants, new packages |
| `fix/` | Bug fixes, broken rule corrections |
| `chore/` | Dependency updates, repo maintenance |
| `docs/` | README, CHANGELOG updates only |
| `release/` | Version bumps and publish preparation |

Examples: `feature/add-vitest-config`, `fix/fsd-light-pattern`, `docs/tsconfig-readme`

Branches that don't match this pattern are blocked by the `branch-naming` ruleset.

---

## Tags & releases

Published versions are tagged in the format `@scope/package@version`.

```bash
git tag @7ka/eslint-config@0.1.0
git tag @7ka/tsconfig@0.1.0
git push --tags
```

Tags are protected — they cannot be deleted or force-pushed once created. Always tag **after** publishing to npm, not before.

---

## Development

### Setup

```bash
git clone https://github.com/7ka-dev/tooling
cd tooling
npm install
```

### Making changes

1. Edit the relevant package in `packages/`
2. Test locally by linking the package into a project:
   ```bash
   cd packages/eslint-config
   npm link
   # in your project:
   npm link @7ka/eslint-config
   ```
3. Update `CHANGELOG.md` in the package
4. Bump the version in the package's `package.json` following semver
5. Commit, push, tag, publish

### Adding a new package

```bash
mkdir packages/new-package
cd packages/new-package
# create package.json, index.js, README.md, CHANGELOG.md
```

The root `package.json` workspaces field (`"packages/*"`) picks it up automatically.

---

## Publishing

Requires membership in the `@7ka` npm org and 2FA enabled.

```bash
cd packages/<package-name>
npm publish --access public
```

### Versioning

Follow [semver](https://semver.org):

| Change | Version bump | Example |
|---|---|---|
| Bug fix, rule tweak | `patch` | `0.1.0 → 0.1.1` |
| New rule, new config variant | `minor` | `0.1.0 → 0.2.0` |
| Breaking rule change | `major` | `0.1.0 → 1.0.0` |

After bumping the version, tag the release:

```bash
git tag @7ka/eslint-config@0.1.1
git push --tags
```

---

## Contributing

This repo is maintained by the 7ka collective. Changes to shared configs affect all projects — treat them accordingly.

- **Discuss rule changes** before merging. A rule that breaks one project needs a migration path.
- **Document every rule** — if it's not in the README with an example, it doesn't exist.
- **Bump versions deliberately** — patch for fixes, minor for additions, major for anything that requires changes in consuming projects.
- **Update CHANGELOG.md** in the affected package before publishing.

---

## License

[MIT](./LICENSE) © 7ka collective