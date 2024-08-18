const picturesArray = ['./img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg']
let isScrollActive = true
let pictureIndex = 1
let seconds = 10
let timerInterval
let imageInterval

document.addEventListener('DOMContentLoaded', () => {
    start()
})

function stop() {

    document.getElementById("startBtn").disabled = false
    document.getElementById("stopBtn").disabled = true

    isScrollActive = false

    clearInterval(timerInterval)
    clearInterval(imageInterval)
    
    seconds = 10
}

function start() {

    document.getElementById("startBtn").disabled = true
    document.getElementById("stopBtn").disabled = false

    isScrollActive = true

    imageInterval = setInterval(changeImage, 10000)
    timerInterval = setInterval(updateTimer, 1000)
    
}

function timerDisplayIntervalAsync() {
    while (true) {
        setInterval(updateTimer, 1000)
    }
}

function changeImage() {
    if (isScrollActive)
    {
        const imageElement = document.getElementById("mainImage")
        imageElement.src = picturesArray[pictureIndex++]
    
        if (pictureIndex === picturesArray.length - 1) {
            pictureIndex = 0
        }
    }
}

function updateTimer() {
    seconds--
    document.getElementById("secondsCount").textContent = `Seconds: ${seconds}`

    if (seconds === 0) {
        seconds = 10
    }
}