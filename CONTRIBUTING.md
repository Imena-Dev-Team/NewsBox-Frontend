# Contributing

Thanks for helping improve this project. Please read this before opening a pull request.

## Getting started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Create a local `.env` from the values described in the README. **Never commit it.**
3. Do not run build/dev commands from a checkout you do not trust until the Malware Guard
   check has passed on it.

## Workflow

- **Never push directly to `main`.** All changes go through a pull request.
- Create a branch with a descriptive name:
  ```bash
  git switch -c fix/profile-photo-upload
  ```
- Make **one focused change per pull request**. Small diffs are reviewed faster.
- Keep `main` green: run the checks below before pushing.

## Before you push

```bash
npm run lint     # where available
npm run build    # frontend, where available
```

- Do **not** commit generated output (`dist/`, `build/`), `node_modules/`, local `.env`
  files, editor state, or compressed archives.
- Do **not** add `.vscode/tasks.json` or enable automatic tasks.

## Pull requests

- Explain **what** changed and **why**.
- Reference any related issue.
- Keep the change scoped to its title.
- A maintainer will review and merge. Expect questions; that is normal.

## Commit messages

Use a short, imperative subject line, optionally with a type prefix:

```
feat: add birthday filter to member list
fix: correct profile photo upload path
docs: clarify environment setup
security: remove unused dependency
```

## Reporting bugs and security issues

- **Bugs:** open an issue with clear steps to reproduce.
- **Security:** follow [`SECURITY.md`](./SECURITY.md). Do **not** open a public issue.

## Code of conduct

Participation is governed by [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).
