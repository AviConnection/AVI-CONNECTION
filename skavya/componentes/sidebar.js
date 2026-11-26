// Módulo independiente de SKAVYA. Registro compartido compatible con HTTP y apertura local.
(function(modules){
'use strict';
const {$,icon} = modules["componentes/ui"];

const nav=[['inicio','Página principal','home'],['mibilletera','Mi billetera','wallet'],['avipay','AVI Pay','wallet'],['avidots','AVI Dots','dots'],['avigo','AVI Go','truck'],['transacciones','Transacciones','swap'],['misfinanzas','Mis finanzas','receipt'],['configuracion','Configuración','settings'],['soporte','Ayuda y comentarios','help']];
function initSidebar(){const m=matchMedia('(max-width:760px)'),side=$('#sidebar'),menu=$('#menu');let mode='';function draw(b){const next=b?'business':'personal';if(mode===next)return;mode=next;side.innerHTML=nav.map(([id,n,i])=>`<a href="#${id}" data-nav="${id}">${icon(i)}${n}</a>`).join('');}draw(false);function set(open){document.body.classList.toggle('side-closed',!open);side.inert=!open;menu.setAttribute('aria-expanded',String(open));$('#overlay').hidden=!(m.matches&&open)}set(!m.matches);menu.onclick=()=>set(document.body.classList.contains('side-closed'));$('#overlay').onclick=()=>set(false);m.addEventListener('change',()=>set(!m.matches));side.addEventListener('click',()=>{if(m.matches)set(false)});return page=>{draw(false);side.querySelectorAll('a').forEach(a=>{a.classList.toggle('active',a.dataset.nav===page);if(a.dataset.nav===page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}}

modules["componentes/sidebar"]={nav,initSidebar};
})(window.SkavyaModules || (window.SkavyaModules = Object.create(null)));
