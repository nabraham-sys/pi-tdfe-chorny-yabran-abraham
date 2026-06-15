// boton de busqueda del header
let formulario = document.querySelector(".searchbarform");
let campoBusqueda = document.querySelector("#textSearch");

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

// carga de categorias en el aside desde la api
let categorias = document.querySelector(".categoryul");

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

        // agrego el evento click a cada link de categoria
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

// carga de productos de la categoria seleccionada
let contenedor = document.querySelector(".products");
let categoriaSeleccionada = localStorage.getItem('categoriaSeleccionada');

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
                    <p class="produprec">$${producto.price}</p>
                    <a href="./product.html?id=${producto.id}" class="produinfo">Ver detalle</a>
                </div>
            `;
        }
        contenedor.innerHTML = html;
    })
    .catch(function (error) {
        console.log("Se detectó un error", error);
    });