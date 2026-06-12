// Menos 3 caracteres

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

// Busqueda

document.addEventListener("DOMContentLoaded", function () {

    let locacion = location.search;
    let query = new URLSearchParams(locacion);
    let busqueda = query.get("buscar");

    let textoBusqueda = document.querySelector(".hcate");
    let contenedor = document.querySelector(".products");

    if (!textoBusqueda) {
        return;
    }

    if (!contenedor) {
        return;
    }

    if (busqueda === null) {
        textoBusqueda.innerText = "No ingresaste ningún término de búsqueda.";
        contenedor.innerHTML = "";
        return;
    }

    if (busqueda === "") {
        textoBusqueda.innerText = "No ingresaste ningún término de búsqueda.";
        contenedor.innerHTML = "";
        return;
    }

    textoBusqueda.innerText = 'Resultados de búsqueda para: "' + busqueda + '"';

    fetch("https://dummyjson.com/products/search?q=" + busqueda)
    .then(function(res){
        return res.json();
    })
    .then(function(data){

        let productos = data.products;

        if (productos === null) {
            textoBusqueda.innerText = 'No hay resultados para el término: "' + busqueda + '"';
            contenedor.innerHTML = "";
            return;
        }

        if (productos.length === 0) {
            textoBusqueda.innerText = 'No hay resultados para el término: "' + busqueda + '"';
            contenedor.innerHTML = "";
            return;
        }

        contenedor.innerHTML = "";

        for (let i = 0; i < productos.length; i++) {

            let p = productos[i];

            let tarjeta =
                '<div class="divcate searchcate">' +
                    '<img src="' + p.thumbnail + '" alt="' + p.title + '" class="produim">' +
                    '<p class="produtit">' + p.title + '</p>' +
                    '<p class="produdes">' + p.description + '</p>' +
                    '<p class="produprec">$' + p.price + '</p>' +
                    '<a href="./product.html?id=' + p.id + '" class="produinfo">Ver detalle.</a>' +
                '</div>';

            contenedor.innerHTML += tarjeta;
        }
    })
    .catch(function(){
        textoBusqueda.innerText = "Ocurrió un error al buscar productos.";
        contenedor.innerHTML = "";
    });

});

let categorias = document.querySelector(".categoryul");

fetch("https://dummyjson.com/products/categories")
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    let categoriasApi = '';

    for (let i = 0; i < data.length; i++) {
      categoriasApi += `<li><a href="./category.html?name=${data[i].slug}">${data[i].name}</a></li>`;
    }

    categorias.innerHTML = categoriasApi;
  })
  .catch(function(error) {
    console.log("Error: " + error);
  });