#loading

## 1. 使用演示

<div class="doc-demo">
	<button id="open-loading" class="blend-button blend-button-primary">打开loading</button>
	<button id="close-loading" class="blend-button blend-button-secondary">关闭loading</button>
</div>

<script type="text/javascript">
	;(function(){
		var loading = boost.blend.loading();

		boost("#open-loading").on('click',function(){
			loading.show();
		});

		boost("#close-loading").on('click',function(){
			loading.hide();
		});

	})();
</script>

## 2. 使用说明

### 初始化
	
	/**
	 * 初始化loading组件实例
	 */
	var loading = boost.blend.loading({
		loadingHtml:"<span style='background:red;position:fixed;top:50%;'>自定义loading</span>"
	});

### 初始化参数说明

	{
		loadingClass:"selfClass", //自定义要增加的class
		loadingHtml:"<span style='background:red;position:fixed;top:50%;'>自定义loading</span>" // 自定义loading
	} 

### 方法说明

-	`loading('show')` 展示loading组件

-	`loading('hide')` 隐藏loading组件
	

