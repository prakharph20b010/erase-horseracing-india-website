import json
from pathlib import Path

p = Path('d:/Cystar Lab/Horse/data/posts.json')
try:
    data = json.loads(p.read_text(encoding='utf-8'))
    print('OK: parsed', type(data).__name__, 'with', len(data) if hasattr(data,'__len__') else 'N/A', 'items')
except Exception as e:
    print('ERROR', e)
    raise