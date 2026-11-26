// Módulo independiente de SKAVYA. Registro compartido compatible con HTTP y apertura local.
(function(modules){
'use strict';
const {optional} = modules["servicios/api"];
const {esc,empty} = modules["componentes/ui"];

async function notifications(){const list=await optional('/core/notificaciones',[]);return `<h2>Notificaciones</h2>${Array.isArray(list)&&list.length?list.map(n=>`<div class="row-item"><div class="grow"><b>${esc(n.title)}</b><small>${esc(n.message)}</small></div></div>`).join(''):empty('No hay notificaciones disponibles.')}`}

modules["componentes/notificaciones"]={notifications};
})(window.SkavyaModules || (window.SkavyaModules = Object.create(null)));
