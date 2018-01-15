$(document).ready(function(){
	'use strict';
	$('select').selectric({ forceRenderBelow: true });
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