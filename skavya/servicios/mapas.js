// Módulo independiente de SKAVYA. Registro compartido compatible con HTTP y apertura local.
(function(modules){
'use strict';
const {api,optional} = modules["servicios/api"];

const sede='Av. Tuyumayo, parte alta, N.º 416, Cusco, Perú';
const origin=()=>optional('/avigo/origen',null);
const route=(destination)=>api('/avigo/ruta',{method:'POST',body:{destination}});
const quote=body=>api('/avigo/cotizaciones',{method:'POST',body});
// Leaflet se carga únicamente cuando el usuario abre el mapa. Teselas externas.
async function createMap(el,onPick){if(!window.L){const css=document.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.append(css);await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';s.onload=resolve;s.onerror=reject;document.head.append(s)})}const L=window.L;const map=L.map(el).setView([-13.5319,-71.9675],13);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(map);let marker,line;const o=await origin();if(o&&Number.isFinite(o.lat)&&Number.isFinite(o.lng)){L.marker([o.lat,o.lng]).addTo(map).bindPopup('AVI CONNECTION');map.setView([o.lat,o.lng],14)}map.on('click',async e=>{const {lat,lng}=e.latlng;marker?.remove();line?.remove();marker=L.marker([lat,lng]).addTo(map);onPick({lat,lng},null);if(!o)return;try{const r=await route({lat,lng});if(!Array.isArray(r.points))return;line=L.polyline(r.points,{color:'#246bd3',weight:5}).addTo(map);map.fitBounds(line.getBounds(),{padding:[25,25]});onPick({lat,lng},r)}catch{}});return map}

modules["servicios/mapas"]={sede,origin,route,quote,createMap};
})(window.SkavyaModules || (window.SkavyaModules = Object.create(null)));
