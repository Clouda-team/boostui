# 标签(Tab)

## 1. 使用演示

<div class="doc-demo">
	<section class="blend-tab">
        <div class="blend-tab-header">
            <div class="blend-tab-header-item">Tab1</div>
            <div class="blend-tab-header-item">Tab2</div>
            <div class="blend-tab-header-item">Tab3</div>
            <div class="blend-tab-header-active"></div>
        </div>
        <div class="blend-tab-content">
            <div class="blend-tab-content-item"><br>这是Tab1的内容</div>
            <div class="blend-tab-content-item"><br>这是Tab2的内容</div>
            <div class="blend-tab-content-item"><br>这是Tab3的内容</div>
        </div>
    </section>
</div>

<script type="text/javascript">
	;(function(){
		boost('.blend-tab').tab({
			// animate:false
			// start:3
		});
	})();
</script>

## 2. 使用方式

### HTML结构
	
	<section class="blend-tab">
        <div class="blend-tab-header">
            <div class="blend-tab-header-item">Tab1</div>
            <div class="blend-tab-header-item">Tab2</div>
            <div class="blend-tab-header-item">Tab3</div>
            <div class="blend-tab-header-active"></div>
        </div>
        <div class="blend-tab-content">
            <div class="blend-tab-content-item"><br>这是Tab1的内容</div>
            <div class="blend-tab-content-item"><br>这是Tab2的内容</div>
            <div class="blend-tab-content-item"><br>这是Tab3的内容</div>
        </div>
    </section>

### 初始化

	<script type="text/javascript">
    	boost('.blend-tab').tab();
    </script>

### 初始化参数说明

	{
		animate: true,		// 切换时地步标示是否使用动画，默认是true
		start: 1			// 初始化指定展示tab的索引，默认是0
	}

### 方法说明

-	`tab('active', index)` 切换到指定索引的tab，index为索引值，从0开始


	boost('.blend-tab').tab('active', 2);	// 切换到第三个tab	
	

