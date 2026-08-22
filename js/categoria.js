const parametros = new URLSearchParams(window.location.search);

const nombreCategoria = parametros.get("nombre");

document.getElementById("titulo-categoria").textContent = nombreCategoria;

const lista = document.getElementById("lista-cantos");

const buscador = document.getElementById("buscador");

// ------------------------------------
// FILTRAR CANTOS
// ------------------------------------

function perteneceACategoria(canto, nombre) {

    // Categoría principal
    if (canto.categoria === nombre) {
        return true;
    }

    // Varias categorías
    if (
        Array.isArray(canto.categorias) &&
        canto.categorias.includes(nombre)
    ) {
        return true;
    }

    // Tiempo litúrgico
    if (canto.tiempoLiturgico === nombre) {
        return true;
    }

    // Celebración especial
    if (canto.celebracionEspecial === nombre) {
        return true;
    }

    return false;
}


// ------------------------------------
// OBTENER CANTOS DE LA CATEGORÍA
// ------------------------------------

const cantosFiltrados = cantos.filter(canto =>
    perteneceACategoria(canto, nombreCategoria)
);


// ------------------------------------
// MOSTRAR CANTOS
// ------------------------------------

function mostrarCantos(listaCantos) {

    lista.innerHTML = "";

    if (listaCantos.length === 0) {

        lista.innerHTML = `
            <p style="
                color:#aaa;
                font-size:18px;
                margin-top:30px;
            ">
                No hay cantos registrados en esta categoría todavía.
            </p>
        `;

        return;
    }

    listaCantos.forEach((canto) => {

        const tarjeta = document.createElement("div");

        tarjeta.className = "tarjeta";

        tarjeta.textContent = canto.titulo;

        const indice = cantos.indexOf(canto);

        tarjeta.addEventListener("click", () => {

            window.location.href =
                `canto.html?id=${indice}`;

        });

        lista.appendChild(tarjeta);

    });

}


// ------------------------------------
// MOSTRAR AL ABRIR
// ------------------------------------

mostrarCantos(cantosFiltrados);


// ------------------------------------
// BUSCADOR
// ------------------------------------

if (buscador) {

    buscador.addEventListener("input", () => {

        const texto =
            buscador.value.toLowerCase().trim();

        const resultados = cantosFiltrados.filter(canto =>
            canto.titulo.toLowerCase().includes(texto)
        );

        mostrarCantos(resultados);

    });

}