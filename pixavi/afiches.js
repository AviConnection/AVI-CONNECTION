/* =====================================================================
   AFICHES PUBLICITARIOS · afiches.js
   ===================================================================== */
(()=>{
'use strict';

/* ---------------------------------------------------------------------
   1. DATOS DEL PRODUCTO (tomados de pixavi-impresos.html)
   --------------------------------------------------------------------- */
const PRODUCT={
 slug:'afiche',
 name:"Afiches publicitarios",
 c1:'#fc5797',c2:'#8b5ffa',
 iconInner:"<rect x=\"5\" y=\"2.5\" width=\"14\" height=\"19\" rx=\"1.5\"/><path d=\"M8.5 7h7M8.5 11h7M8.5 15h4\"/>"
};

/* Número de WhatsApp para recibir cotizaciones, con código de país y sin «+».
   Ejemplo Perú: '51999999999'. Si lo dejas vacío, WhatsApp te deja elegir el contacto. */
const WHATSAPP_NUMBER='';

/* ---------------------------------------------------------------------
   2. 📷 TUS IMÁGENES
   Copia tus fotos a la carpeta  afiches-publicitarios/img/  con estos nombres
   (o cambia los nombres de abajo). Si un archivo no existe, se muestra
   una imagen de ejemplo con degradado y no se rompe la página.
   --------------------------------------------------------------------- */
const MAIN_IMAGE={src:'img/afiche-principal.jpg',alt:"Afiches publicitarios — imagen principal"}; /* imagen grande de la portada */
const DEFAULT_IMAGES=[ /* imágenes de la galería */
 {src:'img/afiche-1.jpg',alt:"Afiche publicitario de ejemplo 1"},
 {src:'img/afiche-2.jpg',alt:"Afiche publicitario de ejemplo 2"},
 {src:'img/afiche-3.jpg',alt:"Afiche publicitario de ejemplo 3"},
 {src:'img/afiche-4.jpg',alt:"Afiche publicitario de ejemplo 4"},
 {src:'img/afiche-5.jpg',alt:"Afiche publicitario de ejemplo 5"},
 {src:'img/afiche-6.jpg',alt:"Afiche publicitario de ejemplo 6"}
];

/* ---------------------------------------------------------------------
   3. CAMPOS DE PERSONALIZACIÓN (idénticos a pixavi-impresos.html)
   t: text | num | chips | qty | area
   --------------------------------------------------------------------- */
const FIELDS=[
 {k:'title',t:'text',l:'Título del afiche',d:'GRAN APERTURA',max:34},
 {k:'sub',t:'text',l:'Texto secundario',d:'Sábado 14 · 7:00 pm · Entrada libre',max:60},
 {k:'size',t:'chips',l:'Tamaño',o:['A4 (21×30 cm)','A3 (30×42 cm)','A2 (42×60 cm)','A1 (60×84 cm)','50×70 cm'],d:'A3 (30×42 cm)'},
 {k:'paper',t:'chips',l:'Papel',o:['Bond 90 g','Couché 150 g','Couché 250 g','Adhesivo'],d:'Couché 150 g'},
 {k:'finish',t:'chips',l:'Acabado',o:['Mate','Brillante','Laminado'],d:'Mate'},
 {k:'design',t:'chips',l:'Diseño',o:['Ya tengo mi arte','Necesito que lo diseñen'],d:'Necesito que lo diseñen'},
 {k:'qty',t:'qty',l:'Cantidad',d:10,min:1},
 {k:'notes',t:'area',l:'Notas adicionales',d:'',ph:'Colores de marca, referencias, fecha de entrega…'}
];

/* ---------------------------------------------------------------------
   4. VISTA PREVIA EN VIVO Y RESUMEN (propios de este producto)
   --------------------------------------------------------------------- */
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SIZES={'A4 (21×30 cm)':[21,29.7],'A3 (30×42 cm)':[29.7,42],'A2 (42×60 cm)':[42,59.4],'A1 (60×84 cm)':[59.4,84.1],'50×70 cm':[50,70]};
function fit(w,h,maxW,maxH){const r=Math.min(maxW/w,maxH/h);return[w*r,h*r]}
function previewHTML(st){
 const [sw,sh]=SIZES[st.size]||[30,42];const [w,h]=fit(sw,sh,230,310);
 const cls=st.finish==='Brillante'||st.finish==='Laminado'?'glossy':st.finish==='Mate'?'matte':'';
 const fs=Math.max(16,Math.min(44,w/(Math.max(6,(st.title||'').length)/2.2)));
 return `<div class="pv pv-poster ${cls}" style="width:${w}px;height:${h}px;color:#fff"><i class="ring" style="width:${w*.9}px;height:${w*.9}px;right:-${w*.4}px;top:-${w*.25}px"></i><i class="ring" style="width:${w*.55}px;height:${w*.55}px;left:-${w*.2}px;bottom:${h*.12}px"></i><div class="kick">PIXAVI · ${esc(st.paper)}</div><div class="ttl" style="font-size:${fs}px">${esc(st.title||'TÍTULO')}</div><div class="sub">${esc(st.sub||'')}</div></div>`;
}
function summaryLines(st){
 const L=[['Título',st.title],['Texto',st.sub],['Tamaño',st.size],['Papel',st.paper],['Acabado',st.finish],['Diseño',st.design]];
 if(st.notes&&st.notes.trim())L.push(['Notas',st.notes.trim()]);
 return L.filter(l=>l[1]!==''&&l[1]!=null);
}

/* =====================================================================
   COMÚN A LAS 4 SUBPÁGINAS: galería, imágenes propias, visor,
   configurador, resumen y envío de cotización.
   ===================================================================== */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
document.documentElement.classList.add('js');

/* ---------- aviso flotante ---------- */
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2600)}

/* ---------- aparición suave al hacer scroll ---------- */
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1}):null;
function observe(el){io?io.observe(el):el.classList.add('in')}

/* ---------- imagen de respaldo (se usa si no existe la foto real) ---------- */
function art(i){
 const a=[135,200,60,160,100,20][i%6];
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><linearGradient id="g" gradientTransform="rotate(${a} .5 .5)"><stop offset="0" stop-color="${PRODUCT.c1}"/><stop offset="1" stop-color="${PRODUCT.c2}"/></linearGradient><radialGradient id="r" cx=".3" cy=".25" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></radialGradient></defs><rect width="1000" height="1000" fill="url(#g)"/><rect width="1000" height="1000" fill="url(#r)"/><circle cx="${780-(i%3)*190}" cy="${220+(i%2)*430}" r="${230+(i%4)*40}" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="3"/><circle cx="${190+(i%3)*150}" cy="${820-(i%2)*300}" r="${130+(i%3)*30}" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="3"/><g transform="translate(380 300) scale(10)" fill="none" stroke="#fff" stroke-width=".9" stroke-linecap="round" stroke-linejoin="round">${PRODUCT.iconInner}</g><text x="500" y="740" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="30" letter-spacing="10" fill="#fff" fill-opacity=".92">EJEMPLO ${String(i+1).padStart(2,'0')}</text><text x="500" y="795" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="24" fill="#fff" fill-opacity=".65">Reemplaza esta imagen por tu foto</text></svg>`;
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}

/* =====================================================================
   IMÁGENES: estado + almacenamiento local (localStorage)
   items: {k:'d',i:n}   → imagen predeterminada n de DEFAULT_IMAGES
          {k:'c',src}   → imagen propia (data URL) elegida con el input file
   main : null (usa MAIN_IMAGE) o data URL de la imagen principal propia
   ===================================================================== */
const KEY='pixavi:'+PRODUCT.slug+':media:v1';
const defaultItems=()=>DEFAULT_IMAGES.map((_,i)=>({k:'d',i}));
const validItem=it=>it&&((it.k==='d'&&DEFAULT_IMAGES[it.i])||(it.k==='c'&&typeof it.src==='string'&&it.src.startsWith('data:image/')));
let media=(()=>{
 try{
  const j=JSON.parse(localStorage.getItem(KEY));
  if(j&&Array.isArray(j.items))return{items:j.items.filter(validItem),main:typeof j.main==='string'&&j.main.startsWith('data:image/')?j.main:null};
 }catch(e){}
 return{items:defaultItems(),main:null};
})();
let warnedNoStorage=false;
function save(){
 try{localStorage.setItem(KEY,JSON.stringify(media));return 'ok'}
 catch(e){return(e&&(e.name==='QuotaExceededError'||e.code===22||e.code===1014))?'quota':'na'}
}
/* aplica un cambio, lo guarda y vuelve a pintar; si no cabe, lo deshace */
function commit(fn){
 const snap=JSON.stringify(media);
 fn();
 const r=save();
 if(r==='quota'){media=JSON.parse(snap);toast('⚠ No hay espacio en el navegador. Elimina alguna imagen e inténtalo de nuevo.');renderMedia();return false}
 if(r==='na'&&!warnedNoStorage){warnedNoStorage=true;toast('Tus imágenes se verán ahora, pero este navegador no las guardará al cerrar.')}
 renderMedia();return true;
}

/* lee un archivo, lo reduce (máx. 1400 px) y lo devuelve como data URL JPEG */
function toDataURL(file,maxSide=1400,q=.82){
 return new Promise((ok,fail)=>{
  const fr=new FileReader();
  fr.onerror=()=>fail(fr.error);
  fr.onload=()=>{
   const im=new Image();
   im.onerror=()=>fail(new Error('imagen no válida'));
   im.onload=()=>{
    const s=Math.min(1,maxSide/Math.max(im.width,im.height));
    const c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*s));c.height=Math.max(1,Math.round(im.height*s));
    const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);
    ok(c.toDataURL('image/jpeg',q));
   };
   im.src=fr.result;
  };
  fr.readAsDataURL(file);
 });
}
async function readFiles(files){
 const out=[];let bad=0;
 for(const f of Array.from(files||[])){
  if(!/^image\//.test(f.type)){bad++;continue}
  try{out.push(await toDataURL(f))}catch(e){bad++}
 }
 if(bad)toast(bad+' archivo(s) no se pudieron usar (solo imágenes JPG, PNG, WebP, GIF…)');
 return out;
}
const srcOf=it=>it.k==='c'?it.src:(DEFAULT_IMAGES[it.i]&&DEFAULT_IMAGES[it.i].src)||'';
const fbOf=it=>art(it.k==='d'?it.i:0);

/* ---------- imagen principal ---------- */
function renderMain(){
 const im=$('#mainImage'),fb=art(0);
 im.onerror=()=>{im.onerror=null;im.src=fb};
 im.src=media.main||MAIN_IMAGE.src||fb;
 $('#mainReset').hidden=!media.main;
 $('#mainBadge').hidden=!!media.main;
}
$('#mainPick').onclick=()=>$('#mainInput').click();
$('#mainInput').onchange=async e=>{
 const [s]=await readFiles(e.target.files);e.target.value='';
 if(s&&commit(()=>{media.main=s}))toast('✦ Imagen principal actualizada');
};
$('#mainReset').onclick=()=>{if(commit(()=>{media.main=null}))toast('Imagen principal restaurada')};
$('#mainFrame').onclick=e=>{if(e.target.closest('.media-tools'))return;openLB([{src:media.main||MAIN_IMAGE.src,fb:art(0)}],0)};

/* ---------- galería ---------- */
let freshFrom=-1,replaceIdx=-1;
function renderGallery(){
 const box=$('#gallery');box.innerHTML='';
 if(!media.items.length){
  box.innerHTML='<div class="g-empty"><b>Tu galería está vacía</b>Pulsa «Agregar imágenes» o arrastra tus fotos aquí.</div>';return;
 }
 media.items.forEach((it,i)=>{
  const d=document.createElement('div');
  d.className='g-item'+(freshFrom>=0&&i>=freshFrom?' fresh':'');
  d.tabIndex=0;d.setAttribute('role','button');d.setAttribute('aria-label','Ampliar imagen '+(i+1));
  const im=new Image();im.alt=(it.k==='d'&&DEFAULT_IMAGES[it.i].alt)||PRODUCT.name+' · ejemplo '+(i+1);im.loading='lazy';im.decoding='async';
  const fb=fbOf(it);im.onerror=()=>{im.onerror=null;im.src=fb};im.src=srcOf(it)||fb;
  d.appendChild(im);
  d.insertAdjacentHTML('beforeend',`<span class="g-num">${String(i+1).padStart(2,'0')}</span><div class="g-tools"><button type="button" class="mini-btn" data-a="rep">⟳ Cambiar</button><button type="button" class="mini-btn danger" data-a="del">✕ Eliminar</button></div>`);
  d.onclick=e=>{
   const b=e.target.closest('button');
   if(!b){openLB(media.items.map(x=>({src:srcOf(x),fb:fbOf(x)})),i);return}
   e.stopPropagation();
   if(b.dataset.a==='rep'){replaceIdx=i;$('#replaceInput').click()}
   if(b.dataset.a==='del'){commit(()=>{media.items.splice(i,1)});toast('Imagen eliminada')}
  };
  d.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&e.target===d){e.preventDefault();d.click()}};
  box.appendChild(d);
 });
 freshFrom=-1;
}
async function addImages(files){
 const list=await readFiles(files);if(!list.length)return;
 const start=media.items.length;
 if(commit(()=>list.forEach(s=>media.items.push({k:'c',src:s}))))toast(`✦ ${list.length} imagen(es) agregada(s)`);
 freshFrom=-1;
}
$('#addPick').onclick=()=>$('#addInput').click();
$('#addInput').onchange=e=>{const f=e.target.files;addImages(f).then(()=>{e.target.value=''})};
$('#replaceInput').onchange=async e=>{
 const [s]=await readFiles(e.target.files);e.target.value='';
 if(s&&replaceIdx>=0&&commit(()=>{media.items[replaceIdx]={k:'c',src:s}}))toast('✦ Imagen reemplazada');
 replaceIdx=-1;
};
$('#galReset').onclick=()=>{
 if(!confirm('¿Restaurar la galería predeterminada? Se quitarán las imágenes que agregaste a esta galería.'))return;
 commit(()=>{media.items=defaultItems()});toast('Galería restaurada');
};
const gal=$('#gallery');
['dragenter','dragover'].forEach(ev=>gal.addEventListener(ev,e=>{if(e.dataTransfer&&Array.from(e.dataTransfer.types||[]).includes('Files')){e.preventDefault();gal.classList.add('drag')}}));
['dragleave','drop'].forEach(ev=>gal.addEventListener(ev,()=>gal.classList.remove('drag')));
gal.addEventListener('drop',e=>{if(e.dataTransfer&&e.dataTransfer.files.length){e.preventDefault();addImages(e.dataTransfer.files)}});

function renderMedia(){renderMain();renderGallery()}

/* ---------- visor ampliado (lightbox) ---------- */
let lb=null,lbList=[],lbI=0,lbOpener=null;
function openLB(list,i){
 closeLB(true);lbList=list;lbI=i;lbOpener=document.activeElement;
 lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Imagen ampliada');
 lb.innerHTML='<button type="button" class="lb-btn lb-close" aria-label="Cerrar">×</button><button type="button" class="lb-btn lb-prev" aria-label="Anterior">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="lb-btn lb-next" aria-label="Siguiente">›</button>';
 lb.onclick=e=>{if(e.target===lb||e.target.closest('.lb-close'))closeLB();else if(e.target.closest('.lb-prev'))stepLB(-1);else if(e.target.closest('.lb-next'))stepLB(1)};
 document.body.appendChild(lb);document.body.style.overflow='hidden';
 $('.lb-close',lb).focus();showLB();
}
function showLB(){
 const o=lbList[lbI],im=$('img',lb);
 im.onerror=()=>{im.onerror=null;im.src=o.fb};im.src=o.src||o.fb;
 $('figcaption',lb).textContent=PRODUCT.name+' · '+(lbI+1)+' / '+lbList.length;
 $('.lb-prev',lb).hidden=$('.lb-next',lb).hidden=lbList.length<2;
}
function stepLB(d){lbI=(lbI+d+lbList.length)%lbList.length;showLB()}
function closeLB(silent){
 if(!lb)return;lb.remove();lb=null;document.body.style.overflow='';
 if(!silent&&lbOpener&&lbOpener.focus)lbOpener.focus();
}
document.addEventListener('keydown',e=>{
 if(!lb)return;
 if(e.key==='Escape')closeLB();
 if(e.key==='ArrowLeft')stepLB(-1);
 if(e.key==='ArrowRight')stepLB(1);
});

/* =====================================================================
   CONFIGURADOR (campos propios de cada producto, definidos en FIELDS)
   ===================================================================== */
const st={};FIELDS.forEach(f=>st[f.k]=f.d);

function buildFields(){
 const box=$('#fields');box.innerHTML='';let pendingRow=null;
 FIELDS.forEach(f=>{
  const w=document.createElement('div');w.className='field';const id='f_'+f.k;
  if(f.t==='text'){
   w.innerHTML=`<label for="${id}">${f.l}</label><input type="text" id="${id}" maxlength="${f.max||80}" value="${esc(st[f.k])}">`;
   w.querySelector('input').oninput=e=>{st[f.k]=e.target.value;render()};
  }else if(f.t==='area'){
   w.innerHTML=`<label for="${id}">${f.l} <small>(opcional)</small></label><textarea id="${id}" maxlength="300" placeholder="${esc(f.ph||'')}">${esc(st[f.k])}</textarea>`;
   w.querySelector('textarea').oninput=e=>{st[f.k]=e.target.value;render()};
  }else if(f.t==='num'){
   w.innerHTML=`<label for="${id}">${f.l}</label><input type="number" id="${id}" min="${f.min}" max="${f.max}" step="${f.step}" value="${st[f.k]}">`;
   w.querySelector('input').oninput=e=>{let v=parseFloat(e.target.value);if(isNaN(v))return;v=Math.min(f.max,Math.max(f.min,v));st[f.k]=f.int?Math.round(v):v;render()};
  }else if(f.t==='chips'){
   w.innerHTML=`<span class="lbl">${f.l}</span><div class="chips">${f.o.map(o=>`<button type="button" class="${o===st[f.k]?'on':''}" data-v="${esc(o)}">${o}</button>`).join('')}</div>`;
   w.querySelectorAll('button').forEach(b=>b.onclick=()=>{st[f.k]=b.dataset.v;w.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));render()});
  }else if(f.t==='qty'){
   w.innerHTML=`<span class="lbl">${f.l}</span><div class="stepper"><button type="button" aria-label="Menos">−</button><input type="number" min="${f.min}" max="100000" value="${st[f.k]}" aria-label="Cantidad"><button type="button" aria-label="Más">+</button></div>`;
   const inp=w.querySelector('input'),[m,p]=w.querySelectorAll('button');
   const set=v=>{v=Math.max(f.min,Math.min(100000,Math.round(v)||f.min));st[f.k]=v;inp.value=v;render()};
   m.onclick=()=>set(st[f.k]-(st[f.k]>50?10:st[f.k]>10?5:1));
   p.onclick=()=>set(st[f.k]+(st[f.k]>=50?10:st[f.k]>=10?5:1));
   inp.onchange=()=>set(parseFloat(inp.value));
  }
  if(f.half){
   if(!pendingRow){pendingRow=document.createElement('div');pendingRow.className='row2';box.appendChild(pendingRow)}
   pendingRow.appendChild(w);
  }else{pendingRow=null;box.appendChild(w)}
 });
}

/* ---------- sección «Especificaciones y opciones» (se genera desde FIELDS) ---------- */
function buildOptions(){
 const box=$('#optGrid');box.innerHTML='';
 FIELDS.forEach(f=>{
  const c=document.createElement('article');c.className='card opt reveal';
  const lbl=f.l.replace(/\s*\(m\)$/,'');
  if(f.t==='chips'){
   c.innerHTML=`<h3>${f.l}</h3><div class="pills">${f.o.map(o=>`<button type="button" data-k="${f.k}" data-v="${esc(o)}">${o}</button>`).join('')}</div>`;
   c.querySelectorAll('button').forEach(b=>b.onclick=()=>{st[f.k]=b.dataset.v;buildFields();render();toast('✦ '+lbl+': '+b.dataset.v)});
  }else if(f.t==='text'){
   c.innerHTML=`<h3>${f.l}</h3><p>Campo de texto personalizable, hasta ${f.max} caracteres.<br>Ejemplo: <b>${esc(f.d)}</b></p>`;
  }else if(f.t==='num'){
   c.innerHTML=`<h3>${f.l}</h3><p>Valor entre <b>${f.min}</b> y <b>${f.max}</b>${f.int?'':' (pasos de '+f.step+')'}.</p>`;
  }else if(f.t==='qty'){
   c.innerHTML=`<h3>${f.l}</h3><p>Desde <b>${f.min}</b> unidad${f.min>1?'es':''}. Ajústala con los botones − / + o escribe el número.</p>`;
  }else if(f.t==='area'){
   c.innerHTML=`<h3>${f.l} <small style="font-weight:400;color:#bdb0c7">(opcional)</small></h3><p>${esc(f.ph||'')}</p>`;
  }
  box.appendChild(c);observe(c);
 });
}
function markPills(){$$('#optGrid .pills button').forEach(b=>b.classList.toggle('on',st[b.dataset.k]===b.dataset.v))}

/* ---------- render (vista previa + resumen) ---------- */
function buildText(){
 const n=$('#cName').value.trim(),c=$('#cPhone').value.trim();
 let t='PIXAVI — Solicitud de cotización\n';
 if(n)t+='Contacto: '+n+'\n';if(c)t+='Datos: '+c+'\n';
 t+='\n'+st.qty+' × '+PRODUCT.name+'\n'+summaryLines(st).map(l=>'   - '+l[0]+': '+l[1]).join('\n')+'\n';
 return t;
}
function render(){
 $('#stagebox').innerHTML=previewHTML(st);
 const lines=summaryLines(st);
 $('#sumTitle').textContent=st.qty+' × '+PRODUCT.name;
 $('#sumText').textContent=lines.slice(0,3).map(l=>l[1]).join(' · ');
 $('#sumList').innerHTML='<li><b>Cantidad</b><span>'+esc(st.qty)+'</span></li>'+lines.map(l=>`<li><b>${esc(l[0])}</b><span>${esc(l[1])}</span></li>`).join('');
 $('#quoteText').textContent=buildText();
 markPills();
}

/* ---------- solicitar cotización ---------- */
$('#cName').oninput=$('#cPhone').oninput=()=>{$('#quoteText').textContent=buildText()};
$('#sendBtn').onclick=()=>{
 const url='https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(buildText());
 window.open(url,'_blank','noopener');
};
$('#copyBtn').onclick=async()=>{
 const t=buildText();
 try{await navigator.clipboard.writeText(t)}
 catch{const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove()}
 toast('Resumen copiado');
};

/* ---------- inicio ---------- */
document.documentElement.style.setProperty('--c1',PRODUCT.c1);
document.documentElement.style.setProperty('--c2',PRODUCT.c2);
buildOptions();buildFields();render();renderMedia();
$$('.reveal').forEach(observe);

})();
