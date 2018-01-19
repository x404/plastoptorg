// данные в селектах
var dbdata = getdb();

function getdb(){
	var result;
	$.ajax({
		type:'GET',
		url:'db.json',
		dataType:'json',
		async:false,
		success:function(data){
			result = data;
		}
	});
	return result;
}



$(document).ready(function(){
	'use strict';

	$.fn.ForceNumericOnly =
	function(){
		return this.each(function()	{
			$(this).keydown(function(e){
				var key = e.charCode || e.keyCode || 0;
				// Разрешаем backspace, tab, delete, стрелки, обычные цифры и цифры на дополнительной клавиатуре
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


	// scroll page
	$('a[data-scroll][href*=\\#]:not([href=\\#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top-150
				}, 1000);
			
				return false;
			}
		}
	});


	$('.order_accessories__body .form-control').ForceNumericOnly()

	// карусель
	$('#foocat1').owlCarousel({
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
	$('#foocat2').owlCarousel({
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
	$('#foocat3').owlCarousel({
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

	// оставить отзыв
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


	// форма обратной связи в подвале
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

			var products = { Products: makeorders('#order')},
				additional = {Accessories: makeaccessories('#order')},
				person = {},
				obj = {},
				fd = new FormData,
				strSubmit = '';

			(document.getElementById('ordername').value != '') ? person.name = document.getElementById('ordername').value : '';
			(document.getElementById('orderemail').value != '') ? person.email = document.getElementById('orderemail').value : '';
			(document.getElementById('ordertel').value != '') ? person.tel = document.getElementById('ordertel').value : '';
			(document.getElementById('ordermsg').value != '') ? person.msg = document.getElementById('ordermsg').value : '';

			obj = Object.assign({}, products, additional, person);

			fd.append('file', $('#orderfile').prop('files')[0]);
			fd.append('strorder', JSON.stringify(obj) );

			$(form).find('fieldset').hide();
			$(form).append('<div class="sending">Идет отправка ...</div>');
			$.ajax({
				type: "POST",
				url: '/order.ajax.php',
				processData: false,
				contentType: false,
				data: fd,
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
				$(form).find('fieldset').show();
				alert(errorTxt);
			});
		}
	});

	

	// modal
	$('#addreview').on('show.bs.modal', function (e) {
		$('#addreview .title').text($(e.relatedTarget).data('title'))
	});




	// $('a[data-toggle="tooltip"]').tooltip({
	// 	placement: 'left',
	// 	html : true,
	// 	title: function(){
	// 		return '<img src="' + $(this).find('img').attr('src') + '" />'
	// 	}
	// });

	$('a[data-toggle="cattooltip"]').tooltip({
		placement: 'bottom',
		html : true,
		template: '<div class="tooltip bs-tooltip-bottom tooltip__cat" role="tooltip"><div class="tooltip-inner"></div></div>'
	});

	$('a[data-toggle="tooltipprice"]').tooltip({
		placement: 'left',
		html : true,
		title: function(){
			return '<img src="' + $(this).find('img').attr('src') + '" />'
		},
		template: '<div class="tooltip bs-tooltip-left tooltip__price" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
	});


	$('a[data-toggle="tooltipbottom"]').tooltip({
		placement: 'bottom',
		html : true,
		title: function(){
			return '<img src="' + $(this).find('img').attr('src') + '" />'
		},
		template: '<div class="tooltip bs-tooltip-bottom tooltip__card" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
	});


	$('.toggle_orderbox').click(function(e){
		e.preventDefault();
		$(this).remove();
		$('.orderbox').slideDown();
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



// =orders
$(document).on('click', '.manage .plus' , function(e){
	e.preventDefault();
	var template = `
		<div class="order__row">
			<div class="param1">
				<select name="type"" class="required">
					<option value="">тип</option>
					<option value="монолитный">монолитный</option>
					<option value="сотовый">сотовый</option>
				</select>
			</div>
			<div class="param2">
				<select name="thickness" class="required">
					<option value="">толщина</option>
					<option value="2 мм">2 мм</option>
					<option value="4 мм">4 мм</option>
					<option value="6 мм">6 мм</option>
					<option value="8 мм">8 мм</option>
					<option value="10 мм">10 мм</option>
					<option value="16 мм">16 мм</option>
					<option value="20 мм">20 мм</option>
					<option value="25 мм">25 мм</option>
					<option value="32 мм">32 мм</option>
				</select>
			</div>
			<div class="param3">
				<select name="size" class="required">
					<option value="">размер</option>
					<option value="2,1 х 6 м">2,1 х 6 м</option>
					<option value="2,1 х 12 м">2,1 х 12 м</option>
				</select>
			</div>
			<div class="param4">
				<select name="color" class="required">
					<option value="">цвет</option>
					<option value="зеленый">зеленый</option>
					<option value="синий">синий</option>
					<option value="красный">красный</option>
					<option value="желтый">желтый</option>
					<option value="черный">черный</option>
				</select>
			</div>
			<div class="param5">
				<select name="brand">
					<option value="">торговая марка</option>
					<option value="Sotalight">Sotalight</option>
					<option value="DWK">DWK</option>
					<option value="Trade">Trade</option>
				</select>
			</div>
			<div class="manage">
				<a href="#" role="button" class="plus">+</a>
				<a href="#" role="button" class="minus">-</a>
			</div>
		</div>
	`;
	$('.order__params .container').append(template);
	$('select').selectric('refresh');
});


$(document).on('click', '.manage .minus' , function(e){
	e.preventDefault();
	$(this).closest('.order__row').fadeOut('normal', function(){
		this.remove();
	});
});

var products = [],
	accessories = [];

function makeorders(id){
	let product = {};
	products = [];

	$(id).find('.order__row').each(function(index){
		product = {};
		let $this = $(this),
			type = $this.find('[name="type"]').val(),
			thickness = $this.find('[name="thickness"]').val(),
			size = $this.find('[name="size"]').val(),
			color = $this.find('[name="color"]').val(),
			brand = $this.find('[name="brand"]').val();

		if (type!='' || thickness!='' || size !='' || color !='' || brand !='') {
			product.type = type;
			product.thickness = thickness;
			product.size = size;
			product.color = color;
			product.brand = brand;
			products.push(product);
		}
	});
	return products;
}

function makeaccessories(id){
	let accessory = {},
		accessories = [];

	$(id).find('.order_accessories__body .row').each(function(){
		let $this = $(this),
			cnt = $this.find('.form-control').val(),
			title = $this.find('label').text();

		if (cnt > 0 ){
			accessory = {};
			accessory.title = title;
			accessory.cnt = cnt;
			accessories.push(accessory);
		};
	});
	return accessories;
}
// =/orders