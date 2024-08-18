let showPasswordField = false
let showPasswordConfirmField = true
const hiddenPasswordIcon = "fas fa-eye-slash icon-password"
const showPasswordIcon = "fas fa-eye icon-password"


function changePasswordField() {

    const passwordField = document.getElementById("passwordField")
    const passwordFieldIcon = document.getElementById("passwordIcon")

    if (showPasswordField) {
        passwordField.type = "password"
        setHiddenPasswordIcon(passwordFieldIcon)
        showPasswordField = false
    }
    else {
        passwordField.type = "text"
        setShowPasswordIcon(passwordFieldIcon)
        showPasswordField = true
    }
}

function changePasswordConfirmField() {
    const passwordField = document.getElementById("passwordConfirmField")
    const passwordFieldIcon = document.getElementById("passwordConfirmIcon")

    if (showPasswordConfirmField) {
        passwordField.type = "password"
        setHiddenPasswordIcon(passwordFieldIcon)
        showPasswordConfirmField = false
    }
    else {
        passwordField.type = "text"
        setShowPasswordIcon(passwordFieldIcon)
        showPasswordConfirmField = true
    }
}

function setHiddenPasswordIcon(element) {
    element.classList.remove('fa-eye-slash')
    element.classList.add('fa-eye')
}

function setShowPasswordIcon(element) {
    element.classList.remove('fa-eye')
    element.classList.add('fa-eye-slash')
}

document.querySelector('.password-form').addEventListener('submit', function(event) {
    const passwordField = document.getElementById("passwordField");
    const passwordConfirmField = document.getElementById("passwordConfirmField");
    const infoSpan = document.getElementById("infoSpan");

    if (checkEmptyField(passwordField, passwordConfirmField)) {
        infoSpan.textContent = 'Field can not be empty'
        return
    }

    if (passwordField.value === passwordConfirmField.value) {
        infoSpan.textContent = ''
        alert('You are welcome')
    }
    else {
        infoSpan.textContent = 'Passwords are different'
    }
});

function checkEmptyField(field1, field2) {
    if (field1.value.trim() === "" || 
        field2.value.trim() === "") {
        return true;
    }

    return false
}