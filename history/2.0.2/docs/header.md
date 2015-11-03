#Header

##基本使用
给所示元素添加`.blend-header`, 添加header组件标识`data-blend-widget="header"`,headerbar分成左中右三个部分，

- `blend-header-left` header左部
- `blend-header-right` header右部
- `blend-header-title` header中间
- `blend-header-item` 容器子元素

<style type="text/css">
    .doc-demo .outer{
        width: 320px;
    }

    .doc-demo .blend-header{
        background-color: #00a3e7;    }
</style>

<div class="doc-demo">
    <div class="outer">
        <header data-blend-widget="header" class="blend-header">
            <span class="blend-header-left">
                <a class="blend-header-item blend-button blend-button-link" >左部</a>
            </span>
            <span class="blend-header-title">
                <a class="blend-header-item">标题</a>
            </span>
            <span class="blend-header-right">
                <a class="blend-header-item  blend-button blend-button-red">右部</a>
            </span>
        </header>
    </div>
</div>


    <header data-blend-widget="header" class="blend-header">
        <span class="blend-header-left">
            <a class="blend-header-item blend-button blend-button-link" >左部</a>
        </span>
        <span class="blend-header-title">
            <a class="blend-header-item">标题</a>
        </span>
        <span class="blend-header-right">
            <a class="blend-header-item  blend-button blend-button-red">右部</a>
        </span>
    </header>


<div class="doc-demo">
    <div class="outer">
        <header data-blend-widget="header" class="blend-header">
            <span class="blend-header-left">
            </span>
            <span class="blend-header-title">
                <span class="blend-header-item">标题栏名称</span>
            </span>
            <span class="blend-header-right">
            </span>
        </header>
    </div>
</div>

    <header data-blend-widget="header" class="blend-header">
        <span class="blend-header-left">
        </span>
        <span class="blend-header-title">
            <span class="blend-header-item">标题栏名称</span>
        </span>
        <span class="blend-header-right">
        </span>
    </header>


<div class="doc-demo">
    <div class="outer">
        <header data-blend-widget="header" class="blend-header">
            <span class="blend-header-left">
                <a class="blend-header-item blend-action-back-icon" href="javascript:history.back();">&#xe600;</a>
            </span>
            <span class="blend-header-title">
                <span class="blend-header-item">标题栏名称</span>
            </span>
            <span class="blend-header-right">
            </span>
        </header>
    </div>
</div>

    <header data-blend-widget="header" class="blend-header">
        <span class="blend-header-left">
            <a class="blend-header-item blend-action-back-icon" href="javascript:history.back();">&#xe600;</a>
        </span>
        <span class="blend-header-title">
            <span class="blend-header-item">标题栏名称</span>
        </span>
        <span class="blend-header-right">
        </span>
    </header>


<div class="doc-demo">
    <div class="outer">
        <header data-blend-widget="header" class="blend-header">
            <span class="blend-header-left">
                <a class="blend-header-item blend-action-back-icon" href="javascript:history.back();">&#xe600;</a>
            </span>
            <span class="blend-header-title">
                <span class="blend-header-item">标题栏名称</span>
            </span>
            <span class="blend-header-right">
                <a class="blend-header-item blend-action-back-icon" href="header.test2.html"><em>&#xe820;</em></a>
            </span>
        </header>
    </div>
</div>

    <header data-blend-widget="header" class="blend-header">
        <span class="blend-header-left">
            <a class="blend-header-item blend-action-back-icon" href="javascript:history.back();">&#xe600;</a>
        </span>
        <span class="blend-header-title">
            <span class="blend-header-item">标题栏名称</span>
        </span>
        <span class="blend-header-right">
            <a class="blend-header-item blend-action-back-icon" href="header.test2.html"><em>&#xe820;</em></a>
        </span>
    </header>


<div class="doc-demo">
    <div class="outer">
        <header data-blend-widget="header" class="blend-header">
            <span class="blend-header-left">
                <a class="blend-header-item blend-button blend-button-red gray-lighten" href="javascript:history.back();">图标</a>
                <a class="blend-header-item" href="javascript:history.back();">百度轻应用</a>
            </span>
            <span class="blend-header-title">
            </span>
            <span class="blend-header-right">
                <a class="blend-header-item blend-action-back-icon" href="header.test2.html"><em>&#xe85f;</em></a>
            </span>
        </header>
    </div>
</div>

    <header data-blend-widget="header" class="blend-header">
        <span class="blend-header-left">
            <a class="blend-header-item blend-button blend-button-red gray-lighten" href="javascript:history.back();">图标</a>
            <a class="blend-header-item" href="javascript:history.back();">百度轻应用</a>
        </span>
        <span class="blend-header-title">
        </span>
        <span class="blend-header-right">
            <a class="blend-header-item blend-action-back-icon" href="header.test2.html"><em>&#xe85f;</em></a>
        </span>
    </header>


<div class="doc-demo">
    <div class="outer">
        <header data-blend-widget="header" class="blend-header">
            <span class="blend-header-left">
                <a class="blend-header-item" href="#">标题栏名称</a>
            </span>
            <span class="blend-header-title">
            </span>
            <span class="blend-header-right">
                <a class="blend-header-item blend-action-back-icon" href="header.test2.html"><em>&#xe6d3;</em> 99+</a>
                <a class="blend-header-item blend-action-back-icon" href="header.test2.html"><em>&#xe745;</em>199</a>
            </span>
        </header>
    </div>
</div>

    <header data-blend-widget="header" class="blend-header">
        <span class="blend-header-left">
            <a class="blend-header-item" href="#">标题栏名称</a>
        </span>
        <span class="blend-header-title">
        </span>
        <span class="blend-header-right">
            <a class="blend-header-item blend-action-back-icon" href="header.test2.html"><em>&#xe6d3;</em> 99+</a>
            <a class="blend-header-item blend-action-back-icon" href="header.test2.html"><em>&#xe745;</em>199</a>
        </span>
    </header>


<div class="doc-demo">
    <div class="outer">
        <header data-blend-widget="header" class="blend-header">
            <span class="blend-header-left">
                <a class="blend-header-item blend-button blend-button-red" href="#">名称</a>
            </span>
            <span class="blend-header-title">
                <span class="blend-header-item">标题栏名称</span>
            </span>
            <span class="blend-header-right">
                <a class="blend-header-item blend-action-back-icon" href="header.test2.html"><em>&#xe6d3;</em> 99+</a>
            </span>
        </header>
    </div>
</div>

    <header data-blend-widget="header" class="blend-header">
        <span class="blend-header-left">
            <a class="blend-header-item blend-button blend-button-red" href="#">名称</a>
        </span>
        <span class="blend-header-title">
            <span class="blend-header-item">标题栏名称</span>
        </span>
        <span class="blend-header-right">
            <a class="blend-header-item blend-action-back-icon" href="header.test2.html"><em>&#xe6d3;</em> 99+</a>
        </span>
    </header>


<div class="doc-demo">
    <div class="outer">
        <header data-blend-widget="header" class="blend-header">
            <span class="blend-header-left">
                <a class="blend-header-item blend-action-back-icon" href="javascript:history.back();"><em>&#xe600;</em></a>
            </span>
            <span class="blend-header-title">
                <span class="blend-header-item">标题栏名称</span>
            </span>
            <span class="blend-header-right">
                <a class="blend-header-item blend-button blend-button-red" href="header.test2.html">按钮名称</a>
            </span>
        </header>
    </div>
</div>

    <header data-blend-widget="header" class="blend-header">
        <span class="blend-header-left">
            <a class="blend-header-item blend-action-back-icon" href="javascript:history.back();"><em>&#xe600;</em></a>
        </span>
        <span class="blend-header-title">
            <span class="blend-header-item">标题栏名称</span>
        </span>
        <span class="blend-header-right">
            <a class="blend-header-item blend-button blend-button-red" href="header.test2.html">按钮名称</a>
        </span>
    </header>











