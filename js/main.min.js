jQuery(function($) {
	// Functions
	complete_header();
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
					autoHeight: false
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

	jQuery(document.documentElement).keyup(function (event) {
	    if (event.keyCode == 37) {
	       	$('.owl-carousel').trigger('prev.owl.carousel');
	    }
	    else if (event.keyCode == 39 || event.keyCode == 13) {
	       	$('.owl-carousel').trigger('next.owl.carousel');
	    }
	});
});