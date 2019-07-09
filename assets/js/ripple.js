$(document).ready(function () {
  var cleanUp, debounce, i, len, ripple, rippleContainer, ripples, showRipple;

  //it will add [ripple] attribute where i add .btn class   
  $(".btn").attr("ripple", "");

  debounce = function (func, delay) {
    var inDebounce;
    inDebounce = undefined;
    return function () {
      var args, context;
      context = this;
      args = arguments;
      clearTimeout(inDebounce);
      return inDebounce = setTimeout(function () {
        return func.apply(context, args);
      }, delay);
    };
  };

  showRipple = function (e) {
    // console.log(e);

    var pos, ripple, rippler, size, style, x, y;
    ripple = this;
    rippler = document.createElement('span');
    size = ripple.offsetWidth;
    pos = ripple.getBoundingClientRect();
    x = e.clientX - pos.left - (size / 2);
    y = e.clientY - pos.top - (size / 2);
    style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;';
    ripple.rippleContainer.appendChild(rippler);
    return rippler.setAttribute('style', style);
  };

  cleanUp = function () {
    while (this.rippleContainer.firstChild) {
      this.rippleContainer.removeChild(this.rippleContainer.firstChild);
    }
  };

  ripples = document.querySelectorAll('[ripple]');

  for (i = 0, len = ripples.length; i < len; i++) {
    ripple = ripples[i];
    rippleContainer = document.createElement('div');
    rippleContainer.className = 'ripple--container';
    ripple.addEventListener('mousedown', showRipple);
    ripple.addEventListener('mouseup', debounce(cleanUp, 2000));
    ripple.rippleContainer = rippleContainer;
    ripple.appendChild(rippleContainer);
  }
});
