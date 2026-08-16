const parametros = new URLSearchParams(window.location.search);

const nombreCategoria = parametros.get("nombre");

document.getElementById("titulo-categoria").textContent = nombreCategoria;

const lista = document.getElementById("lista-cantos");

const buscador = document.getElementById("buscador");

// Buscar cantos de esta categoría

const cantosFiltrados = cantos.filter(canto => {

    if (Array.isArray(canto.categorias)) {

        return canto.categorias.includes(nombreCategoria);

    }

    return canto.categoria === nombreCategoria;

});

// Mostrar cantos

function mostrarCantos(listaCantos) {

    lista.innerHTML = "";

    if (listaCantos.length === 0) {

        lista.innerHTML = `
            <p>No hay cantos en esta categoría.</p>
        `;

        return;
    }

    listaCantos.forEach(canto => {

        const tarjeta = document.createElement("div");

        tarjeta.className = "tarjeta";

        tarjeta.textContent = canto.titulo;

        const indice = cantos.indexOf(canto);

        tarjeta.addEventListener("click", () => {

            window.location.href = `canto.html?id=${indice}`;

        });

        lista.appendChild(tarjeta);

    });

}

// Mostrar todos al entrar

mostrarCantos(cantosFiltrados);

// BUSCADOR

buscador.addEventListener("input", () => {

    const texto = buscador.value
        .toLowerCase()
        .trim();

    const resultados = cantosFiltrados.filter(canto =>

        canto.titulo
            .toLowerCase()
            .includes(texto)

    );

    mostrarCantos(resultados);

});