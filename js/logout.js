let menuLogin = document.querySelectorAll(".sinEmail");
let menuUsuario = document.querySelector(".conEmail");
let botonLogout = document.querySelector(".logOut");

botonLogout.addEventListener("click", function () {
    localStorage.removeItem("emailLogueado");
    for (let i = 0; i < menuLogin.length; i++) {
        menuLogin[i].style.display = "";
    }
    menuUsuario.style.display = "none";
});