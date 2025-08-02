// ------------- Validación de Formulario -------------

(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')
    
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }
    
            form.classList.add('was-validated')
        }, false)
    })
})()

// ------------- Modales en Galeria -------------

document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los botones que abren el modal de la galería
    const verMasBtns = document.querySelectorAll('.ver-mas-btn');
    
    // Selecciona los elementos del modal que vamos a actualizar
    const modalTitulo = document.getElementById('modalTitulo');
    const modalAutor = document.getElementById('modalAutor');
    const modalImagen = document.getElementById('modalImagen');
    const modalDescripcion = document.getElementById('modalDescripcion');

    // Recorre todos los botones y añade el contenido
    verMasBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Obtenemos los datos de los atributos del botón que fue clickeado
            const src = this.getAttribute('data-src');
            const titulo = this.getAttribute('data-titulo');
            const autor = this.getAttribute('data-autor');
            const descripcion = this.getAttribute('data-descripcion');

            // Actualizamos el contenido del modal único
            modalTitulo.textContent = titulo;
            modalAutor.textContent = `- hecho por ${autor}`;
            modalImagen.src = src;
            modalImagen.alt = titulo;
            modalDescripcion.textContent = descripcion;
        });
    });
});