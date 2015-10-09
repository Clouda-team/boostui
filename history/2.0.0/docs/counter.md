#数量选择器

## 1. 使用演示

<div class="doc-demo">
    <div id="blendCounter" data-blend-counter='{"step":1,"maxValue":10}' class="blend-counter" style="margin-top: 10px;">
	    <div class="blend-counter-minus"></div>
	    <input class="blend-counter-input" type="text">
	    <div class="blend-counter-plus"></div>
	</div>
</div>

	<div class="blend-counter" data-blend-counter='{"step":1,"maxValue":10}'>
		<div class="blend-counter-minus"></div>
		<input class="blend-counter-input" type="text">
		<div class="blend-counter-plus"></div>
	</div>

<script type="text/javascript">
	;(function(){
		boost("#blendCounter").counter().counter('value',1);
	})();
</script>


## 2. 使用方式

### 1. HTML结构
	
	<div class="blend-counter">
		<div class="blend-counter-minus"></div>
		<input class="blend-counter-input" type="text">
		<div class="blend-counter-plus"></div>
	</div>

### 2. 初始化

#### 1. js调用
	
	boost('#xxx').counter({
		'step': 1,
		'maxValue': 10
	}); // 对选择的dom进行初始化

#### 2. Data API

添加 `data-blend-counter` 属性，并设置初始化相关选项。

	<div class="blend-counter" data-blend-counter='{"step":1,"maxValue":10}'>
		...
	</div>
	<script type="text/javascript">
		boost("#blendCounter").counter(); // 调用初始化方法
	</script>


### 3. 初始化参数说明

	{
		minValue: 0,	// 最小值, 默认为0
		maxValue: 10,	// 最大值, 默认为Infinity
		step: 2,		// 递增数值, 默认为1
	}

### 4. 方法说明

-	`counter('value', 5)` 设置数量选择器的值或者获取当前值。
	

	var $counter = boost('#xxx').counter();  // 初始化组件,返回组件实例
	$counter.counter('value');		// 获取当前数量选择器的值
	$counter.counter('value', 5);	// 设置当前数量选择器的值为5

### 5. 事件说明

-	`on('counter:update', function(data){...})` 监听数量变化事件

-	`on('counter:beforeupdate', function(data){...})` 数量变化之前触发该事件


	/**
	 * 监听数量变化事件
	 */
	$counter.on('counter:update', function (data) {
        console.log('数量变化了，该事件触发了...');
    })
    /**
     * 监听数量变化之前事件
     */
    .on('counter:beforeupdate', function (data) {
        console.log('该事件触发了，不过是在数量变化之前...');
    })









