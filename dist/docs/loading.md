#loading

## 1. 使用演示

<style>
    .lodingGif{
        border: none;
        background: url(/assets/blend2/dist/img/loading.gif) 0 0 no-repeat; 
        background-size: 100% 110%;
        height: 50px;
        width: 50px;
        position: absolute;
        margin: -40px 0 0 -25px;
        left: 50%;
        top: 50%;
    }
    </style>
<div class="doc-demo">
	<button id="open-loading" class="blend-button blend-button-primary">打开loading</button>
	<button id="close-loading" class="blend-button blend-button-primary">关闭loading</button>
	<button id="open-self-loading" class="blend-button blend-button-red">打开自定义loading</button>
	<button id="close-self-loading" class="blend-button blend-button-red">关闭自定义loading</button>
</div>

<script type="text/javascript">
	;(function(){
		var loading1 = boost.blend.loading();

		boost("#open-loading").on('click',function(){
			loading1.show();
		});

		boost("#close-loading").on('click',function(){
			loading1.hide();
		});

		var loading2 = boost.blend.loading({
			loadingImgClass: "lodingGif"
		});

		boost("#open-self-loading").on('click',function(){
			loading2.show();
		});

		boost("#close-self-loading").on('click',function(){
			loading2.hide();
		});

	})();
</script>

## 2. 使用说明

### 初始化
	
	/**
	 * 初始化loading组件实例
	 */
	var loading = boost.blend.loading({
		loadingImgClass:"lodingGif",
		loadingHtml:"<span style='background:red;position:fixed;top:50%;'>自定义loading</span>"
	});

### 初始化参数说明

	{
		loadingImgClass:"selfClass", //通过这个class可以更换等待图片或者修改样式
		loadingHtml:"<span style='background:red;position:fixed;top:50%;'>自定义loading</span>" // 自定义loading, 如果不传使用默认效果
	} 

### 方法说明

-	`loading('show')` 展示loading组件

-	`loading('hide')` 隐藏loading组件
	

