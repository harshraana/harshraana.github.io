$(document).ready(() => {

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
            $(this).addClass('hover');
        } else {
            setTimeout(() => {
                $(this).removeClass('hover');
            }, 400);
        }
    })

})