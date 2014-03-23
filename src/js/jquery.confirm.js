(function($){
	
	$.confirm = function(params){
		
		if($('#confirmOverlay').length){
			// A confirm is already shown on the page:
			return false;
		}
		
		var buttonHTML = '';
		$.each(params.buttons,function(name,obj){
			
			// Generating the markup for the buttons:
			
			buttonHTML += '<a href="#" class="button '+obj['class']+'">'+name+'<span></span></a>';
			
			if(!obj.action){
				obj.action = function(){};
			}
		});
		
		var markup = [
			'<div id="confirmOverlay">',
			'<div class="hide" id="confirmBox">',
			'<h1>',params.title,'</h1>',
			/*'<p>',params.message,'</p>',*/
			'<div id="confirmButtons">',
			buttonHTML,
			'</div></div></div>'
		].join('');
		
		$.confirm.show($(markup));
		
		var buttons = $('#confirmBox .button'),
			i = 0;

		$.each(params.buttons,function(name,obj){
			buttons.eq(i++).on('click', function(){
				
				// Calling the action attribute when a
				// click occurs, and hiding the confirm.
				
				obj.action();
				$.confirm.hide();
				return false;
			});
		});
	}

	$.confirm.show = function($markup){
		$markup.appendTo('body');

		setTimeout(function() {
			$markup.addClass('show');
			
			$('#confirmBox', $markup).addClass('show');
		}, 5);
	}
	$.confirm.hide = function(){
		$('#confirmOverlay').removeClass('show')
			.find('#confirmBox').removeClass('show');

		setTimeout(function() {
			$('#confirmOverlay').remove();
		}, 300)
	}
})(jQuery);