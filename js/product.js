let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let id = queryStringObj.get('id');

const titulo = document.querySelector(".product-container h1");
const imagen = document.querySelector(".product-container img");
const tags = document.querySelector(".tags");

const info = document.querySelector(".product-info");
const parrafos = info ? info.querySelectorAll("p") : [];
const precio = info ? info.querySelector(".precio") : null;
const categoria = parrafos[1] ? parrafos[1].querySelector("a") : null;
const descripcion = parrafos[2] || null;
const stock = parrafos[3] || null;

const coments = document.querySelector(".containerReviews");

fetch(`https://dummyjson.com/products/${id}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        if (titulo) titulo.textContent = data.title;

        if (imagen) {
            imagen.src = data.thumbnail;
            imagen.alt = data.title;
        }

        if (precio) precio.textContent = "Precio: " + data.price + " $";

        if (categoria) {
            categoria.textContent = data.category;
            categoria.href = "./category.html?name=" + data.category;
        }

        if (descripcion) descripcion.textContent = "Descripción: " + data.description;

        if (stock) stock.textContent = "Stock: " + data.stock;

        if (tags && data.tags) {
            let etiquetas = "";
            for (let i = 0; i < data.tags.length; i++) {
                etiquetas += `<a href="./category.html?name=${data.tags[i]}">#${data.tags[i]}</a> `;
            }
            tags.innerHTML = etiquetas;
        }

        if (coments && data.reviews) {
            let html = "<h2>Feedback / Reviews</h2>";

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
        }
    })
    .catch(function(error) {
        console.log("Se detectó un error", error);
    });
