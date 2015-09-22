#分割线

##基本使用
在要应用分割线样式的元素上添加`.blend-separator`，再设置相应的线条样式。

- `blend-separator` 默认样式：实线分割
- `blend-separator-dashed` 虚线分割线
- `blend-separator-rect1` 灰色块，顶部有深色边缘，包含样式为`.blend-separator-rect1-top`的子元素
- `blend-separator-rect2` 灰色块，有上下边线

<div class="doc-demo">
	<p>实线:</p>
    <div style="margin-top:20px;">
        <div class="blend-separator"></div>
    </div>
    <p>虚线:</p>
    <div style="margin-top:20px;">
        <div class="blend-separator blend-separator-dashed"></div>
    </div>
    <p>灰色块，顶部有深色边缘:</p>
    <div style="margin-top:20px;">
        <div class="blend-separator blend-separator-rect1">
            <div class="blend-separator-rect1-top"></div>
        </div>
    </div>
    <p>灰色块，有上下边线:</p>
    <div style="margin-top:20px;">
        <div class="blend-separator blend-separator-rect2"></div>
    </div>
</div>

	<p>实线:</p>
    <div class="blend-separator"></div>
	<p>虚线:</p>
	<div class="blend-separator blend-separator-dashed"></div>
	<p>灰色块，顶部有深色边缘:</p>
	<div class="blend-separator blend-separator-rect1">
        <div class="blend-separator-rect1-top"></div>
    </div>
	<p>灰色块，有上下边线:</p>
	<div class="blend-separator blend-separator-rect2"></div>















