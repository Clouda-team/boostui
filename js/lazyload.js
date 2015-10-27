/**
 * 基于Zepto的图片懒加载插件
 * @author dingquan@baidu.com
 */
;(function ($) {

	$.fn.lazyLoad = function (settings) {
		var $this = $(this);
		var _winHeight = $(window).height();
		var _winScrollTop = 0;
		//var defaultBgImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYwMzhDMzczNzBDMTExRTU4NkIwQTM2REZDODA5QzBCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwMzhDMzc0NzBDMTExRTU4NkIwQTM2REZDODA5QzBCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjAzOEMzNzE3MEMxMTFFNTg2QjBBMzZERkM4MDlDMEIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjAzOEMzNzI3MEMxMTFFNTg2QjBBMzZERkM4MDlDMEIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5wOmw/AAAABlBMVEXe3t4AAAB9HcsCAAAADElEQVR42mJgAAgwAAACAAFPbVnhAAAAAElFTkSuQmCC';
		var defaultBgColor = '#dedede';

		settings = $.extend({
			threshold: 0,
			// placeholder: defaultBgImg,
			backgroundcolor: defaultBgColor
		}, settings || {});

		lazyLoadPic();

		$(window).on('scroll',function(){
            _winScrollTop = $(window).scrollTop();
            lazyLoadPic();
        });

		function lazyLoadPic () {
			var originalUrl;
			var $self;
			var _offsetTop;
			$this.each(function () {
				$self = $(this);
				originalUrl = $self.data('original');

				if (originalUrl) {
					_offsetTop = $self.offset().top;
					if ($self.is('img')) {
						if ((_offsetTop - settings.threshold) <= (_winHeight + _winScrollTop)) {
	                        $self.attr('src', originalUrl);
	                        $self.removeAttr('data-original');
	                    }
					}
					else {
                        if (settings.placeholder && $self.css('background-image') === 'none') {
                        	// 指定了占位图片
                            $self.css('background-image', 'url(' + settings.placeholder + ')');
                        } else {
                        	// 默认使用背景色填充
                        	$self.css('background-color', settings.backgroundcolor);
                        }
						if ((_offsetTop - settings.threshold) <= (_winHeight + _winScrollTop)) {
                            $self.css('background-image','url('+ originalUrl + ')');
                            $self.removeAttr('data-original');
                        }
					}
				}
			});
		}
	};
})(Zepto);
