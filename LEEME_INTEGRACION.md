# AVI CONNECTION — integración de la carpeta principal

Este paquete **no contiene ni reemplaza** las nueve aplicaciones. Conserva tus carpetas originales y sus archivos HTML, CSS, JS, imágenes y videos. Incluye únicamente la plataforma general, las herramientas AVI, el panel y el centro documental. `avi.html` es el nombre correcto del archivo principal. No se necesita `api.html`.

## Instalación
1. Haz una copia de seguridad de tu carpeta principal AVI CONNECTION.
2. Extrae el ZIP. Copia **el contenido** de la carpeta extraída directamente al nivel donde ya están `pixavi/`, `skavya/`, etc. No crees un segundo nivel de carpeta AVI CONNECTION.
3. Acepta reemplazar los archivos del portal (`index.html`, `avi.html`, `avi.css`, `avi.js` y las secciones/herramientas AVI). Los recursos comunes del portal tienen nombres exclusivos `avi-portal-assets/` y `avi-portal-core/`, para no sobrescribir los recursos de las apps. El panel `admin/` contiene la versión anterior del panel central con rutas actualizadas.
4. Ejecuta `REVISAR_ENLACES_AVI.bat`. Si un nombre de carpeta difiere, cambia el valor correspondiente en `avi-rutas.json` (por ejemplo, `"balu tours": "Balu Tours"`). Las claves son las rutas que usa la plataforma y no se modifican. No se genera ninguna página de reemplazo cuando una aplicación falta.
5. Instala Python 3.10+ si es necesario. Ejecuta `INICIAR_AVI.bat`. Abre `http://127.0.0.1:8000/index.html`. Mantén abierta la consola. La introducción dura cinco segundos y redirige a `avi.html`.

## Datos, perfiles y actividad
El servidor crea `avi-database/avi.sqlite3` al primer inicio con `avi-database/schema.sql`. No se incluye una base con datos previos ni se sobrescribe la base antigua `database/avi.sqlite3`. No borres las bases anteriores. Los perfiles iniciales son Lucía Mendoza y Mateo Rojas; sus datos de ejemplo no representan clientes reales. El panel central está en `http://127.0.0.1:8000/admin/index.html`. La clave se genera al iniciar y aparece en la consola. Los usuarios pueden desactivar estadísticas desde Configuración. El servidor mide páginas, clics y tiempo visible, no lo que escriben los usuarios.

El servidor añade un pequeño script de integración a la respuesta HTML de cada aplicación original, sin modificar el archivo en el disco. Este script registra actividad y permite que los desarrolladores conecten registros a la base común. No cambia la apariencia ni captura automáticamente cotizaciones, contraseñas, formularios o información privada. Las operaciones internas de cada aplicación deben usar explícitamente el adaptador para sincronizarse. Las aplicaciones que se abren fuera del servidor AVI no quedan conectadas automáticamente.

## Integración opcional con los botones originales
En el código JavaScript de Pixavi, una vez guardada una cotización por el usuario, añade una llamada como:
```js
await window.AVIConnect.record({id: cotizacion.id, title: cotizacion.concepto, price: cotizacion.total});
```
Para enviar una referencia de compra a Skavya (sin confirmar ningún cobro):
```js
await window.AVIConnect.sendToSkavya({id: cotizacion.id, title: cotizacion.concepto, price: cotizacion.total});
```
Para favoritos:
```js
await window.AVIConnect.favorite({id: producto.id, title: producto.nombre});
```
Las variables de ejemplo deben adaptarse a los nombres y estructuras reales de tus archivos. `AVIConnect.ready` espera la conexión inicial. `AVIConnect.read()` recupera los registros de la app activa; `AVIConnect.profile()` obtiene el perfil activo. `AVIConnect.save(lista)` reemplaza la lista completa de esa aplicación; usa `record` para añadir o actualizar por ID y evitar conflictos con otros registros. Gestiona los errores con try/catch. No se envían datos sin una llamada explícita. La lectura de referencias desde Skavya requiere adaptar su código original para mostrar los datos devueltos por `AVIConnect.read()`.

## Documentos Skavya
El módulo independiente `avi-documentos/index.html` conserva los seis formatos descargables en PDF. Accede desde AVI Pay o el pie de página del portal. Para añadirlo al Skavya original, vincula su botón de comprobantes con `../avi-documentos/index.html` (sin reemplazar su HTML). Los formatos son internos, no acreditan pago ni poseen validez tributaria.

## Alcance
No se han inspeccionado los archivos originales de tu computadora. El verificador detecta entradas ausentes; no podemos garantizar que cada función interna esté enlazada hasta revisar sus scripts. AVI Colors y AVI Styles se mantienen en el portal y herramientas, no se fuerzan sobre las aplicaciones originales. Usa el servidor local de Python, no Live Server, para SQLite, documentos y monitorización. No expongas el servidor directamente a Internet: no hay autenticación verificada ni HTTPS. Para una presentación desde otros dispositivos, utiliza una red de confianza y evita datos personales sensibles.
