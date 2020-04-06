var parallaxContainers = document.querySelectorAll('.parallax-wrapper');
var parallaxSpeed = 0.4; //speed is in between 0.0 to 1.0 
var windowHeight = window.innerHeight;

$(document).ready(function () {
    makeParallaxBg();
    $(window).scroll(function () {
        doParallax();
    });
});

// Background Parallax--------------------------------------------------------------------------------------------------
function makeParallaxBg() {
    parallaxContainers.forEach((section, i) => {
        var backgroundUrl = $(section).find('.sect-bg img').attr('src');
        $(section).css({
            'background-image': 'url(' + backgroundUrl + ')',
            'background-attachment': 'fixed',
            'background-size': 'cover',
            'background-position-x': 'center'
        });
    });
    $('.sect-bg img').remove();
}

function doParallax() {
    var screenTop = $(window).scrollTop();
    var screenBottom = screenTop + windowHeight;

    parallaxContainers.forEach((section, i) => {
        var sectionTop = $(section).offset().top;
        var sectionBottom = sectionTop + $(section).outerHeight();
        var distance = sectionTop - window.pageYOffset;

        if ((screenBottom > sectionTop) && (screenTop < sectionBottom)) {
            section.classList.add('parallax-enabled');
            $(section).css({
                'background-position-y': (distance * parallaxSpeed) + 'px'
            });
        } else {
            section.classList.remove('parallax-enabled');
        }
    });
}

// Parallax Item--------------------------------------------------------------------------------------------------
var parallaxItems = document.querySelectorAll('[data-scroll-speed]');

// function makeParallaxItem() {
//     var screenTop = $(window).scrollTop();
//     var screenBottom = $(window).scrollTop() + windowHeight;

//     parallaxItems.forEach((parallaxItem, i) => {
//         var scrollSpeed = parallaxItem.getAttribute('data-scroll-speed');
//         var eleTop = $(parallaxItem).offset().top;
//         var eleBottom = $(parallaxItem).outerHeight();
//     });
// }
