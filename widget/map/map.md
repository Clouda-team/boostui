#选择框

##基本使用
在要应用选择框样式的外层元素上添加属性`data-blend-checkbox`说明选择框类别和取值等信息。

`data-blend-checkbox`参数说明：

- `type` "radio"单选，"group"复选
- `values` 用数组形式表示每个选择项的值
- `itemSelector` 可以选择的元素标签含有的样式
- `itemSelected` 已选元素标签含有的样式

选择框颜色：

- `blend-button-default` 灰色，适用于按钮式
- `blend-button-red` 红色，适用于按钮式
- `blend-checkbox-default` 灰色，适用于点选式
- `blend-checkbox-red` 红色，适用于点选式

选择框形状：

- `blend-checkbox-default` 圆形框
- `blend-checkbox-square` 方形框

## 按钮式单选

###使用演示

<div class="doc-demo">
    <div data-blend-widget="checkbox" data-blend-checkbox='{"type":"radio","values":["button1","button2"],"itemSelector":".blend-button","itemSelected":"blend-button-checkbox-checked"}'>
        <button class="blend-button blend-button-red blend-button-checkbox">nocheck</button>
        <button class="blend-button blend-button-red blend-button-checkbox blend-button-checkbox-checked">checked</button>
    </div>
</div>

###HTML结构

    <div data-blend-widget="checkbox" data-blend-checkbox='{"type":"radio","values":["button1","button2"],"itemSelector":".blend-button","itemSelected":"blend-button-checkbox-checked"}'>
        <button class="blend-button blend-button-red blend-button-checkbox">nocheck</button>
        <button class="blend-button blend-button-red blend-button-checkbox blend-button-checkbox-checked">checked</button>
    </div>


## 点选式单选

###使用演示

<div class="doc-demo">
    <h2>你的性别</h2>
    <div data-blend-widget="checkbox"
         data-blend-checkbox='{"type":"radio","values":["man","woman"]}'>
        <span class="blend-checkbox blend-checkbox-default"></span><label class="blend-checkbox-label">man</label>
        <span class="blend-checkbox blend-checkbox-default"></span><label class="blend-checkbox-label">woman</label>
    </div>
</div>

###HTML结构

    <h3>你的性别</h3>
    <div data-blend-widget="checkbox"
         data-blend-checkbox='{"type":"radio","values":["man","woman"]}'>
        <span class="blend-checkbox blend-checkbox-default"></span><label class="blend-checkbox-label">man</label>
        <span class="blend-checkbox blend-checkbox-default"></span><label class="blend-checkbox-label">woman</label>
    </div>

## 复选框

###使用演示

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

###HTML结构

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











