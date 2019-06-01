$(document).ready(function () {
    // loader
    setTimeout(() => {
        $('body').css('overflow', 'auto')
        $('.loading').fadeOut();
        $('.main-wrapper').fadeIn();
    }, 450);
    setTimeout(() => {
        $('.loading').remove();
    }, 600);

    // window load
    $(window).on('load', function () {});

    // shrink header
    $('.main-wrapper').on('scroll', function () {
        if ($('.main-wrapper').scrollTop() > 300) {
            $('#main-header').addClass('shrink-nav');
        } else {
            $('#main-header').removeClass('shrink-nav');
        }
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
    })

    // tooltip
    $('[data-title]').hover(function (e) {
        if($(this).hasClass('active')){
            $(this).removeClass('active')
        }else{
            $(this).addClass('active')
        }
    });
});