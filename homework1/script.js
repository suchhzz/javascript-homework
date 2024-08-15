const modalButton = document.getElementById("modal-button")
const modalWindow = document.getElementById("modal-window")

let isPressed = false;

function onPrompt() {
    let namePrompt = prompt("Name")

    if (!validatePrompt(namePrompt))
    {
        throw new Error("name can not be empty")
    }

    let agePrompt = prompt("Age")

    if (!validatePrompt(agePrompt))
    {
        throw new Error("age can not be empty")
    }

    agePrompt = parseInt(agePrompt)
    
    if (isNaN(agePrompt))
    {
        throw new Error("incorrect age value")
    }

    checkPremission(namePrompt, agePrompt)
}

function validatePrompt(prompt) {
    if (prompt == null) {
        return false
    }
    return true
}

function checkPremission(name, age) {
    if (age < 18) {
        alert("You are not allowed to visit this website")
    }   
    else if (age >= 18 && age <= 22)
    {
        if (showConfirm()) {
            enter(name)
        }
        else {
            alert("You are not allowed to visit this website")
        }
    }
    else {
        enter(name);
    }
}

function enter(name) {
    alert("Welcome " + name)
}

function showConfirm() {
    let userConfirm = confirm("Are you sure you want to continue")

    if (userConfirm) {
        return true
    }

    return false
}