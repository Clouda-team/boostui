#单选滑块

##基本使用
在要应用单选滑块的元素上添加样式`blend-switch`，选中状态要添加样式`on`。滑块默认为方形，圆形需要添加样式`round`。

##使用演示

<div class="doc-demo">
    <span class="blend-switch"></span><span class="blend-switch on"></span>
	<br/>
	<span class="blend-switch round"></span><span class="blend-switch on round"></span>
</div>

<script type="text/javascript">

    boost('.blend-switch').switch().on('switch:on',function(){
        alert('响应打开事件');
    }).on('switch:off',function(){
        alert('响应关闭事件');
    });
</script>

##HTML结构

    <span class="blend-switch"></span><span class="blend-switch on"></span>
	<span class="blend-switch round"></span><span class="blend-switch on round"></span>

##初始化和监听

    $('.blend-switch').switch().on('switch:on',function(){
        alert('响应打开事件');
    }).on('switch:off',function(){
        alert('响应关闭事件');
    });