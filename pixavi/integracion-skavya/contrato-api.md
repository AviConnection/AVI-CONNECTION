# Contrato de integración Pixavi ↔ Skavya

**Estado:** propuesta de contrato, no servicio desplegado. La copia Skavya Ocean Teal recuperada está incluida con cambios mínimos en su módulo de pagos. Conservar la copia anterior antes de instalar. La prueba local usa únicamente una tarjeta ficticia Visa terminada en 4821.

## Diseño de producción

Skavya será la autoridad única para métodos de pago, transacciones, saldos y comprobantes. Pixavi y Skavya consultarán el mismo servicio con la identidad AVI ID autenticada. No usar `localStorage` para métodos de pago reales, credenciales ni datos de tarjetas. El proveedor PCI procesa el formulario alojado; la API conserva referencias de proveedor, últimos cuatro dígitos, marca y vencimiento, nunca CVV. El servidor valida sesión, titularidad, consentimiento, precios, stock, idempotencia, estados de pago y permisos. Nunca acreditar un pago desde un evento del navegador: confirmar mediante webhook autenticado y conciliación.

| Método | Ruta propuesta | Resultado |
|---|---|---|
| GET | /api/v1/skavya/metodos-pago | {items:[{id,brand,last4,expiry}]} |
| POST | /api/v1/skavya/metodos-pago/sesion | {url} para vinculación alojada |
| DELETE | /api/v1/skavya/metodos-pago/:id | revoca método autorizado |
| POST | /api/v1/skavya/checkout | {redirectUrl, checkoutId}; el servidor reconstruye importes |
| POST | /api/v1/skavya/comprobantes | solicitud con orderId, tipo y datos tributarios |

Contratos pendientes: creación de checkout, pedidos, transacciones, Dots, delivery, Nest, identidad y estados de cotización. El contrato de métodos de pago coincide con el frontend Skavya recuperado. Deben implementarse en el backend de AVI CONNECTION. El adaptador del prototipo aún no consume estas rutas. Los registros financieros demo siguen siendo locales y no deben migrarse a producción.

## Configuración técnica de prueba (solo desarrolladores)

Por defecto `apiBase` vacío. Para un entorno propio y autorizado de pruebas configurar la clave `avi.skavya.config` con `{ "apiBase": "/api/v1", "walletUrl": "../skavya/skavya.html#avipay", "mode": "sandbox" }`. El valor de API debe corresponder al servidor real; no existe un servidor suministrado. En producción usar configuración de despliegue no editable por el usuario, CORS restrictivo, protección CSRF y cookies seguras. La redirección de registro/pago deberá restringirse a dominios aprobados del proveedor y comprobarse en servidor.

## Demostración local

1. Inicia el servidor HTTP local desde la carpeta Pixavi.
2. Abre `/pixavi.html#avipay/tarjetas` y agrega una tarjeta ficticia.
3. Abre `/integracion-skavya/visor-demo.html` en otra pestaña del mismo navegador y origen.
4. El visor mostrará la misma tarjeta. Retírala para comprobar el cambio entre pestañas.

La copia incluida de Skavya ya lee la lista ficticia y las transacciones compartidas en ausencia de la API. Abrir Skavya/Avi Pay y Transacciones para comprobarlo. No se almacenan números completos ni códigos de seguridad.
