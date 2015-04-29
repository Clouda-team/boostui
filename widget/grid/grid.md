#栅格布局

##基本使用
给所示容器添加`.blend-grid`和`.blend-container-fluid`, 让后按照列和行排列

- `blend-row` 代表一行
- `blend-col-{1~12}` 代表列，网格把行共分成12份;

<div class="doc-demo">
    <div class="blend-grid blend-container-fluid">
        <div class="blend-row">
            <span class="blend-col-6">blend-col-6</span>
        </div>
        <div class="blend-row">
            <span class="blend-col-12">blend-col-12</span>
        </div>
        <div class="blend-row">
            <span class="blend-col-5">blend-col-5</span>
            <span class="blend-col-7">blend-col-7</span>
        </div>
    </div>
</div>


    <div class="blend-grid blend-container-fluid">
        <div class="blend-row">
            <span class="blend-col-6">blend-col-6</span>
        </div>
        <div class="blend-row">
            <span class="blend-col-12">blend-col-12</span>
        </div>
        <div class="blend-row">
            <span class="blend-col-5">blend-col-5</span>
            <span class="blend-col-7">blend-col-7</span>
        </div>
    </div>

## 间隔


- `blend-col-offset-{0~12}` 可使其列向左间距{0~12}列,通过margin-left实现;
- `blend-col-push-{0~12}` 可使其列向左间距{0~12}列，通过left实现;
- `blend-col-pull-{0~12}` 可使其列向右间距{0~12}列，通过right实现;



<div class="doc-demo">
    <div class="blend-grid blend-container-fluid">
        <div class="blend-row">
            <span class="blend-col-6">blend-col-6</span>
            <span class="blend-col-5 blend-col-offset-1">blend-col-5 blend-col-offset-1</span>
        </div>
        <div class="blend-row">
            <span class="blend-col-5">blend-col-5</span>
            <span class="blend-col-4 blend-col-push-1">blend-col-4 blend-col-push-1</span>
        </div>
    </div>
</div>



    <div class="blend-grid blend-container-fluid">
        <div class="blend-row">
            <span class="blend-col-6">blend-col-6</span>
            <span class="blend-col-5 blend-col-offset-1">blend-col-5 blend-col-offset-1</span>
        </div>
        <div class="blend-row">
            <span class="blend-col-5">blend-col-5</span>
            <span class="blend-col-4 blend-col-push-1">blend-col-4 blend-col-push-1</span>
        </div>
    </div>






