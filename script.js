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

function revelarPalabraCorrecta() {
    const mensaje = `<p>La palabra correcta era: ${palabra}</p>`;
    CONTENEDOR.insertAdjacentHTML('beforeend', mensaje); // Agregar el mensaje al final del contenedor
    console.log(`<p>La palabra correcta era: ${palabra}</p>`);
}

function crearFilaPalabra(palabra, intento) {
    const ROW = document.createElement('div');
    ROW.className = 'row';

    for (let i = 0; i < palabra.length; i++) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (intento[i] === palabra[i]) {
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = 'green';
            SPAN.style.color = 'white';
        } else if (palabra.includes(intento[i])) {
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = 'white';
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
    const INTENTO = document.getElementById("guess-input").value.toUpperCase();

    if (INTENTO.length !== 5) {
        alert("Intente de nuevo, debes escribir exactamente 5 letras.");
        return;
    }

    if (INTENTO === palabra) {
        terminar("<h1>¡GANASTE!😀</h1>");
        GRID.appendChild(crearFilaPalabra(palabra, INTENTO));
    } else {
        GRID.appendChild(crearFilaPalabra(palabra, INTENTO));
        intentos--;

        if (intentos === 0) {
            revelarPalabraCorrecta();
            terminar("<h1>¡PERDISTE!😖</h1>");
            document.getElementById("guess-input").value = "";
        }
    }
}
