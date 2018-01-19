$(document).ready(function(){
	'use strict';
	$('.order select').selectric({ forceRenderBelow: true });




	// $('#order select[name="type"]').selectric().on('change', function() {
	

});

function options(arr){
	let output = '';
	arr.forEach(function(item, i, arr) {
		output += '<option value="' + item + '">' + item + '</option>';
	});
	return output;
};

function appendOption(name, option, row){
	console.log($(row));
	$(row).find('select[name="'+ name +'"] option:not(:first)').remove(); 
	$(row).find('select[name="'+ name +'"]').append(option).selectric();
};


$(document).on('change', '#order select[name="type"]' , function(e){
	let $this = $(this),
		currenttype =$this.val(),
		type = '',
		thickness = '',
		size = '',
		color = '',
		brand = '',
		row = $this.closest('.order__row');

		(currenttype != '') ? row.find('select').removeAttr('disabled'): '';
		row.find('select').selectric('refresh');

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
		appendOption('thickness', thickness, row);
		appendOption('size', size, row);
		appendOption('color', color, row);
		appendOption('brand', brand, row);
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




// =orders
$(document).on('click', '.manage .plus' , function(e){
	e.preventDefault();
	var template = `
		<div class="order__row">
			<div class="param1">
				<select name="type" class="required">
					<option value="">тип</option>
					<option value="монолитный">монолитный</option>
					<option value="сотовый">сотовый</option>
				</select>
			</div>
			<div class="param2">
				<select name="thickness" class="required" disabled="">
					<option value="">толщина</option>
				</select>
			</div>
			<div class="param3">
				<select name="size" class="required" disabled="">
					<option value="">размер</option>
				</select>
			</div>
			<div class="param4">
				<select name="color" class="required" disabled="">
					<option value="">цвет</option>
				</select>
			</div>
			<div class="param5">
				<select name="brand" disabled="">
					<option value="">торговая марка</option>
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