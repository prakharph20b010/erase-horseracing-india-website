import sys
from pathlib import Path

def fix_file(path: Path) -> bool:
    b = path.read_bytes()
    try:
        text = b.decode('utf-8')
    except Exception:
        # if file isn't valid utf-8, fall back to latin1 re-encode
        text = None

    changed = False
    if text is None or 'Ã' in text or 'Â' in text:
        # attempt to fix double-encoded utf-8 saved as latin1
        try:
            fixed = b.decode('latin-1').encode('utf-8').decode('utf-8')
        except Exception:
            return False
        if fixed != (text or ''):
            # backup
            bak = path.with_suffix(path.suffix + '.bak')
            if not bak.exists():
                path.rename(bak)
                bak.write_bytes(b)
            else:
                # overwrite backup only if same original
                pass
            path.write_text(fixed, encoding='utf-8')
            changed = True
    return changed

def main(paths):
    changed_files = []
    for p in paths:
        path = Path(p)
        if not path.exists():
            print(f"Missing: {p}")
            continue
        ok = fix_file(path)
        if ok:
            changed_files.append(p)
            print(f"Fixed: {p}")
        else:
            print(f"No change: {p}")
    if changed_files:
        print('\nFiles changed:')
        for f in changed_files:
            print(' -', f)
    else:
        print('No files modified')

if __name__ == '__main__':
    if len(sys.argv) > 1:
        main(sys.argv[1:])
    else:
        print('Usage: fix_mojibake.py <file1> [file2 ...]')