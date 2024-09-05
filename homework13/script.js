const themeButton = document.getElementById("switchThemeBtn");
const body = document.body;
let lightTheme = true;

const currentTheme = localStorage.getItem("theme");

document.addEventListener('DOMContentLoaded', () => {
    if (currentTheme === 'dark') {
        lightTheme = false;
    }

    setTheme(lightTheme);
});

function setTheme(lightTheme) {
    if (lightTheme) {
        body.classList.add('dark-theme');
    }
    else {
        body.classList.remove('dark-theme');
    }
}

themeButton.addEventListener('click', () => 
{
    if (lightTheme === true) {

        lightTheme = false;
        localStorage.setItem('theme', 'dark');

        setTheme(lightTheme);
    }
    else {

        lightTheme = true;
        localStorage.setItem('theme', 'light');

        setTheme(lightTheme);
    }
});