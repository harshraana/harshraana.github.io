$(document).ready(function () {
    // window load
    $(window).on('load', function () {
        setTimeout(() => {
            $('body').css('overflow', 'auto')
            $('.loading').fadeOut();
            $('.main-wrapper').fadeIn();
        }, 0);
        // loader
        setTimeout(() => {
            $('.loading').remove();
        }, 6000);
        console.log('window');
    });

    console.log('document');

    $.fn.isInViewport = function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop + 70 && elementTop < viewportBottom;
    };

    $('.main-wrapper').on('scroll', function () {
        // shrink header
        if ($('.main-wrapper').scrollTop() > 100) {
            $('#main-header').addClass('shrink-nav');
        } else {
            $('#main-header').removeClass('shrink-nav');
        }

        $('.chart').each(function () {
            if ($(this).isInViewport()) {
                $(this).addClass('onScreen');
            } else {
                // $(this).removeClass('onScreen');
            }
        });

    });

    // open and close Sidebar
    $("[data-togle='sidenav']").on('click', function (e) {
        e.stopPropagation();
        if ($('#sidebar').hasClass('open') == false) {
            $('#sidebar').addClass('open');
            $('.scroll-wrapper').addClass('open');
        } else {
            $('#sidebar').removeClass('open');
            $('.scroll-wrapper').removeClass('open');
        }
    });
    // click anywhere sidebar is closed 
    $(document).on('click', function () {
        $('#sidebar').removeClass('open');
        $('.scroll-wrapper').removeClass('open');
        $('.dropdown').removeClass('open');
    })

    // tooltip
    $('[data-title]').hover(function (e) {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active')
        }
    });

    // Hover Shadow Effact
    var element = $('.moucemoveShadowEffact');
    document.addEventListener("mousemove", function (e) {
        var x = window.innerWidth / 2 - e.clientX;
        var y = window.innerHeight / 2 - e.clientY;
        var s = y - x;
        for (i = 0; i < element.length; i++) {

            if (element[i].tagName == "DIV") {
                $(element[i]).css({
                    'box-shadow': x / 30 + 'px ' + y / 30 + 'px 15px -4px rgba(0,0,0,0.2)',
                });
            } else {
                $(element[i]).css({
                    'text-shadow': x / 30 + 'px ' + y / 30 + 'px 15px rgba(0,0,0,0.2), rgba(0, 0, 0, 0.2) 0px 0px 35px',
                });
            };
        }

    });

    // open dropdown common
    $('[data-toggle]').on('click', function (e) {
        e.stopPropagation();
        var target = $(this).attr('data-toggle');
        if ($(target).hasClass('open')) {
            $(target).removeClass('open');
        } else {
            $(target).addClass('open');
        }
    })

    $('.dropdown button').on('click', function (e) {
        e.stopPropagation();
        console.log($(this).attr('class'));
        var body = $('body');
        if (body.hasClass('theme-light')) {
            body.removeClass('theme-light');
            body.addClass($(this).attr('class'));
        } else {
            body.removeClass('theme-dark');
            body.addClass($(this).attr('class'));
        }
        $(this).closest('.dropdown').removeClass('open');
    });


    // Slick carousel
    $('.banner-slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1500,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'linear'
    });

    $('.projects-slider').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 1,
                }
            }
        ]
    });

});

// For typed Text Animation 
(function ($) {
    "use strict";
    $(window).load(function () {
        App.loader();
    });
    var App = {
        init: function () {
            App.typing();
        },
        loader: function () {
            $("div.preloader").fadeOut("slow");
        },
        typing: function () {
            $(".main-element").each(function () {
                var $this = $(this);
                $this.typed({
                    strings: $this.attr('data-elements').split(','),
                    typeSpeed: 100, // typing speed
                    backDelay: 3000 // pause before backspacing
                });
            });
        },
    };
    App.init();
})(jQuery);