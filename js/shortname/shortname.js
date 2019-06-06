$(document).ready(function () {
    var shortname = jQuery('.shortname');
    for (var i = 0; i < shortname.length; i++) {
        var matches = shortname[i].innerHTML.match(/\b(\w)/g);
        shortname[i].setAttribute("data-letters", matches.slice(0, 2).join(''));
    }
});