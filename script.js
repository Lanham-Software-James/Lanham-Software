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

    // Phone number auto-format
    $('#phone').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        if (value.length > 0) value = '(' + value;
        if (value.length > 4) value = value.slice(0, 4) + ') ' + value.slice(4);
        if (value.length > 9) value = value.slice(0, 9) + ' - ' + value.slice(9);
        value = value.slice(0, 16); // Max length for (XXX) XXX - XXXX
        $(this).val(value);
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
