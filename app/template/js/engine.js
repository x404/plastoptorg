$(document).ready(function(){
	'use strict';

	// карусель
	$('#foo1').owlCarousel({
		loop:false,
		nav:true,
		dots: false,
		items:7,
		navText: ["", ""],
		responsive:{
			0:{
				items:1,
				stagePadding: 20
			},
			900:{
				items:2,
				stagePadding: 0
			},
			992:{
				items:1
			},
			1250:{
				items:2
			},
			1550:{
				items:7
			}
		}
	});


	$('.cats .popup__close').click(function(e){
		e.preventDefault();
		$('.cats .popup').fadeOut()
	});



	// popup
	// $('.cats .popup').hide();
	var popup = document.querySelector('.cats .popup').style;
		popup.opacity = 1;
		popup.display = 'none';
	$('.c01 .cat__title').click(function(e){
		e.preventDefault();
		$('.cats .popup').fadeToggle();
	});

	// mobile-menu
	$('#navbar').each(function(){
		var $this = $(this),
			$link = $('.navbar-toggle'),
			$close = $('.close-menu'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				h = $(document).height();
				$('body').addClass('o-menu');
				$('#navbar').height(h);

			},
			closeMenu = function(e){
				e.preventDefault();
				$('body').removeClass('o-menu');
				$('#navbar').height('auto');
			};
		init();
	});	



	$('.bganimated').each(function () {
		var block = $(this),
			blockh = block.height() + parseInt(block.css("padding-top")) ;
			// console.log(blockh);

		$(window).scroll(function() {
			var top = block.offset().top;
			// console.log(top);
			top = top - $(window).height() + blockh/2+ 250;
			var scroll_top = $(this).scrollTop();
			if ((scroll_top > top)) {
				if (block.hasClass("bganimated")) {
					block.removeClass("bganimated");
				}
			}
		});
	});



	$('body').on('click','[data-coord]', function(e) {
		e.preventDefault();
		var $this = $(this).data('coord').split(','),
			lat = $this[0],
			lon = $this[1];
		map.setCenter([lat, lon], 16);
		$('.btn-active').removeClass('btn-active');
		$(this).addClass('btn-active');
	});

});

// =заглушка для IE
//event listener: DOM ready
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
//call plugin function after DOM ready
addLoadEvent(function(){
	outdatedBrowser({
		bgColor: '#f25648',
		color: '#ffffff',
		lowerThan: 'transform',
		languagePath: '/outdatedbrowser/lang/ru.html'
	})
});
// =/заглушка для IE




$(function(){
	$('.policy input').click(function(){
		var $this = $(this),
			$submit = $this.closest('.form-policy');

		if ($this.is(':checked')){
			$submit.find('.input, .form-control, .submit, textarea, input[type=radio]').removeAttr('disabled');
		} else {
			$submit.addClass('disabled');
			$submit.find('.input, .form-control, .submit, textarea, input[type=radio]').attr('disabled', true);
		}
	})
});


$(function() {
    var $el = $('.parallax-background');
    $(window).on('scroll', function () {
        var scroll = $(document).scrollTop();
        $el.css({
            'background-position':'50% '+(.15*scroll)+'px'
        });
    });
});




var map;
var myCollection;
ymaps.ready(function () {
    map = new ymaps.Map('map', {
        center: [55.738287, 37.747568],
        zoom: 16
    });

	myCollection = new ymaps.GeoObjectCollection(null, {
        preset: 'islands#redDotIcon'
	});
	myCollection.add(new ymaps.Placemark(
		[55.738287, 37.747568],
		{
			hintContent: 'Восточный офис',
			balloonContent: ''
		}
	));

	myCollection.add(new ymaps.Placemark(
		[55.843884, 38.200813],
		{
			hintContent: 'Северный склад',
			balloonContent: ''
		}
	));
	map.geoObjects.add(myCollection);
})

function go_to(lat,lon){
	map.setCenter([lat, lon], 16);
}

function getFileName(){
	var file = document.getElementById('uploaded-file').value;
	file = file.replace(/\\/g, "/").split ('/').pop();
	document.getElementById('file-name').innerHTML = 'Имя файла: ' + file;
}