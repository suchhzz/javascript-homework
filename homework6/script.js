function start() {
    let array = ['hello', 'world', 23, '23', null]

    let dataType = 'number'

    let resultArray = filterBy(array, dataType)

    console.log(resultArray)
}

function filterBy(array, dataType) {

    let newArray = new Array(array.filter(x => typeof x !== dataType).length)

    let counter = 0

    array.forEach(element => {
        if (typeof element !== dataType) {
            newArray[counter++] = element
        }
    });

    return newArray
}