//trae los productos desde productos.jason
const fetchData = async () => {
    try {
        const response = await fetch('../productos.json');
        const data = await response.json();
        mostrarProductos(data);
        detectarBotones(data);
        habilitarBotones()
        traerCarritoEnProceso();
    }
    catch (error) {
        console.error("Se ha producido un error", error);
        //    arrayContactos = [{id: "Error al obtener datos", nombre: "", telefono: "", email: ""}]
        // }
    }
}
const mostrarProductos = (data) => {
    const contenedorProductos = document.querySelector('#hijo-p'); // trae contenedor donde coloca los productos
    data.forEach((producto) => {
        const div = document.createElement('div')
        div.className = "card col-8 col-sm-6 col-md-4 col-lg-4 col-xl-5 col-xll-1 cardsContainer"
        div.style = "width: 18rem;"
        div.innerHTML =
            `<img src="${producto.thumbnailUrl}" class="img-fluid" alt="${producto.nombre}"></img>
             <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
                <button id="${producto.id}" class="botonComprar" type="button">comprar</button>
            </div>`
        contenedorProductos.append(div)
    })
}
//detecta los botones comprar de los diferentes productos
const detectarBotones = (data) => {
    let botones = document.querySelectorAll(".botonComprar");
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = data.find(item => item.id === parseInt(btn.id))
            producto.cantidad = 1;
            carrito.hasOwnProperty(producto.id) && (producto.cantidad = carrito[producto.id].cantidad + 1);
            carrito[producto.id] = { ...producto };
            Toastify({
                text: "Agregaste un nuevo producto al carrito",
                style: {
                    background: "linear-gradient(to bottom, #78C7B4, #B6EEA5)",
                    fontFamily: "Klee One, cursive",
                    fontWeight: "bold",
                },
                duration: 2500
            }).showToast();
            desaparecerTexto();
            productosEnCarrito();
            habilitarBotones()
        })
    })
}

//Muestra los productos agregados al carrito
const productosEnCarrito = () => {
    items.innerHTML = "";
    for (const key in carrito) {
        if (carrito.hasOwnProperty(key)) {
            const element = carrito[key];

            template.querySelectorAll('td')[0].textContent = element.nombre;
            template.querySelectorAll('td')[2].textContent = element.cantidad;
            template.querySelectorAll('td')[4].textContent = "$" + (element.precio * element.cantidad);

            template.querySelector("#menos").dataset.id = element.id;
            template.querySelector("#mas").dataset.id = element.id;
            template.querySelector("#trash").dataset.id = element.id;

            const clone = template.cloneNode(true);
            fragment.appendChild(clone);
        }
        items.appendChild(fragment);
    }
    accionBotones();
    actualizarSubtotal();
    actualizarTotal();
    setLocalStorage();
}

//Opcion de sumar, restar y borrar de cada producto agregado
const accionBotones = () => {
    const botonesSumar = document.querySelectorAll(".mas");
    const botonesRestar = document.querySelectorAll(".menos");
    const botonesTirar = document.querySelectorAll(".trash");

    botonesSumar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id];
            producto.cantidad++;
            carrito[btn.dataset.id] = { ...producto };
            productosEnCarrito();
            actualizarTotal();
        })
    })

    botonesRestar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id];
            producto.cantidad--;
            producto.cantidad === 0 ? delete carrito[btn.dataset.id] : carrito[btn.dataset.id] = { ...producto };
            productosEnCarrito();
            actualizarTotal();
        })
    })

    botonesTirar.forEach(btn => {
        btn.addEventListener('click', () => {
            delete carrito[btn.dataset.id];
            productosEnCarrito();
            actualizarTotal();
        })
    })
    desaparecerTexto();
    habilitarBotones()
}


document.addEventListener('DOMContentLoaded', fetchData());