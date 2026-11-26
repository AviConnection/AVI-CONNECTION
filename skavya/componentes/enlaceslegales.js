// Módulo independiente de SKAVYA. Registro compartido compatible con HTTP y apertura local.
(function(modules){
'use strict';
const {$,legal} = modules["componentes/ui"];
function initLegal(){$('#legal-links').innerHTML=legal}

modules["componentes/enlaceslegales"]={initLegal};
})(window.SkavyaModules || (window.SkavyaModules = Object.create(null)));
