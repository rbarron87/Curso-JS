// Array de productos a almacenar
let productos_id = [];
let productos_nombre = [];
let productos_precio = [];

// Función para dar de alta un producto
function darDeAltaProducto() {
    let id = parseInt(prompt("Ingrese el ID del producto:"));
    let nombre = prompt("Ingrese el nombre del producto:");
    let precio = parseFloat(prompt("Ingrese el precio del producto:"));

    // Validar que los datos ingresados sean válidos
    if (isNaN(id) || id <= 0 || nombre.trim() === "" || isNaN(precio) || precio <= 0) {
        alert("Por favor, ingrese datos válidos para el producto.");
        return;
    }

    for (let i = 0; i < productos_id.length; i++) {
        if (productos_id[i]=id) {
            console.log(`Error: El producto con id ${id} ya existe.`);
            return;
        }
    }

    // Agregar producto al array
    productos_id.push(id);
    productos_nombre.push(nombre);
    productos_precio.push(precio);
    console.log(`Producto con id ${id} dado de alta.`);
}

// Función para listar todos los productos
function listarProductos() {
    console.log("Listado de Productos:");
    for (let i = 0; i < productos_id.length; i++) {
        console.log(`ID: ${productos_id[i]} - Nombre: ${productos_nombre[i]} - Precio: $${productos_precio[i]}`);
    }
}

// Función para buscar producto por id
function buscarProductoPorId(id) { 
    let productoEncontrado = false;
    for (let i = 0; i < productos_id.length; i++) {
        if (productos_id[i]=id){
            console.log(`ID: ${productos_id[i]} - Nombre: ${productos_nombre[i]} - Precio: $${productos_precio[i]}`);
            productoEncontrado = false;
        }
    }

    if (productoEncontrado == false){
        alert(`Producto con ID ${id} no encontrado.`);
    }
}



