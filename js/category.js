let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let nombrel = queryStringObj.get('name');

const contenedor = document.querySelector(".products");

fetch(`https://dummyjson.com/products/category/${nombrel}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        contenedor.innerHTML = "";

        for (let i = 0; i < data.products.length; i++) {

            let producto = data.products[i];

            contenedor.innerHTML += `
                <div class="divcate cateprod">
                    <img src="${producto.thumbnail}" alt="${producto.title}" class="produim">
                    <p class="produtit">${producto.title}</p>
                    <p class="produprec">$${producto.price}</p>
                    <a href="./product.html?id=${producto.id}" class="produinfo">Ver detalle</a>
                </div>
            `;
        }
    })
    .catch(function(error) {
        console.log("Se detectó un error", error);
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
