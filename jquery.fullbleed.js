(function($) {

	$.fn.fullBleed = function(parameters) {

		// Defaults
		parameters = parameters || {};
		var defaults = { align: 'center center' };
		parameters = $.extend(defaults, parameters);

		// Preserve jQuery chaining
		return this.each(function() {

			var $image = $(this);		
			var $window = $(window);

			// Style precedents
			$image.parent().css({ overflow: 'hidden' });
			$image.css({ position: 'absolute' });
	
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

			//	if (typeof(redraw) != "undefined") clearTimeout(redraw);
			//	redraw = setTimeout(function() {
					$image[0].style.display='none';
					$image[0].offsetHeight; // no need to store this anywhere, the reference is enough
					$image[0].style.display='block';
					console.log('redraw!');
			//	}, 2000);
		
			}
	
			// Fire when window is resized
			$(window).resize(function() {
				console.log('resizing');
				resize($image);
			});

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
				// Show image
				$this.css({ opacity: 1 });
			}).each(function() {
				// Fire load function anyway if image is grabbed from the cache
				if (this.complete) $(this).load();
			});
	
			return this;

		});

	};

})(jQuery);
