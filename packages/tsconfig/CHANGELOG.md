# Changelog — @7ka/tsconfig

All notable changes to this package will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [semver](https://semver.org/).

---

## [0.1.0] — 2026-03-11

### Added

- Base config (`base.json`) — ES2022 target, strict flags, no DOM
- React config (`react.json`) — extends base, adds DOM libs and `react-jsx`
- Next.js config (`next.json`) — extends base, adds DOM libs, `preserve` jsx, incremental builds
- Strict flags: `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`, `noImplicitOverride`, `forceConsistentCasingInFileNames`
- `moduleResolution: bundler` for Vite compatibility
- Full flag documentation with explanations and examples in README