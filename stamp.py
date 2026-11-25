"""Give this release its own build id. Run it before each commit:  python stamp.py

It writes the current time (UTC) into the BUILD line of index.html and sw.js.
A new sw.js makes each device download the new version in the background, and the
changed id in index.html lets the page show "What's new" or "App updated" once.
"""
import datetime
import pathlib
import re

HERE = pathlib.Path(__file__).resolve().parent
build = datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%d-%H%M%S')

for name in ('index.html', 'sw.js'):
    path = HERE / name
    text = path.read_bytes().decode('utf-8')          # bytes, so line endings stay as they are
    new, count = re.subn(r"const BUILD='[^']*'", f"const BUILD='{build}'", text)
    if count != 1:
        raise SystemExit(f'{name}: expected 1 BUILD line, found {count}. Nothing written.')
    path.write_bytes(new.encode('utf-8'))

print(f'Build id: {build}')
