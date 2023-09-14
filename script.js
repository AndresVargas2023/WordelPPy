const GRID = document.getElementById("grid");
let palabra = "";
let intentos = 6;
const INPUT = document.getElementById("guess-input");
const CONTENEDOR = document.getElementById('guesses'); // Contenedor para mostrar mensajes y la palabra correcta

INPUT.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        intentar();
    }
});

fetch('https://random-word-api.herokuapp.com/word?length=5&lang=es')
    .then(response => response.json())
    .then(data => {
        palabra = data[0].toUpperCase(); // Corrige la asignación de palabra
        console.log(palabra);
    })
    .catch(err => console.error(err));

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    CONTENEDOR.innerHTML = mensaje; // Mostrar el mensaje en el contenedor
}

function crearFilaPalabra(palabra, intento) {
    const ROW = document.createElement('div');
    ROW.className = 'row';

    for (let i = 0; i < palabra.length; i++) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (intento[i] === palabra[i]) {
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = 'green'; // Cambia el fondo a verde si la letra está en el lugar correcto
            SPAN.style.color = 'white';
        } else if (palabra.includes(intento[i])) {
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = 'yellow'; // Cambia el fondo a amarillo si la letra está en la palabra correcta pero no en el lugar correcto
            SPAN.style.color = 'black';
        } else {
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = 'red';
            SPAN.style.color = 'white';
        }
        ROW.appendChild(SPAN);
    }

    return ROW;
}

function intentar() {
    const INTENTO = document.getElementById("guess-input").value.toLowerCase();

    if (INTENTO.length !== 5) {
        alert("Intente de nuevo, debes escribir exactamente 5 letras.");
        return;
    }

    if (INTENTO === palabra.toLowerCase()) {
        terminar("<h1>¡GANASTE!😀</h1>");
        GRID.appendChild(crearFilaPalabra(palabra, palabra));
    } else {
        GRID.appendChild(crearFilaPalabra(palabra, INTENTO));
        intentos--;

        if (intentos === 0) {
            terminar("<h1>¡PERDISTE!😖</h1>");
            mostrarPalabraCorrecta(); // Llamar a mostrarPalabraCorrecta después de los intentos
        }
    }

    document.getElementById("guess-input").value = "";
}

function mostrarPalabraCorrecta() {
    const mensaje = `<p>La palabra correcta era: ${palabra}</p>`;
    CONTENEDOR.insertAdjacentHTML('beforeend', mensaje); // Agregar el mensaje al final del contenedor
}
