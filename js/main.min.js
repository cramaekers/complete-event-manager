jQuery(function($) {
	// Functions
	complete_header();
	complete_fields();
	complete_carousels();

	function complete_header() {
		$('#menu-button').click(function(e) {
			e.preventDefault();
			$('body').toggleClass('menu-active');
		});
		$('#menu-overlay').click(function(e) {
			e.preventDefault();
			$('body').removeClass('menu-active');
		});
		$('#avatar__trigger').click(function(e) {
			e.preventDefault();
			$(this).parent().toggleClass('active');
		});
	}

	function complete_carousels() {
		$('#plan .owl-carousel').owlCarousel({
			items: 1,
			nav: false,
			dots: false,
			mouseDrag: false,
			touchDrag: false,
			onTranslate: function(e) {
				if(e.item.index == 0) {
					$(e.currentTarget).parent().addClass('plan--initial');
				}
				else {
					$(e.currentTarget).parent().removeClass('plan--initial');	
				}
			},
			responsive: {
				0: {
					autoHeight: true
				},
				768: {
					autoHeight: true
				}
			}
		}).trigger('refresh.owl.carousel');
		$('.owl-carousel .next').click(function(e) {
			e.preventDefault();
			$(this).parents('.owl-carousel').trigger('next.owl.carousel')

		});
		$('.owl-carousel .previous').click(function(e) {
			e.preventDefault();
			$(this).parents('.owl-carousel').trigger('prev.owl.carousel')
		});
	}

	// Sortable
	function complete_sortable(destroy = false) {
		if(destroy) {
			sortable('.sortable', 'destroy');	
		}
		complete_update_sortable_input();

		$('.sortable').each(function() {
			sortable($(this))[0].addEventListener('sortupdate', function(e) {
				complete_update_sortable_input();
			});
		})
	}

	function complete_update_sortable_input() {
		$('.sortable').each(function() {
			let items = [];
			$(this).children('li').each(function() {
				items.push($(this).text());
			});
			$(this).next('input').val(String(items));
		});
	}

	function complete_fields() {
		complete_sortable();

		// Boxed Radios & Checkboxes
		$('.boxed-radio, .boxed-checkbox').each(function() {
			$(this).prepend('<ul class="options" />');
			$container = $(this).children('.options');
			$('label', $(this)).each(function() {
				let label = $(this).text(),
					html = '',
					option_class = '';
				if($(this).attr('class')) {
					option_class += $(this).attr('class');
				}
				if($(this).find('input').is(':checked')) {
					option_class += ' checked';
				}
				if($(this).find('input').is(':disabled')) {
					option_class += ' disabled';
				}
				if($(this).attr('data-video-url')) {
					let video_url = $(this).attr('data-video-url');
					html += '<button type="button" data-video-url="' + video_url + '"><i class="fa fa-play"></i></button>';
					option_class += ' has-video';
				}
				if($(this).attr('data-icon-url')) {
					let icon_url = $(this).attr('data-icon-url');
					html += '<img src="' + icon_url + '" />';
					option_class += ' has-icon';
				}
				$container.append('<li class="' + option_class + '"><a href="#">' + html + label + '</a></li>');
				//$(this).hide();
			});
		});
		$('.boxed-radio li a').click(function(e) {
			e.preventDefault();
			if(e.target === this) {
				let index = $(this).parent().index();
				$(this).parent().addClass('checked').siblings().removeClass('checked').parents('.boxed-radio').find('label:eq(' + index + ') input').trigger('click');
			}
		});
		$('.boxed-checkbox li a').click(function(e) {
			e.preventDefault();
			if(e.target === this) {
				let index = $(this).parent().index();
				$(this).parent().toggleClass('checked').parents('.boxed-checkbox').find('label:eq(' + index + ') input').trigger('click');
			}
		});
		$('.boxed-radio li a button[data-video-url], .boxed-checkbox li a button[data-video-url]').click(function(e) {
			e.preventDefault();
			let url = $(this).attr('data-video-url');
			window.open(url, '_blank');
		});

		// Standard Radios
		$('.radio input[type="radio"], .checkbox input[type="checkbox"]').change(function() {
			complete_update_radios_checkboxes();
		});
		complete_update_radios_checkboxes();

		// Repeater
		$('.repeater > div button').click(function(e) {
			e.preventDefault();
			if($(this).prev().val()) {
				let name = $(this).prev().val();
				$(this).parent().next('ul').append('<li>' + name + '<button type="button"><i class="fa fa-minus"></i></button></li>');
				$(this).prev().val('');

				// Re-initiate sortable
				complete_sortable(true);

				// Update carousel height
				$('.owl-carousel').trigger('refresh.owl.carousel');
			}
		});
		$('.repeater').on('click', 'li button', function(e) {
			e.preventDefault();
			$(this).parent().remove();
			complete_update_sortable_input();
		});

		// Color Picker
		$('.color-picker').each(function() {
			$('option[selected]', $(this)).each(function() {
				let index = $(this).index();
				$(this).parents('select').prev('ul').find('li:eq(' + index + ')').addClass('selected');
			});
		});
		$('.color-picker:not(.color-picker--multiple) a').click(function(e) {
			e.preventDefault();
			let index = $(this).parent().index();
			$(this).parent().addClass('selected').siblings().removeClass('selected').parents('ul').next('select').prop('selectedIndex', index);
		});
		$('.color-picker--multiple a').click(function(e) {
			e.preventDefault();
			let index = $(this).parent().index();
			$(this).parent().toggleClass('selected').parents('ul').next('select').find('option:eq(' + index + ')').prop('selected', $(this).parent().hasClass('selected'));
		});

		// Sliders
		var convertValuesToTime = function(values) {  
		  	return values.map(value => convertMinutesToHoursAndMinutes(value));
		};

		var convertMinutesToHoursAndMinutes = function(minutes) {
			let hour = Math.floor(minutes / 60);
		  	let minute = minutes - (hour * 60);
		  	if(minute == 0) {
		  		minute = '00';
		  	}
		  	if(hour < 12 || hour == 24) {
		  		ampm = 'a.m.';

		  		if(hour == 24) {
		  			hour = 12;
		  		}
		  	}
		  	else {
		  		ampm = 'p.m.';
		  		if(hour > 12) {
		  			hour = hour - 12
		  		}		  		
		  	}
		  	return hour + ':' + minute + ' ' + '<span>' + ampm + '</span>';
		}

		$('.slider').each(function() {
			var slider = $(this)[0],
				start = [];
			if($(this).attr('data-start')) {
				start.push($(this).attr('data-start'));
			}
			if($(this).attr('data-end')) {
				start.push($(this).attr('data-end'));
			}
			noUiSlider.create(slider, {
				start: start,
			    connect: true,
			    step: 15,
			    margin: 120, // Duration must be at least 120 minutes (2 hours)
			    range: {
					'min': 360,
				    'max': 1440
				},			    
			    pips: {
    				mode: 'count',
    				values: 7,
    				density: 19
    				//values: [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440],
    				//density: 2
  				}
			}).on('update', function(values, handle) {
				var times = convertValuesToTime(values),
					time = $('<p>' + times[handle] + '</p>').text();
				handle += 1;
			 	$(slider).parent().find('input:nth-of-type(' + handle + ')').val(time);
			});
		});
		$('.noUi-value.noUi-value-horizontal.noUi-value-large').each(function() {
		 	var val = $(this).html();
		  	val = convertMinutesToHoursAndMinutes(parseInt(val));
		  	$(this).html(val);
		});
	}

	function complete_update_radios_checkboxes() {
		$('.radio input:checked, .checkbox input:checked').parent().addClass('checked');
		$('.radio input:not(:checked), .checkbox input:not(:checked)').parent().removeClass('checked');
	}

	$(document.documentElement).keyup(function (event) {
	    if (event.keyCode == 37) {
	       	$('.owl-carousel').trigger('prev.owl.carousel');
	    }
	    else if (event.keyCode == 39 || event.keyCode == 13) {

	       	$('.owl-carousel').trigger('next.owl.carousel');
	    }
	});
});