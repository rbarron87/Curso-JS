
// Clase para gestion de tipologias productivas
class Tipologia {
    constructor(nombre, pondDM, pondDE, pondIA, pondEP, pondPA, pondBL, pondAFM, pondAFE, pondEN){
        this.nombre = nombre,
        this.pondDM = pondDM,
        this.pondDE = pondDE,
        this.pondIA = pondIA,
        this.pondEP = pondEP,
        this.pondPA = pondPA,
        this.pondBL = pondBL,
        this.pondAFM = pondAFM,
        this.pondAFE = pondAFE,
        this.pondEN = pondEN
    }
}
// Clase para gestion de proyectos
class Proyecto {
    constructor(numero, cliente, descripcion){
        this.numero = numero,
        this.cliente = cliente,
        this.descripcion = descripcion
    }
}
// Clase para gestion de equipos
class Equipo {
    constructor(nombre, proyecto, tipologia, valorProductivo, responsable){
        this.nombre = nombre,
        this.proyecto = proyecto,
        this.tipologia = tipologia,
        this.valorProductivo = valorProductivo,
        this.valorResponsable = responsable
    }
}

// Inicializar Tipologias
let arrayTipologias = JSON.parse(localStorage.getItem('arrayTipologias')) || [];
if (arrayTipologias.length === 0){
    let iniciarTipologias = new Tipologia('Equipo Generico', 10, 10, 5, 10, 10, 10, 20, 20, 5);
    arrayTipologias.push(iniciarTipologias);
    // Guardar el array actualizado en localStorage
    localStorage.setItem('arrayTipologias', JSON.stringify(arrayTipologias));
}

// Inicializar Proyectos
let arrayProyectos = JSON.parse(localStorage.getItem('arrayProyectos')) || [];
if (arrayProyectos.length === 0){
    let iniciarProyectos = new Proyecto('P123145', 'Cliente', 'Descripcion');
    arrayProyectos.push(iniciarProyectos);
    // Guardar el array actualizado en localStorage
    localStorage.setItem('arrayProyectos', JSON.stringify(arrayProyectos));
}
localStorage.setItem('secuencialProyectos', 1);

// Función para manejar el envío del formulario
function agregarTipologia(event) {
    event.preventDefault();

    // Obtener valores del formulario
    let nombre = document.getElementById('nombre').value;
    let pondDM = parseFloat(document.getElementById('pondDM').value);
    let pondDE = parseFloat(document.getElementById('pondDE').value);
    let pondIA = parseFloat(document.getElementById('pondIA').value);
    let pondEP = parseFloat(document.getElementById('pondEP').value);
    let pondPA = parseFloat(document.getElementById('pondPA').value);
    let pondBL = parseFloat(document.getElementById('pondBL').value);
    let pondAFM = parseFloat(document.getElementById('pondAFM').value);
    let pondAFE = parseFloat(document.getElementById('pondAFE').value);
    let pondEN = parseFloat(document.getElementById('pondEN').value);
    
    // Recuperar el array de localStorage o inicializarlo si no existe
    let arrayTipologias = JSON.parse(localStorage.getItem('arrayTipologias')) || [];

    let tipologiaExistente = arrayTipologias.find(tipologia => tipologia.nombre === nombre);
    if (tipologiaExistente) {
        // Mostrar mensaje de error
        let mensaje = document.getElementById('mensaje');
        mensaje.innerHTML = `<p>Tipología "${nombre}" ya existe.</p>`;
        return; // Detener la ejecución de la función
    }

    if ((pondDM+pondDE+pondIA+pondEP+pondPA+pondBL+pondAFM+pondAFE+pondEN)!==100){
        // Mostrar mensaje de error
        let mensaje = document.getElementById('mensaje');
        mensaje.innerHTML = `<p>Suma de ponderaciones debe ser igual a 100%.</p>`;
    }else{
        // Crear una nueva instancia de Tipologia
        const nuevaTipologia = new Tipologia(nombre, pondDM, pondDE, pondIA, pondEP, pondPA, pondBL, pondAFM, pondAFE, pondEN);

        // Agregar la nueva tipología al array
        arrayTipologias.push(nuevaTipologia);

        // Guardar el array actualizado en localStorage
        localStorage.setItem('arrayTipologias', JSON.stringify(arrayTipologias));

        // Limpiar el formulario
        document.getElementById('formularioTipologias').reset();

        // Mostrar mensaje de éxito
        let mensaje = document.getElementById('mensaje');
        mensaje.innerHTML = `<p>Tipología "${nombre}" agregada correctamente.</p>`;

        // Actualizar la lista de tipologías en el HTML
        actualizarListaTipologias();
    }
}

// Función para manejar el envío del formulario
function agregarEquipo(event) {
    event.preventDefault();

    // Obtener valores del formulario
    let nombre = document.getElementById('nombre').value;
    let proyecto = document.getElementById('proyecto').value;
    let tipologia = document.getElementById('tipologia').value;
    let valorProductivo = parseFloat(document.getElementById('valorProductivo').value);
    
    // Recuperar el array de localStorage o inicializarlo si no existe
    let arrayTipologias = JSON.parse(localStorage.getItem('arrayTipologias')) || [];
    // Recuperar el array de localStorage o inicializarlo si no existe
    let arrayProyectos = JSON.parse(localStorage.getItem('arrayProyectos')) || [];
    // Recuperar el array de localStorage o inicializarlo si no existe
    let arrayEquipos = JSON.parse(localStorage.getItem('arrayEquipos')) || [];

    let tipologiaExistente = arrayTipologias.find(tipologias => tipologias.nombre === tipologia);
    let proyectoExistente = arrayProyectos.find(proyectos => proyectos.numero === proyecto);

    // Mostrar mensaje de error
    let mensaje = document.getElementById('mensaje');

    if (!tipologiaExistente){
        mensaje.innerHTML = `<p>Topologia no exxiste.</p>`;
    }else if(!proyectoExistente){
        mensaje.innerHTML = `<p>Proyecto no existe.</p>`;
    }else{
        // Crear una nueva instancia de Tipologia
        const nuevoEquipo = new Equipo(nombre, proyecto, tipologia, valorProductivo,'---');

        // Agregar la nueva tipología al array
        arrayEquipos.push(nuevoEquipo);

        // Guardar el array actualizado en localStorage
        localStorage.setItem('arrayEquipos', JSON.stringify(arrayEquipos));

        // Limpiar el formulario
        document.getElementById('formularioEquipos').reset();

        // Mostrar mensaje de éxito
        let mensaje = document.getElementById('mensaje');
        mensaje.innerHTML = `<p>Equipo "${nombre}" agregada correctamente.</p>`;

        // Actualizar la lista de Equipos en el HTML
        actualizarListaEquipos();
    }
}

// Función para manejar el envío del formulario
function agregarProyecto(event) {
    event.preventDefault();
    // Obtener valores del formulario
    let cliente = document.getElementById('cliente').value;
    let descripcion = document.getElementById('descripcion').value;
    let secuencial = parseInt(localStorage.getItem('secuencialProyectos')) + 1;
    // Recuperar el array de localStorage o inicializarlo si no existe
    let arrayProyectos = JSON.parse(localStorage.getItem('arrayProyectos')) || [];
    let numero = 'P' + completarCeros(secuencial,6);
    const nuevoProyecto = new Proyecto(numero, cliente, descripcion);
    // Agregar la nueva tipología al array
    arrayProyectos.push(nuevoProyecto);
    // Guardar el array actualizado en localStorage
    localStorage.setItem('arrayProyectos', JSON.stringify(arrayProyectos));
    localStorage.setItem('secuencialProyectos', secuencial);
    // Limpiar el formulario
    document.getElementById('formularioProyectos').reset();
    // Mostrar mensaje de éxito
    let mensaje = document.getElementById('mensaje');
    mensaje.innerHTML = `<p>Proyecto ${numero} - ${cliente} - ${descripcion} agregado correctamente.</p>`;
    // Actualizar la lista de tipologías en el HTML
    actualizarListaProyectos();
}

// Función para actualizar la lista de tipologías en el HTML
function actualizarListaTipologias() {
    let arrayTipologias = JSON.parse(localStorage.getItem('arrayTipologias')) || [];
    let tablaBody = document.getElementById('tablaBody');
    tablaBody.innerHTML = '';
    arrayTipologias.forEach(datosFila => {
        let nuevaFila = `
                <tr>
                    <td class="nombreTipologia">${datosFila.nombre}</td>
                    <td>${datosFila.pondDM}%</td>
                    <td>${datosFila.pondDE}%</td>
                    <td>${datosFila.pondIA}%</td>
                    <td>${datosFila.pondEP}%</td>
                    <td>${datosFila.pondPA}%</td>
                    <td>${datosFila.pondBL}%</td>
                    <td>${datosFila.pondAFM}%</td>
                    <td>${datosFila.pondAFE}%</td>
                    <td>${datosFila.pondEN}%</td>
                </tr>
            `;
            // Agregar la nueva fila al cuerpo de la tabla
            tablaBody.innerHTML += nuevaFila;
    });
}

// // Función para actualizar la lista de equipos en el HTML
function actualizarListaEquipos() {
    let arrayEquipos = JSON.parse(localStorage.getItem('arrayEquipos')) || [];
    let arrayTipologias = JSON.parse(localStorage.getItem('arrayTipologias')) || [];
    let tablaBody = document.getElementById('tablaBody');
    tablaBody.innerHTML = ''; // Limpiar la lista antes de actualizar

    arrayEquipos.forEach(datosFila => {
        let tipologiaEquipo = arrayTipologias.find(tipologia => tipologia.nombre === datosFila.tipologia);
        let nuevaFila = `
                <tr>
                    <td class="proyectoEquipo">${datosFila.proyecto}</td>
                    <td class="nombreEquipo">${datosFila.nombre}</td>
                    <td class="tipologiaEquipo">${datosFila.tipologia}</td>
                    <td>${parseFloat(datosFila.valorProductivo) * parseFloat(tipologiaEquipo.pondDM)/100}</td>
                    <td>${parseFloat(datosFila.valorProductivo) * parseFloat(tipologiaEquipo.pondDE)/100}</td>
                    <td>${parseFloat(datosFila.valorProductivo) * parseFloat(tipologiaEquipo.pondIA)/100}</td>
                    <td>${parseFloat(datosFila.valorProductivo) * parseFloat(tipologiaEquipo.pondEP)/100}</td>
                    <td>${parseFloat(datosFila.valorProductivo) * parseFloat(tipologiaEquipo.pondPA)/100}</td>
                    <td>${parseFloat(datosFila.valorProductivo) * parseFloat(tipologiaEquipo.pondBL)/100}</td>
                    <td>${parseFloat(datosFila.valorProductivo) * parseFloat(tipologiaEquipo.pondAFM)/100}</td>
                    <td>${parseFloat(datosFila.valorProductivo) * parseFloat(tipologiaEquipo.pondAFE)/100}</td>
                    <td>${parseFloat(datosFila.valorProductivo) * parseFloat(tipologiaEquipo.pondEN)/100}</td>
                </tr>
            `;

            // Agregar la nueva fila al cuerpo de la tabla
            tablaBody.innerHTML += nuevaFila;
    });
}

// Función para actualizar la lista de equipos en el HTML
function actualizarListaProyectos() {
    let arrayProyectos = JSON.parse(localStorage.getItem('arrayProyectos')) || [];
    let tablaBody = document.getElementById('tablaBody');
    tablaBody.innerHTML = ''; // Limpiar la lista antes de actualizar

    arrayProyectos.forEach(datosFila => {
        let nuevaFila = `
                <tr>
                    <td>${datosFila.numero}</td>
                    <td>${datosFila.cliente}</td>
                    <td>${datosFila.descripcion}</td>
                </tr>
            `;

            // Agregar la nueva fila al cuerpo de la tabla
            tablaBody.innerHTML += nuevaFila;
    });
}

//EVENTOS
// // Asociar el evento submit del formulario a la función agregarTipologia
if (window.location.pathname.endsWith('tipologias.html')) {
    document.getElementById('formularioTipologias').addEventListener('submit',agregarTipologia);
    // Agregar la tipologia cuando el foco se pierde del formulario
    document.getElementById('formularioTipologias').addEventListener('blur', function() {
        if (window.location.pathname.endsWith('tipologias.html')) {
        document.getElementById('formularioTipologias').requestSubmit();
        }
    }, true);
    
} else if (window.location.pathname.endsWith('equipos.html')) {
    document.getElementById('formularioEquipos').addEventListener('submit',agregarEquipo);
} else if (window.location.pathname.endsWith('proyectos.html')) {
    document.getElementById('formularioProyectos').addEventListener('submit',agregarProyecto);
}
// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('tipologias.html')) {
        actualizarListaTipologias();
    } else if (window.location.pathname.endsWith('equipos.html')) {
        actualizarListaEquipos();
    } else if (window.location.pathname.endsWith('proyectos.html')) {
        actualizarListaProyectos();
    }
});

//FUNCIONES AUXILIARES
function completarCeros(number, ancho) {
    var numberSalida = Math.abs(number); /* Valor absoluto del número */
    var largo = number.toString().length; /* Largo del número */ 
    var cero = "0"; /* String de cero */  
    return ((cero.repeat(ancho - largo)) + numberSalida.toString()); 
}
