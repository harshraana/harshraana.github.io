var lastScroll = 0;
var index = 0;
var lastScrollTime = 0;
var animationDuration = 1000;
var page = $("html, body");
var breakPoint = 0;
// scroll the webpage to top when it loads
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

$(document).ready(function () {
    createNavDots();

    $('#fullpage .fp-dots').on('click', 'a', function (e) {
        if (this.hash !== "") {
            event.preventDefault();
            animateSection(this.hash, 'click');
        }
    });

});

$(window).on('scroll resize', function (e) {

    var currSect = checkForCurrentSection();
    if (currSect.index > index) {
        animateSection(currSect.sect, 'scroll');
        ++index;
    } else if (currSect.index < index) {
        animateSection(currSect.sect, 'scroll');
        --index;
    }
})

function getScrollTop() {
    return $(window).scrollTop();
}

function getWindowHeight() {
    return window.innerHeight;
}

function getScrollDirection() {
    var currentScroll = getScrollTop();
    var direction = currentScroll > lastScroll ? 'down' : 'up';
    lastScroll = currentScroll;
    return direction;
}

function animateSection(fpSection, type) {
    var currTime = new Date().getTime();

    if (window.innerWidth > breakPoint || type == 'click') {
        if (currTime - lastScrollTime < animationDuration) {
            event.preventDefault();
            return;
        }
        page.animate({
            scrollTop: $(fpSection).offset().top + 1
        }, animationDuration);

        lastScrollTime = currTime;
    }
    changeFocus(fpSection);
}

function checkForCurrentSection() {
    var top_of_screen = getScrollTop();
    var bottom_of_screen = getScrollTop() + getWindowHeight();
    var scrollDirection = getScrollDirection();
    var windowHeight = getWindowHeight();


    var currentSection = {
        sect: String,
        index: Number
    }

    document.querySelectorAll('.fp-section').forEach((fpSection, i) => {
        var top_of_element = $(fpSection).offset().top;
        var bottom_of_element = $(fpSection).offset().top + $(fpSection).outerHeight();
        if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
            if (scrollDirection == 'down') {
                if (windowHeight < bottom_of_element - top_of_screen) {
                    currentSection.sect = fpSection;
                    currentSection.index = i;
                }
            } else {
                if (windowHeight < bottom_of_screen - top_of_element) {
                    currentSection.sect = fpSection;
                    currentSection.index = i;
                }
            }
        }
    });
    return currentSection;
}

function createNavDots() {
    $('#fullpage').append('<div class="fp-navigation"><ul class="fp-dots"></ul></div>');
    document.querySelectorAll('.fp-section').forEach((fpSection, i) => {
        $(fpSection).attr('id', 'section' + (i + 1))
        var active = (i + 1) == 1 ? 'active' : '';
        $('#fullpage .fp-dots').append('<li><a href="#section' + (i + 1) + '" class="section' + (i + 1) + ' ' + active + '"></a></li>');
    });
}

function changeFocus(fpSection) {
    $('.fp-section').removeClass('active');
    $(fpSection).addClass('active');
    $('.fp-dots a').removeClass('active');
    var activeDot = $('.fp-dots').find('.' + $(fpSection).attr('id'));
    activeDot.addClass('active');
}

function next() {}

function prev() {}