const contenedor = document.getElementById("partes-misa");

const buscador = document.getElementById("buscador");

// =========================
// CATEGORÍAS
// =========================

datos.categorias.forEach(categoria => {

    const tarjeta = document.createElement("div");

    tarjeta.className = "tarjeta";

    tarjeta.textContent = categoria.nombre;

    tarjeta.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.65)),
        url("img/${categoria.imagen}.jpg")`;

    tarjeta.addEventListener("click", () => {

        window.location.href =
            `categoria.html?nombre=${encodeURIComponent(categoria.nombre)}`;

    });

    contenedor.appendChild(tarjeta);

});


// =========================
// BUSCADOR PRINCIPAL
// =========================

buscador.addEventListener("input", () => {

    const texto = buscador.value
        .toLowerCase()
        .trim();

    if (texto === "") {

        document.getElementById("resultados-busqueda").innerHTML = "";

        return;

    }

    const resultados = cantos.filter(canto =>

        canto.titulo
            .toLowerCase()
            .includes(texto)

    );

    mostrarResultados(resultados);

});


// =========================
// MOSTRAR RESULTADOS
// =========================

function mostrarResultados(resultados) {

    const contenedorResultados =
        document.getElementById("resultados-busqueda");

    contenedorResultados.innerHTML = "";

    if (resultados.length === 0) {

        contenedorResultados.innerHTML =
            "<p>No encontramos ningún canto.</p>";

        return;

    }

    resultados.forEach(canto => {

        const tarjeta = document.createElement("div");

        tarjeta.className = "tarjeta";

        tarjeta.textContent = canto.titulo;

        const indice = cantos.indexOf(canto);

        tarjeta.addEventListener("click", () => {

            window.location.href =
                `canto.html?id=${indice}`;

        });

        contenedorResultados.appendChild(tarjeta);

    });

}