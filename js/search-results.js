
// boton de busqueda del header
let formulario = document.querySelector(".searchbarform");
let campoBusqueda = document.querySelector("#textSearch");
let productos = document.querySelector(".products");
let categorias = document.querySelector(".categoryul");

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

// busqueda de productos segun lo que escribio el usuario
let productoBuscado = localStorage.getItem('productoBuscado');

fetch(`https://dummyjson.com/products/search?q=${productoBuscado}`)
.then(function (response) {
return response.json();
})
.then(function (data) {
let productosLista = data.products;

if (productosLista.length === 0) {
productos.innerHTML = `<p>No se encontraron resultados para "${productoBuscado}".</p>`;
return;
}

let html = "";
for (let i = 0; i < productosLista.length; i++) {
let p = productosLista[i];
html += `
<div class="divcate">
<img src="${p.thumbnail}" alt="${p.title}" class="produim">
<p class="produtit">${p.title}</p>
<p class="produdes">${p.description}</p>
<p class="produprec">$${p.price}</p>
<a href="./product.html?id=${p.id}" class="produinfo">Ver detalle.</a>
</div>`;
}
productos.innerHTML = html;
})
.catch(function (error) {
console.log("Error: " + error);
});

// carga de categorias en el aside desde la api
fetch("https://dummyjson.com/products/categories")
.then(function (res) {
return res.json();
})
.then(function (data) {
let categoriasApi = "";
for (let i = 0; i < data.length; i++) {
categoriasApi += `<li><a href="#">${data[i].slug}</a></li>`;
}
categorias.innerHTML = categoriasApi;

let links = document.querySelectorAll(".categoryul a");
for (let i = 0; i < links.length; i++) {
links[i].addEventListener("click", function (event) {
event.preventDefault();
localStorage.setItem('categoriaSeleccionada', links[i].innerText);
window.location.href = './category.html';
});
}
})
.catch(function (error) {
console.log("Error: " + error);
});
