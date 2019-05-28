$(document).ready(function () {
	// executes when HTML-Document is loaded and DOM is ready
    
	
	$(window).on('load', function() {
	  // executes when complete page is fully loaded, including all frames, objects and images
	  console.log("window is loaded");
	});
	console.log("Document is loaded");
	
	// find last node of tree
    // var currentNode = $('.track-point').find('>ul>li:last-child');
    // var lastSubNode = $(currentNode.find('li'));
    // currentNode.addClass('current-node');
    // lastSubNode.addClass('current-subnode');

    // 
    $(window).scroll(function () {
        if ($(document).scrollTop() > 300) {
            $('#main-header').addClass('shrink-nav');            
        } else {
            $('#main-header').removeClass('shrink-nav');       
        }
    });

    
    
    //for image multi gallery
    $('.carousel-img-gallery').owlCarousel({
        items: 1,
        loop: true,
        margin: 30,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 5000,
        responsive: {
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })
    //for single
    $('.carousel-banner').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        responsive: {
            1200: {
                items: 1
            }
        }
    })

});