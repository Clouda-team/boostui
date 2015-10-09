# 幻灯片(Slider)

## 1. 使用演示

<div class='doc-demo'>
	<div id="slider" class="blend-slider" style="width:50%">
	    <ul class="blend-slides">
	        <li>
	            <img src="/assets/blend2/images/demo/1.jpg">
	            <div class="blend-slider-title">这是图片1的标题</div>
	        </li>
	        <li>
	            <img src="/assets/blend2/images/demo/2.jpg">
	            <div class="blend-slider-title">这是图片2的标题</div>
	        </li>
	        <li>
	            <img src="/assets/blend2/images/demo/3.jpg">
	            <div class="blend-slider-title">这是图片3的标题</div>
	        </li>
	    </ul>
	</div>
</div>

<script type="text/javascript">
	;(function(){
        boost("#slider").slider({
        	"speed": 2000,
        	"ratio": "wide",
        	continuousScroll: true, 
        	theme: "d2",
        });
	})();
</script>


## 2. 使用方式

### HTML结构

	<div class="blend-slider" data-blend-slider="">
	    <ul class="blend-slides">
	        <li>
	            <img src="/assets/blend2/images/demo/1.jpg">
	            <div class="blend-slider-title">这是图片1的标题</div>
	        </li>
	        <li>
	            <img src="/assets/blend2/images/demo/2.jpg">
	            <div class="blend-slider-title">这是图片2的标题</div>
	        </li>
	        <li>
	            <img src="/assets/blend2/images/demo/3.jpg">
	            <div class="blend-slider-title">这是图片3的标题</div>
	        </li>
	    </ul>
	</div>

### 初始化

调用js方法进行初始化，可以通过方法指定初始化参数活着使用Data API的方式。

	<script type="text/javascript">

		boost('.blend-slider').slider({
			theme:"d2",
			ratio:"small",
			...
		});

	</script>

或者

	<div class="blend-slider" data-blend-slider="{'theme':'d2','ratio':'small', ...}">
		<ul class="blend-slides">
			...
		</ul>
	</div>
	<script type="text/javascript">

		boost('.blend-slider').slider();
	</script>


### 初始化参数说明

	{
        autoSwipe: true,            // 是否开启自动滚动,默认为true
        continuousScroll: true,     // 是否需要连续滚动,默认为true
        speed: 2000,                // 切换的时间间隔, 默认为2000ms
        theme: "d2",				// 提供四种底部样式, 默认为d2
        ratio: "normal"     		// 提供图片的集中尺寸大小，normal/wide/square/small，默认为“normal”
    },

### 方法说明

-	`slider('next')` 播放下一张幻灯片

-	`slider('prev')` 播放上一张幻灯片

-	`slider('paused')` 暂停幻灯片自动播放

-	`slider('start')` 开始幻灯片自动播放


	boost('.blend-slider').slider('next');

	boost('.blend-slider').slider('prev');

	boost('.blend-slider').slider('paused');

	boost('.blend-slider').slider('start');

	