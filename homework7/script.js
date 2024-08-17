function start() {
    let array = [11, 'hello', 'world', [123, 123, 'dsaf'], 'asdfgh']

    printArrayOnScreen(array)
}

function printArrayOnScreen(array) {
    const mainList = document.getElementById("list")

    array.forEach(element => {

        let newElement = document.createElement("li")

        if (Array.isArray(element)) {

            let newInnerElement = document.createElement("ul")

            element.forEach(e => {
                let newInnerListElement = document.createElement("li")

                newInnerListElement.textContent = e.toString()

                newInnerElement.appendChild(newInnerListElement)
            })

            newElement.appendChild(newInnerElement)
        }
        else {
            newElement.textContent = element.toString()
        }

        mainList.appendChild(newElement)
    });

    setTimer()
}

function setTimer() {
    setTimeout(clearScreen, 10000)
}

function clearScreen() {
    const mainList = document.getElementById("list")

    while (mainList.firstChild) {
        mainList.removeChild(mainList.firstChild)
    }
}