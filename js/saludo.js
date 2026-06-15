let email = localStorage.getItem("emailLogueado");

let sinEmail = document.querySelectorAll(".sinEmail");
let conEmail = document.querySelector(".conEmail");
let saludo = document.querySelector(".saludo");

if (email === null || email === "") {
    sinEmail.forEach(function (elemento) {
        elemento.style.display = "";
    });
    conEmail.style.display = "none";
} else {
    sinEmail.forEach(function (elemento) {
        elemento.style.display = "none";
    });
    conEmail.style.display = "block";
    saludo.innerText = "Bienvenido: " + email;
}