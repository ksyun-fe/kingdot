<template>
    <div class="demo-preview-wrap flex-row">
        <div class="flex-grow">
            <h4>Breadcrumb</h4>
            <div class="">
                <kd-breadcrumb separator="/">
                    <kd-breadcrumb-item>一级菜单</kd-breadcrumb-item>
                    <kd-breadcrumb-item>二级菜单</kd-breadcrumb-item>
                    <kd-breadcrumb-item>三级菜单</kd-breadcrumb-item>
                </kd-breadcrumb>
                <kd-breadcrumb>
                    <kd-breadcrumb-item to="/">一级菜单</kd-breadcrumb-item>
                    <kd-breadcrumb-item href="/">二级菜单</kd-breadcrumb-item>
                    <kd-breadcrumb-item>三级菜单</kd-breadcrumb-item>
                </kd-breadcrumb>
            </div>
            <h4>Button</h4>
            <div class="preview-demo">
                <div class="button-section">
                    <kd-button>defult</kd-button>
                    <kd-button type="primary">primary</kd-button>
                    <kd-button type="success">Success</kd-button>
                    <kd-button type="warning">Warning</kd-button>
                    <kd-button type="danger">Danger</kd-button>
                    <kd-button type="none">文字按钮</kd-button>
                    <kd-button type="text">链接按钮</kd-button>
                    <kd-button
                            type="dashed"
                            clickDelay
                    >默认按钮</kd-button>
                </div>
                <div class="button-section">
                    <kd-button hollow>空心按钮</kd-button>
                    <kd-button
                            type="primary"
                            hollow
                    >主要按钮</kd-button>
                    <kd-button
                            type="success"
                            hollow
                    >成功按钮</kd-button>
                    <kd-button
                            type="warning"
                            hollow
                    >警告按钮</kd-button>
                    <kd-button
                            type="danger"
                            hollow
                    >危险按钮</kd-button>
                </div>
                <div class="button-section">
                    <kd-button
                            type="primary"
                            disabled
                    >禁用按钮</kd-button>
                    <kd-button
                            disabled
                            type="dashed"
                    >默认禁用按钮</kd-button>
                    <kd-button
                            disabled
                            type="primary"
                    >主要禁用按钮</kd-button>
                    <kd-button
                            disabled
                            type="text"
                    >text禁用按钮</kd-button>
                    <kd-button
                            disabled
                            type="none"
                    >none禁用按钮</kd-button>
                </div>
                <div class="button-section">
                    <kd-button
                            type="primary"
                            loading
                    ></kd-button>
                    <kd-button
                            type="primary"
                            loading
                    >加载中</kd-button>
                    <kd-button
                            type="primary"
                            icon="kd-icon-more"
                    ></kd-button>
                    <kd-button
                            type="primary"
                            icon="kd-icon-plus"
                    >图标在前</kd-button>
                    <kd-button type="danger">图标在后<i class="kd-icon-right kd-icon-more"></i></kd-button>
                </div>
                <div class="button-section">
                    <kd-button
                            icon="kd-icon-arrow-right"
                            shape="circle"
                    ></kd-button>
                    <kd-button
                            type="primary"
                            icon="kd-icon-arrow-right"
                            shape="circle"
                    ></kd-button>
                    <kd-button
                            type="primary"
                            shape="round"
                    >按钮</kd-button>
                </div>
                <div class="button-section">
                    <kd-button
                            type="primary"
                            size="large"
                    >大按钮</kd-button>
                    <kd-button
                            type="primary"
                            size="small"
                    >小按钮</kd-button>
                    <kd-button
                            type="primary"
                            size="mini"
                    >mini按钮</kd-button>
                </div>
                <div class="button-section">
                    <kd-button
                            type="primary"
                            size="large"
                            shape="round"
                    >大按钮</kd-button>
                    <kd-button
                            type="primary"
                            size="small"
                            shape="round"
                    >小按钮</kd-button>
                    <kd-button
                            type="primary"
                            size="mini"
                            shape="round"
                    >mini按钮</kd-button>
                </div>
                <div class="button-section">
                    <kd-button
                            type="primary"
                            size="large"
                            icon="kd-icon-arrow-right"
                            shape="circle"
                    ></kd-button>
                    <kd-button
                            type="primary"
                            size="small"
                            icon="kd-icon-arrow-right"
                            shape="circle"
                    ></kd-button>
                    <kd-button
                            type="primary"
                            size="mini"
                            icon="kd-icon-arrow-right"
                            shape="circle"
                    ></kd-button>
                </div>
                <div class="button-section">
                    <kd-button-group
                            v-model="checkboxValue"
                            checkType="checkbox"
                            :disabled="disabled"
                    >
                        <kd-button value="1">按钮1</kd-button>
                        <kd-button value="2">按钮2</kd-button>
                        <kd-button value="3">按钮3</kd-button>
                    </kd-button-group>
                </div>
                <div class="button-section">
                    <kd-button-group>
                        <kd-button type="primary">按钮1</kd-button>
                        <kd-button
                                type="primary"
                                icon="iconmoren_xinzeng"
                        >按钮2</kd-button>
                        <kd-button
                                type="primary"
                                icon="iconmoren_xinzeng"
                        >按钮3</kd-button>
                    </kd-button-group>
                </div>
            </div>
            <h4>Checkbox</h4>
            <div class="">
                <kd-checkbox>checkbox</kd-checkbox>
                <kd-checkbox disabled>checkbox</kd-checkbox>
            </div>
            <h4>Collapse</h4>
            <div class="">
                <kd-collapse
                >
                    <kd-collapse-item
                            title="季风气候"
                            value="climate"
                            disabled
                    >
                        <ul>
                            <li>亚热带大陆东岸因地处回归线附近，故形成亚热带气候。</li>
                            <li>地处副热带沿海一带，夏季受海陆气温差异影响，吹东南风，冬季受来自西伯利亚的寒风影响，吹西北风，这二者轮流控制，季节性交替，偏角超过120度，形成了季风；</li>
                            <li>降水受行星风带和巨大地形影响显著，天气的非周期性变化和降水季节变化都很显著，因而形成季风气候。</li>
                        </ul>
                    </kd-collapse-item>
                    <kd-collapse-item
                            title="气候特性"
                            value="features"
                    >
                        <ul>
                            <li>季风气候总体气候特征为夏热冬温，四季分明，雨热同期，季风发达；</li>
                            <li>季风气候热量丰富，年平均气温为15-22摄氏度，最冷月平均气温在0-15摄氏度之间，温暖指数为135摄氏度·月至240摄氏度·月之间；</li>
                            <li>季风气候降水充沛，但季风性特征明显；从地域来看，降水总量从东南沿海向西北内陆递减，东南沿海可达2000毫米，而长江流域为1000毫米；从时间来看，春季降水约占全年降水总量的20-45%，夏季为30-50%，秋季为15-20%，冬季仅有10-15%；</li>
                        </ul>
                    </kd-collapse-item>
                    <kd-collapse-item
                            title="自然景观"
                            value="landscape"
                    >
                        季风气候的地带性植被为亚热带常绿阔叶林，亦称之为副热带季风林。
                        壳斗科、樟科、山茶科、木兰科和金缕梅科等是常绿阔叶林中的主要树种。典型的亚热带常绿阔叶林中的树木通常具有樟科植物的特征，叶片革质全缘、表面光亮，叶面常迎向阳光照射的方向，因此，常绿阔叶林又有照叶林之称。典型的有樟树、茶树、柑橘树、甘蔗等。
                    </kd-collapse-item>
                </kd-collapse>
                <kd-collapse concise>
                    <kd-collapse-item title="季风气候">
                        <ul>
                            <li>亚热带大陆东岸因地处回归线附近，故形成亚热带气候。</li>
                            <li>地处副热带沿海一带，夏季受海陆气温差异影响，吹东南风，冬季受来自西伯利亚的寒风影响，吹西北风，这二者轮流控制，季节性交替，偏角超过120度，形成了季风；</li>
                            <li>降水受行星风带和巨大地形影响显著，天气的非周期性变化和降水季节变化都很显著，因而形成季风气候。</li>
                        </ul>
                    </kd-collapse-item>
                    <kd-collapse-item title="气候特性">
                        <ul>
                            <li>季风气候总体气候特征为夏热冬温，四季分明，雨热同期，季风发达；</li>
                            <li>季风气候热量丰富，年平均气温为15-22摄氏度，最冷月平均气温在0-15摄氏度之间，温暖指数为135摄氏度·月至240摄氏度·月之间；</li>
                            <li>季风气候降水充沛，但季风性特征明显；从地域来看，降水总量从东南沿海向西北内陆递减，东南沿海可达2000毫米，而长江流域为1000毫米；从时间来看，春季降水约占全年降水总量的20-45%，夏季为30-50%，秋季为15-20%，冬季仅有10-15%；</li>
                        </ul>
                    </kd-collapse-item>
                    <kd-collapse-item title="自然景观">
                        季风气候的地带性植被为亚热带常绿阔叶林，亦称之为副热带季风林。
                        壳斗科、樟科、山茶科、木兰科和金缕梅科等是常绿阔叶林中的主要树种。典型的亚热带常绿阔叶林中的树木通常具有樟科植物的特征，叶片革质全缘、表面光亮，叶面常迎向阳光照射的方向，因此，常绿阔叶林又有照叶林之称。典型的有樟树、茶树、柑橘树、甘蔗等。
                    </kd-collapse-item>
                </kd-collapse>
            </div>
            <h4>DatePicker</h4>
            <div class="">
                <div class="mb-small">
                    <kd-date-picker range></kd-date-picker>
                </div>
            </div>
            <h4>DatetimePicker</h4>
            <div class="">
                <kd-date-time-picker
                        range
                > </kd-date-time-picker>
            </div>
            <h4>Dialog</h4>
            <div class="dialog-section">
                <kd-button @click="openDialog">点击打开默认Dialog</kd-button>
                <kd-button @click="openMessageDialog">提示信息Dialog</kd-button>
                <kd-button @click="openMessageConfirmDialog">二次确认Dialog</kd-button>
                <kd-dialog
                        v-model="showDialog"
                        :disableOk="disableOk"
                        :ok="OK"
                        width="800"
                        height="800"
                >

                </kd-dialog>
                <kd-dialog
                        v-model="showMessageDialog"
                        type="tips"
                        :showTitle="false"
                        icon="success"
                        tipsTitle="操作成功"
                        :tipsMessage="additionalTips"
                        :tipsIsCenter="true"
                ></kd-dialog>
                <kd-dialog
                        v-model="showConfirmDialog"
                        type="confirm"
                        :showTitle="false"
                        icon="failed"
                        :confirmTips="confirmTips"
                        :confirmTitle="confirmTitle"
                >
                </kd-dialog>
            </div>
            <h4>Drawer</h4>
            <div class="drawer-section">
                <kd-button @click="openDrawer">打开Drawer</kd-button>
                <kd-drawer v-model="showConfirmDrawer">

                </kd-drawer>
            </div>
            <h4>Dropdown</h4>
            <div class="">
                <kd-dropdown type="primary">
                    <kd-button type="text">下拉菜单<i class="kdicon kd-icon-right kd-icon-arrow-down"></i></kd-button>
                    <kd-dropdown-menu slot="dropdown">
                        <kd-dropdown-item> 1 item </kd-dropdown-item>
                        <kd-dropdown-item> 2 item </kd-dropdown-item>
                        <kd-dropdown-item> 3 item </kd-dropdown-item>
                    </kd-dropdown-menu>
                </kd-dropdown>
                <kd-dropdown split-button>
                    菜单
                    <kd-dropdown-menu slot="dropdown">
                        <kd-dropdown-item value="1 menu item"> 1 item test button </kd-dropdown-item>
                        <kd-dropdown-item value="2 menu item"> 2 item </kd-dropdown-item>
                        <kd-dropdown-item
                                value="3 menu item"
                                disabled
                                dividedLine
                        > 3 item </kd-dropdown-item>
                    </kd-dropdown-menu>
                </kd-dropdown>
            </div>
            <h4>Input</h4>
            <div class="input-area">
                <div>
                    <kd-input
                            v-model="inputVal"
                            placeholder="请输入内容"
                            length-limit
                    ></kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputVal"
                            placeholder="请输入内容"
                            :disabled="true"
                    ></kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputVal"
                            type="text"
                            clearable
                    ></kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputVal"
                            :type="inputType"
                    >
                        <template v-slot:suffix>
                            <i
                                    :class="iconClass"
                                    @click="switchType"
                            ></i>
                        </template>
                    </kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputUrl"
                            name="url"
                            size="mini"
                    >
                        <template v-slot:prepend>
                            <span>http://</span>
                        </template>
                        <template v-slot:append>
                            <span>.com</span>
                        </template>
                    </kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputUrl"
                            name="url"
                            size="small"
                    >
                        <template v-slot:prepend>
                            <span>http://</span>
                        </template>
                        <template v-slot:append>
                            <span>.com</span>
                        </template>
                    </kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputUrl"
                            name="url"
                            size="default"
                    >
                        <template v-slot:prepend>
                            <span>http://</span>
                        </template>
                        <template v-slot:append>
                            <span>.com</span>
                        </template>
                    </kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputUrl"
                            name="url"
                            size="large"
                    >
                        <template v-slot:prepend>
                            <span>http://</span>
                        </template>
                        <template v-slot:append>
                            <span>.com</span>
                        </template>
                    </kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputVal"
                            type="textarea"
                            name="desc"
                            :rows="5"
                            width="300px"
                    ></kd-input>
                </div>
            </div>
            <h4>Menu</h4>
            <div>
                <kd-menu
                        class="demo-menu-block"
                        :selectedMenu.sync="selectedMenu"
                        :defaultOpeneds="defaultOpeneds"
                >
                    <kd-menu-item
                            v-for="(item, index) in menuList"
                            :key="index"
                            :tips="item.name"
                            :disabled="item.disabled"
                            :name="item.key"
                    >
                        <i :class="item.icon"></i>
                        <span>{{ item.name }}</span>
                    </kd-menu-item>
                    <kd-submenu name="2">
                        <template slot="title">
                            <i class="kd-icon-menu-more"></i>
                            <span slot="title">子菜单</span>
                        </template>
                        <kd-menu-item
                                name="2-1"
                                tips="子菜单1"
                        >
                            <i class="kd-icon-menu-more"></i>
                            <span>子菜单1</span>
                        </kd-menu-item>
                        <kd-menu-item
                                disabled
                                name="2-2"
                                tips="子菜单2"
                        >
                            <i class="kd-icon-menu-more"></i>
                            <span>子菜单2</span>
                        </kd-menu-item>
                        <kd-submenu
                                popperAppendToBody
                                trigger="click"
                                name="3"
                        >
                            <template slot="title">
                                <i class="kd-icon-menu-more"></i>
                                <span slot="title">子子菜单</span>
                            </template>
                            <kd-menu-item
                                    name="2-3-1"
                                    tips="子菜单1"
                            >
                                <i class="kd-icon-menu-more"></i>
                                <span>子菜单1</span>
                            </kd-menu-item>
                            <kd-menu-item
                                    disabled
                                    name="2-3-2"
                                    tips="子菜单2"
                            >
                                <i class="kd-icon-menu-more"></i>
                                <span>子菜单2</span>
                            </kd-menu-item>
                            <kd-menu-item
                                    name="2-3-3"
                                    tips="子菜单3"
                            >
                                <i class="kd-icon-menu-more"></i>
                                <span>子菜单3</span>
                            </kd-menu-item>
                        </kd-submenu>
                    </kd-submenu>
                </kd-menu>
            </div>
            <h4>Message</h4>
            <div>
                <KdButton
                        v-for="type in messageTypeList"
                        :key="type"
                        style="margin-right: 10px"
                        @click="showMessage(type)"
                >{{ type || '默认提示' }}</KdButton>
            </div>
            <h4>Pagination</h4>
            <div>
                <div class="mb-small">
                    <kd-pagination
                            prevText="上一页"
                            nextText="下一页"
                            :total="120"
                            :limit="10"
                            :current="1"
                            :limits="[5, 10, 20, 50]"
                    />
                </div>
                <kd-pagination
                        prevText="kd-icon-arrow-left"
                        nextText="kd-icon-arrow-right"
                        noBorder
                        :total="120"
                        :limit="10"
                        :current="1"
                        :limits="[5, 10, 20, 50]"
                        :showGoto="false"
                        :showTotal="false"
                        :showPageCount="false"
                        :showLimits="false"
                />
            </div>
            <h4>Progress</h4>
            <div class="progress-area">
                <kd-progress
                        type="line"
                        :percentage="0"
                        :active="true"
                        :strokeWidth="20"
                        :showText="true"
                        color="#4fcc6f"
                />
                <kd-progress
                        type="line"
                        :percentage="30"
                        :active="true"
                        :strokeWidth="20"
                        :showText="true"
                        status="error"
                        color="#EF4E76"
                />
                <kd-progress
                        type="line"
                        :percentage="30"
                        :active="true"
                        :strokeWidth="20"
                        :showText="true"
                        status="warning"
                        color="#FF9A42"
                />
                <kd-progress
                        type="line"
                        :percentage="progressPercentage"
                        :format="formatPercentage"
                        color="#4fcc6f"
                        :showText="true"
                        :strokeWidth="20"
                />
                <kd-progress
                        type="line"
                        :percentage="progressPercentage"
                        color="#4fcc6f"
                        :status="progressStatus"
                        :showText="true"
                        :strokeWidth="20"
                />
                <kd-progress
                        type="circle"
                        :percentage="progressPercentage"
                        color="#4fcc6f"
                        :showText="true"
                        :progressTextSize="12"
                />
            </div>
            <h4>Radio</h4>
            <div class="">
                <kd-radio>radio</kd-radio>
                <kd-radio disabled>radio</kd-radio>
            </div>
            <h4>Scrollselect</h4>
            <div class="">
                <kd-scroll-select
                        v-model="scrollSelectVal"
                        :disable="scrollSelectDisable"
                ></kd-scroll-select>
            </div>
            <h4>Select</h4>
            <div>
                <kd-select
                        v-model="select1"
                        placeholder="请选择内容"
                        filterable
                >
                    <kd-option value="">空数据</kd-option>
                    <kd-option
                            v-for="item in options"
                            :key="item.value"
                            :title="item.label"
                            :value="item.value"
                    >{{ item.label }}</kd-option>
                </kd-select>
            </div>
            <h4>Skeleton</h4>
            <div class="skeleton-section">
                <kd-skeleton
                        v-model="SkeletonValue"
                        :active="SkeletonValue"
                />
                <kd-skeleton v-model="SkeletonValue">
                    <div
                            slot="skeleton"
                            class="skeleton-box"
                    >
                        <kd-skeleton-item type="button"/>
                        <kd-skeleton-item type="box"/>
                        <kd-skeleton-item type="round"/>
                        <kd-skeleton-item type="title"/>
                        <kd-skeleton-item type="img"/>
                    </div>
                </kd-skeleton>
            </div>
            <h4>Slider</h4>
            <div style="width:800px;">
                <kd-slider
                        v-model="slider1"
                        showEnd
                ></kd-slider>
                <kd-slider
                        v-model="slider1"
                        showEnd
                        showStop
                ></kd-slider>
                <kd-slider
                        v-model="slider1"
                        showEnd
                        disabled
                ></kd-slider>
                <kd-slider
                        v-model="slider2"
                        range
                        showInput
                        showEnd
                        always
                ></kd-slider>
                <kd-slider
                        :min="1"
                        :max="12"
                        :value="3"
                        :marks="marks"
                ></kd-slider>
            </div>
            <h4>Spin</h4>
            <div>
                <kd-spin
                        v-for="item in ['large','default','small','mini']"
                        :key="item"
                        :size="item"
                        :overlay="false"
                        class="spin-margin-right"
                ></kd-spin>
            </div>
            <h4>Spinner</h4>
            <div>
                <kd-spinner
                        v-model="spinnerValue"
                        class="mr-mini"
                ></kd-spinner>
                <kd-spinner
                        v-model="spinnerValue"
                        button-position="right"
                        class="mr-mini"
                ></kd-spinner>
                <kd-spinner
                        :value="1"
                        disabled
                ></kd-spinner>
            </div>
            <h4>Steps</h4>
            <div class="steps-section">
                <kd-steps
                        v-model="stepIndex1"
                        type="spot"
                        :isClick="true"
                >
                    <kd-step title="步骤一"></kd-step>
                    <kd-step title="步骤二"></kd-step>
                    <kd-step title="步骤三"></kd-step>
                    <kd-step title="完成"></kd-step>
                </kd-steps>
                <kd-steps
                        v-model="stepIndex1"
                        size="small"
                >
                    <kd-step title="步骤一"></kd-step>
                    <kd-step title="步骤二"></kd-step>
                    <kd-step title="步骤三"></kd-step>
                    <kd-step title="完成完成完成完成"></kd-step>
                </kd-steps>
                <kd-steps v-model="stepIndex1">
                    <kd-step
                            title=""
                            :description="description"
                    ></kd-step>
                    <kd-step
                            title=""
                            :description="description"
                    ></kd-step>
                    <kd-step
                            title="步骤三"
                            :description="description"
                    ></kd-step>
                    <kd-step
                            title="完成"
                            :description="description"
                    ></kd-step>
                </kd-steps>
                <kd-steps v-model="stepIndex1">
                    <kd-step
                            title="步骤一"
                            icon="kd-icon-upload-file"
                    ></kd-step>
                    <kd-step
                            title="步骤二"
                            icon="kd-icon-menu-more"
                    ></kd-step>
                    <kd-step
                            title="步骤三"
                            icon="kd-icon-success-circle"
                    ></kd-step>
                </kd-steps>
                <kd-steps
                        v-model="stepIndex1"
                        type="simple"
                >
                    <kd-step title="步骤一"></kd-step>
                    <kd-step title="步骤二"></kd-step>
                    <kd-step title="步骤三"></kd-step>
                </kd-steps>
                <kd-steps
                        v-model="stepIndex1"
                        finishStatus="finished"
                >
                    <kd-step
                            title="步骤一"
                            status="wait"
                    ></kd-step>
                    <kd-step
                            title="步骤二"
                            status="error"
                    ></kd-step>
                    <kd-step
                            title="步骤三"
                            status="active"
                    ></kd-step>
                    <kd-step title="完成完成完成完成"></kd-step>
                </kd-steps>
                <div style="height:300px;">
                    <kd-steps
                            v-model="stepIndex1"
                            style="margin-bottom:40px"
                            direction="vertical"
                    >
                        <kd-step title="步骤一"></kd-step>
                        <kd-step title="步骤二"></kd-step>
                        <kd-step
                                title=""
                                :description="description"
                        ></kd-step>
                    </kd-steps>
                </div>
            </div>
            <h4>Switch</h4>
            <div>
                <kd-switch
                        v-model="switchVal"
                        size="default"
                ></kd-switch>
                <kd-switch
                        v-model="switchVal"
                        size="default"
                        disabled
                ></kd-switch>
                <kd-switch
                        v-model="switchVal"
                        active-text="开"
                        inactive-text="关"
                        font-size="14"
                ></kd-switch>
            </div>
            <h4>Tabs</h4>
            <div>
                <kd-tabs v-model="tabsValue">
                    <kd-tab value="1">1</kd-tab>
                    <kd-tab value="2">2</kd-tab>
                    <kd-tab value="3">3</kd-tab>
                </kd-tabs>
                <br/>
                <kd-tabs
                        v-model="tabsValue"
                        type="block"
                >
                    <kd-tab value="1">1</kd-tab>
                    <kd-tab value="2">2</kd-tab>
                    <kd-tab value="3">3</kd-tab>
                </kd-tabs>
                <br/>
                <kd-tabs
                        v-model="tabsValue"
                        type="card"
                >
                    <kd-tab value="1">1</kd-tab>
                    <kd-tab value="2">2</kd-tab>
                    <kd-tab value="3">3</kd-tab>
                </kd-tabs>
                <br/>
                <kd-tabs
                        v-model="tabsValue"
                        type="pagination"
                >
                    <kd-tab value="1">1</kd-tab>
                    <kd-tab value="2">2</kd-tab>
                    <kd-tab value="3">3</kd-tab>
                </kd-tabs>
                <br/>
                <kd-tabs
                        v-model="tabsValue"
                        type="vertical"
                >
                    <kd-tab value="1">1</kd-tab>
                    <kd-tab value="2">2</kd-tab>
                    <kd-tab
                            value="3"
                    >3</kd-tab>
                </kd-tabs>
                <br/>
                <kd-tabs
                        v-model="tabsValue"
                >
                    <kd-tab value="1">1</kd-tab>
                    <kd-tab
                            value="2"
                            disabled
                    >2</kd-tab>
                    <kd-tab
                            value="3"
                            disabled
                    >3</kd-tab>
                </kd-tabs>
                <br/>
                <kd-tabs
                        v-model="tabsValue"
                        type="vertical"
                >
                    <kd-tab value="1">1</kd-tab>
                    <kd-tab
                            value="2"
                            disabled
                    >2</kd-tab>
                    <kd-tab
                            value="3"
                            disabled
                    >3</kd-tab>
                </kd-tabs>
            </div>
            <h4>Timepicker</h4>
            <div>
                <div class="mb-small">
                    <kd-time-picker class="mr-mini"></kd-time-picker>
                    <kd-time-picker
                            mode="steptime"
                    ></kd-time-picker>
                </div>
                <kd-time-picker range></kd-time-picker>
            </div>
            <h4>Transfer</h4>
            <div>
                <kd-transfer
                        :data="transferData"
                        showFilter
                        :filter-placeholder="['请输入','请输入']"
                >
                </kd-transfer>
            </div>
            <h4>Tree</h4>
            <div>
                <kd-tree
                        ref="tree1"
                        :canDeleteRoot="true"
                        :data="treeData1"
                        :draggable="draggable"
                        :halfcheck="halfcheck"
                        :checkbox="checkbox"
                        :radio="radio"
                        selectAlone
                        :showLine="showLine"
                        :expandedKeys="expandedKeys"
                        :checkedKeys="checkedKeys"
                        :chkDisabledKeys="['node-1-1']"
                        :nocheckKeys="['node-1-1-2']"
                        @node-click="nodeClick"
                >
                    <span>
                        ??? <kd-button size="mini">test</kd-button>
                    </span>
                </kd-tree>
            </div>
            <h4>Upload</h4>
            <div>
                <div>
                    <kd-upload
                            :auto-upload="false"
                            tip="只能上传jpg/png文件，且不超过500kb"
                            accept=".png,.jpg"
                    >
                        <kd-button>点击上传</kd-button>
                    </kd-upload>
                </div>
                <div>
                    <kd-upload
                            multiple
                            :file-change="handleFileChange"
                            :auto-upload="false"
                            :show-file-list="isFileList"
                    >
                        <img
                                v-if="headImage"
                                :src="headImage"
                                class="kd-upload-head"
                        >
                        <i
                                v-else
                                class="kd-upload-add-icon kdicon kd-icon-plus"
                        ></i>
                    </kd-upload>
                </div>
                <div>
                    <kd-upload
                            multiple
                            tip="只能上传jpg/png文件，且不超过500kb"
                            :auto-upload="false"
                            drag
                    >
                    </kd-upload>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    const transferData = () => {
        const data = [];
        for (let i = 0; i < 12; i++) {
            data.push({
                key: i,
                label: `item${i}`,
                disabled: i % 5 === 1,
                checked: false
            });
        }
        return data;
    };
    export default {
        name: 'ComponentPreview',
        // eslint-disable-next-line max-lines-per-function
        data() {
            return {
                transferData: transferData(),
                spinnerValue: 1,
                scrollSelectVal: 2,
                isFileList: false,
                headImage: '',
                inputType: 'password',
                inputVal: 'Kingdot',
                inputUrl: 'kingdot',
                switchVal: false,
                progressPercentage: 0,
                progressStatus: '',
                checkboxValue: [1],
                disabled: true,
                stepIndex1: 2,
                description: 'description',
                showDialog: false,
                disableOk: true,
                showMessageDialog: false,
                confirmTitle: '二次确认标题',
                confirmTips: '还可以自定义底部哟！！！',
                showConfirmDialog: false,
                showConfirmDrawer: false,
                tabsValue: '1',
                SkeletonValue: true,
                additionalTips: '附加提示。此成功提示出现在一系列任务之后，比如在弹窗中操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用 Message 提示。',
                // slider
                slider1: 10,
                slider2: [10, 80],
                marks: {
                    '1': '1',
                    '2': '2',
                    '3': '3',
                    '4': '4',
                    '5': '5',
                    '6': '6月',
                    '7': '7',
                    '8': '8',
                    '9': '9',
                    '10': '1年',
                    '11': '2年',
                    '12': '3年'
                },
                // select
                select1: 'item1',
                options: [
                    { value: 'item1', label: 'item option 1item option 1item option 1item option 1item option 1' },
                    { value: 'item2', label: 'item option 2'},
                    { value: 'item3', label: 'item option 3' }
                ],
                // tree
                showLine: false,
                checkbox: true,
                draggable: true,
                halfcheck: true,
                radio: true,
                search: '',
                expandedKeys: ['node1'],
                checkedKeys: ['node-1-1-1', 'node-1-1-3'],
                treeData1: [
                    {
                        title: 'Node1',
                        // expanded: true,
                        selDisabled: true,
                        id: 'node1',
                        children: [
                            {
                                title: 'Node 1-1',
                                id: 'node-1-1',
                                // expanded: true,
                                children: [
                                    { title: 'Node 1-1-1', id: 'node-1-1-1' },
                                    { title: 'Node 1-1-2', id: 'node-1-1-2' },
                                    { title: 'Node 1-1-3', id: 'node-1-1-3' }
                                ]
                            },
                            {
                                title: 'Node 1-2',
                                id: 'node-1-2',
                                children: [
                                    { title: 'Node 1-2-1', id: 'node-1-2-1' },
                                    { title: 'Node 1-2-2', id: 'node-1-2-2' }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Node 2',
                        id: 'node-2',
                        children: [
                            { title: 'Node 2-1-1', id: 'node-2-1-1' },
                            { title: 'Node 2-1-2', id: 'node-2-1-2' }
                        ]
                    }
                ],
                selectedMenu: '',
                defaultOpeneds: [],
                menuList: [{
                    name: '菜单1',
                    icon: 'kd-icon-menu-more',
                    key: '1'
                }, {
                    name: '菜单2',
                    disabled: true,
                    icon: 'kd-icon-menu-more',
                    key: '2'
                }, {
                    name: '菜单3',
                    icon: 'kd-icon-menu-more',
                    key: '3'
                }],
                messageTypeList: ['success', 'error', 'info', 'warning', '']
            };
        },
        computed: {
            iconClass() {
                return this.inputType === 'password' ? 'kd-icon-view' : 'kd-icon-hide';
            }
        },
        watch: {

        },
        created() {

        },
        mounted() {
            const interval = setInterval(() => {
                this.progressPercentage++;
                if (this.progressPercentage === 100) {
                    clearInterval(interval);
                    this.progressStatus = 'success';
                }
            }, 60);
        },
        methods: {
            scrollSelectDisable(value) {
                return !!(value % 2);
            },
            showMessage(type) {
                this.$message[type] ? this.$message[type](type) : this.$message('默认提示');
            },
            formatPercentage(percentage) {
                return percentage === 100 ? 'fulfill' : `${percentage}%`;
            },
            switchType() {
                this.inputType = this.inputType === 'password' ? 'text' : 'password';
            },
            handleFileChange(file) {
                const isImage = file.type.indexOf('image') > -1;
                const isSize = file.size / 1024 / 1024 < 3;
                if (!isImage) {
                    this.$message.error('上传图片只能是 image 格式!');
                }
                if (!isSize) {
                    this.$message.error('上传图片不能超过3MB!');
                }
                const rules = isImage && isSize;
                if (rules) {
                    this.headImage = URL.createObjectURL(file);
                }
                return rules;
            },
            // Dialog
            openDialog() {
                this.showDialog = true;
            },
            openDrawer() {
                this.showConfirmDrawer = true;
            },
            OK(dialog) {
                dialog.showLoading();
                this.num++;
                setTimeout(function () {
                    dialog.hideLoading();
                }, 2000);
            },
            openMessageDialog() {
                this.showMessageDialog = true;
            },
            openMessageConfirmDialog() {
                this.showConfirmDialog = true;
            },
            nodeClick() {
                this.$message.success('node-click');
            }
        }
    };
</script>
<style lang="stylus" scoped>
.flex-row
    display flex
    flex-direction row
.flex-col
    display flex
    flex-direction column
.flex-shrink
    flex-shrink 0
.flex-grow
    flex-grow 1
.mr-mini
    margin-right 10px
.editor-theme-wrap
    display flex
    flex-direction row
.editor-var
    width 300px
.mb-small
    margin-bottom 10px
.demo-preview-wrap >>>
    .kd-checkbox, .kd-radio, .kd-switch
        margin-right 10px
.input-area, .progress-area
    max-width 500px
    & > div
        margin-bottom 10px
.button-section
    .kd-btn+.kd-btn
        margin-left 10px
    .kd-btn-group
        .kd-btn
            margin-left -1px
    margin-bottom 10px
    height: 45px
.steps-section
    width calc(100% - 310px)
.dialog-section
    .kd-btn
        margin-right 10px
.skeleton-section
    max-width 1050px
.skeleton-box
    display:flex;
    margin-top 20px
    div
     margin-left 20px
.demo-menu-block
    width 400px
    margin-top 10px
    border-right 1px solid #ddd
</style>
