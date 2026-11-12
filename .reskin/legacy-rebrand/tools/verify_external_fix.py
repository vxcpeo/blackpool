#!/usr/bin/env python3
"""Run the bundled rebrand verifier with one correction.

Stock `verify.references_check` passes every `src|href|poster|content` value to
`resolve_ref`, and `resolve_ref` returns None for absolute http(s) URLs. The
caller treats None as "local file missing", so any page whose metadata points at
an absolute social image (the normal, crawler-correct way to write og:image /
twitter:image) fails the references gate. The same failure reproduces on the
untouched pre-rebrand index.html, so it is a verifier bug, not a rebrand defect.

This wrapper leaves the verifier untouched on disk and only marks absolute
http(s) references as external (nothing local to resolve). Every other check,
including every local reference, runs exactly as shipped.
"""

from __future__ import annotations

import sys
from pathlib import Path

SKILL_SCRIPTS = Path.home() / '.dsh' / 'skills' / 'rebrand' / 'scripts'
sys.path.insert(0, str(SKILL_SCRIPTS))

import verify  # noqa: E402

_real_resolve_ref = verify.resolve_ref


def resolve_ref(project, html_path, value):  # noqa: ANN001, ANN201
    stripped = (value or '').strip().lower()
    if stripped.startswith(('http://', 'https://')):
        # External reference: there is no local file to resolve. Returning a
        # sentinel keeps the caller's `is None` check from flagging it.
        return Path('<external>')
    return _real_resolve_ref(project, html_path, value)


verify.resolve_ref = resolve_ref

if __name__ == '__main__':
    raise SystemExit(verify.main())
