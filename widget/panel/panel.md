#展示面板

##基本使用
在组件容器上添加对应className。

- `blend-panel` panel容器
- `blend-panel-header` panel头
- `blend-panel-body` panel内容
- `blend-panel-footer` panel底部


<div class="doc-demo">
    <div class="blend-panel"  style="width:500px">
        <div class="blend-panel-header">
            长途汽车:
        </div>
        <div class="blend-panel-body">
            成都新南门车站——峨眉山客运中心（峨眉山市票价43元/人），30分钟一班。
            旅游专线：乐山客运中心站——峨眉山市乐山港——峨眉山报国寺乐山客运中心站——沙湾乐山港
            <br/>【有效期】 2015.03.15
            <br/>【退票规则】 使用前均可提前退票
        </div>
        <div class="blend-panel-footer">
            加载更多
        </div>
    </div>
</div>


    <div class="blend-panel">
        <div class="blend-panel-header blend-panel-left">
            长途汽车:
        </div>
        <div class="blend-panel-body">
            成都新南门车站——峨眉山客运中心（峨眉山市票价43元/人），30分钟一班。
            旅游专线：乐山客运中心站——峨眉山市乐山港——峨眉山报国寺乐山客运中心站——沙湾乐山港
            <br/>【有效期】 2015.03.15
            <br/>【退票规则】 使用前均可提前退票
        </div>
        <div class="blend-panel-footer">
            加载更多
        </div>
    </div>



##改变对齐方式
可以再次通过class改变对齐方式

- `blend-panel-left` 左对齐
- `blend-panel-right` 右对齐
- `blend-panel-center` 居中对齐


<div class="doc-demo">
    <div class="blend-panel"  style="width:500px">
        <div class="blend-panel-header blend-panel-left">
            长途汽车:
        </div>
        <div class="blend-panel-body">
            成都新南门车站——峨眉山客运中心（峨眉山市票价43元/人），30分钟一班。
            旅游专线：乐山客运中心站——峨眉山市乐山港——峨眉山报国寺乐山客运中心站——沙湾乐山港
            <br/>【有效期】 2015.03.15
            <br/>【退票规则】 使用前均可提前退票
        </div>
        <div class="blend-panel-footer blend-panel-center">
            加载更多
        </div>
    </div>
</div>

    <div  class="blend-panel">
        <div class="blend-panel-header blend-panel-left">
            长途汽车:
        </div>
        <div class="blend-panel-body">
            成都新南门车站——峨眉山客运中心（峨眉山市票价43元/人），30分钟一班。
            旅游专线：乐山客运中心站——峨眉山市乐山港——峨眉山报国寺乐山客运中心站——沙湾乐山港
            <br/>【有效期】 2015.03.15
            <br/>【退票规则】 使用前均可提前退票
        </div>
        <div class="blend-panel-footer blend-panel-center">
            加载更多
        </div>
    </div>



##添加边框

- `blend-panel-border` panel左右添加边框


<div class="doc-demo">
    <div class="blend-panel blend-panel-border"  style="width:500px">
        <div class="blend-panel-header">
            长途汽车:
        </div>
        <div class="blend-panel-body">
            成都新南门车站——峨眉山客运中心（峨眉山市票价43元/人），30分钟一班。
            旅游专线：乐山客运中心站——峨眉山市乐山港——峨眉山报国寺乐山客运中心站——沙湾乐山港
        </div>
        <div class="blend-panel-footer">
            <span>加载更多</span>
        </div>
    </div>
</div>

	<div  class="blend-panel blend-panel-border">
        <div class="blend-panel-header">
            长途汽车:
        </div>
        <div class="blend-panel-body">
            成都新南门车站——峨眉山客运中心（峨眉山市票价43元/人），30分钟一班。
            旅游专线：乐山客运中心站——峨眉山市乐山港——峨眉山报国寺乐山客运中心站——沙湾乐山港
        </div>
        <div class="blend-panel-footer">
            <span>加载更多</span>
        </div>
    </div>


## 限制内容行数

最对应`blend-panel-body`上添加`blend-panel-box blend-panel-clamp{1~3}` 限制内容为1~3行显示

<div class="doc-demo">
    <div  class="blend-panel" style="width:500px">
        <div class="blend-panel-header">
            长途汽车:
        </div>
        <div class="blend-panel-body blend-panel-box blend-panel-clamp3">
            成都新南门车站——峨眉山客运中心（峨眉山市票价43元/人），30分钟一班。
            旅游专线：乐山客运中心站——峨眉山市乐山港——峨眉山报国寺乐山客运中心站——沙湾乐山港
        </div>
    </div>
</div>

	<div class="blend-panel">
        <div class="blend-panel-header">
            长途汽车:
        </div>
        <div class="blend-panel-body blend-panel-box blend-panel-clamp3">
            成都新南门车站——峨眉山客运中心（峨眉山市票价43元/人），30分钟一班。
            旅游专线：乐山客运中心站——峨眉山市乐山港——峨眉山报国寺乐山客运中心站——沙湾乐山港
        </div>
    </div>











