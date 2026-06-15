let formulario = document.querySelector(".searchbarform");
let campoBusqueda = document.getElementById("searchbar");

formulario.addEventListener("submit", function(event) {
    let texto = campoBusqueda.value.trim();

    if (texto === "") {
        event.preventDefault();
        alert("El campo de búsqueda no puede estar vacío.");
    } else if (texto.length < 3) {
        event.preventDefault();
        alert("El término buscado debe tener al menos 3 caracteres.");
    }
});

let primeraSeccion = document.getElementById("productos");
let segundaSeccion = document.getElementById("masVendidos");

primeraSeccion.innerHTML = "";

fetch("https://dummyjson.com/products/category/smartphones?limit=10")
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        let productos = data.products;

        for (let i = 0; i < productos.length; i++) {
            let p = productos[i];

            primeraSeccion.innerHTML += `
                <div class="divcate">
                    <img src="${p.thumbnail}" alt="${p.title}" class="produim">
                    <p class="produtit">${p.title}</p>
                    <p class="produdes">${p.description}</p>
                    <p class="produprec">$${p.price}</p>
                    <a href="./product.html?id=${p.id}" class="produinfo">Ver detalle.</a>
                </div>`;
        }
    })
    .catch(function(error) {
        console.log("Error en smartphones:", error);
    });

segundaSeccion.innerHTML = "";

fetch("https://dummyjson.com/products/category/groceries?limit=10")
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        let productos = data.products;

        for (let i = 0; i < productos.length; i++) {
            let p = productos[i];

            segundaSeccion.innerHTML += `
                <div class="divcate">
                    <img src="${p.thumbnail}" alt="${p.title}" class="produim">
                    <p class="produtit">${p.title}</p>
                    <p class="produdes">${p.description}</p>
                    <p class="produprec">$${p.price}</p>
                    <a href="./product.html?id=${p.id}" class="produinfo">Ver detalle.</a>
                </div>`;
        }
    })
    .catch(function(error) {
        console.log("Error en groceries:", error);
    });

let categorias = document.querySelector(".categoryul");

fetch("https://dummyjson.com/products/categories")
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        let categoriasApi = "";

        for (let i = 0; i < data.length; i++) {
            categoriasApi += `<li><a href="./category.html?name=${data[i].slug}">${data[i].name}</a></li>`;
        }

        categorias.innerHTML = categoriasApi;
    })
    .catch(function(error) {
        console.log("Error: " + error);
    });