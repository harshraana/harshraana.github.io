$(document).ready(() => {
    windowResize(window.innerHeight, window.innerWidth);

    $(window).on('resize', function (e) {
        windowResize(window.innerHeight, window.innerWidth);
    })

    var lastScrollTop = 0;
    $(window).scroll(function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 0) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }


        if (scrollTop > lastScrollTop) {
            $('.header').addClass('go-up');
        } else {
            $('.header').removeClass('go-up');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });


    $('.gradientBox').hover(function (e) {
        if (e.type == 'mouseenter') {
            setTimeout(() => {
                $(this).addClass('hover');
            }, 400);
        } else {
            $(this).removeClass('hover');
        }
    });


    function windowResize(height, width) {
        if (width < 767.98) {
            /* init Carousel */
            $('.project-section').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: `<button class="btn btn-primary btn-icon prev"><span class="material-icons">keyboard_arrow_left</span></button>`,
                nextArrow: `<button class="btn btn-primary btn-icon next"><span class="material-icons">keyboard_arrow_right</span></button>`,
                adaptiveHeight: true,
                dots: false,
                infinite: false
            });
        } else {
            /* ub=nslick Carousel */
            // $('.project-section').slick('unslick');
        }
    }

})