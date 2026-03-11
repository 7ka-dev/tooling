# Changelog — @7ka/eslint-config

All notable changes to this package will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [semver](https://semver.org/).

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
