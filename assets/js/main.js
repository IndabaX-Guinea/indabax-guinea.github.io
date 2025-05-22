/*
 * Change Navbar color while scrolling
*/

$(window).scroll(function(){
	handleTopNavAnimation();
});

$(window).load(function(){
	handleTopNavAnimation();
});

// Enhanced scroll handling
function handleTopNavAnimation() {
    const top = $(window).scrollTop();
    const $navbar = $('#site-nav');
    const scrollTrigger = 10;

    if (top > scrollTrigger) {
        if (!$navbar.hasClass('navbar-solid')) {
            $navbar.addClass('navbar-solid');
            // Add scale animation to logo
            $('.site-branding .logo').css('transform', 'scale(0.9)');
        }
    } else {
        if ($navbar.hasClass('navbar-solid')) {
            $navbar.removeClass('navbar-solid');
            // Reset logo size
            $('.site-branding .logo').css('transform', 'scale(1)');
        }
    }

    // Highlight menu items based on scroll position
    const scrollPos = $(document).scrollTop();
    $('.navbar-nav > li > a').each(function() {
        const currLink = $(this);
        const refElement = $(currLink.attr("href"));
        if (refElement.length) {
            if (refElement.position().top <= scrollPos + 100 && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.navbar-nav > li > a').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        }
    });
}

/*
 * Registration Form
*/

$('#registration-form').submit(function(e){
    e.preventDefault();
    
    var postForm = { //Fetch form data
            'fname'     : $('#registration-form #fname').val(),
            'lname'     : $('#registration-form #lname').val(),
            'email'     : $('#registration-form #email').val(),
            'cell'      : $('#registration-form #cell').val(),
            'address'   : $('#registration-form #address').val(),
            'zip'       : $('#registration-form #zip').val(),
            'city'      : $('#registration-form #city').val(),
            'program'   : $('#registration-form #program').val()
    };

    $.ajax({
            type      : 'POST',
            url       : './assets/php/contact.php',
            data      : postForm,
            dataType  : 'json',
            success   : function(data) {
                            if (data.success) {
                                $('#registration-msg .alert').html("Registration Successful");
                                $('#registration-msg .alert').removeClass("alert-danger");
                                $('#registration-msg .alert').addClass("alert-success");
                                $('#registration-msg').show();
                            }
                            else
                            {
                                $('#registration-msg .alert').html("Registration Failed");
                                $('#registration-msg .alert').removeClass("alert-success");
                                $('#registration-msg .alert').addClass("alert-danger");
                                $('#registration-msg').show();
                            }
                        }
        });
});

/*
 * SmoothScroll
*/

smoothScroll.init();

// Initialize animations when document is ready
$(document).ready(function() {
    // Set animation delays for menu items
    $('.navbar-nav > li').each(function(index) {
        $(this).css('--item-index', index);
    });

    // Handle navigation transparency
    handleNavigation();
    $(window).scroll(handleNavigation);
    $(window).resize(handleNavigation);

    // Smooth scroll initialization
    $('.navbar-nav > li > a').on('click', function(e) {
        if (this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;
            const offset = $(hash).offset().top;

            $('html, body').animate({
                scrollTop: offset
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // Mobile menu toggle animation
    $('.navbar-toggle').on('click', function() {
        $(this).toggleClass('is-active');
        if ($('.navbar-collapse').hasClass('in')) {
            $('.navbar-custom').removeClass('navbar-solid');
        } else {
            $('.navbar-custom').addClass('navbar-solid');
        }
    });
});

// Handle navigation transparency and animations
function handleNavigation() {
    const $nav = $('.navbar-custom');
    const scrollTop = $(window).scrollTop();
    const isCollapsed = $('.navbar-collapse').hasClass('in');

    if (scrollTop > 50 || isCollapsed) {
        $nav.addClass('navbar-solid');
    } else {
        $nav.removeClass('navbar-solid');
    }

    // Update active menu item
    const currentPosition = scrollTop + 100;
    $('.navbar-nav > li > a[href^="#"]').each(function() {
        const $section = $($(this).attr('href'));
        if ($section.length) {
            const sectionTop = $section.offset().top;
            const sectionBottom = sectionTop + $section.height();

            if (currentPosition >= sectionTop && currentPosition <= sectionBottom) {
                $('.navbar-nav > li').removeClass('active');
                $(this).parent().addClass('active');
            }
        }
    });
}

// Animation for navigation items
$(document).ready(function() {
    // Animate menu items on load
    $('.navbar-nav > li').each(function(i) {
        $(this).css({
            'animation': `slideIn 0.3s ease forwards ${i * 0.1}s`,
            'opacity': '0'
        });
    });

    // Smooth transition for menu items
    $('.navbar-nav > li > a').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, 'easeInOutExpo', function() {
                window.location.hash = hash;
            });
        }
    });
});

// Add smooth hover effect for menu items
$('.navbar-nav > li > a').hover(
    function() {
        $(this).css('transform', 'translateY(-2px)');
    },
    function() {
        $(this).css('transform', 'translateY(0)');
    }
);

// Add animation for mobile menu toggle
$('.navbar-toggle').click(function() {
    $(this).toggleClass('active');
});