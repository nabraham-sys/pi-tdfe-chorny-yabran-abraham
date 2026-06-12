document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.querySelector(".loginForm");
    let emailInput = document.querySelector(".email");
    let passwordInput = document.querySelector(".contraseña");
    let errorEmail = document.querySelector(".errorEmail");
    let errorPassword = document.querySelector(".errorPassword");

    loginForm.addEventListener("submit", function (event) {
        let email = emailInput.value.trim();
        let password = passwordInput.value;

        errorEmail.innerText = "";
        errorPassword.innerText = "";

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
        if (hayError) {
            event.preventDefault();
        } else {
            localStorage.setItem("userEmail", email);
        }
    });
});
