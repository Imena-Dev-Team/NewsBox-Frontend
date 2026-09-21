# Security Policy

## Reporting a vulnerability

**Please do not open a public issue for security problems.**

Report privately, whichever you prefer:

- **GitHub:** Security tab → *Report a vulnerability* (private advisory), or
- **Email:** contact an organization owner directly.

We aim to acknowledge reports within **3 business days**.

Please include: what you found, where, how to reproduce it, and the potential impact.
Do not include real credentials or personal data in the report.

## Supported versions

Only the `main` branch is supported and receives security fixes.

## Security practices for contributors

- **Never commit secrets.** Use a local `.env` file; it is git-ignored. Production values
  live only in the hosting platform (Render / Vercel) or a secret manager.
- **Never push directly to `main`.** Open a pull request.
- **Treat `.vscode/` changes as security-sensitive.** Workspace tasks and settings can run
  code automatically when a folder is opened. Do not enable `task.allowAutomaticTasks`.
- **Be careful with untrusted branches and forks.** Do not open a folder in an editor that
  auto-runs workspace tasks.
- **Never commit obfuscated code** (for example `_0x....` style payloads) or files that
  pretend to be another type (for example, a "font" that is actually a script).
- Keep dependencies patched; triage Dependabot alerts promptly.

## Automated scanning

A `Malware Guard` workflow (`.github/workflows/malware-guard.yml`) runs on every push and
pull request to `main`. It fails if it detects any of the indicators from the 2026-09
incident:

- `.vscode/tasks.json`, `config.bat`, and similar persistence scripts
- VS Code auto-run indicators (`runOn`, `folderOpen`, `allowAutomaticTasks`)
- Obfuscated `_0x....` JavaScript markers
- Files masquerading as fonts that are actually text/script

## Incident history

- **2026-09:** an obfuscated JavaScript loader was discovered in build and route files and
  in VS Code workspace tasks in both organization repositories. The malicious files were
  removed via pull requests, secret rotation is in progress, workspace tasks are disabled,
  and the Malware Guard workflow now scans every push. Repository history cleanup is tracked
  separately.
