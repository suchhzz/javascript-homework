function enterRange() {
    let maxRangeValue = prompt("Enter max range value")

    maxRangeValue = parseInt(maxRangeValue)

    countMultipleNumbers(maxRangeValue)
}

function countMultipleNumbers(maxRange) {
    let multipleCounter = 0

    for (let i = 1; i < maxRange; i++) {
        if (i % 5 == 0) {
            console.log(i)
            multipleCounter++
        }
    }

    if (multipleCounter === 0) {
        console.log("Sorry, no numbers")
    }
}