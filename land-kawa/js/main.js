var popup_preview = function(src) {
    $('.b-popup').find('.b-popup__photo-image').attr('src', src);
}

$(document).ready(function(){
    $('.bxslider').bxSlider({
        mode: 'horizontal',
        nextSelector: '.b-slider-slider__arrow_side_right',
        prevSelector: '.b-slider-slider__arrow_side_left',
        nextText: '',
        prevText: '',
        minSlides: 1,
        maxSlides: 1,
        slideWidth: 1500,
        randomStart: false,
        infiniteLoop: true,
        auto: true,
        autoStart: true,
        pager: false,
        speed: 1500,
        pause: 2500
    });

    function unloadPopupBox() {
        $('.b-popup').fadeOut("slow", function(){
            $('.b-page').css({
                'height': 'auto',
                'overflow': 'auto',
                'position': 'static'
            });
            $(window).scrollTop(offsetTop);
        });
    }   
       
    function loadPopupBox() {
        offsetTop = $(window).scrollTop();
        $('.b-page').css({
            'height': '100%',
            'overflow': 'hidden',
            'position': 'fixed'
        }).scrollTop(offsetTop);
        $('.b-popup').fadeIn("slow");
    }

    function sendMessage(name, phone, brand, form) {
        $.ajax({
            url: 'sendmail.php',
            data: 'name='+name+'&phone='+phone+'&brand='+brand+'&form='+form,
            type: 'POST',
            success: function(data) {
            }
        });
    }

    $('.b-catalog__item').on('click', '.b-catalog__item-more', function(){
        loadPopupBox();
        var $item = $(this).closest('.b-catalog__item');
        var $popup = $('.b-popup');
        var coffee = {
            title: $item.find('.b-catalog__item-title').html(),
            subtitle: $item.find('.b-catalog__item-description').html(),
            price: $item.find('.b-catalog__item-price').html(),
            image: $item.find('.b-catalog__item-photo').attr('src'),
            text: $item.data('text')
        };
        $popup.find('.b-popup__text-paragraph').remove();
        $popup.find('.b-popup__text-title').html(coffee.title).end()
            .find('.b-popup__text-subtitle').html(coffee.subtitle.replace(new RegExp('<br>', 'g'), ' ')).end()
            .find('.b-popup__form-price').html(coffee.price).end()
            .find('.b-popup__photo-image').attr('src', coffee.image).attr('alt', coffee.title);
        if (typeof(coffee.text) !== 'undefined') {
            $popup.find('.b-popup__column_data_text').append('<div class="i-popup__text">' + coffee.text + '</div>').find('.i-popup__text p').addClass('b-popup__text-paragraph').end().find('.i-popup__text p img').addClass('b-popup__text-image');
        }
        if ($item.find('.b-catalog__item-preview').length > 0) {
            $popup.find('.b-popup__preview-list').empty();
            $item.find('.b-catalog__item-preview').each(function(i,elem) {
                $(this).removeClass('b-catalog__item-preview').addClass('b-popup__preview');
                var $preview = $('<li></li>');
                $preview.addClass('b-popup__preview-item').append( $(this) )
                    .find('.b-catalog__item-preview').removeClass('b-catalog__item-preview').addClass('b-popup__preview');
                $preview.find('.b-popup__preview').attr('onclick', 'popup_preview("' + $(this).data('src') + '")');
                $popup.find('.b-popup__preview-list').append($preview);
            });
        }
        return false;
    });

    $('.b-choose__form').on('submit', function() {
        var name = $(this).find('[name="name"]').val();
        var phone = $(this).find('[name="phone"]').val();
        var brand = 'нет (требуется консультация)';
        var form = '2 (Не знаете какой кофе выбрать?)';
        sendMessage(name, phone, brand, form);
        return false;
    });

    $('.b-callback__form').on('submit', function() {
        var name = $(this).find('[name="name"]').val();
        var phone = $(this).find('[name="phone"]').val();
        var brand = 'нет (требуется консультация)';
        var form = '3 (Не смогли выбрать кофе?)';
        sendMessage(name, phone, brand, form);
        return false;
    });

    $('.b-clients').on('click', '.b-client__review-link', function() {
        var sort = $(this).data('sort');
        $('#' + sort).find('.b-catalog__item-more').trigger('click');
        return false;
    });

    $('.b-popup').click(function() {
        unloadPopupBox();
    }).find('.b-popup__preview').click(function() {
        $(this).closest('.b-popup').find('.b-popup__photo-image').attr('src', $(this).data('src'));
    }).end().find('.b-popup__close').click(function() {
        unloadPopupBox();
    }).end().find('.b-popup__form-submit').click(function() {
        var name = $(this).find('[name="name"]').val();
        var phone = $(this).find('[name="phone"]').val();
        var brand = $('.b-popup').find('.b-popup__text-title').html();
        var form = '1 (попап)';
        sendMessage(name, phone, brand, form);
        setTimeout(function() {
            unloadPopupBox();
        }, 3000);
        return false;
    }).end().children().click(function() {
        return false;
    });

    var date = new Date();
    var timeLeft = 86400 - (60 * ( (60 * date.getHours()) + date.getMinutes() ) + date.getSeconds());
    $('.b-gift__time').countdown({until: timeLeft, format: 'dHMS', layout: '{hn}&nbsp;{hl} {mn}&nbsp;{ml} {sn}&nbsp;{sl}', timezone: +3});
    $('.b-popup__gift-time').countdown({until: timeLeft, format: 'dHMS', layout: '{hn}&nbsp;{hl} {mn}&nbsp;{ml} {sn}&nbsp;{sl}', timezone: +3});

    var offsetTop = 0;
});