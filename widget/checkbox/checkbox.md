#选择框

##基本使用
在要应用选择框样式的外层元素上添加属性`data-blend-checkbox`说明选择框类别和取值等信息。

`data-blend-checkbox`参数说明：

- `type` "radio"单选，"group"复选
- `values` 用数组形式表示每个选择项的值
- `itemSelector` 可以选择的元素标签含有的样式
- `itemSelected` 已选元素标签含有的样式

选择框颜色：

- `blend-checkbox-default` 蓝色
- `blend-checkbox-red` 红色

选择框形状：

- `blend-checkbox-default` 圆形框，勾选式选中状态
- `blend-checkbox-square` 方形框
- `blend-checkbox-dot` 圆形框，点选式选中状态


## 蓝色勾选式圆形框单选

<div class="doc-demo">
	<h2>你的性别</h2>
	<div data-blend-widget="checkbox"
	     data-blend-checkbox='{"type":"radio","values":["man","woman"]}'>
	    <span class="blend-checkbox blend-checkbox-default"></span><label class="blend-checkbox-label">man</label>
	    <span class="blend-checkbox blend-checkbox-default"></span><label class="blend-checkbox-label">woman</label>
	</div>
</div>

	<h3>你的性别</h3>
	<div data-blend-widget="checkbox"
	     data-blend-checkbox='{"type":"radio","values":["man","woman"]}'>
	    <span class="blend-checkbox blend-checkbox-default"></span><label class="blend-checkbox-label">man</label>
	    <span class="blend-checkbox blend-checkbox-default"></span><label class="blend-checkbox-label">woman</label>
	</div>

## 红色勾选式复选框

<div class="doc-demo">
	<h3>带全选的checkbox</h3>
	<div class="blend-checkbox-red" data-blend-widget="checkbox" data-blend-checkbox='{"type":"group"}'>
	    <div>
	        <span class="blend-checkbox blend-checkbox-square blend-checkbox-all"></span><label
	            class="blend-checkbox-label">全选</label>
	    </div>
	    <div>
	        <span class="blend-checkbox blend-checkbox-default blend-checkbox-checked"></span><label
	            class="blend-checkbox-label">A</label>
	        <span class="blend-checkbox blend-checkbox-default"></span><label class="blend-checkbox-label">B</label>
	        <span class="blend-checkbox blend-checkbox-default"></span><label class="blend-checkbox-label">C</label>
	    </div>
	</div>
</div>

	<h3>带全选的checkbox</h3>
	<div class="blend-checkbox-red" data-blend-widget="checkbox" data-blend-checkbox='{"type":"group"}'>
	    <div>
	        <span class="blend-checkbox blend-checkbox-square blend-checkbox-all"></span><label
	            class="blend-checkbox-label">全选</label>
	    </div>
	    <div>
	        <span class="blend-checkbox blend-checkbox-default blend-checkbox-checked"></span><label
	            class="blend-checkbox-label">A</label>
	        <span class="blend-checkbox blend-checkbox-default"></span><label class="blend-checkbox-label">B</label>
	        <span class="blend-checkbox blend-checkbox-default"></span><label class="blend-checkbox-label">C</label>
	    </div>
	</div>

## 蓝色点选式圆形框单选

<div class="doc-demo">
	<div data-blend-widget="checkbox"
     data-blend-checkbox='{"type":"radio","values":["radio1","radio2"]}'>
         <div class="blend-checkbox-group" style="float:left;border:none;">
            <span class="blend-checkbox blend-checkbox-dot blend-checkbox-checked"></span><label class="blend-checkbox-label">通用</label>
        </div>
        <div class="blend-checkbox-group">
            <span class="blend-checkbox blend-checkbox-dot"></span><label class="blend-checkbox-label">商家自有</label>
        </div>
    </div>
</div>

	<div data-blend-widget="checkbox"
     data-blend-checkbox='{"type":"radio","values":["radio1","radio2"]}'>
         <div class="blend-checkbox-group">
            <span class="blend-checkbox blend-checkbox-dot blend-checkbox-checked"></span><label class="blend-checkbox-label">通用</label>
        </div>
        <div class="blend-checkbox-group">
            <span class="blend-checkbox blend-checkbox-dot"></span><label class="blend-checkbox-label">商家自有</label>
        </div>
    </div>








