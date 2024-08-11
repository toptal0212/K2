$(document).ready(function() {
    function initializeSlick() {
        if ($(window).width() <= 767) {
            $('.__list-items').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false
            });
        }
    }

    // Initialize slick on page load if condition is met
    initializeSlick();

    // Reinitialize slick when window is resized
    $(window).resize(function() {
        if ($(window).width() <= 767 && !$('.__list-items').hasClass('slick-initialized')) {
            $('.__list-items').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false
            });
        } else if ($(window).width() > 767 && $('.__list-items').hasClass('slick-initialized')) {
            $('.__list-items').slick('unslick');
        }
    });
});

$(function() {
    $.getJSON('./json/pref_city.json', function(data) {
        for (var i = 0; i < 47; i++) {
            var code = i + 1;
            code = ('00' + code).slice(-2);
            $('#select_pref').append('<option value=" ' + code + '">' + data[i][code].pref + '</option>');
        }
    });
});

const containerTop = $('.p-slider-items');
const boxesTop = containerTop.find('.__slider-item');

const itemsTop = containerTop.children().clone(true);
containerTop.append(itemsTop);

let positionTop = 0;
const speed = 2;

function topAnimate() {
    positionTop -= speed;
    containerTop.css('transform', `translateX(${positionTop}px)`);

    if (Math.abs(positionTop) >= containerTop.width() / 2) {
        positionTop = 0;
    }

    requestAnimationFrame(topAnimate);
}

topAnimate();


$('.__question').click(function() {
    const answer = $(this).parent('.__list-main').children('.__answer');
    const icon = $(this).parents('.__item-list').children('.__item-collapse__mark');
    if (answer.css('max-height') === '0px') {
        answer.css('max-height', answer.prop('scrollHeight') + 'px');
        answer.css('margin', '30px 0');
        icon.addClass('open');
    } else {
        answer.css('max-height', '0');
        answer.css('margin', '0');
        icon.removeClass('open');
    }
});

// 都道府県メニューに連動した市区町村フォーム生成
$('#select_pref').on('change', function() {
    $('#select_city option:nth-child(n+2)').remove(); // ※1 市区町村フォームクリア
    var select_pref = ('00' + $('#select_pref option:selected').val()).slice(-2);
    var key = Number(select_pref) - 1;
    $.getJSON('./json/pref_city.json', function(data) {
        for (var i = 0; i < data[key][select_pref].city.length; i++) {
            $('#select_city').append('<option value="' + data[key][select_pref].city[i].name + '">' + data[key][select_pref].city[i].name + '</option>');
        }
    });

});

$(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
        $('.c-header__inner').addClass('scroll');
    } else {
        $('.c-header__inner').removeClass('scroll');
    }
});


$('.hambtn button').click(function() {
    $('.sp-menu').addClass('open');
});

$('.close-menu').click(function() {
    $('.sp-menu').removeClass('open');
});

$('.__absolute').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    focusOnSelect: true,
    dots: false
});

$('.__cartegory-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '.__cartegory--content'
});
$('.__cartegory--content').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.__cartegory-slider',
    focusOnSelect: true
});