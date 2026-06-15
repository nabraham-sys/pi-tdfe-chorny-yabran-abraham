let menuLogin = document.querySelector(".sinEmail");
let menuUsuario = document.querySelector(".conEmail");
let logOut = document.querySelector(".logOut");

logOut.addEventListener("click", function () {
    localStorage.removeItem("emailLogueado");
    menuLogin.style.display = "block";
    menuUsuario.style.display = "none";
});