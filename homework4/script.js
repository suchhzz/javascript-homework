class User {
    #firstName
    #lastName

    constructor(firstName, lastName) {
        this.setFirstName(firstName)
        this.setLastName(lastName)
    }

    getLogin() {
        let firstNameChar = this.#firstName[0].toLowerCase()
        let lastNameLowerCase = this.#lastName.toLowerCase()

        return firstNameChar + lastNameLowerCase
    }

    getFirstName() {
        return this.#firstName
    }

    getLastName() {
        return this.lastName
    }

    setFirstName(name) {
        this.#firstName = name
    }

    setLastName(name) {
        this.#lastName = name 
    }
}

function createNewUser() {
    let firstName = prompt("Enter first name")

    let lastName = prompt("Enter last name")

    if (firstName !== null && lastName !== null) {
        let newUser = new User(firstName, lastName)

        alert("login: " + newUser.getLogin())
    }
}