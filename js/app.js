const buscador = document.getElementById("buscador");


// =====================================================
// FUNCIÓN PARA CREAR UNA TARJETA
// =====================================================

function crearTarjeta(categoria) {

    const tarjeta = document.createElement("div");

    tarjeta.className = "tarjeta";

    tarjeta.textContent = categoria.nombre;

    tarjeta.addEventListener("click", () => {

        window.location.href =
            `categoria.html?nombre=${encodeURIComponent(categoria.nombre)}`;

    });

    return tarjeta;

}


// =====================================================
// PARTES DE LA MISA
// =====================================================

const contenedorPartes =
    document.getElementById("partes-misa");

datos.categorias.forEach(categoria => {

    const tarjeta = crearTarjeta(categoria);

    contenedorPartes.appendChild(tarjeta);

});


// =====================================================
// TIEMPOS LITÚRGICOS
// =====================================================

const contenedorTiempos =
    document.getElementById("tiempos-liturgicos");

datos.tiemposLiturgicos.forEach(tiempo => {

    const tarjeta = crearTarjeta(tiempo);

    contenedorTiempos.appendChild(tarjeta);

});


// =====================================================
// CELEBRACIONES ESPECIALES
// =====================================================

const contenedorCelebraciones =
    document.getElementById("celebraciones");

datos.celebraciones.forEach(celebracion => {

    const tarjeta = crearTarjeta(celebracion);

    contenedorCelebraciones.appendChild(tarjeta);

});


// =====================================================
// BUSCADOR PRINCIPAL
// =====================================================

buscador.addEventListener("input", () => {

    const texto =
        buscador.value.toLowerCase().trim();

    const resultados =
        document.getElementById("resultados-busqueda");

    if (texto === "") {

        resultados.innerHTML = "";

        return;

    }

    const encontrados = cantos.filter(canto =>

        canto.titulo
            .toLowerCase()
            .includes(texto)

    );

    mostrarResultados(encontrados);

});


// =====================================================
// MOSTRAR RESULTADOS DEL BUSCADOR
// =====================================================

function mostrarResultados(resultados) {

    const contenedor =
        document.getElementById("resultados-busqueda");

    contenedor.innerHTML = "";

    if (resultados.length === 0) {

        contenedor.innerHTML =
            "<p>No encontramos ningún canto.</p>";

        return;

    }

    resultados.forEach(canto => {

        const tarjeta =
            document.createElement("div");

        tarjeta.className = "tarjeta";

        tarjeta.textContent = canto.titulo;

        const indice =
            cantos.indexOf(canto);

        tarjeta.addEventListener("click", () => {

            window.location.href =
                `canto.html?id=${indice}`;

        });

        contenedor.appendChild(tarjeta);

    });

}