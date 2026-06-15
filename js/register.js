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

let registerForm = document.querySelector(".registerForm");

let emailInput = document.querySelector(".regEmail");
let passwordInput = document.querySelector(".regPassword");
let password2Input = document.querySelector(".regPassword2");
let termsInput = document.querySelector(".regTerms");

let errorEmail = document.querySelector(".errorEmail");
let errorPassword = document.querySelector(".errorPassword");
let errorPassword2 = document.querySelector(".errorPassword2");
let errorTerms = document.querySelector(".errorTerms");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = emailInput.value;
    let password = passwordInput.value;
    let password2 = password2Input.value;

    errorEmail.innerText = "";
    errorPassword.innerText = "";
    errorPassword2.innerText = "";
    errorTerms.innerText = "";

    let hayError = false;

    if (email === "") {
        errorEmail.innerText = "El email es obligatorio";
        hayError = true;
    }
    else if (password === "") {
        errorPassword.innerText = "La contraseña es obligatoria";
        hayError = true;
    }
    else if (password.length < 6) {
        errorPassword.innerText = "La contraseña debe tener al menos 6 caracteres";
        hayError = true;
    }
    else if (password2 === "") {
        errorPassword2.innerText = "Debe reescribir la contraseña";
        hayError = true;
    }
    else if (password !== password2) {
        errorPassword2.innerText = "Las contraseñas no coinciden";
        hayError = true;
    }
    else if (!termsInput.checked) {
        errorTerms.innerText = "Debe aceptar los términos y condiciones";
        hayError = true;
    }

    if (!hayError) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("password", password);

        location.href = "./login.html";
    }
});
