(function ($) {
$.fn.vAlign = function() {
	return this.each(function(i){
	var h = $(this).height();
	var oh = $(this).outerHeight();
	var mt = (h + (oh - h)) / 2;	
	$(this).css("margin-top", "-" + mt + "px");	
	$(this).css("top", "50%");
	});	
};
$.fn.toggleClick = function(){
    var functions = arguments ;
    return this.click(function(){
            var iteration = $(this).data('iteration') || 0;
            functions[iteration].apply(this, arguments);
            iteration = (iteration + 1) % functions.length ;
            $(this).data('iteration', iteration);
    });
};
})(jQuery);
$(window).load(function() {
	//cache
	$img_control = $("#hz-img-control");
	$hz_feedback = $('#hz-feedback');
	$hz_contactform = $('#hz-contactform');

	//setback to block state and vertical align to center
	$hz_feedback.vAlign()
	.css({'display':'block','height':$hz_feedback.outerHeight()});
	//Aligning feedback button to center with the parent div 

	$img_control.vAlign()
	//animate the form
	.toggleClick(function(){
		$hz_feedback.animate({'right':'-2px'},1000);
	}, function(){
		$hz_feedback.animate({'right':'-'+$hz_feedback.outerWidth()},1000);
	});

	//Form handling
	$('#hz-sendbutton').click( function() {
				var url = 'send.php';
				var error = 0;
				
				
				
				$('.required', $hz_contactform).each(function(i) {
					if($(this).val() === '') {
						error++;
					}
				});
				// each
				if(error > 0) {
					alert('Please fill in all the mandatory fields. Mandatory fields are marked with an asterisk *.');
				} else {
					$str = $hz_contactform.serialize();

					//submit the form
					$.ajax({
						type : "GET",
						url : url,
						data : $str,
						success : function(data) {

							if(data == 'success') {
								// show thank you
								$('#contact-thankyou').show();
								$hz_contactform.hide();
							} else {
								alert('Unable to send your message. Please try again.');
							}
						}
					});
					//$.ajax

				}
				return false;
			});

});