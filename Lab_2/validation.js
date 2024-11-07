const emailField=document.getElementById("email");
const messageField=document.getElementById("wiadomosc");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail() {
    if(!emailPattern.test(emailField.value)) {
        
        emailField.classList.add("invalidData");
        emailField.classList.remove("validData");
    }
    else {
        emailField.classList.remove("invalidData");
        emailField.classList.add("validData");
    }
}

function validateMessage() {
    if (messageField.value.length<10) {
        
        messageField.classList.add("invalidData");
        messageField.classList.remove("validData");
    }
    else {
        messageField.classList.remove("invalidData");
        messageField.classList.add("validData");
    }
}

emailField.addEventListener("input", validateEmail);
messageField.addEventListener("input", validateMessage);

document.getElementById("formularz").addEventListener("submit", function(event) {
    validateEmail();
    validateMessage();

    // alert("Wiadomość jest za krótka! Musi mieć co najmniej 10 znaków!");
    // alert("Nieprawidłowy adres e-mail");
    if(emailField.classList.contains("invalidData")) {
        event.preventDefault();
        alert("Nieprawidłowy adres e-mail");
    }
    else if(messageField.classList.contains("invalidData")) {
        event.preventDefault();
        alert("Wiadomość jest za krótka! Musi mieć co najmniej 10 znaków!");
    }
});