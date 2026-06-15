// leer el id del producto desde la query string
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let id = queryStringObj.get('id');

// seleccionar elementos del DOM
let titulo = document.querySelector(".product-container h1");
let imagen = document.querySelector(".product-container img");
let tags = document.querySelector(".tags");
let categorias = document.querySelector("#categoria");
let precio = document.querySelector("#precio");
let descripcion = document.querySelector("#descripcion");
let stock = document.querySelector("#stock");
let coments = document.querySelector(".containerReviews");
let formulario = document.querySelector(".searchbarform");
let campoBusqueda = document.querySelector("#textSearch");

// funcion que devuelve los primeros 10 caracteres de una fecha
function formatearFecha(fechaCompleta) {
    let fechaCorta = "";
    for (let i = 0; i < 10; i++) {
        fechaCorta += fechaCompleta[i];
    }
    return fechaCorta;
}

// formulario de busqueda del header
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    let texto = campoBusqueda.value;

    if (texto === "") {
        alert("El campo de búsqueda no puede estar vacío.");
        return;
    }

    localStorage.setItem('productoBuscado', texto);
    window.location.href = './search-results.html';
});

// carga del producto desde la API
fetch(`https://dummyjson.com/products/${id}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        titulo.innerText = data.title;
        imagen.src = data.thumbnail;
        imagen.alt = data.title;

        precio.innerText = "$" + data.price;
        categorias.innerText = data.category;
        localStorage.setItem('categoriaSeleccionada', data.category);
        categorias.href = "./category.html";

        descripcion.innerText = "Descripcion: " + data.description;
        stock.innerText = "Stock: " + data.stock;

        // armar tags
        let etiquetas = "";
        for (let i = 0; i < data.tags.length; i++) {
            etiquetas += `<span class="tag"> ${data.tags[i]} </span>`;
        }
        tags.innerHTML = etiquetas;

        // armar reviews
        let html = "";
        for (let i = 0; i < data.reviews.length; i++) {
            let review = data.reviews[i];

            let estrellas = "";
            for (let j = 0; j < review.rating; j++) {
                estrellas += "🌟";
            }

            let fechaTexto = "";
            if (review.date) {
                fechaTexto = formatearFecha(review.date);
            }

            html += `
                <div class="container-review">
                    <p>Cliente: ${review.reviewerName}</p>
                    <p>Puntuación: ${estrellas}</p>
                    <p>Comentario del cliente: ${review.comment}</p>
                    <p>${fechaTexto}</p>
                </div>`;
        }
        coments.innerHTML = html;
    })
    .catch(function(error) {
        console.log("Se detectó un error", error);
    });