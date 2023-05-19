const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('contenedor-carrito')

const botonVaciar = document.getElementById('vaciar-carrito')

const comprarCarrito = document.getElementById('comprar-carrito')

const precioTotal = document.getElementById('precio-total')

const mensaje = (mensaje) => {
    Toastify({
        text: mensaje,
        duration: 3000
        }).showToast();
}

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () =>{
    carrito.length = 0
    mensaje("El carrito está vacío.")
    actualizarCarrito()
})

comprarCarrito.addEventListener('click', () => {
    carrito.length = 0
    mensaje("Gracias por su compra.")
    actualizarCarrito()
})

productos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
                    <img src=${producto.img}>
                    <h3>${producto.nombre}</h3>
                    <p>$${String(new Intl.NumberFormat('de-DE').format(producto.precio))}</p>
                    <button id="agregar${producto.id}" class="boton-agregar">Agregar al carrito <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg></button>
    `
    contenedorProductos.appendChild(div)   

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })

    
})

const agregarAlCarrito = (prodId) => {
    const item = productos.find((prod) => prod.id === prodId)
    const carritoItem = carrito.find((prod) => prod.id === prodId)     
        typeof carritoItem != "undefined" ? carritoItem.cantidad++ : carrito.push(item)
    mensaje("Se ha agregado un producto al carrito.")
    actualizarCarrito()
    console.log(carrito)
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    mensaje("Se ha eliminado un producto del carrito.")
    actualizarCarrito()
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
                        <p>Producto: ${prod.nombre}</p>
                        <p>Precio: $${String(new Intl.NumberFormat('de-DE').format(prod.precio))}</p>
                        <p>Cantidad:${prod.cantidad}</span></p>
                        <button onClick = "eliminarDelCarrito(${prod.id})" class="boton-eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg></button>
        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)
}

