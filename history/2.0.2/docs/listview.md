# 卡片列表(Listview)

在列表容器元素上添加`.blend-listview`。列表标题容器添加样式`.blend-listview-header`,标题标签添加样式`.blend-listview-header-title`。

标题示例：

<div class="doc-demo">
	<div class="blend-listview-header">
        <span class="blend-listview-header-title">标题</span>
    </div>
</div>

	<div class="blend-listview-header">
        <span class="blend-listview-header-title">标题</span>
    </div>

## 1. 样式一：小图图文列表

### 使用演示

<div class="doc-demo">
	<section class="blend-listview">
	    <div class="blend-listview-header">
	        <span class="blend-listview-header-title">小图图文列表</span>
	    </div>
	    <div class="blend-listview-main">
	        <a class="blend-flexbox blend-listview-item" href="#" id="#nopic">
	            <img class="blend-listview-item-pic blend-flexbox-item" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
	            <div class="blend-flexbox-item blend-flexbox-ratio">
	                <p class="blend-listview-item-title">标题</p>
	                <p class="blend-listview-item-summary blend-listview-item-two-line">
	                    这里有两行摘要文字，多的省略号,这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号
	                </p>
	            </div>
	            <div class="blend-flexbox-item blend-listview-item-right"></div>
	        </a>
	        <a class="blend-flexbox blend-listview-item" href="#" id="#summary">
	            <img class="blend-listview-item-pic blend-flexbox-item" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
	            <div class="blend-flexbox-item blend-flexbox-ratio">
	                <p class="blend-listview-item-title">标题</p>
	                <p class="blend-listview-item-summary blend-listview-item-two-line">
	                    这里有两行摘要文字，多的省略号,这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号
	                </p>
	            </div>
	            <div class="blend-flexbox-item blend-listview-item-right"></div>
	        </a>
	    </div>
	</section>
</div>

### HTML结构

	<section class="blend-listview">
	    <div class="blend-listview-header">
	        <span class="blend-listview-header-title">小图图文列表</span>
	    </div>
	    <div class="blend-listview-main">
	        <a class="blend-flexbox blend-listview-item" href="#" id="#nopic">
	            <img class="blend-listview-item-pic blend-flexbox-item" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
	            <div class="blend-flexbox-item blend-flexbox-ratio">
	                <p class="blend-listview-item-title">标题</p>
	                <p class="blend-listview-item-summary blend-listview-item-two-line">
	                    这里有两行摘要文字，多的省略号,这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号
	                </p>
	            </div>
	            <div class="blend-flexbox-item blend-listview-item-right"></div>
	        </a>
	        <a class="blend-flexbox blend-listview-item" href="#" id="#summary">
	            <img class="blend-listview-item-pic blend-flexbox-item" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
	            <div class="blend-flexbox-item blend-flexbox-ratio">
	                <p class="blend-listview-item-title">标题</p>
	                <p class="blend-listview-item-summary blend-listview-item-two-line">
	                    这里有两行摘要文字，多的省略号,这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号
	                </p>
	            </div>
	            <div class="blend-flexbox-item blend-listview-item-right"></div>
	        </a>
	    </div>
	</section>



## 2. 样式二：大图图文列表

### 使用演示

<div class="doc-demo">
	<section class="blend-listview blend-listview-pic-theme">
	    <div class="blend-listview-header">
	        <span class="blend-listview-header-title">大图图文列表</span>
	    </div>
	    <div class="blend-listview-pic-row blend-flexbox">
	        <div class="blend-listview-pic-theme-item blend-flexbox-item blend-flexbox-ratio">
	            <img class="blend-listview-pic-theme-img" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
	            <p class="blend-listview-item-title">标题</p>
	            <p class="blend-listview-item-summary blend-listview-item-two-line">
	                这里有两行摘要文字，多的省略号,这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号
	            </p>
	        </div>
	        <div class="blend-listview-pic-theme-item blend-flexbox-item blend-flexbox-ratio">
	            <img class="blend-listview-pic-theme-img" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
	            <p class="blend-listview-item-title">标题</p>
	            <p class="blend-listview-item-summary blend-listview-item-two-line">
	                这里有两行摘要文字，多的省略号,这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号
	            </p>
	        </div>
	    </div>
	</section>
</div>

### HTML结构

	<section class="blend-listview blend-listview-pic-theme">
	    <div class="blend-listview-header">
	        <span class="blend-listview-header-title">大图图文列表</span>
	    </div>
	    <div class="blend-listview-pic-row blend-flexbox">
	        <div class="blend-listview-pic-theme-item blend-flexbox-item blend-flexbox-ratio">
	            <img class="blend-listview-pic-theme-img" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
	            <p class="blend-listview-item-title">标题</p>
	            <p class="blend-listview-item-summary blend-listview-item-two-line">
	                这里有两行摘要文字，多的省略号,这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号
	            </p>
	        </div>
	        <div class="blend-listview-pic-theme-item blend-flexbox-item blend-flexbox-ratio">
	            <img class="blend-listview-pic-theme-img" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
	            <p class="blend-listview-item-title">标题</p>
	            <p class="blend-listview-item-summary blend-listview-item-two-line">
	                这里有两行摘要文字，多的省略号,这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号，这里有两行摘要文字，多的省略号
	            </p>
	        </div>
	    </div>
	</section>

## 3. 样式三：无图列表

### 使用演示

<div class="doc-demo">
	<section class="blend-listview blend-listview-cart-theme">
	    <div class="blend-listview-header">
	        <span class="blend-listview-header-title">无图列表</span>
	    </div>
	    <div class="blend-listview-main">
	        <a class="blend-listview-item" href="#" id="#cart1">
	            <div class="blend-flexbox">
	                <p class="blend-listview-item-title blend-listview-item-two-line blend-flexbox-item blend-flexbox-ratio">标题</p>
	                <p class="blend-flexbox-item blend-listview-status-text">待支付</p>
	            </div>
	            <p class="blend-listview-item-sub-title">副标题一</p>
	            <p class="blend-listview-item-sub-title">副标题二</p>
	        </a>
	        <a class="blend-listview-item" href="#" id="#cart2">
	            <div class="blend-flexbox">
	                <p class="blend-listview-item-title blend-listview-item-two-line blend-flexbox-item blend-flexbox-ratio">这里有两行摘要文字，多的省略号,这里有两行摘要文字，多的省略号，这里有两</p>
	                <p class="blend-flexbox-item blend-listview-status-text">3000-5000元/月</p>
	            </div>
	            <p class="blend-listview-item-sub-title">副标题一</p>
	            <p class="blend-listview-item-sub-title">副标题二</p>
	        </a>
	    </div>
	</section>
</div>

### HTML结构

	<section class="blend-listview blend-listview-cart-theme">
	    <div class="blend-listview-header">
	        <span class="blend-listview-header-title">无图列表</span>
	    </div>
	    <div class="blend-listview-main">
	        <a class="blend-listview-item" href="#" id="#cart1">
	            <div class="blend-flexbox">
	                <p class="blend-listview-item-title blend-listview-item-two-line blend-flexbox-item blend-flexbox-ratio">标题</p>
	                <p class="blend-flexbox-item blend-listview-status-text">待支付</p>
	            </div>
	            <p class="blend-listview-item-sub-title">副标题一</p>
	            <p class="blend-listview-item-sub-title">副标题二</p>
	        </a>
	        <a class="blend-listview-item" href="#" id="#cart2">
	            <div class="blend-flexbox">
	                <p class="blend-listview-item-title blend-listview-item-two-line blend-flexbox-item blend-flexbox-ratio">这里有两行摘要文字，多的省略号,这里有两行摘要文字，多的省略号，这里有两</p>
	                <p class="blend-flexbox-item blend-listview-status-text">3000-5000元/月</p>
	            </div>
	            <p class="blend-listview-item-sub-title">副标题一</p>
	            <p class="blend-listview-item-sub-title">副标题二</p>
	        </a>
	    </div>
	</section>

## 4. 样式四：订单商品列表

### 使用演示

<div class="doc-demo">
	<section class="blend-listview blend-listview-theme2">
        <div class="blend-listview-header blend-flexbox">
            <span class="blend-listview-header-title blend-flexbox-item blend-flexbox-ratio">
                订单商品列表
            </span>
            <span class="blend-flexbox-item"></span>
        </div>
        <div class="blend-listview-main">
            <div class="blend-flexbox blend-listview-item">
                <div class="blend-flexbox-item">
                    <img class="blend-listview-item-pic" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
                </div>
                <div class="blend-flexbox-item blend-flexbox-ratio">
                    <div class="blend-listview-item-title">
                        进口草莓500g
                    </div>
                </div>
                <div class="blend-flexbox-item">
                    <div class="blend-listview-item-price">￥40</div>
                    <div class="blend-listview-item-num">X3</div>
                </div>
            </div>
            <div class="blend-listview-item-desc">
                <div class="blend-row">
                    <span class="blend-col-8 blend-desc-header">订单号:11111</span>
                    <span class="blend-col-4 blend-desc-body">支付状态</span>
                </div>
            </div>
            <div class="blend-flexbox blend-listview-item">
                <div class="blend-flexbox-item">
                    <img class="blend-listview-item-pic" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
                </div>
                <div class="blend-flexbox-item blend-flexbox-ratio">
                    <div class="blend-listview-item-title">
                        进口草莓500g
                    </div>
                </div>
                <div class="blend-flexbox-item">
                    <div class="blend-listview-item-price">￥40</div>
                    <div class="blend-listview-item-num">X3</div>
                </div>
            </div>
            <div class="blend-listview-item-desc">
                <div class="blend-row">
                    <span class="blend-col-8 blend-desc-header">订单号:11111</span>
                    <span class="blend-col-4 blend-desc-body">支付状态</span>
                </div>
            </div>
        </div>
	</section>
</div>

### HTML结构

	<section class="blend-listview blend-listview-theme2">
        <div class="blend-listview-header blend-flexbox">
            <span class="blend-listview-header-title blend-flexbox-item blend-flexbox-ratio">
                订单商品列表
            </span>
            <span class="blend-flexbox-item"></span>
        </div>
        <div class="blend-listview-main">
            <div class="blend-flexbox blend-listview-item">
                <div class="blend-flexbox-item">
                    <img class="blend-listview-item-pic" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
                </div>
                <div class="blend-flexbox-item blend-flexbox-ratio">
                    <div class="blend-listview-item-title">
                        进口草莓500g
                    </div>
                </div>
                <div class="blend-flexbox-item">
                    <div class="blend-listview-item-price">￥40</div>
                    <div class="blend-listview-item-num">X3</div>
                </div>
            </div>
            <div class="blend-listview-item-desc">
                <div class="blend-row">
                    <span class="blend-col-8 blend-desc-header">订单号:11111</span>
                    <span class="blend-col-4 blend-desc-body">支付状态</span>
                </div>
            </div>
            <div class="blend-flexbox blend-listview-item">
                <div class="blend-flexbox-item">
                    <img class="blend-listview-item-pic" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
                </div>
                <div class="blend-flexbox-item blend-flexbox-ratio">
                    <div class="blend-listview-item-title">
                        进口草莓500g
                    </div>
                </div>
                <div class="blend-flexbox-item">
                    <div class="blend-listview-item-price">￥40</div>
                    <div class="blend-listview-item-num">X3</div>
                </div>
            </div>
            <div class="blend-listview-item-desc">
                <div class="blend-row">
                    <span class="blend-col-8 blend-desc-header">订单号:11111</span>
                    <span class="blend-col-4 blend-desc-body">支付状态</span>
                </div>
            </div>
        </div>
	</section>

## 5. 样式五：选择商品列表

### 使用演示

<div class="doc-demo">
	<section class="blend-listview blend-listview-theme1 blend-checkbox-red" data-blend-widget="checkbox" data-blend-checkbox='{"type":"group"}'>
        <div class="blend-listview-header blend-flexbox">
            <span class="blend-checkbox blend-checkbox-default blend-flexbox-item blend-checkbox-all blend-flexbox-item"></span>
            <span class="blend-listview-header-title blend-flexbox-item blend-flexbox-ratio">
                选择商品列表
            </span>
            <span class="blend-flexbox-item"></span>
        </div>
        <div class="blend-listview-main">
            <div class="blend-flexbox blend-listview-item">
                <span class="blend-checkbox blend-checkbox-default blend-flexbox-item"></span>
                <div class="blend-flexbox-item">
                    <img class="blend-listview-item-pic" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
                </div>
                <div class="blend-flexbox-item blend-flexbox-ratio">
                    <div class="blend-listview-item-title">
                        自产新鲜水果
                    </div>
                    <div class="blend-listview-item-badge">
                        <span class="blend-badge blend-badge-empty">随订随用</span>
                        <span class="blend-badge blend-badge-empty">随订随用</span>
                    </div>
                    <div class="blend-listview-item-price">
                        <em>￥</em>68
                    </div>
                </div>
                <div data-blend-widget="counter" class="blend-counter blend-listview-conter-box">
                    <div class="blend-counter-minus"></div>
                    <input class="blend-counter-input" type="text" value="1">
                    <div class="blend-counter-plus"></div>
                </div>
            </div>
            <div class="blend-flexbox blend-listview-item">
                <span class="blend-checkbox blend-checkbox-default blend-flexbox-item"></span>
                <div class="blend-flexbox-item">
                    <img class="blend-listview-item-pic" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
                </div>
                <div class="blend-flexbox-item blend-flexbox-ratio">
                    <div class="blend-listview-item-title">
                        自产新鲜水果
                    </div>
                    <div class="blend-listview-item-badge">
                        <span class="blend-badge blend-badge-empty">随订随用</span>
                        <span class="blend-badge blend-badge-empty">随订随用</span>
                    </div>
                    <div class="blend-listview-item-price">
                        <em>￥</em>68
                    </div>
                </div>
                <div data-blend-widget="counter" data-blend-counter='{"step":1,"maxValue":10,"minValue":1}' class="blend-counter blend-listview-conter-box">
                    <div class="blend-counter-minus"></div>
                    <input class="blend-counter-input" type="text" value="1">
                    <div class="blend-counter-plus"></div>
                </div>
            </div>
        </div>
	</section>
</div>

### HTML结构

	<section class="blend-listview blend-listview-theme1 blend-checkbox-red" data-blend-widget="checkbox" data-blend-checkbox='{"type":"group"}'>
        <div class="blend-listview-header blend-flexbox">
            <span class="blend-checkbox blend-checkbox-default blend-flexbox-item blend-checkbox-all blend-flexbox-item"></span>
            <span class="blend-listview-header-title blend-flexbox-item blend-flexbox-ratio">
                选择商品列表
            </span>
            <span class="blend-flexbox-item"></span>
        </div>
        <div class="blend-listview-main">
            <div class="blend-flexbox blend-listview-item">
                <span class="blend-checkbox blend-checkbox-default blend-flexbox-item"></span>
                <div class="blend-flexbox-item">
                    <img class="blend-listview-item-pic" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
                </div>
                <div class="blend-flexbox-item blend-flexbox-ratio">
                    <div class="blend-listview-item-title">
                        自产新鲜水果
                    </div>
                    <div class="blend-listview-item-badge">
                        <span class="blend-badge blend-badge-empty">随订随用</span>
                        <span class="blend-badge blend-badge-empty">随订随用</span>
                    </div>
                    <div class="blend-listview-item-price">
                        <em>￥</em>68
                    </div>
                </div>
                <div data-blend-widget="counter" class="blend-counter blend-listview-conter-box">
                    <div class="blend-counter-minus"></div>
                    <input class="blend-counter-input" type="text" value="1">
                    <div class="blend-counter-plus"></div>
                </div>
            </div>
            <div class="blend-flexbox blend-listview-item">
                <span class="blend-checkbox blend-checkbox-default blend-flexbox-item"></span>
                <div class="blend-flexbox-item">
                    <img class="blend-listview-item-pic" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
                </div>
                <div class="blend-flexbox-item blend-flexbox-ratio">
                    <div class="blend-listview-item-title">
                        自产新鲜水果
                    </div>
                    <div class="blend-listview-item-badge">
                        <span class="blend-badge blend-badge-empty">随订随用</span>
                        <span class="blend-badge blend-badge-empty">随订随用</span>
                    </div>
                    <div class="blend-listview-item-price">
                        <em>￥</em>68
                    </div>
                </div>
                <div data-blend-widget="counter" data-blend-counter='{"step":1,"maxValue":10,"minValue":1}' class="blend-counter blend-listview-conter-box">
                    <div class="blend-counter-minus"></div>
                    <input class="blend-counter-input" type="text" value="1">
                    <div class="blend-counter-plus"></div>
                </div>
            </div>
        </div>
	</section>

### 使用说明

1. 需要复选/单选功能时在列表容器添加`data-blend-widget="checkbox"`属性，并指定是复选或单选。

	- `data-blend-checkbox='{"type":"group"}'` 复选
	- `data-blend-checkbox='{"type":"radio"}'` 单选
	
	当使用复选功能时，全选的复选框需要添加`.blend-checkbox-all`样式。
2. 列表右侧的`数量选择器`使用方法请查阅该组件使用说明。

## 6. 样式六：商品展示列表

### 使用演示

<div class="doc-demo">
	<section class="blend-listview blend-listview-theme3" style="margin: 20px 0;">
        <div class="blend-listview-header blend-flexbox">
            <span class="blend-listview-header-title blend-flexbox-item blend-flexbox-ratio">
                商品展示列表
            </span>
            <span class="blend-flexbox-item"></span>
        </div>
        <div class="blend-listview-main">
            <a class="blend-flexbox blend-listview-item">
                <div class="blend-flexbox-item">
                    <img class="blend-listview-item-pic" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
                </div>
                <div class="blend-flexbox-item blend-flexbox-ratio">
                    <div class="blend-listview-item-title">
                        自产新鲜水果
                    </div>
                    <p class="blend-listview-item-sub-title">产地：云南</p>
                    <p class="blend-listview-item-sub-title">重量：0.5kg</p>
                    <p class="blend-listview-item-sub-title">配送范围：仅限沈阳、北京、郑州</p>
                    <div class="blend-listview-item-price">
                        <em>￥</em>68
                    </div>
                </div>
                <div class="blend-flexbox-item blend-listview-item-right"></div>
            </a>
            <a class="blend-flexbox blend-listview-item">
                <div class="blend-flexbox-item">
                    <img class="blend-listview-item-pic" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
                </div>
                <div class="blend-flexbox-item blend-flexbox-ratio">
                    <div class="blend-listview-item-title">
                        自产新鲜水果
                    </div>
                    <p class="blend-listview-item-sub-title">产地：云南</p>
                    <p class="blend-listview-item-sub-title">重量：0.5kg</p>
                    <p class="blend-listview-item-sub-title">配送范围：仅限沈阳、北京、郑州</p>
                    <div class="blend-listview-item-price">
                        <em>￥</em>68
                    </div>
                </div>
                <div class="blend-flexbox-item blend-listview-item-right"></div>
            </a>
        </div>
	</section>
</div>

### HTML结构

	<section class="blend-listview blend-listview-theme1 blend-checkbox-red" data-blend-widget="checkbox" data-blend-checkbox='{"type":"group"}'>
        <div class="blend-listview-header blend-flexbox">
            <span class="blend-checkbox blend-checkbox-default blend-flexbox-item blend-checkbox-all blend-flexbox-item"></span>
            <span class="blend-listview-header-title blend-flexbox-item blend-flexbox-ratio">
                选择商品列表
            </span>
            <span class="blend-flexbox-item"></span>
        </div>
        <div class="blend-listview-main">
            <div class="blend-flexbox blend-listview-item">
                <span class="blend-checkbox blend-checkbox-default blend-flexbox-item"></span>
                <div class="blend-flexbox-item">
                    <img class="blend-listview-item-pic" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
                </div>
                <div class="blend-flexbox-item blend-flexbox-ratio">
                    <div class="blend-listview-item-title">
                        自产新鲜水果
                    </div>
                    <div class="blend-listview-item-badge">
                        <span class="blend-badge blend-badge-empty">随订随用</span>
                        <span class="blend-badge blend-badge-empty">随订随用</span>
                    </div>
                    <div class="blend-listview-item-price">
                        <em>￥</em>68
                    </div>
                </div>
                <div data-blend-widget="counter" class="blend-counter blend-listview-conter-box">
                    <div class="blend-counter-minus"></div>
                    <input class="blend-counter-input" type="text" value="1">
                    <div class="blend-counter-plus"></div>
                </div>
            </div>
            <div class="blend-flexbox blend-listview-item">
                <span class="blend-checkbox blend-checkbox-default blend-flexbox-item"></span>
                <div class="blend-flexbox-item">
                    <img class="blend-listview-item-pic" src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" alt="pic"/>
                </div>
                <div class="blend-flexbox-item blend-flexbox-ratio">
                    <div class="blend-listview-item-title">
                        自产新鲜水果
                    </div>
                    <div class="blend-listview-item-badge">
                        <span class="blend-badge blend-badge-empty">随订随用</span>
                        <span class="blend-badge blend-badge-empty">随订随用</span>
                    </div>
                    <div class="blend-listview-item-price">
                        <em>￥</em>68
                    </div>
                </div>
                <div data-blend-widget="counter" data-blend-counter='{"step":1,"maxValue":10,"minValue":1}' class="blend-counter blend-listview-conter-box">
                    <div class="blend-counter-minus"></div>
                    <input class="blend-counter-input" type="text" value="1">
                    <div class="blend-counter-plus"></div>
                </div>
            </div>
        </div>
	</section>

