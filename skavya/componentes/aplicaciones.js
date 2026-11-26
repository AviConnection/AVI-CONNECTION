// Catálogo comercial y lanzador general de AVI CONNECTION.
(function(modules){
'use strict';
const {esc,icon} = modules["componentes/ui"];
const apps=[
 {id:'pixavi',name:'Pixavi',desc:'Imprenta y diseño',route:'../pixavi/index.html'},
 {id:'shoppi',name:'Shoppi',desc:'Tienda y productos',route:'../shoppi/index.html'},
 {id:'fitvi',name:'Fitvi',desc:'Gimnasios',route:'../fitvi/index.html'},
 {id:'mixel',name:'Mixel',desc:'Música',route:'../mixel/index.html'},
 {id:'balu',name:'Balú Tours',desc:'Reservas de viajes',route:'../balu%20tours/index.html'},
 {id:'adevi',name:'Adevi',desc:'Servicios estudiantiles',route:'../adevi/index.html'}
];
const launcherApps=[...apps,{id:'worksvi',name:'Worksvi',desc:'Tareas y proyectos',route:'../worksvi/index.html'},{id:'skavya',name:'Skavya',desc:'Pagos y recompensas',route:'./index.html'},{id:'astravi',name:'Astravi',desc:'Exploración espacial',route:'../astrovia/index.html'},{id:'aviconnection',name:'AVI CONNECTION',desc:'Portal principal',route:'../avi.html'}];
const appMark=a=>`<span class="app-mark"><span>${esc(a.name[0])}</span>${a.id?`<img hidden alt="" src="assets/imagenes/aplicaciones/${esc(a.id)}.png" data-app-logo="${esc(a.id)}">`:''}</span>`;
const appTiles=(items=apps)=>items.map(a=>`<button class="tile app-tile" data-action="app:${a.id}">${appMark(a)}<span class="grow"><b>${esc(a.name)}</b><small>${esc(a.desc)}</small></span>${icon('arrow')}</button>`).join('');
function appMenu(){return `<h2>Aplicaciones AVI</h2><div class="app-menu">${launcherApps.map(a=>`<a href="${esc(a.route)}" title="Abrir ${esc(a.name)}" ${a.id==='skavya'?'aria-current="page"':''}>${a.id==='aviconnection'?'<span class="app-mark avi-portal-mark"><img class="avi-portal-black" src="assets/imagenes/aplicaciones/aviconnection.png" alt=""><img class="avi-portal-white" src="assets/imagenes/aplicaciones/aviconnection-blanco.png" alt=""></span>':appMark(a)}<span>${esc(a.name)}</span></a>`).join('')}</div>`}
function initLogos(){
 function show(im){if(im.naturalWidth){im.hidden=false;im.previousElementSibling.hidden=true;}}
 document.addEventListener('load',e=>{if(e.target.matches?.('[data-app-logo]'))show(e.target)},true);
 document.addEventListener('error',e=>{if(e.target.matches?.('[data-app-logo]'))e.target.remove()},true);
}
modules["componentes/aplicaciones"]={apps,launcherApps,appMark,appTiles,appMenu,initLogos};
})(window.SkavyaModules || (window.SkavyaModules = Object.create(null)));
