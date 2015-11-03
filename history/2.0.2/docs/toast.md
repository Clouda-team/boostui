# 浮动提示(Toast)

## 使用演示

<style type="text/css">
	div.self-toast{
		position: fixed;
		top:50%;
		left:50%;
		width:200px;
		margin-left: -100px;
		text-align: center;
		background: #999
	}

	div.self-toast > span{
		color:#0066cc;
		font-size: 18px;
	}
</style>

<div class="doc-demo">
	<button id="toast-btn1" class="blend-button blend-button-primary">点击出Toast</button>
	<button id="toast-btn2" class="blend-button blend-button-secondary">自定义toast</button>

	<div class="self-toast"></div>

</div>
<script type="text/javascript">
	;(function(){
		var $toast1 = boost.blend.toast();

		boost("#toast-btn1").on('click',function(){
			$toast1.show('test', 2000);
		});

		var $toast2 = boost('.self-toast').eq(0).toast();

		boost("#toast-btn2").on('click',function(){
			$toast2.toast('show','<span>这是自定义的Toast</span>', 2000);
		});


	})();
</script>

## 使用方式

### 初始化

1. 依赖外层dom
	

	<div class="self-toast"></div>
	<script type="text/javascript">
		var $toast = $('.self-toast').eq(0).toast();
		$toast.toast('show','<span>这是自定义的Toast</span>', 2000);
	</script>
	

2. js全局初始化
	

	<script type="text/javascript">
		var $toast = $.blend.toast();
		$toast.show("toast展示内容",2000);
	</script>
	

> ps. 注意两种初始化以及调用方法的写法不太一致哦～


### 初始化参数说明

	{
		delay: 2500,		// Toast展示的时间，默认2500ms后消失,
		toastTpl: "<h2 class='self'>这是自定义的toast内容</h2>"  // 使用自定义的dom作为toast提示框
	}

### 方法说明
	

-	`show(content, delay)` 或者 `toast('show', content, delay)` 展示toast提示框, 可以传入自定义content和延迟展示时间

-	`hide()` 或者 `toast('hide')` 隐藏toast提示框




