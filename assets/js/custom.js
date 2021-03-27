$(function () {
  /* ------------------------------------- */
  /* -------Open Close navigation--------- */
  /* ------------------------------------- */
  /**  
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
    */
  /* ------------------------------------- */

});

function initJs() {
  AOS.init();
  /* rendom effact on every referesh */
  // effacts => scaleDown,rotate,gallery,catch,opacity,fixed,parallax
  /*   
    var effacts = ['scaleDown', 'rotate', 'gallery', 'catch', 'parallax'];
    var currentEff = localStorage.getItem('anim');
    var i;
    if (currentEff === null || currentEff === undefined || currentEff === 'parallax') {
      i = 0;
      localStorage.setItem('anim', effacts[i]);
    } else {
      currentEff = localStorage.getItem('anim');
      i = effacts.indexOf(currentEff);
      localStorage.setItem('anim', effacts[i + 1]);
    }
    $('body').attr('data-animation', 'gallery');
    $('body').attr('data-animation', localStorage.getItem('anim')); 
  */
  
}
