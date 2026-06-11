document.addEventListener("DOMContentLoaded", function () {
    let email = localStorage.getItem("userEmail");

    let sinEmail = document.querySelector(".sinEmail");
    let conEmail = document.querySelector(".conEmail");
    let saludo = document.querySelector(".saludo");
    let logOut = document.querySelector(".logOut");

    if (email === null) {
        sinEmail.style.display = "block";
        conEmail.style.display = "none";
    } else if (email === "") {
        sinEmail.style.display = "block";
        conEmail.style.display = "none";
    } else {
        sinEmail.style.display = "none";
        conEmail.style.display = "block";

        saludo.textContent = "Bienvenido: " + email;
    }
});