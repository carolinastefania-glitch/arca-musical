const parametros = new URLSearchParams(window.location.search);

const id = Number(parametros.get("id"));
const canto = cantos[id];


// =========================
// INFORMACIÓN DEL CANTO
// =========================

document.getElementById("titulo-canto").textContent = canto.titulo;
document.getElementById("tono").textContent = canto.tono;
document.getElementById("capo").textContent = canto.capo;
document.getElementById("autor").textContent = canto.autor;


// =========================
// MOSTRAR LETRA Y ACORDES
// =========================

function esLineaDeAcordes(texto) {
    const linea = texto.trim();

    if (!linea) {
        return false;
    }

    const patronAcorde =
        /^[A-G](?:#|b)?(?:m|maj7|maj|min|sus2|sus4|sus|dim|aug|add9|7|9|11|13)?(?:\/[A-G](?:#|b)?)?$/;

    const partes = linea.split(/\s+/);

    return partes.length > 0 &&
        partes.every(parte => patronAcorde.test(parte));
}


function crearLinea(clase, texto) {
    const linea = document.createElement("div");

    linea.className = clase;

    // textContent evita que se creen saltos de línea invisibles
    // por la indentación del código.
    linea.textContent = texto;

    return linea;
}


function construirLetra() {
    const mostrarAcordes =
        document.getElementById("mostrar-acordes").checked;

    const contenedor = document.getElementById("contenido-canto");

    contenedor.innerHTML = "";

    const bloque = document.createElement("div");
    bloque.className = "bloque";

    const letraCanto = document.createElement("div");
    letraCanto.className = "letra-canto";

    const lineas = canto.letra
        .split("\n")
        .map(linea => linea.replace(/\r/g, ""));

    let indice = 0;

    while (indice < lineas.length) {
        const lineaActual = lineas[indice];

        // Si esta línea contiene acordes, busca su siguiente
        // línea de letra. Los espacios vacíos entre ambas no
        // se muestran: así quedan pegadas como en un cancionero.
        if (esLineaDeAcordes(lineaActual)) {
            let indiceLetra = indice + 1;

            while (
                indiceLetra < lineas.length &&
                lineas[indiceLetra].trim() === ""
            ) {
                indiceLetra++;
            }

            const siguienteLinea = lineas[indiceLetra];

            if (
                indiceLetra < lineas.length &&
                !esLineaDeAcordes(siguienteLinea)
            ) {
                const pareja = document.createElement("div");
                pareja.className = "pareja-acorde-letra";

                if (mostrarAcordes) {
                    pareja.appendChild(
                        crearLinea("linea-acordes", lineaActual)
                    );
                }

                pareja.appendChild(
                    crearLinea("linea-letra", siguienteLinea)
                );

                letraCanto.appendChild(pareja);
                indice = indiceLetra + 1;
                continue;
            }

            // Por seguridad, si un acorde no tiene una letra
            // debajo, igual se muestra sin romper el canto.
            if (mostrarAcordes) {
                letraCanto.appendChild(
                    crearLinea("linea-acordes", lineaActual)
                );
            }

            indice++;
            continue;
        }

        // Conserva los espacios entre estrofas.
        if (lineaActual.trim() === "") {
            letraCanto.appendChild(
                crearLinea("linea-vacia", "")
            );
        } else {
            letraCanto.appendChild(
                crearLinea("linea-letra", lineaActual)
            );
        }

        indice++;
    }

    bloque.appendChild(letraCanto);
    contenedor.appendChild(bloque);
}


// Mostrar inicialmente
construirLetra();


// Mostrar u ocultar acordes
document
    .getElementById("mostrar-acordes")
    .addEventListener("change", construirLetra);


// =========================
// FAVORITO
// =========================

const btnFavorito =
    document.getElementById("btn-favorito");

let favoritos =
    JSON.parse(localStorage.getItem("favoritos")) || [];

canto.favorito = favoritos.includes(id);

actualizarFavorito();


btnFavorito.addEventListener("click", () => {
    canto.favorito = !canto.favorito;

    favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    if (canto.favorito) {
        if (!favoritos.includes(id)) {
            favoritos.push(id);
        }
    } else {
        favoritos = favoritos.filter(favoritoId => favoritoId !== id);
    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    actualizarFavorito();
});


function actualizarFavorito() {
    btnFavorito.textContent =
        canto.favorito
            ? "⭐ Favorito"
            : "☆ Favorito";
}


// =========================
// AUDIO
// =========================

document
    .getElementById("btn-audio")
    .addEventListener("click", () => {
        if (canto.audio && canto.audio.trim() !== "") {
            window.open(canto.audio, "_blank");
        } else {
            alert(
                "Este canto aún no tiene un audio de referencia."
            );
        }
    });


// =========================
// NOTAS
// =========================

const modal =
    document.getElementById("modal-notas");

const textoNotas =
    document.getElementById("texto-notas");


document
    .getElementById("btn-notas")
    .addEventListener("click", () => {
        textoNotas.textContent =
            canto.notas && canto.notas.trim() !== ""
                ? canto.notas
                : "Este canto no tiene notas registradas.";

        modal.style.display = "flex";
    });


document
    .getElementById("cerrar-modal")
    .addEventListener("click", () => {
        modal.style.display = "none";
    });


modal.addEventListener("click", evento => {
    if (evento.target === modal) {
        modal.style.display = "none";
    }
});