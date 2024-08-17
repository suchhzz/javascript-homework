class User {
    #firstName
    #lastName
    #birthday

    constructor(firstName, lastName, birthday) {
        this.setFirstName(firstName)
        this.setLastName(lastName)
        this.setAge(birthday)
    }

    getLogin() {
        let firstNameChar = this.#firstName[0].toLowerCase()
        let lastNameLowerCase = this.#lastName.toLowerCase()

        return firstNameChar + lastNameLowerCase
    }

    getAge() {
        let currentDate = new Date()

        return parseInt((currentDate - this.#birthday) / (365.25 * 24 * 60 * 60 * 1000))
    }

    getPassword() {
        let firstNameChar = this.#firstName[0].toUpperCase()
        let lastNameLowerCase = this.#lastName.toLowerCase()

        let birthdayYear = new Date(this.#birthday).toString().substring(11, 15)

        return firstNameChar + lastNameLowerCase + birthdayYear
    }

    getFirstName() {
        return this.#firstName
    }

    getLastName() {
        return this.#lastName
    }


    setFirstName(name) {
        this.#firstName = name
    }

    setLastName(name) {
        this.#lastName = name 
    }

    setAge(birthday) {
        this.#birthday = birthday
    }
}

function createNewUser() {
    let firstName = prompt("Enter first name")

    let lastName = prompt("Enter last name")

    let birthday = prompt("Enter your birthday")

    convertedBirthday = convertDate(birthday)

    let newUser

    if (firstName !== null && 
        lastName !== null &&
        checkBirthdayCorrect(convertedBirthday.toString())) {
        newUser = new User(firstName, lastName, Date.parse(convertedBirthday))
        
        console.log("login: " + newUser.getLogin())
        console.log("age: " + newUser.getAge())
        console.log("password: " + newUser.getPassword())
    }

}

function checkBirthdayCorrect(birthday) {
    if (birthday.length !== 10) {
        return false
    }

    if (birthday[2] !== "." && birthday[5] !== ".") {
        return false;
    }

    let days = parseInt(birthday.substring(0, 2))

    if (days < 0 && days > 31) {
        return false
    }

    let months = parseInt(birthday.substring(3, 5))

    if (months < 1 && months > 12) {
        return false
    }

    birthday = Date.parse(birthday)

    if (isNaN(birthday)) {
        return false
    }

    return true
}

function convertDate(date) {
    let convertedDate = date.substring(3, 5) + "." + date.substring(0, 2) + "." + date.substring(6, 11)

    return convertedDate
}