$(document).ready(function() {
    // Hamburger menu toggle
    $('.nav-toggle').on('click', function() {
        $(this).toggleClass('active');
        $('.nav-links').toggleClass('open');
        $('.nav-overlay').toggleClass('active');
        var expanded = $(this).hasClass('active');
        $(this).attr('aria-expanded', expanded);
    });
    $('.nav-overlay, .nav-links a').on('click', function() {
        $('.nav-toggle').removeClass('active').attr('aria-expanded', 'false');
        $('.nav-links').removeClass('open');
        $('.nav-overlay').removeClass('active');
    });

    // Smooth scroll for navigation
    $('nav ul li a, .nav-links a').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 20
            }, 600);
        }
    });

    // AJAX contact form submission
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        var $form = $(this);
        var $status = $('#form-status');
        $.ajax({
            url: $form.attr('action'),
            method: 'POST',
            data: $form.serialize(),
            dataType: 'json',
            success: function() {
                $status.text('Thank you! Your message has been sent.').css('color', 'green');
                $form[0].reset();
            },
            error: function() {
                $status.text('Oops! There was a problem sending your message.').css('color', 'red');
            }
        });
    });

    // Set copyright year
    $("#copyright-year").text(new Date().getFullYear());
}); 
