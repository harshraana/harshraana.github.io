$(document).ready(function () {
  /* ------------------------------------- */
  /* -------Open Close navigation--------- */
  /* ------------------------------------- */
  var navItems = document.querySelectorAll('.nav li');
  var navDelay = 9;
  $('.nav-toggle').on('click', function () {
    event.stopPropagation();
    $(this).toggleClass('open');
    var navState = $('.nav-toggle').hasClass('open');

    navItems.forEach((item, i) => {
      $(item).css({
        'transform': navState != true ? 'translateX(0%)' : 'translateX(-100%)',
        'transition-delay': i / navDelay + 's'
      });
    });

  });

  $(document).on('click', () => {
    $('.nav-toggle').removeClass('open');
    navItems.forEach((item, i) => {
      $(item).css({
        'transform': 'translateX(0%)',
        'transition-delay': i / navDelay + 's'
      });
    });
  });
  /* ------------------------------------- */
});

function initFullpage() {

  if ($('html').hasClass('fp-enabled')) {
    $.fn.fullpage.destroy('all');
  }

  $('#fullpage').fullpage({
    //Custom selectors
    sectionSelector: '.section',
    slideSelector: '.slide',

    //Navigation
    navigation: false,
    navigationPosition: 'right',
    navigationTooltips: [],
    showActiveTooltip: false,

    scrollingSpeed: 800,
    autoScrolling: true,
    scrollBar: true,
    loopBottom: false,
    loopTop: false,
    continuousVertical: false,

    // it requires the vendor library scrolloverflow.min.js
    scrollOverflow: true,

    //Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: false,

    //Design
    controlArrows: true,
    verticalCentered: true,
    // paddingTop: '3em',
    // paddingBottom: '10px',
    // fixedElements: '#header, .footer',
    // responsiveWidth: 0,
    // responsiveHeight: 0,
    // responsiveSlides: false,
    lazyLoading: true,
  });
}


function initJs() {

  /* ------------------------------------- */
  /* AOS Animation */
  /* ------------------------------------- */
  AOS.init();
}
