$(document).ready(function () {
  /* ------------------------------------- */
  /* -------Open Close navigation--------- */
  /* ------------------------------------- */
  var navItems = document.querySelectorAll('.nav li');
  var navDelay = 9;
  $('.nav-toggle').on('click', function () {
    event.stopPropagation();
    $(this).toggleClass('open');
    $('.navigation nav').toggleClass('open');
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
    $('.navigation nav').removeClass('open');
    navItems.forEach((item, i) => {
      $(item).css({
        'transform': 'translateX(0%)',
        'transition-delay': i / navDelay + 's'
      });
    });
  });
  /* ------------------------------------- */

  var lastScrollTop = 0;
  $(window).scroll(function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      $('.main-header').addClass('scrolled');
    } else {
      $('.main-header').removeClass('scrolled');
    }


    if (scrollTop > lastScrollTop) {
      $('.main-header .logo').addClass('shrinked');
    } else {
      $('.main-header .logo').removeClass('shrinked');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

});

$(window).resize(function () {
  resizeWindow();
});

function setAnimationGrid() {
  if ($('.cust-grid-wrapper').length) {

    // Get class on other items when one hovered
    $('.cust-grid-wrapper:not(.no-effact) .grid-block').hover(function () {
      if (event.type == "mouseover") {
        $('.cust-grid-wrapper:not(.no-effact) .grid-block').addClass('item-hovered');
        $(this).removeClass('item-hovered');
        $('.cust-grid-wrapper').addClass('item-hovered');
      } else {
        $('.cust-grid-wrapper:not(.no-effact) .grid-block').removeClass('item-hovered');
        $('.cust-grid-wrapper').removeClass('item-hovered');
      }
    });

    // Set Height of blocks
    var block = $('.cust-grid-wrapper .grid-block');
    var windowWidth = $(window).width();
    $('.cust-grid-wrapper .grid-block').each((i, block) => {

      // settings for responsive
      if (windowWidth > 767.98) {
        if ((i % 4) == 3) {
          $(block).css({
            'border-right-width': '1px'
          })
        }
      } else {
        if ((i % 2) == 1) {
          $(block).css({
            'border-right-width': '1px'
          })
        }
      }
    })

    var blockWidth = block.width()
    block.height(blockWidth);
  }
}

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
  /* ------------------------------------- */
  /* rellax Animation */
  /* ------------------------------------- */
  var rellax = new Rellax('.rellax');

  /* ------------------------------------- */
  /* Grid Animation */
  /* ------------------------------------- */
  setAnimationGrid();
}


function resizeWindow() {
  setAnimationGrid();
}
