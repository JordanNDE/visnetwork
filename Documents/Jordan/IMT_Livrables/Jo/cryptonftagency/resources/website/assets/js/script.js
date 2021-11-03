$(function() {

    // Animate On Scroll
    AOS.init();

    //  SmoothScroll
    $('.smoothScroll').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });

    // input number
    $(document).ready(function() {
        $('.creation_carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplaySpeed: 4000,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 4
                },
                1000: {
                    slideTransition: 'linear',
                    items: 5
                }
            }
        });
        $('.hero_carousel').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            center: true,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplaySpeed: 500,
            rtl: true,
            slideBy: 1,
            responsive: {
                0: {
                    items: 3
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 3
                }
            }
        });
        $(".collapse").on('show.bs.collapse', function() {
            $(this).parent().addClass('active')
        }).on('hide.bs.collapse', function() {
            $(this).parent().removeClass('active')
        });
        // quantity
        $(".btn-quantity").on("click", function(e) {
            e.preventDefault();
            var $button = $(this);
            var $parent = $button.parent();
            var oldValue = $parent.find('.quantity-input').val();
            if ($button.hasClass("qty-plus")) {
                var newVal;
                if (oldValue == 20) {
                    newVal = oldValue;
                    newVal == 20;
                } else {
                    newVal = parseFloat(oldValue) + 1;
                }
            } else {
                // Don't allow decrementing below zero
                if (oldValue > 1) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 1;
                }
            }
            $parent.find('.quantity-input').val(newVal);
        });

    });
});