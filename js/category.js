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
            categoriasApi += <li class="categorili"><a href="./category.html?name=${data[i].slug}" class="categorya">${data[i].name}</a></li>;
        }

        categorias.innerHTML = categoriasApi;
    })
    .catch(function (error) {
        console.log("Error: " + error);
    });

// carga de productos de la categoria seleccionada, leida desde la querystring
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let categoriaSeleccionada = queryStringObj.get('name');

let titulo = document.querySelector("#categoriaTitulo");
titulo.innerText = categoriaSeleccionada;

let contenedor = document.querySelector(".products");

fetch(`https://dummyjson.com/products/category/${categoriaSeleccionada}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.products.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron productos en esta categoría.</p>";
            return;
        }

        let html = "";
        for (let i = 0; i < data.products.length; i++) {
            let producto = data.products[i];
            html += `
                <div class="divcate cateprod">
                    <img src="${producto.thumbnail}" alt="${producto.title}" class="produim">
                    <p class="produtit">${producto.title}</p>
                    <p class="produdes">${producto.description}</p>
                    <p class="produprec">$${producto.price}</p>
                    <a href="./product.html?id=${producto.id}" class="produinfo">Ver detalle.</a>
                </div>`;
        }
        contenedor.innerHTML = html;
    })
    .catch(function (error) {
        console.log("Se detectó un error", error);
    });