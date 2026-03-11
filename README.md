# @7ka/tooling

Shared tooling configs for the 7ka collective. Published to npm under the `@7ka` scope.

---

## Packages

| Package | Version | Description |
|---|---|---|
| [`@7ka/eslint-config`](./packages/eslint-config) | 0.1.0 | Strict ESLint flat config for TypeScript + React + FSD projects |
| [`@7ka/tsconfig`](./packages/tsconfig) | 0.1.0 | Strict TypeScript configs for Vite, React, and Next.js projects |

---

## Usage

See each package's README for installation and configuration instructions.

---

## Publishing

Packages are published manually to npm. From the package directory:
```bash
npm publish --access public
```

Requires membership in the `@7ka` npm org and 2FA enabled on your account.

### Versioning

Follow semver:
- `patch` — bug fixes, rule tweaks
- `minor` — new rules, new config variants
- `major` — breaking changes to existing rules

Update the version in `package.json` before publishing, then commit and tag:
```bash
git tag @7ka/eslint-config@0.1.1
git push --tags
```

---

## Development
```bash
# install all workspaces
npm install

# add a new package
mkdir packages/new-package
# add package.json, index.js, README.md
```