document.addEventListener('DOMContentLoaded', () => {
    const botonEmpezar = document.querySelector('#boton-empezar');
    const pantallaIntro = document.querySelector('#pantalla-intro');
    const contenidoCuestionario = document.querySelector('#contenido-cuestionario');
    const infoJuego = document.querySelector('#info-juego');
    const textoPregunta = document.querySelector('#texto-pregunta');
    const imagenPregunta = document.querySelector('#imagen-pregunta');
    const contenedorOpciones = document.querySelector('#contenedor-opciones');
    const marcadorPuntaje = document.querySelector('#marcador-puntaje');
    const temporizadorPantalla = document.querySelector('#temporizador-pantalla');
    const pantallaFinal = document.querySelector('#pantalla-final');
    const puntajeFinalPantalla = document.querySelector('#puntaje-final-pantalla');
    const botonReiniciar = document.querySelector('#boton-reiniciar');

    // Variables del juego
    let indicePreguntaActual = 0;
    let puntaje = 0;
    let intervaloTemporizador;
    let tiempoRestante = 60;

    // Preguntas
    const preguntas = [
        {
            pregunta: "1. ¿Qué es un 'Anillo Mágico' en crochet?",
            imagen: "img/preg1.png",
            opciones: ["Un punto decorativo", "Una forma de iniciar una labor en redondo sin agujero central", "Un tipo de aguja", "Una técnica para cambiar de color"],
            respuestaCorrecta: "Una forma de iniciar una labor en redondo sin agujero central"
        },
        {
            pregunta: "2. ¿Cuál es el punto básico más común para tejer una manta simple?",
            imagen: "img/preg2.png",
            opciones: ["Punto deslizado", "Punto alto (vareta)", "Punto bajo (medio punto)", "Punto cadena"],
            respuestaCorrecta: "Punto alto (vareta)"
        },
        {
            pregunta: "3. ¿Qué material se usa tradicionalmente para hacer amigurumis?",
            imagen: "img/preg3.png",
            opciones: ["Rafia", "Hilo de algodón", "Alambre", "Cuerda de yute"],
            respuestaCorrecta: "Hilo de algodón"
        },
        {
            pregunta: "4. ¿Qué herramienta es esencial para unir piezas de crochet sin coser?",
            imagen: "img/preg4.png",
            opciones: ["Tijeras", "Dedal", "Aguja lanera (o de tapicería)", "Marcador de puntos"],
            respuestaCorrecta: "Aguja lanera (o de tapicería)"
        },
        {
            pregunta: "5. ¿Qué significa 'Aum' en un patrón de crochet?",
            imagen: "img/preg5.png",
            opciones: ["Aumentar (hacer dos puntos en uno)", "Disminuir puntos", "Saltar un punto", "Acabar la vuelta"],
            respuestaCorrecta: "Aumentar (hacer dos puntos en uno)"
        },
        {
            pregunta: "6. ¿Cuál es el propósito de un 'marcador de puntos' en crochet?",
            imagen: "img/preg6.png",
            opciones: ["Medir el largo de la labor", "Contar las vueltas automáticamente", "Indicar el inicio de una vuelta o un punto específico", "Cortar el hilo"],
            respuestaCorrecta: "Indicar el inicio de una vuelta o un punto específico"
        },
        {
            pregunta: "7. ¿Qué es una 'cadena al aire' (cadeneta)?",
            imagen: "img/preg7.png",
            opciones: ["Un punto invisible", "La base para empezar la mayoría de las labores", "Un nudo de remate", "Una técnica para hacer bordes festoneados"],
            respuestaCorrecta: "La base para empezar la mayoría de las labores"
        },
        {
            pregunta: "8. ¿Qué indica el número en una aguja de crochet?",
            imagen: "img/preg8.png",
            opciones: ["Su longitud", "El diámetro del gancho", "El color de la aguja", "El material con el que está hecha"],
            respuestaCorrecta: "El diámetro del gancho"
        },
        {
            pregunta: "9. ¿Qué tipo de hilo es recomendable para principiantes por su facilidad de manejo?",
            imagen: "img/preg9.png",
            opciones: ["Hilo muy fino de seda", "Lana gruesa de acrílico", "Hilo metálico", "Cuerda de cáñamo"],
            respuestaCorrecta: "Lana gruesa de acrílico"
        },
        {
            pregunta: "10. ¿Cuál es el punto que se usa para unir dos puntos o cerrar un círculo?",
            imagen: "img/preg10.png",
            opciones: ["Punto bajo", "Punto alto", "Punto deslizado (enano)", "Medio punto alto"],
            respuestaCorrecta: "Punto deslizado (enano)"
        }
    ];

    // Función para iniciar el temporizador
    function iniciarTemporizador() {
        tiempoRestante = 60; // Reiniciar a 60 segundos
        actualizarPantallaTemporizador(); // Mostrar 01:00 al inicio
        intervaloTemporizador = setInterval(() => {
            tiempoRestante--;
            actualizarPantallaTemporizador();

            if (tiempoRestante <= 0) {
                detenerTemporizador();
                terminarJuego(true); // Pasar 'true' para indicar que el juego terminó por tiempo
            }
        }, 1000);
    }

    // Función para actualizar la visualización del temporizador
    function actualizarPantallaTemporizador() {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundosRestantes = tiempoRestante % 60;
        const tiempoFormateado = `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
        temporizadorPantalla.textContent = tiempoFormateado;
    }

    // Función para detener el temporizador
    function detenerTemporizador() {
        clearInterval(intervaloTemporizador);
    }

    // Función para cargar una pregunta
    function cargarPregunta() {
        if (indicePreguntaActual < preguntas.length) {
            const p = preguntas[indicePreguntaActual];
            textoPregunta.textContent = p.pregunta;
            imagenPregunta.src = p.imagen;
            contenedorOpciones.innerHTML = ''; // Limpiar opciones anteriores

            p.opciones.forEach(opcion => {
                const boton = document.createElement('button');
                boton.classList.add('btn', 'boton2', 'rounded-4', 'p-2', 'mb-4', 'option-button');
                boton.textContent = opcion;
                boton.addEventListener('click', () => seleccionarOpcion(opcion, p.respuestaCorrecta));
                contenedorOpciones.appendChild(boton);
            });
        } else {
            terminarJuego(false); // Pasar 'false' para indicar que el juego terminó por preguntas completadas
        }
    }

    // Función cuando se selecciona una opción
    function seleccionarOpcion(opcionSeleccionada, respuestaCorrecta) {
        if (opcionSeleccionada === respuestaCorrecta) {
            puntaje += 3;
        } else {
            puntaje -= 1;
        }
        marcadorPuntaje.textContent = puntaje; // Actualizar la puntuación
        indicePreguntaActual++;
        cargarPregunta(); // Cargar la siguiente pregunta o terminar el juego
    }

    // Función para terminar el juego
    function terminarJuego(tiempoAgotado) {
        detenerTemporizador();
        contenidoCuestionario.style.display = 'none';
        infoJuego.style.display = 'none';
        puntajeFinalPantalla.textContent = puntaje;
        pantallaFinal.style.display = 'block';

        if (tiempoAgotado) {
            document.querySelector('#pantalla-final h2').textContent = '¡Tiempo Agotado!';
            document.querySelector('#pantalla-final .lead').textContent = `Tu puntaje final es: ${puntaje} puntos.`;
        } else {
            document.querySelector('#pantalla-final h2').textContent = '¡Juego Terminado!';
            document.querySelector('#pantalla-final .lead').textContent = `Tu puntaje final es: ${puntaje} puntos.`;
        }
    }

    // Función para reiniciar el juego
    function reiniciarJuego() {
        indicePreguntaActual = 0;
        puntaje = 0;
        tiempoRestante = 60; // Reiniciar el tiempo
        marcadorPuntaje.textContent = puntaje;
        actualizarPantallaTemporizador(); // Mostrar 01:00 al reiniciar
        pantallaFinal.style.display = 'none';
        pantallaIntro.style.display = 'block'; // Volver a la pantalla de inicio
        // Restaurar el título de la pantalla final por si se cambió por "Tiempo Agotado"
        document.querySelector('#pantalla-final h2').textContent = '¡Juego Terminado!';
    }

    // Event Listeners
    botonEmpezar.addEventListener('click', () => {
        pantallaIntro.style.display = 'none';
        contenidoCuestionario.style.display = 'block';
        infoJuego.style.display = 'flex'; // Usar flex para los elementos en línea
        iniciarTemporizador();
        cargarPregunta();
    });

    botonReiniciar.addEventListener('click', reiniciarJuego);

    // Inicializar el display del temporizador al cargar la página
    actualizarPantallaTemporizador();
});