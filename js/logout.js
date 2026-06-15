let menuLogin = document.querySelectorAll(".sinEmail");
let menuUsuario = document.querySelector(".conEmail");
let botonLogout = document.querySelector(".logOut");

botonLogout.addEventListener("click", function () {
    localStorage.removeItem("emailLogueado");
    menuLogin.forEach(function (elemento) {
        elemento.style.display = "";
    });
    menuUsuario.style.display = "none";
});