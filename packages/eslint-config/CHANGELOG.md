# Changelog — @7ka/eslint-config

All notable changes to this package will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [semver](https://semver.org/).

## [0.1.5] — 2026-03-11

### Fixed

- Allow same-layer imports in all FSD layers
- Add `**/main.tsx` to default ignore list in `fsd-strict` and `fsd-light`

---

## [0.1.4] — 2026-03-11

### Fixed

- Add missing `fsd-strict.d.ts` and `fsd-light.d.ts` sidecar declarations
- Update `exports` field to include `types` condition per entry

---

## [0.1.3] — 2026-03-11

### Fixed

- Add sidecar `.d.ts` declaration files for `index`, `fsd-strict`, and `fsd-light` exports
- Update `exports` field in `package.json` to include `types` per export

---
---

## [0.1.1] — 2026-03-11

### Removed

- `unicorn/prefer-early-return` — rule does not exist in `eslint-plugin-unicorn`, was incorrectly added in 0.1.0

---

## [0.1.0] — 2026-03-11

### Added

- Base ESLint flat config with strict TypeScript rules
- React hooks rules (`rules-of-hooks`, `exhaustive-deps`)
- Import ordering via `eslint-plugin-import`
- Unicorn rules: `prefer-early-return`, `no-array-for-each`, `prefer-query-selector`
- FSD strict variant (`fsd-strict.js`) — full layer boundaries via `eslint-plugin-boundaries`
- FSD light variant (`fsd-light.js`) — simplified layer boundaries without widgets/entities
- Full rule documentation with examples in README
