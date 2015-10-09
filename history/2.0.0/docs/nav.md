#列表导航

##基本使用
在要导航容器元素上添加`.blend-nav`，再设置相应列数。

- `blend-nav-column-{3~5}` 对应列数
- `blend-nav-item` 导航子项
- `blend-nav-item-active`  子项焦点项


<div class="doc-demo">
    <div style="width:500px;">
        <nav class="blend-nav blend-nav-column-3">
            <a class="blend-nav-item blend-nav-item-active" href="#">12113</a>
            <a class="blend-nav-item" href="#">45226</a>
            <a class="blend-nav-item" href="#">33789</a>
            <a class="blend-nav-item" href="#">1243</a>
            <a class="blend-nav-item" href="#">4546</a>
            <a class="blend-nav-item" href="#">7829</a>
            <a class="blend-nav-item" href="#">7829</a>
            <a class="blend-nav-item" href="#">7829</a>
            <a class="blend-nav-item" href="#">7829</a>
            <a class="blend-nav-item" href="#">7829</a>
            <a class="blend-nav-item" href="#">7829</a>
        </nav>
    </div>
</div>


    <nav class="blend-nav blend-nav-column-3">
        <a class="blend-nav-item blend-nav-item-active" href="#">12113</a>
        <a class="blend-nav-item" href="#">45226</a>
        <a class="blend-nav-item" href="#">33789</a>
        <a class="blend-nav-item" href="#">1243</a>
        <a class="blend-nav-item" href="#">4546</a>
        <a class="blend-nav-item" href="#">7829</a>
        <a class="blend-nav-item" href="#">7829</a>
        <a class="blend-nav-item" href="#">7829</a>
        <a class="blend-nav-item" href="#">7829</a>
        <a class="blend-nav-item" href="#">7829</a>
        <a class="blend-nav-item" href="#">7829</a>
    </nav>



##添加更多
需要引人blendui脚本文件，对应容器上执行脚本

- `column: {n}` 显示列数
- `row: {n}`默认显示行数

        $('.blend-nav').nav({
                column: 3,
                row: 2
        });


<div class="doc-demo">
    <div style="width:500px;">
        <nav class="blend-nav blend-nav-column-4">
            <a class="blend-nav-item blend-nav-item-active" href="#">12113</a>
            <a class="blend-nav-item" href="#">45226</a>
            <a class="blend-nav-item" href="#">33789</a>
            <a class="blend-nav-item" href="#">1243</a>
            <a class="blend-nav-item" href="#">4546</a>
            <a class="blend-nav-item" href="#">7829</a>
            <a class="blend-nav-item" href="#">7829</a>
            <a class="blend-nav-item" href="#">7829</a>
            <a class="blend-nav-item" href="#">7829</a>
            <a class="blend-nav-item" href="#">7829</a>
            <a class="blend-nav-item" href="#">7829</a>
        </nav>
    </div>
</div>
<script>

    boost('.blend-nav-column-4').nav({
        column: 3,
        row: 2
    });
</script>













