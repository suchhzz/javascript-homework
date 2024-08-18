document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase()

    console.log(key)

    const selectedButton = document.getElementById(key)

    if (selectedButton !== null) {
        clearButtons()
        selectedButton.classList.add('selected')
    }
})

function clearButtons() {
    let buttons = document.querySelectorAll('.btn')

    buttons.forEach(btn => 
        btn.classList.remove('selected'));
}