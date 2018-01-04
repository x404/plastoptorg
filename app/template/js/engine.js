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
			console.log(blockh);

		$(window).scroll(function() {
			var top = block.offset().top;
			console.log(top);
			top = top - $(window).height() + blockh/2+ 250;
			var scroll_top = $(this).scrollTop();
			if ((scroll_top > top)) {
				if (block.hasClass("bganimated")) {
					block.removeClass("bganimated");
				}
			}
		});
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




$(function() {
    var $el = $('.parallax-background');
    $(window).on('scroll', function () {
        var scroll = $(document).scrollTop();
        $el.css({
            'background-position':'50% '+(.15*scroll)+'px'
        });
    });
});