(function($) {

	$.fn.fullBleed = function(parameters) {

		// Defaults
		parameters = parameters || {};
		var defaults = {
			align: 'center center',
			className: ''
		};
		parameters = $.extend(defaults, parameters);

		// Browser Detection
		var ie = (function() {
			var v = 3, div = document.createElement('div'), a = div.all || [];
			while (div.innerHTML = '<!--[if gt IE '+(++v)+']><br><![endif]-->', a[0]); 
			return v > 4 ? v : !v;
		}());
		
		// Preserve jQuery chaining
		return this.each(function() {

/* CSS3 Method
- Safari 3+
- Chrome
- IE 9+
- Opera 10+
- Firefox 3.6+
-------------------------------------------------------------- */
		
			if (!ie || ie >= 9) {
		
				var src = $(this).prop('src');
				var $div = $('<div></div>').css({
					'background-image': 'url(' + src + ')',
					'background-position': parameters.align,
					'background-repeat': 'no-repeat',
					'-webkit-background-size': 'cover',
					'-moz-background-size': 'cover',
					'-o-background-size': 'cover',
					'background-size': 'cover',
					'width': '100%',
					'height': '100%',
					'position': 'absolute',
					'top': 0,
					'left': 0
				});
				if (parameters.className != "") $div.addClass(parameters.className);
				$(this).replaceWith($div);
		
/* Javascript Method
- IE 7/8
-------------------------------------------------------------- */

			} else {

				var $image = $(this);		
				var $window = $(window);

				// Style precedents
				$image.parent().css({ overflow: 'hidden' });
				$image.css({ position: 'absolute' });
				
				// Optional class name
				if (parameters.className != "") $image.addClass(parameters.className);
	
				function resize() {

					// Get numbers to work with
					var width = $image.data('width');
					var height = $image.data('height');
					var windowWidth = parseInt($window.width());
					var windowHeight = parseInt($window.height());
					var aspectRatio = Math.round(width / height * 100) / 100;

					// Define new size based on width
					var newWidth = windowWidth;
					var newHeight = Math.round(newWidth / aspectRatio);
	
					// Or, define new size based on height
					if (newHeight < windowHeight) {
						var newHeight = windowHeight;
						var newWidth = Math.round(newHeight * aspectRatio);
					}
	
					// Positioning options
					switch (parameters.align) {
						case "top left":
							var newPosition = [0, 'auto', 'auto', 0];
							break;
						case "top center":
							var newPosition = [0, 'auto', 'auto', (windowWidth - newWidth) / 2 + 'px'];
							break;
						case "top right":
							var newPosition = [0, 0, 'auto', 'auto'];
							break;
						case "center left":
							var newPosition = [(windowHeight - newHeight) / 2 + "px", 'auto', 'auto', 0];
							break;
						case "center center":
							var newPosition = [(windowHeight - newHeight) / 2 + 'px', 'auto', 'auto', (windowWidth - newWidth) / 2 + 'px'];
							break;
						case "center right":
							var newPosition = [(windowHeight - newHeight) / 2 + "px", 0, 'auto', 'auto'];
							break;
						case "bottom left":
							var newPosition = ['auto', 'auto', 0, 0];
							break;
						case "bottom center":
							var newPosition = ['auto', 'auto', 0, (windowWidth - newWidth) / 2 + 'px'];
							break;
						case "bottom right":
							var newPosition = ['auto', 0, 0, 'auto'];
							break;
					}	
				
					// Resize and position
					$image.css({
						'width': newWidth + 'px',
						'height': newHeight + 'px',
						'top': Math.round(newPosition[0]),
						'right': Math.round(newPosition[1]),
						'bottom': Math.round(newPosition[2]),
						'left': Math.round(newPosition[3])
					});
		
				}
	
				// Resize image when window is resized
				$(window).resize(function() { resize($image); });

				// Fire when image is loaded
				$image.load(function() {
					$this = $(this);
					// Save original image dimensions
					$this.data({
						'width': parseInt($this.width()),
						'height': parseInt($this.height())
					});
					// Initial resize
					resize($this);
				}).each(function() {
					// Fire load function anyway if image is grabbed from the cache
					if (this.complete) $(this).load();
				});
	
			}
			
/* Preserve Chaining
-------------------------------------------------------------- */
	
			return this;

		});

	};

})(jQuery);
