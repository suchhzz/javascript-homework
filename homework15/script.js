document.querySelectorAll('.page-section-links button').forEach(button => {
    button.addEventListener('click', function() {
        const pageSection = document.querySelector(this.getAttribute('data-target'));
        if (pageSection) {
            pageSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

$(document).ready(function() {
    $('#hideButton').click(function() {
        $('#hideContent').slideToggle();
    });
});
const toTopButton = document.getElementById('topButton');

window.onscroll = function() {
    checkPageScroll();
};

toTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function checkPageScroll() {
    if (document.documentElement.scrollTop > 490) {
        toTopButton.style.display = 'block';
    }
    else {
        toTopButton.style.display = 'none';
    }
}
