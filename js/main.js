jQuery(function($) {
	// Functions
	complete_header();

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
});