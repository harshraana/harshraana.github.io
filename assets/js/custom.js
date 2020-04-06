$(document).ready(function () {

  /* -------------------------------------------------------- */
  /* Theme Change JS */
  /* -------------------------------------------------------- */

  var html = document.querySelector('html');
  var theme = localStorage.getItem('theme');
  html.setAttribute('data-theme', theme == undefined ? 'lightTheme' : theme);
  theme == undefined || theme != 'darkTheme' ? '' : document.querySelector('.theme-control input').setAttribute('checked', true);
  document.querySelector('.theme-name').innerText = theme == undefined || theme != 'darkTheme' ? 'Light' : 'Dark';

  document.querySelector('.theme-control input').addEventListener('change', function () {
    var currentTheme = html.getAttribute('data-theme');
    if (currentTheme == 'lightTheme') {

      //fade transition while change theme 
      trans();

      html.setAttribute('data-theme', 'darkTheme')
      html.classList.remove('lightTheme');
      html.classList.add('darkTheme');
      localStorage.setItem('theme', 'darkTheme');
      document.querySelector('.theme-name').innerText = "Dark";

    } else {

      //fade transition while change theme 
      trans();

      html.setAttribute('data-theme', 'lightTheme')
      html.classList.remove('darkTheme');
      html.classList.add('lightTheme');
      localStorage.setItem('theme', 'lightTheme');
      document.querySelector('.theme-name').innerText = "Light";

    }
  });

  //add transition
  let trans = () => {
    document.documentElement.classList.add('trans-animate');
    window.setTimeout(() => {
      document.documentElement.classList.remove('trans-animate');
    }, 600);
  }

  /* -------------------------------------------------------- */
  /* Open Close Menu */
  /* -------------------------------------------------------- */

  $('.menu-toggle').on('click', function () {
    $(this).closest('.main-navigatin').toggleClass('nav-expand');
    $(this).closest('.right-navigation').toggleClass('openedNav');
  });

});
