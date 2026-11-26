// Módulo independiente de SKAVYA. Registro compartido compatible con HTTP y apertura local.
(function(modules){
'use strict';
const {heading,methodsHTML,cardHTML,examples,btn} = modules["componentes/ui"];
const {apps,appTiles} = modules["componentes/aplicaciones"];
const {methods} = modules["servicios/pagos"];

async function mount(root,{go,signal}){const cards=await methods();if(signal.aborted)return;const real=Array.isArray(cards)&&cards.length;root.firstElementChild.innerHTML=heading('Bienvenido, '+modules['servicios/autenticacion'].current().name.split(' ')[0],'Administra tus métodos de pago, compras y beneficios de AVI CONNECTION en un solo lugar.')+`<section class="section"><div class="section-head"><h2>Métodos de pago</h2><button class="link-button" data-route="avipay">Ver todos →</button></div>${methodsHTML()}</section><section class="section"><div class="section-head"><h2>Tus tarjetas</h2><button class="link-button" data-route="avipay">Administrar tarjetas →</button></div><div class="grid">${(cards).map(cardHTML).join('')}</div></section><section class="section"><div class="section-head"><h2>Aplicaciones</h2></div><p class="muted">Consulta tus compras y servicios.</p><div class="grid">${appTiles(apps)}</div></section>`;root.addEventListener('click',e=>{const a=e.target.closest('[data-action]')?.dataset.action;if(!a)return;const [k,v]=a.split(':');if(k==='method')go('avipay/metodo/'+v.toLowerCase());if(k==='card')go('avipay/tarjeta/'+v);if(k==='app')go('transacciones/compras/'+v)},{signal})}

modules["inicio/inicio"]={mount, template:"<section class=\"module-inicio\" id=\"module-inicio\">\n  <header class=\"intro\"><h1>Bienvenido a Skavya</h1><p class=\"muted\">Cargando información…</p></header>\n</section>\n"};
})(window.SkavyaModules || (window.SkavyaModules = Object.create(null)));
