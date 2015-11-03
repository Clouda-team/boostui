#固定容器

##基本使用
通过`blend-fixedBar`来表明这是一个固定的容器，内部可以嵌套其他元素



    <div class="doc-demo">
        <div data-blend-widget="fixedBar" class="blend-fixedBar blend-fixedBar-top">
            我是头部固定人
        </div>
    </div>

##容器位置

- `blend-fixedBar-top` 固定在页面顶部
- `blend-fixedBar-bottom` 固定在页面底部

    
    <div data-blend-widget="fixedBar" class="blend-fixedBar blend-fixedBar-bottom">
        <div class="blend-button-group" style="background:transparent">  
            <button class="blend-button blend-button-gray">按钮一</button>
            <button class="blend-button blend-button-gray">按钮二</button>
        </div>
    </div>


<div class="doc-demo">
    <iframe src="/assets/blend2/demo/fixedBar.html" style="border:solid 1px #999;width:320px;height:540px;">
        
    </iframe>
    
</div>