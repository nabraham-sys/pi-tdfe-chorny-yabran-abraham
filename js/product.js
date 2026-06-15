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

// leer el id del producto desde la query string
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let id = queryStringObj.get('id');

// seleccionar elementos del DOM
let titulo = document.querySelector(".product-container h1");
let imagen = document.querySelector(".product-container img");
let tags = document.querySelector(".tags");
let marca = document.querySelector("#marca");
let categoria = document.querySelector("#categoria");
let precio = document.querySelector("#precio");
let descripcion = document.querySelector("#descripcion");
let stock = document.querySelector("#stock");
let reviews = document.querySelector(".containerReviews");

// funcion que devuelve los primeros 10 caracteres de una fecha
function formatearFecha(fechaCompleta) {
    let fechaCorta = "";
    for (let i = 0; i < 10; i++) {
        fechaCorta += fechaCompleta[i];
    }
    return fechaCorta;
}

// carga del producto desde la API
fetch(`https://dummyjson.com/products/${id}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        titulo.innerText = data.title;
        imagen.src = data.thumbnail;
        imagen.alt = data.title;

        precio.innerText = "$" + data.price;
        marca.innerText = "Marca: " + data.brand;

        categoria.innerText = data.category;
        categoria.href = "./category.html?name=" + data.category;

        descripcion.innerText = "Descripción: " + data.description;
        stock.innerText = "Stock: " + data.stock;

        // armar tags (hasta 3)
        let etiquetas = "";
        for (let i = 0; i < data.tags.length && i < 3; i++) {
            etiquetas += `<span class="tag"> ${data.tags[i]} </span>`;
        }
        tags.innerHTML = etiquetas;

        // armar reviews
        let html = "<h2>Feedback / Reviews</h2>";
        for (let i = 0; i < data.reviews.length; i++) {
            let review = data.reviews[i];

            let estrellas = "";
            for (let j = 0; j < review.rating; j++) {
                estrellas += "🌟";
            }

            let fechaTexto = formatearFecha(review.date);

            html += `
                <div class="container-review">
                    <p>Cliente: ${review.reviewerName}</p>
                    <p>Puntuación: ${estrellas}</p>
                    <p>Comentario del cliente: ${review.comment}</p>
                    <p>${fechaTexto}</p>
                </div>`;
        }
        reviews.innerHTML = html;
    })
    .catch(function (error) {
        console.log("Se detectó un error", error);
    });
