#地址信息

## 1. 使用演示
<div class="doc-demo">
    <div class="blend-address">
        <div class="blend-address-name"><span>收货人</span></div>
        <div class="blend-address-value">
            <div class="blend-address-input">
                <input type="text" class="blend-address-detail" placeholder="姓名" value="熊猫先森">
            </div>
            <div class="blend-address-input">
                <input type="text" class="blend-address-detail" placeholder="手机号" value="15710094933">
            </div>
        </div>
    </div>
	<div id="more" class="blend-address" style="margin: 20px 0;">
        <div class="blend-address-name"><span>收货地址</span></div>
        <div class="blend-address-value">
            <div class="blend-address-input">
                <p class="blend-address-detail blend-address-btn">四川省 成都市<span class="blend-address-arrow"></span></p>
            </div>
            <div class="blend-address-input">
                <textarea class="blend-address-detail" value="">北郊斧头山成都大熊猫繁育基地动物园区</textarea>
            </div>
            <div class="blend-address-input">
                <input type="text" class="blend-address-detail" value="61000" placeholder="邮编">
            </div>
        </div>
    </div>
</div>

<script>
boost('#more').address({}).on("click", function (){
    alert("点击事件");
});
</script>

## 2. 使用方式

### HTML结构


	<div class="blend-address">
        <div class="blend-address-name"><span>收货人</span></div>
        <div class="blend-address-value">
            <div class="blend-address-input">
                <input type="text" class="blend-address-detail" placeholder="姓名" value="熊猫先森">
            </div>
            <div class="blend-address-input">
                <input type="text" class="blend-address-detail" placeholder="手机号" value="15710094933">
            </div>
        </div>
    </div>

	<div id="more" class="blend-address">
        <div class="blend-address-name"><span>收货地址</span></div>
        <div class="blend-address-value">
            <div class="blend-address-input">
                <p class="blend-address-detail blend-address-btn">四川省 成都市<span class="blend-address-arrow"></span></p>
            </div>
            <div class="blend-address-input">
                <textarea class="blend-address-detail" value="">北郊斧头山成都大熊猫繁育基地动物园区</textarea>
            </div>
            <div class="blend-address-input">
                <input type="text" class="blend-address-detail" value="61000" placeholder="邮编">
            </div>
        </div>
    </div>

### 初始化

使用JS来初始化address组件
	
	boost('#more').address({
	}).on("address:click", function (){
        alert("点击事件");	// 点击事件，用以触发显示选择列表
    });

### 初始化参数说明

	{
		btnClass: "blend-address-btn",	// 给元素添加点击事件，元素默认样式:"blend-address-btn"
	}