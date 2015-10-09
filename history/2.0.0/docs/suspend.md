#底部悬浮框

## 1. 使用演示
<div class="doc-demo">
	<input id="showBtn" type="button" value="点击显示底部悬浮框">
    <div class="blend-suspend-mask"></div>
    <div data-blend-widget="suspend" class="blend-suspend">
        <div class="blend-suspend-content">
            <div class="blend-suspend-close">
                <span></span>
            </div>
            <div>
                这里是内容
                <br>
                这里是内容
                <br>
                这里是内容
                <br>
                这里是内容
                <br>
                这里是内容
                <br>
                这里是内容
                <br>
                这里是内容
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
	boost(function () {
        boost("#showBtn").click(function (){
            boost(".blend-suspend").suspend({
            }).suspend("show");
        });
    });
</script>

## 2. 使用方式

### HTML结构
	<input id="showBtn" type="button" value="点击显示底部悬浮框">
    <div class="blend-suspend-mask"></div>
    <div data-blend-widget="suspend" class="blend-suspend">
        <div class="blend-suspend-content">
            <div class="blend-suspend-close">
                <span></span>
            </div>
            <div>
                这里是内容
                <br>
                这里是内容
                <br>
                这里是内容
                <br>
                这里是内容
                <br>
                这里是内容
                <br>
                这里是内容
                <br>
                这里是内容
            </div>
        </div>
    </div>

### 初始化

使用JS来初始化suggest组件

	boost(function () {
        boost("#showBtn").click(function (){
            boost(".blend-suspend").suspend({
            }).suspend("show");
        });
    });

### JS初始化参数说明

	{
        maskTapClose: true,    // 点击页面阴影部分，是否关闭浮层，默认是true
	}