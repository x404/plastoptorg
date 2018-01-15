$(document).ready(function(){
	'use strict';


	$.fn.ForceNumericOnly =
	function(){
		return this.each(function()	{
			$(this).keydown(function(e){
				var key = e.charCode || e.keyCode || 0;
				// Разр ешаем backspace, tab, delete, стрелки, обычные цифры и цифры на дополнительной клавиатуре
				return (
					key == 8 ||
					key == 9 ||
					key == 46 ||
					(key >= 37 && key <= 40) ||
					(key >= 48 && key <= 57) ||
					(key >= 96 && key <= 105));
			});
		});
	};


	$('.order_accessories__body .form-control').ForceNumericOnly()

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

	$('#foo2').owlCarousel({
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

		$(window).scroll(function() {
			var top = block.offset().top;
			top = top - $(window).height() + blockh/2 ;
			var scroll_top = $(this).scrollTop();
			if ((scroll_top > top)) {
				if (block.hasClass("bganimated")) {
					block.removeClass("bganimated");
				}
			}
		});
	});


	var fh = document.querySelector('.fixed-header'),
		headerh = document.querySelector('.header').offsetHeight;

	$(window).scroll(function(){
		if ($(this).scrollTop() > (headerh - 200) ) {
			fh.classList.add('sticky');
		} else {
			if ($(this).scrollTop() < 400) {
				fh.classList.remove('sticky');
			}
		}
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


	// var thank = '<div class="thank text-center"><p>Спасибо за заказ продукта на нашем сайте. В ближайщее время с вами свяжутся наши менеджеры для уточнения всех деталей.</p></div>';
	var thankcallback = '<div class="thank text-center"><p>В ближайщее время с вами свяжутся наши менеджеры для уточнения всех деталей</p></div>';
	var thankaddreview = '<div class="thank text-center"><p>Ваш отзыв отправлен!</p></div>';
	// var thankreview = '<div class="thank text-center"><p>Спасибо за оставленный отзыв.</p></div>';
	// var thankqorder = '<div class="thank text-center"><p>Спасибо за заказ продукта на нашем сайте. В ближайщее время с вами свяжутся наши менеджеры для уточнения всех деталей.</p></div>';
	var errorTxt = 'Возникла ошибка при отправке заявки!';



	// validation forms
	$('#callback-form').validate({
		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			$(form).find('fieldset').hide();
			$(form).append('<div class="sending">Идет отправка ...</div>');
			$.ajax({
				type: "POST",
				url: $(form).attr('action'),
				data: strSubmit,
				success: function(){
					$(form).closest('.modal__body').html(thankcallback);
					startClock('callback-form');
				},
				error: function(){
					alert(errorTxt);
					$(form).find('fieldset').show();
					$('.sending').remove();
				}
			})
			.fail(function(error){
				alert(errorTxt);
			});
		}
	});


	$('#addreview-form').validate({
		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			$(form).find('fieldset').hide();
			$(form).append('<div class="sending">Идет отправка ...</div>');
			$.ajax({
				type: "POST",
				url: $(form).attr('action'),
				data: strSubmit,
				success: function(){
					$(form).closest('.modal__body').html(thankaddreview);
					startClock('addreview-form');
				},
				error: function(){
					alert(errorTxt);
					$(form).find('fieldset').show();
					$('.sending').remove();
				}
			})
			.fail(function(error){
				alert(errorTxt);
			});
		}
	});


	$('#feedback-form').validate({
		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			$(form).find('fieldset').hide();
			$(form).append('<div class="sending">Идет отправка ...</div>');
			$.ajax({
				type: "POST",
				url: $(form).attr('action'),
				data: strSubmit,
				success: function(){
					$(form).html(thankcallback);
				},
				error: function(){
					alert(errorTxt);
					$(form).find('fieldset').show();
				},
				always: function(){
					$('.sending').remove();					
				}
			})
			.fail(function(error){
				alert(errorTxt);
			});
		}
	});


	$('#order-form').validate({
		submitHandler: function(form){
	// makeorders();
	// makeaccessories();
	// console.log(products);
	// console.log(accessories);

// console.log(strSubmit);
			var products = { Products: makeorders()},
				additional = {Accessories: makeaccessories()},
				person = {},
				obj = {},
				fd = new FormData;
				
				(document.getElementById('ordername').value != '') ? person.name = document.getElementById('ordername').value : '';
				(document.getElementById('orderemail').value != '') ? person.email = document.getElementById('orderemail').value : '';
				(document.getElementById('ordertel').value != '') ? person.tel = document.getElementById('ordertel').value : '';
				(document.getElementById('ordermsg').value != '') ? person.msg = document.getElementById('ordermsg').value : '';

				obj = Object.assign({}, products, additional, person);


			var strSubmit = JSON.stringify(obj);

			// var strSubmit=$(form).serialize();

			// console.log(strSubmit);
			// $(form).find('fieldset').hide();
			// $(form).append('<div class="sending">Идет отправка ...</div>');
			$.ajax({
				type: "POST",
				url: '/order.ajax.php',
				data: "orders=" + strSubmit,
				success: function(){
					// $(form).html(thankcallback);
					console.log(strSubmit);
				},
				error: function(){
					alert(errorTxt);
					$(form).find('fieldset').show();
				},
				always: function(){
					$('.sending').remove();					
				}
			})
			.fail(function(error){
				$(form).find('fieldset').show();
				alert(errorTxt);
			});
		}
	});

	// modal
	$('#addreview').on('show.bs.modal', function (e) {
		$('#addreview .title').text($(e.relatedTarget).data('title'))
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


function getFileName(el){
	var file = el.value;
	file = file.replace(/\\/g, "/").split ('/').pop();
	$(el).closest('fieldset').find('.file-name').html('Имя файла: ' + file);
}





var timer,
	sec = 3;


function showTime(sendform){
	sec = sec-1;
	if (sec <=0) {
		stopClock();

		switch (sendform){
			case 'qorder-form':
				$('.qorder__box .thank').fadeOut('normal',function(){
					$('.qorder__box .thank').remove();
					$('.qorder__box .form-control, .qorder__box textarea').val('');
				});
				break;
			case 'feedback-form':
				$('.feedback .thank').fadeOut('normal',function(){
					$('.feedback .thank').remove();
					$('.feedback .form-control, .feedback textarea').val('');
					$('.feedback__form fieldset').show();
				});
				break;
			case 'cart-form':
				$('.cart .thank').fadeOut('normal',function(){
					$('.cart .thank').remove();
					// $('.cart .form-control, .cart textarea').val('');
					// $('.cart__form fieldset').show();
				});
				break;	
			default:
				modal = $("#" + sendform).closest('.modal');
				modal.fadeOut('normal',function(){
					modal.modal('hide');
				});
				break;
		}
	}
}
function stopClock(){
	window.clearInterval(timer);
	timer = null;
	sec = 3;
}

function startClock(sendform){
	if (!timer)
		timer = window.setInterval("showTime('" + sendform + "')",1000);
}