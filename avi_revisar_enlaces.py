from avi_server import ROOT,app_dirs
import json
cfg=json.loads((ROOT/'avi-rutas.json').read_text(encoding='utf-8'))
dirs=app_dirs();missing=0
print('AVI CONNECTION - verificacion de aplicaciones\n')
for app,folder in cfg.items():
    actual=dirs.get(app,folder)
    p=ROOT/actual/'index.html'
    if p.is_file():print('[OK]  '+app+' -> '+actual+'/index.html')
    else:print('[FALTA] '+str(p.relative_to(ROOT)));missing+=1
print(f'\n{len(cfg)-missing} de {len(cfg)} entradas encontradas. No se modifico ninguna aplicacion.')
if missing: print('Revisa avi-rutas.json. Conserva los nombres de las claves; cambia solo el nombre de carpeta correspondiente.')
raise SystemExit(bool(missing))
