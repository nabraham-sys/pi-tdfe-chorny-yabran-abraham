// boton de busqueda del header
let formulario = document.querySelector(".searchbarform");
let campoBusqueda = document.querySelector("#searchbar");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    let texto = campoBusqueda.value;

    if (texto === "") {
        alert("El campo de búsqueda no puede estar vacío.");
        return;
    }

    if (texto.length < 3) {
        alert("El término buscado debe tener al menos 3 caracteres.");
        return;
    }

    localStorage.setItem('productoBuscado', texto);
    window.location.href = './search-results.html';
});

// carga de categorias en el aside desde la api
let categorias = document.querySelector(".categoryul");

fetch("https://dummyjson.com/products/categories")
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        let categoriasApi = "";

        for (let i = 0; i < data.length; i++) {
            categoriasApi += `<li class="categorili"><a href="./category.html?name=${data[i].slug}" class="categorya">${data[i].name}</a></li>`;
        }

        categorias.innerHTML = categoriasApi;
    })
    .catch(function (error) {
        console.log("Error: " + error);
    });

// primera seccion: smartphones
let primeraSeccion = document.querySelector("#productos");

fetch("https://dummyjson.com/products/category/smartphones?limit=10")
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        let productos = data.products;
        let html = "";

        for (let i = 0; i < productos.length; i++) {
            let p = productos[i];

            html += `
                <div class="divcate">
                    <img src="${p.thumbnail}" alt="${p.title}" class="produim">
                    <p class="produtit">${p.title}</p>
                    <p class="produdes">${p.description}</p>
                    <p class="produprec">$${p.price}</p>
                    <a href="./product.html?id=${p.id}" class="produinfo">Ver detalle.</a>
                </div>`;
        }

        primeraSeccion.innerHTML = html;
    })
    .catch(function (error) {
        console.log("Error en smartphones:", error);
    });

// segunda seccion: groceries
let segundaSeccion = document.querySelector("#masVendidos");

fetch("https://dummyjson.com/products/category/groceries?limit=10")
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        let productos = data.products;
        let html = "";

        for (let i = 0; i < productos.length; i++) {
            let p = productos[i];

            html += `
                <div class="divcate">
                    <img src="${p.thumbnail}" alt="${p.title}" class="produim">
                    <p class="produtit">${p.title}</p>
                    <p class="produdes">${p.description}</p>
                    <p class="produprec">$${p.price}</p>
                    <a href="./product.html?id=${p.id}" class="produinfo">Ver detalle.</a>
                </div>`;
        }

        segundaSeccion.innerHTML = html;
    })
    .catch(function (error) {
        console.log("Error en groceries:", error);
    });
