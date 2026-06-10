document.addEventListener("DOMContentLoaded", function () {
    let sinEmail = document.querySelector(".sinEmail");
    let conEmail = document.querySelector(".conEmail");
    let logOut = document.querySelector(".logOut");

    logOut.addEventListener("click", function () {
        localStorage.removeItem("userEmail");
        sinEmail.style.display = "block";
        conEmail.style.display = "none";
    });
});