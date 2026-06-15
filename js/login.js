// boton de busqueda del header
let formulario = document.querySelector(".searchbarform");
let campoBusqueda = document.querySelector("#searchbar");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    let texto = campoBusqueda.value;

    if (texto === "") {
        alert("El campo de búsqueda no puede estar vacío.");
        return;
    }

    if (texto.length < 3) {
        alert("El término buscado debe tener al menos 3 caracteres.");
        return;
    }

    localStorage.setItem('productoBuscado', texto);
    window.location.href = './search-results.html';
});

let loginForm = document.querySelector(".loginForm");
let emailInput = document.querySelector(".email");
let passwordInput = document.querySelector(".contraseña");
let errorEmail = document.querySelector(".errorEmail");
let errorPassword = document.querySelector(".errorPassword");
let errorLogin = document.querySelector(".errorLogin");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = emailInput.value;
    let password = passwordInput.value;

    errorEmail.innerText = "";
    errorPassword.innerText = "";
    errorLogin.innerText = "";
    let hayError = false;

    if (email === "") {
        errorEmail.innerText = "El email es obligatorio";
        errorEmail.style.display = 'block';
        hayError = true;
    }
    else if (password === "") {
        errorPassword.innerText = "La contraseña es obligatoria";
        errorPassword.style.display = 'block';
        hayError = true;
    }
    else if (password.length < 6) {
        errorPassword.innerText = "La contraseña debe tener al menos 6 caracteres";
        errorPassword.style.display = 'block';
        hayError = true;
    }

    if (!hayError) {
        let emailGuardado = localStorage.getItem("userEmail");
        let passGuardado = localStorage.getItem("password");

        if (email === emailGuardado && password === passGuardado) {
            localStorage.setItem("emailLogueado", email);
            window.location.href = "./index.html";
        } else {
            errorLogin.innerText = "Error en credenciales, por favor intente nuevamente";
        }
    }
});