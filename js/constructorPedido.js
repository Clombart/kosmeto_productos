//todavia no esta en uso por eso aun no cambie los prompt

class Pedido {
    constructor(fechaAct,nombreApellidoComprador,emailComprador) {
        this.numeroDePedido = generarNumDePedido();
        this.fecha = fechaAct.toLocaleDateString();
        this.productos = carrito;
        this.montoAPagar = total;
        this.comprador = nombreApellidoComprador;
        this.emailComprador = emailComprador
    }
}