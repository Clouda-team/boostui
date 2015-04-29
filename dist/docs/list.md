# 列表(List)

## 1. 使用演示

<div class="doc-demo">
	<section class="blend-list">
	    <div class="blend-list-item">
	        <div class="blend-list-item-content">可以向左滑动一下试试，可以点击迅速滑动</div>
	        <span class="blend-list-item-delete">删除</span>
	    </div>
	    <div class="blend-list-item">
	        <div class="blend-list-item-content">我是列表的一个选项</div>
	        <span class="blend-list-item-delete">delte</span>
	    </div>
	    <div class="blend-list-item exception">
	        <div class="blend-list-item-content">我是列表的一个选项，不能被删除</div>
	        <span class="blend-list-item-delete">删除</span>
	    </div>
	</section>
	<br>
	<button id="revertItem" class='blend-button blend-button-default'>点击我恢复上次删除</button>
</div>

<script type="text/javascript">
	;(function(){
		var $list = boost('.blend-list').eq(0).list({
			exceptionClass:"exception"
		});

		boost('#revertItem').on('click',function(){
			$list.list('revert');
		});

	})();
</script>

## 2. 使用方式

### HTML结构

	<section class="blend-list">
	    <div class="blend-list-item">
	        <div class="blend-list-item-content">可以向左滑动一下试试，可以点击迅速滑动</div>
	        <span class="blend-list-item-delete">删除</span>
	    </div>
	    <div class="blend-list-item">
	        <div class="blend-list-item-content">我是列表的一个选项</div>
	        <span class="blend-list-item-delete">delte</span>
	    </div>
	    <div class="blend-list-item exception">
	        <div class="blend-list-item-content">我是列表的一个选项，不能被删除</div>
	        <span class="blend-list-item-delete">删除</span>
	    </div>
	</section>

### 初始化
	
	boost('.blend-list').list({
		exceptionClass:'exception'
	});

### 初始化参数说明

	{
        animate: true,				// 滑动时是否需要动画效果，默认开启
        exceptionClass: 'exception' // 不想出现删除按钮的可以在dom上加上这个class, 默认是都有删除按钮
	}

### 方法说明
	
-	`list('revert')` 恢复上一次删除的列表项
	

	boost('.blend-list').list('revert');




