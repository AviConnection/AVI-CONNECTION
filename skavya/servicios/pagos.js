// Módulo independiente de SKAVYA. Registro compartido compatible con HTTP y apertura local.
(function(modules){
'use strict';
const {api,optional} = modules["servicios/api"];

const methods=()=>optional('/skavya/metodos-pago',[]);
const transactions=()=>optional('/skavya/transacciones',[]);
const startCard=()=>api('/skavya/metodos-pago/sesion',{method:'POST',body:{provider:'visa'}});
const removeCard=id=>api('/skavya/metodos-pago/'+encodeURIComponent(id),{method:'DELETE'});

modules["servicios/pagos"]={methods,transactions,startCard,removeCard};
})(window.SkavyaModules || (window.SkavyaModules = Object.create(null)));
