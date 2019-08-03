$(document).ready(function () {

  // document on load
  $(window).on('load', function () {
    console.log('Window Ready');
  })


  console.log('Document Ready');

  // document on Scroll
  $(document).on('scroll', function () {
    // shrink header
    if ($(document).scrollTop() > 100) {
      $('.main-header').addClass('shrink-nav');
    } else {
      $('.main-header').removeClass('shrink-nav');
    }

  });

  $(document).on('click', function () {
    $('.main-wrapper').removeClass('open-sidebar');
  });

  $('.sidebar-wrapper').on('click', function (e) {
    e.stopPropagation();
  })

  $('.sidebar-toggle, .close-sidebar, .nav-item button').on('click', function (e) {
    e.stopPropagation();
    $(document).find('.main-wrapper').toggleClass('open-sidebar');
  });

  $('.nav-item .btn').on('click', function (e) {
    $('.nav-item .btn').removeClass('active');
    $(this).addClass('active');
  })
});
