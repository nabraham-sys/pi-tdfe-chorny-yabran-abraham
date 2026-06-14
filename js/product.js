let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let id = queryStringObj.get('id');

let titulo = document.querySelector(".product-container h1");
let imagen = document.querySelector(".product-container img");
let tags = document.querySelector(".tags");
let info = document.querySelector(".product-info");
let categorias = document.querySelector("#categoria");
let precio = document.querySelector("#precio");
let descripcion = document.querySelector("#descripcion");
let stock = document.querySelector("#stock");
let coments = document.querySelector(".containerReviews");
let formulario = document.querySelector(".searchbarform");
let campoBusqueda = document.querySelector("#textSearch");

//boton de busqueda
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
//carga del producto buscado
fetch(`https://dummyjson.com/products/${id}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.length === 0) {
            info.innerHTML = "<p>Producto no encontrado.</p>";
            return;
        }

        titulo.textContent = data.title;
        if (imagen) {
            imagen.src = data.thumbnail;
            imagen.alt = data.title;
        }

        precio.textContent = "$" + data.price;
        categorias.textContent = data.category;
        localStorage.setItem('categoriaSeleccionada', data.category);
        categorias.href = "./category.html";

        descripcion.textContent = "Descripcion: " + data.description;
        stock.textContent = "Stock: " + data.stock;

        let etiquetas = "";
        for (let i = 0; i < data.tags.length; i++) {
            etiquetas += `<span class="tag"> ${data.tags[i]} </span>`;
        }
        tags.innerHTML = etiquetas;

        let html = "";
        for (let i = 0; i < data.reviews.length; i++) {
            let review = data.reviews[i];

            let estrellas = "";
            for (let j = 0; j < review.rating; j++) {
                estrellas += "🌟";
            }

            html += `
                <div class="container-review">
                    <p>Cliente: ${review.reviewerName}</p>
                    <p>Puntuación: ${estrellas}</p>
                    <p>Comentario del cliente: ${review.comment}</p>
                    <p>${(review.date || "").slice(0, 10)}</p>
                </div>`;
        }
        coments.innerHTML = html;
    })
    .catch(function(error) {
        console.log("Se detectó un error", error);
    });