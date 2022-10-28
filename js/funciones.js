//costo de envio
function costoEnvioSiNo() {
    costoEnvioButton.checked ? costoDeEnvio = 400 : costoDeEnvio = 0;
    costoDeEnvioString.innerHTML = "$ " + costoDeEnvio;
    actualizarTotal();
}

//Subotal a pagar
const actualizarSubtotal = () => {
    const subtotalActualizado = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc = acc + (cantidad * precio), 0);
    subtotal = subtotalActualizado;
    subtotalString.innerText = subtotalActualizado;
    totalString.innerText = subtotalActualizado;
}

//Total de Compra ---> recuadro
const actualizarTotal = () => {
    const subtotalActualizado = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc = acc + (cantidad * precio), 0);
    total = subtotalActualizado + costoDeEnvio;
    totalString.innerText = subtotalActualizado + costoDeEnvio;
}

//vaciar carrito
function vaciarCarrito() {
    swal({
        title: "Estás seguro?",
        text: "Una vez vaciado, deberás seleccionar los productos nuevamente!",
        icon: "warning",
        buttons: ["Cancelar", "Sí!"],
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("El carrito ha sido eliminado", {
                    icon: "success",
                    buttons: false,
                    timer: 2000,
                });
                setTimeout(() => {
                    carrito = {};
                    productosEnCarrito();
                    actualizarSubtotal();
                    subtotalString.innerText = "$ 0";
                    desaparecerTexto();
                    costoEnvioButton.checked = false;
                    costoEnvioSiNo();
                    totalString.innerText = "$ 0";
                }, 1000);
            } else {
                swal("Tu carrito está a salvo!", {
                    buttons: false,
                    timer: 2000,
                });

            }
        });
}

// Hace desparacer texto "No hay productos en el carrito"
function desaparecerTexto() {
    Object.keys(carrito).length !== 0 ? texto.className = "desaparece" : texto.className = "";
}

// Botones finalizar compra y vaciar carrito se vuelven funcionales
function habilitarBotones() {
    if (Object.keys(carrito).length === 0) {
        botonfinalizarCompra.disabled = true;
        botonfinalizarCompra.className = "botonDesabilitado";
        vaciarCarritoButton.disabled = true;

        vaciarCarritoButton.className = "botonDesabilitado";
    } else {
        botonfinalizarCompra.disabled = false;
        botonfinalizarCompra.className = "botonFinCompra";
        vaciarCarritoButton.disabled = false;
        vaciarCarritoButton.className = "botonFinCompra";
    }
}

// Guarda carrito en LS
function setLocalStorage() {
    const carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carritoEnProceso", carritoJSON);
}

// Trae carrito de LS
function traerCarritoEnProceso() {
    let carritoEnLS = JSON.parse(localStorage.getItem("carritoEnProceso"));
    carritoEnLS && (carrito = carritoEnLS);
    productosEnCarrito();
}

function compraTerminada() {
    const contenedorDatos = document.getElementById("divCompraTerminada");
    contenedorDatos.innerHTML = "";
    let nombreApellidoComprador = document.getElementById("nombreApellido").value;
    let emailComprador = document.getElementById("emailComprador").value;
    let div = document.createElement('div')
    const cantidadDeProductos = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    div.innerHTML =
        `<h5>${nombreApellidoComprador.toUpperCase()}</h5>
         <div class="mt-3 mb-1">
             <h6>Usted ha comprado ${cantidadDeProductos} productos </h6>
             <h6>En minutos recibirá en ${emailComprador.toLowerCase()} el detalle de su compra.</h6>
         </div>`
    contenedorDatos.append(div)
}

//todo vuelve a cero y se vacia el carrito
function reset() {
    setTimeout(() => {
        carrito = {};
        productosEnCarrito();
        actualizarSubtotal();
        subtotalString.innerText = "$ 0";
        desaparecerTexto();
        costoEnvioButton.checked = false;
        costoEnvioSiNo();
        totalString.innerText = "$ 0";
    }, 1000);
}

//Número de pedido
function generarNumDePedido() {
    let numeroDePedido = 0;
    pedidosRealizados.length === 0 ? numeroDePedido = 1 : numeroDePedido = pedidosRealizados.length + 1
    return numeroDePedido
}

function generarPedido() { // la idea es que lo envie por mail en formato legible al usuario standard pero leí que se hacia en el backend
    const pedido = new Pedido;
    //console.log (pedido)
    return pedido
}

function ok() { //usada al clickear en el ok del model
    reset()
    generarPedido()
}

//eventos

costoEnvioButton.addEventListener('click', costoEnvioSiNo); //evento Checkbox Costo de envio

vaciarCarritoButton.addEventListener('click', vaciarCarrito); //borra carrito

botonContinuar.addEventListener('click', compraTerminada);

botonok.addEventListener('click', ok); //reinicia resumen con el ok del modal