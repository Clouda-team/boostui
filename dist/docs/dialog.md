# 弹窗(dialog)

弹窗(dialog)组件 `DOM渲染` `JS渲染` `自定义弹窗` 三种形式。

## 1. 使用演示

<div class="doc-demo">
	<button id="dom-dialog-btn" class="blend-button blend-button-default">DOM渲染</button>
	<button id="js-dialog-btn" class="blend-button blend-button-default">JS渲染</button>
	<button id="custom-dialog-btn" class="blend-button blend-button-default">自定义弹窗</button>
</div>
<div  id="domDialog" class="blend-dialog">
	<div class="blend-dialog-header">
		这是提示弹框的title
	</div>
	<div class="blend-dialog-body">
		这是提示弹框，这里是内容
	</div>
	<div class="blend-dialog-footer">
		<a href="javascript:void(0);" class="blend-dialog-confirm">确认</a>
		<a href="javascript:void(0);" class="blend-dialog-cancel">取消</a>
	</div>
</div>
<div  id="jsDialog" class="blend-dialog">
</div>
<div  id="customDialog" class="blend-dialog">
	<h3>这是我自己定义的H3标题</h3>
	<h4 style="color:red">这也是个自定义的H4标题，还带颜色</h4>
	<span>哈哈<em>这个地方是斜体</em></span>
	<p>因为是自定义的，所以没有绑定默认事件，可以点击mask关闭</p>
</div>


<script type="text/javascript">
	;(function(){
		/**
		 * DOM 渲染
		 */
		var dialog1 = boost("#domDialog").dialog()
		.on('dialog:show',function(){
			console.log("dialog1 show");
		}).on('dialog:hide',function(){
			console.log("dialog1 hide");
		});

		boost("#dom-dialog-btn").on('click',function(e){
			dialog1.dialog("show");
		});

		/**
		 * JS渲染
		 */
		var dialog2 = boost("#jsDialog").dialog({
		    content: '<p style="margin: 0;" class="blend-dialog-phone">这是js传入内容渲染的弹窗</p><p style="margin: 0;"><a href="http://www.baidu.com" class="blend-dialog-link">这是一个链接</a></p>',
		    confirmText: 'OK',
		    cancelText: 'CANCEL',
		    btnStatus:3,
		    renderType:1  //js渲染
		});

		boost("#js-dialog-btn").on('click',function(e){
			dialog2.dialog("show");
		});

		/**
		 * 自定义DOM渲染
		 */
		var dialog3 = boost("#customDialog").dialog({
			maskTapClose:true,
			renderType:2
		}).on("dialog:hide",function(){
			alert("哎呀妈呀，真的会触发事件啊");
		});
		boost("#custom-dialog-btn").on('click',function(e){
			dialog3.dialog("show");
		});



	})();
</script>


## 2. 使用方式

### 1. DOM渲染

页面需要添加对应的DOM结构，然后使用js进行初始化

	<div  id="domDialog" class="blend-dialog">
		<div class="blend-dialog-header">
			这是提示弹框的title
		</div>
		<div class="blend-dialog-body">
			这是提示弹框，这里是内容
		</div>
		<div class="blend-dialog-footer">
			<a href="javascript:void(0);" class="blend-dialog-confirm">确认</a>
			<a href="javascript:void(0);" class="blend-dialog-cancel">取消</a>
		</div>
	</div>
	<script type="text/javascript">
		boost("#domDialog").dialog()；
	</script>

### 2. JS渲染

页面指定外层DOM节点，具体标题，内容，按钮等由js穿参初始化

	<div  id="jsDialog" class="blend-dialog"></div>
	<script type="text/javascript">
		boost("#jsDialog").dialog({
		    content: '<p style="margin: 0;" class="blend-dialog-phone">这是js传入内容渲染的弹窗</p><p style="margin: 0;"><a href="http://www.baidu.com" class="blend-dialog-link">这是一个链接</a></p>',
		    confirmText: 'OK',
		    cancelText: 'CANCEL',
		    btnStatus: 3,
		    renderType: 1 
		});
	</script>

### 3. 自定义弹窗

自定义DOM内容，调用js初始化
	
	<div  id="customDialog" class="blend-dialog">
		<h3>这是我自己定义的H3标题</h3>
		<h4 style="color:red">这也是个自定义的H4标题，还带颜色</h4>
		<span>哈哈<em>这个地方是斜体</em></span>
		<p>因为是自定义的，所以没有绑定默认事件，可以点击mask关闭</p>
	</div>
	<script type="text/javascript">
		boost("#customDialog").dialog({
			maskTapClose:true,
			renderType:2
		});
	</script>


## 3. 初始化参数说明

	{
        top: 30,				// 自定义dialog距离顶部距离，不带“px”
        title: '标题',			// dialog标题，默认为“标题”
        content: '',            // dialog内容，默认为空
        cancelText: '取消',		// 取消按钮自定义文案
        confirmText: '确认',		// 确认按钮自定义文案
        maskTapClose: false,    // 点击mask，关闭dialog，默认false
        renderType: 0,          // 渲染方式，0 是DOM渲染，1是js渲染，2是自定义DOM，默认为0
        btnStatus: 3            // 控制cancel按钮(2) 和 confirm按钮(1) 的和值，默认为3 展示两个按钮
	}

## 4. 方法说明

-	`dialog('show',content)` 展示弹窗，支持传入自定义的展示内容


	boost(".blend-dialog").dialog("show"); // 显示弹窗

	boost(".blend-dialog").dialog("show","这里可以指定每次展示的内容"); // 显示弹窗, 并指定要展示的文本

-	`hide()` 隐藏弹窗


	boost(".blend-dialog").dialog("show"); // 隐藏弹窗

## 5. 事件说明

-	`on('dialog:show', function(){...})` 弹窗显示时触发该事件

-	`on('dialog:hide', function(){...})` 弹窗隐藏时触发该事件

-	`on('dialog:confirm', function(){...})` 点击确认按钮触发该事件

-	`on('dialog:cancel', function(){...})` 点击取消按钮触发该事件


