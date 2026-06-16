let email = localStorage.getItem("emailLogueado");

let sinEmail = document.querySelectorAll(".sinEmail");
let conEmail = document.querySelector(".conEmail");
let saludo = document.querySelector(".saludo");

if (email === null || email === "") {
    for (let i = 0; i < sinEmail.length; i++) {
        sinEmail[i].style.display = "";
    }
    conEmail.style.display = "none";
} else {
    for (let i = 0; i < sinEmail.length; i++) {
        sinEmail[i].style.display = "none";
    }
    conEmail.style.display = "block";
    saludo.innerText = "Bienvenido: " + email;
}