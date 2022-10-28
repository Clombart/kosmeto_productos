let carrito = {}; // para productosEnCarrito
let subtotal = 0; // usado en funcion subtotal de compra
let costoDeEnvio = 0; // usado en funcion total de compra
let total = 0; // usado en funcion total de compra
let pedidosRealizados = []; // usado en funcion generar numero de pedido

let costoEnvioButton = document.querySelector("#costoDeEnvio"); //trae el checkbox

let costoDeEnvioString = document.getElementById("costoDeEnvioNumber"); // trae el str de costo de envio

let subtotalString = document.getElementById("subtotal"); //trae subtotal para cambiarlo por el subtotal de la compra

let totalString = document.getElementById("total"); //trae totalSTR p/ cambiarlo por total de la compra

let vaciarCarritoButton = document.getElementById("vaciarCarrito"); //trae boton vaciar carrito

let texto = document.getElementById("textoCarroVacio"); // usado en fx desaparecerTexto

const items = document.getElementById("productosEnCarritoItems"); // trae el contenedor donde irá el carrito

const template = document.getElementById("carro").content; // trae la plantilla de cada item agregado

const fragment = document.createDocumentFragment(); //crea el fragmento de cada item agregado

let botonfinalizarCompra = document.getElementById("btnfinalizarCompra"); // trae boton FC

/*correccione- Variables para constructor de pedido*/

let fechaAct = new Date
let nombreApellidoComprador = document.getElementById("nombreApellido").value;
let emailComprador = document.getElementById("emailComprador").value;