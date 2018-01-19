$(document).ready(function(){
	'use strict';
	$('.order select').selectric({ forceRenderBelow: true });


	function options(arr){
		let output = '';
		arr.forEach(function(item, i, arr) {
			output += '<option value="' + item + '">' + item + '</option>';
		});
		return output;
	};

	function appendOption(name, option){
		$('#order select[name="'+ name +'"] option:not(:first)').remove(); 
		$('#order select[name="'+ name +'"]').append(option).selectric();
	};



	$('#order select[name="type"]').selectric().on('change', function() {
	
	console.log(dbdata);
		let currenttype =$(this).val(),
			type = '',
			thickness = '',
			size = '',
			color = '',
			brand = '';


			switch(currenttype){
				case 'монолитный':
					type = 'mono';
					break;
				case 'сотовый':
					type = 'sot';
					break;
				default:
					break;
			};

			// формируем новые опции
			thickness = options(dbdata[type].thickness);
			size = options(dbdata[type].size);
			color = options(dbdata[type].color);
			brand = options(dbdata[type].brand);
			
			// добавляем новые опции в select
			appendOption('thickness', thickness);
			appendOption('size', size);
			appendOption('color', color);
			appendOption('brand', brand);

		});

});

$(function () {
	$('label[data-toggle="tooltip"]').tooltip({
		html : true,
		title: function(){
			return '<img src="' + $(this).data('tooltipsrc') + '" />'
		},
		template: '<div class="tooltip bs-tooltip-bottom tooltip__accessories" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
	});
});


$(document).on('change, input', '.order_accessories .form-control' , function(){
	let $this = $(this),
		val = $this.val();
	(val > 0) ? $this.addClass('in') : $this.removeClass('in')
});

$(document).on('click', '.toggle_accesories' , function(e){
	e.preventDefault();
	$('.order_accessories__body').slideDown()
});