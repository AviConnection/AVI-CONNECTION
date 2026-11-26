"""AVI CONNECTION — local server, profiles, documents and activity analytics."""
import argparse, hashlib, json, re, secrets, sqlite3, uuid, webbrowser, threading, datetime, hmac, os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from http.cookies import SimpleCookie
from pathlib import Path
from urllib.parse import unquote, urlsplit, parse_qs
import avi_documents as documents
ROOT=Path(__file__).resolve().parent; DB=Path(os.environ.get('AVI_DB',str(ROOT/'avi-database'/'avi.sqlite3'))); MAX=4*1024*1024; ADMIN=''
APPS=['avi','pixavi','skavya','fitvi','adevi','worksvi','mixel','shoppi','balu tours','astrovia','avi-apps','avi-pay','avi-nest','avi-dots','avi-go','avi-tracks','avi-colors','avi-styles','avi-design','avi-labs','avi-documentos']
def app_dirs():
    cfg=json.loads((ROOT/'avi-rutas.json').read_text(encoding='utf-8'))
    result={}
    for key,value in cfg.items():
        if key not in APPS or not isinstance(value,str) or not value or '/' in value or '\\' in value or value in ('.','..'): continue
        candidate=ROOT/value
        if not candidate.is_dir():
            candidate=next((p for p in ROOT.iterdir() if p.is_dir() and p.name.casefold()==value.casefold()),candidate)
        if candidate.is_dir() and candidate.resolve().is_relative_to(ROOT):result[key]=candidate.name
    return result
EXAMPLES=[('Lucía Mendoza','lucia.m','Diseño y creatividad'),('Mateo Rojas','mateo.r','Organización de proyectos')]
def conn():
    c=sqlite3.connect(DB,timeout=15,isolation_level=None);c.execute('PRAGMA busy_timeout=15000');c.execute('PRAGMA foreign_keys=ON');return c
def init():
    global ADMIN
    with conn() as c:
        c.executescript((ROOT/'avi-database'/'schema.sql').read_text());c.execute("DELETE FROM page_activity WHERE started_at<datetime('now','-90 days')")
    f=Path(os.environ.get('AVI_ADMIN_KEY_FILE',str(ROOT/'avi-database'/'admin-key.txt')))
    if not f.exists():f.write_text(secrets.token_urlsafe(24))
    ADMIN=f.read_text().strip()
def create_member(c,owner,profile,example=0,uid=None):
    if uid is None:
        uid=str(uuid.uuid4());c.execute('INSERT INTO workspaces(id,token_hash) VALUES (?,?)',(uid,hashlib.sha256(secrets.token_bytes(32)).hexdigest()))
    c.execute('INSERT INTO profile_members(owner_id,member_id,example) VALUES (?,?,?)',(owner,uid,example))
    if profile:c.execute('INSERT INTO avi_state(workspace_id,key,value) VALUES (?,?,?)',(uid,'profile',json.dumps(profile,ensure_ascii=False)))
    return uid
def seed(c,owner):
    create_member(c,owner,{'name':'Lucía','surname':'Mendoza','username':'lucia.m','bio':'Diseño y creatividad'},1,owner)
    b=create_member(c,owner,{'name':'Mateo','surname':'Rojas','username':'mateo.r','bio':'Organización de proyectos'},1)
    for uid,title,app in [(owner,'Tarjetas de presentación','Pixavi'),(b,'Agenda de actividades','Worksvi')]:
        c.execute('INSERT INTO avi_state(workspace_id,key,value) VALUES (?,?,?)',(uid,'favorites',json.dumps([{'id':str(uuid.uuid4()),'app':app,'title':title}],ensure_ascii=False)))
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
    def log_message(self,*args):pass
    def end_headers(self):self.send_header('X-Content-Type-Options','nosniff');self.send_header('Referrer-Policy','same-origin');super().end_headers()
    def reply(self,code,data,cookies=()):
        raw=json.dumps(data,ensure_ascii=False,separators=(',',':')).encode();self.send_response(code);self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(raw)))
        for k,v in cookies:self.send_header('Set-Cookie',f'{k}={v}; Path=/; HttpOnly; SameSite=Strict; Max-Age=31536000')
        self.end_headers();self.wfile.write(raw)
    def cookies(self):
        a=SimpleCookie();a.load(self.headers.get('Cookie',''));return {k:v.value for k,v in a.items()}
    def owner(self,c,create=False):
        tok=self.cookies().get('avi_space','');row=None
        if re.fullmatch(r'[A-Za-z0-9_-]{43}',tok):row=c.execute('SELECT id FROM workspaces WHERE token_hash=?',(hashlib.sha256(tok.encode()).hexdigest(),)).fetchone()
        if row:
            uid=row[0];return uid,[]
        if not create:return None,[]
        tok=secrets.token_urlsafe(32);uid=str(uuid.uuid4());c.execute('BEGIN IMMEDIATE');c.execute('INSERT INTO workspaces(id,token_hash) VALUES (?,?)',(uid,hashlib.sha256(tok.encode()).hexdigest()));seed(c,uid);c.execute('COMMIT');return uid,[('avi_space',tok),('avi_profile',uid)]
    def active(self,c,owner):
        target=self.cookies().get('avi_profile',owner)
        if c.execute('SELECT 1 FROM profile_members WHERE owner_id=? AND member_id=?',(owner,target)).fetchone():return target
        return owner
    def profile_list(self,c,owner):
        rows=c.execute("SELECT m.member_id,m.example,s.value FROM profile_members m LEFT JOIN avi_state s ON s.workspace_id=m.member_id AND s.key='profile' WHERE m.owner_id=? ORDER BY m.example DESC,m.rowid",(owner,)).fetchall();return [{'id':i,'example':bool(e),'name':(' '.join(filter(None,[p.get('name'),p.get('surname')])) or 'Mi perfil'),'username':p.get('username','')} for i,e,v in rows for p in [json.loads(v) if v else {}]]
    def authorized(self):return self.client_address[0] in ('127.0.0.1','::1') and hmac.compare_digest(self.headers.get('Authorization',''), 'Bearer '+ADMIN)
    def do_GET(self):
        path=unquote(urlsplit(self.path).path)
        try:
            if path.startswith('/api/'):
                with conn() as c:
                    if path=='/api/admin':
                        if not self.authorized():return self.reply(401,{'error':'Clave administrativa requerida'})
                        days=parse_qs(urlsplit(self.path).query).get('days',['7'])[0];days=int(days) if days in ['1','7','30','90'] else 7; since=f'-{days} days'
                        where="started_at>=datetime('now',?)";a=c.execute(f'SELECT COUNT(DISTINCT owner_id),COUNT(DISTINCT profile_id),COUNT(*),COALESCE(SUM(clicks),0),COALESCE(SUM(active_seconds),0),COUNT(DISTINCT CASE WHEN updated_at>=datetime(\'now\',\'-60 seconds\') THEN owner_id END) FROM page_activity WHERE {where}',(since,)).fetchone()
                        rows=c.execute(f'SELECT app,COUNT(DISTINCT owner_id),COUNT(*),SUM(clicks),SUM(active_seconds) FROM page_activity WHERE {where} GROUP BY app ORDER BY COUNT(*) DESC',(since,)).fetchall(); daily=c.execute(f'SELECT substr(started_at,1,10),COUNT(DISTINCT owner_id),COUNT(*),SUM(clicks),SUM(active_seconds) FROM page_activity WHERE {where} GROUP BY 1 ORDER BY 1',(since,)).fetchall();pages=c.execute(f'SELECT app,page,COUNT(*),SUM(clicks),SUM(active_seconds) FROM page_activity WHERE {where} GROUP BY app,page ORDER BY COUNT(*) DESC LIMIT 100',(since,)).fetchall()
                        profiles=c.execute("SELECT m.member_id,m.example,s.value, (SELECT count(*) FROM page_activity p WHERE p.profile_id=m.member_id AND p.started_at>=datetime('now',?)),(SELECT COALESCE(sum(clicks),0) FROM page_activity p WHERE p.profile_id=m.member_id AND p.started_at>=datetime('now',?)),(SELECT COALESCE(sum(active_seconds),0) FROM page_activity p WHERE p.profile_id=m.member_id AND p.started_at>=datetime('now',?)) FROM profile_members m LEFT JOIN avi_state s ON s.workspace_id=m.member_id AND s.key='profile' ORDER BY m.example,m.rowid LIMIT 500",(since,since,since)).fetchall()
                        users=[{'id':i[:8],'example':bool(e),'name':(' '.join(filter(None,[p.get('name'),p.get('surname')])) or 'Perfil AVI') if e else 'AVI-'+i[:8].upper(),'views':v,'clicks':k,'seconds':s} for i,e,j,v,k,s in profiles for p in [json.loads(j) if j else {}]]
                        docs=c.execute('SELECT kind,COUNT(*) FROM internal_documents WHERE created_at>=datetime(\'now\',?) GROUP BY kind',(since,)).fetchall(); records=c.execute("SELECT substr(key,5),SUM(json_array_length(value)) FROM avi_state WHERE key LIKE 'app-%' AND json_type(value)='array' GROUP BY 1").fetchall()
                        return self.reply(200,{'totals':a,'apps':rows,'daily':daily,'pages':pages,'profiles':users,'documents':docs,'records':records,'days':days,'examples':[{'name':'Lucía Mendoza','app':'Pixavi','views':8,'clicks':26,'seconds':432},{'name':'Mateo Rojas','app':'Worksvi','views':5,'clicks':17,'seconds':285}]})
                    owner,cookies=self.owner(c,path=='/api/state')
                    if not owner:return self.reply(401,{'error':'Abre AVI CONNECTION primero'})
                    uid=self.active(c,owner)
                    if path=='/api/state':
                        rows=c.execute('SELECT key,value,revision FROM avi_state WHERE workspace_id=?',(uid,)).fetchall();return self.reply(200,{'workspace':uid,'state':{k:{'value':json.loads(v),'revision':r} for k,v,r in rows},'profiles':self.profile_list(c,owner)},cookies)
                    if path=='/api/profiles':return self.reply(200,{'active':uid,'profiles':self.profile_list(c,owner)})
                    if path=='/api/documents':
                        rows=c.execute('SELECT id,data,created_at FROM internal_documents WHERE profile_id=? ORDER BY created_at DESC,id DESC',(uid,)).fetchall();return self.reply(200,{'documents':[dict(id=i,created_at=t,**json.loads(v)) for i,v,t in rows]})
                    if path.startswith('/api/documents/'):
                        did=path.split('/')[-1];r=c.execute('SELECT data,created_at FROM internal_documents WHERE id=? AND profile_id=?',(did,uid)).fetchone()
                        if not r:return self.reply(404,{'error':'Documento no encontrado'})
                        raw=documents.pdf(did,json.loads(r[0]),r[1]);self.send_response(200);self.send_header('Content-Type','application/pdf');self.send_header('Content-Disposition',f'attachment; filename="SKAVYA-{did[:12]}.pdf"');self.send_header('Content-Length',str(len(raw)));self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(raw);return
                return self.reply(404,{'error':'Ruta desconocida'})
        except (sqlite3.Error,ValueError,TypeError):return self.reply(503,{'error':'No se pudo consultar la base de datos'})
        # Original applications are served from their existing folders; only the response gets a bridge.
        if any(x.startswith('.') or x in ('avi-database','database','node_modules','__pycache__') for x in path.split('/') if x):return self.send_error(404)
        parts=path.strip('/').split('/')
        dirs=app_dirs(); canonical=next((k for k,v in dirs.items() if parts[0] in (k,v)),None)
        if canonical:
            from urllib.parse import quote
            actual=dirs[canonical]
            if len(parts)==1:parts.append('index.html')
            if parts[0]!=actual or len(path.strip('/').split('/'))==1:
                self.send_response(302);self.send_header('Location','/'+ '/'.join(quote(x,safe='') for x in [actual,*parts[1:]]));self.end_headers();return
        resolved=Path(self.translate_path(self.path)).resolve()
        if canonical and resolved.is_relative_to(ROOT/dirs[canonical]) and resolved.is_file() and resolved.suffix.lower()=='.html':
            try:
                raw=resolved.read_bytes(); text=raw.decode('utf-8-sig')
            except UnicodeError: return super().do_GET()
            if 'avi-portal-core/bootstrap.js' not in text and 'avi-portal-core/original-bridge.js' not in text:
                tag=f'<script defer src="/avi-portal-core/original-bridge.js" data-avi-app="{canonical}"></script>'
                # Do not edit the original file. Insert before closing head, or append when no head exists.
                if re.search(r'</head\s*>',text,re.I):text=re.sub(r'</head\s*>',lambda m:tag+m.group(0),text,count=1,flags=re.I)
                else:text+=tag
                raw=text.encode('utf-8')
            self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Content-Length',str(len(raw)));self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(raw);return
        if not resolved.is_relative_to(ROOT) or resolved.suffix.lower() not in {'.html','.css','.js','.png','.jpg','.jpeg','.webp','.svg','.ico','.woff','.woff2','.gif','.mp3','.ogg','.wav','.mp4','.webm','.m4a','.otf','.ttf','.avif'}:
            if path=='/':self.path='/index.html'
            else:return self.send_error(404)
        return super().do_GET()
    def do_HEAD(self):
        if any(x.startswith('.') or x in ('avi-database','database','node_modules','__pycache__') for x in unquote(urlsplit(self.path).path).split('/') if x):return self.send_error(404)
        resolved=Path(self.translate_path(self.path)).resolve()
        if not resolved.is_relative_to(ROOT) or resolved.suffix.lower() not in {'.html','.css','.js','.png','.jpg','.jpeg','.webp','.svg','.ico','.woff','.woff2','.gif','.mp3','.ogg','.wav','.mp4','.webm','.m4a','.otf','.ttf','.avif'}:return self.send_error(404)
        return super().do_HEAD()
    def do_POST(self):
        path=urlsplit(self.path).path;origin=self.headers.get('Origin');host=self.headers.get('Host','')
        if origin not in (None,'http://'+host,'https://'+host) or self.headers.get('Sec-Fetch-Site')=='cross-site':return self.reply(403,{'error':'Origen no autorizado'})
        if self.headers.get_content_type()!='application/json':return self.reply(415,{'error':'Formato inválido'})
        try:
            n=int(self.headers.get('Content-Length','0'))
            if not 0<n<=MAX:return self.reply(413,{'error':'Registro demasiado grande'})
            x=json.loads(self.rfile.read(n));assert isinstance(x,dict)
            with conn() as c:
                owner,_=self.owner(c)
                if not owner:return self.reply(401,{'error':'Abre AVI CONNECTION primero'})
                uid=self.active(c,owner)
                if path=='/api/profile':
                    if x.get('action')=='create':
                        name=str(x.get('name','')).strip()[:80];assert name;c.execute('BEGIN IMMEDIATE');target=create_member(c,owner,{'name':name});c.execute('COMMIT')
                    else:
                        target=x.get('id');assert isinstance(target,str)
                        if not c.execute('SELECT 1 FROM profile_members WHERE owner_id=? AND member_id=?',(owner,target)).fetchone():return self.reply(403,{'error':'Perfil no disponible'})
                    return self.reply(200,{'active':target},[('avi_profile',target)])
                if x.get('workspace')!=uid:return self.reply(409,{'error':'El perfil activo cambió. Recarga la página.'})
                if path=='/api/activity':
                    pid=x['id'];app=x['app'];page=str(x['page'])[:90];clicks=x['clicks'];seconds=x['seconds'];assert isinstance(pid,str) and re.fullmatch(r'[a-zA-Z0-9-]{8,80}',pid) and app in APPS and type(clicks)==int and 0<=clicks<=100000 and type(seconds)==int and 0<=seconds<=86400
                    c.execute('INSERT INTO page_activity(id,owner_id,profile_id,app,page,clicks,active_seconds) VALUES (?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET clicks=max(clicks,excluded.clicks),active_seconds=max(active_seconds,excluded.active_seconds),updated_at=CURRENT_TIMESTAMP WHERE owner_id=excluded.owner_id AND profile_id=excluded.profile_id',(pid,owner,uid,app,page,clicks,seconds));return self.reply(200,{'ok':True})
                if path=='/api/documents':
                    d=documents.validate(x);did=str(uuid.uuid4());c.execute('INSERT INTO internal_documents(id,profile_id,kind,data) VALUES (?,?,?,?)',(did,uid,d['kind'],json.dumps(d,ensure_ascii=False)));return self.reply(201,{'id':did})
                if path!='/api/state':return self.reply(404,{'error':'Ruta desconocida'})
                k=x['key'];v=json.dumps(x['value'],ensure_ascii=False,allow_nan=False);expected=x['expected'];assert isinstance(k,str) and re.fullmatch(r'[a-z0-9_-]{1,80}',k) and type(expected)==int and expected>=0
                c.execute('BEGIN IMMEDIATE');row=c.execute('SELECT revision,value FROM avi_state WHERE workspace_id=? AND key=?',(uid,k)).fetchone();r=row[0] if row else 0
                if r!=expected:
                    c.execute('ROLLBACK')
                    if row and json.loads(row[1])==x['value']:return self.reply(200,{'revision':r})
                    return self.reply(409,{'error':'Conflicto de edición','revision':r})
                c.execute('INSERT INTO avi_state(workspace_id,key,value,revision) VALUES (?,?,?,?) ON CONFLICT(workspace_id,key) DO UPDATE SET value=excluded.value,revision=excluded.revision,updated_at=CURRENT_TIMESTAMP',(uid,k,v,r+1));c.execute('COMMIT');return self.reply(200,{'revision':r+1})
        except (ValueError,KeyError,TypeError,AssertionError,ArithmeticError):return self.reply(400,{'error':'Datos inválidos'})
        except sqlite3.Error:return self.reply(503,{'error':'Base de datos ocupada. Reintenta.'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--host',default='127.0.0.1');p.add_argument('--port',type=int,default=8000);p.add_argument('--open',action='store_true');a=p.parse_args();init();s=ThreadingHTTPServer((a.host,a.port),Handler);print(f'AVI CONNECTION: http://{a.host}:{a.port}/index.html\nPanel: http://127.0.0.1:{a.port}/admin/index.html\nClave administrativa: {ADMIN}',flush=True)
    if a.open:threading.Timer(.5,lambda:webbrowser.open(f'http://127.0.0.1:{a.port}/index.html')).start()
    s.serve_forever()
