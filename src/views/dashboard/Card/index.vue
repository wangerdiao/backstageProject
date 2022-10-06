<template>
  <div>
    <!-- 头部card -->
    <el-row :gutter="10">
        <el-col :span="6">
            <el-card>
                <Detail title="总销售额" count="￥126560">
                    <template slot="charts">
                        <span><font size="1">周同比&nbsp;&nbsp;56.67% </font><svg t="1664960447428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3806" width="16" height="16"><path d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m5.333333 232.085334L322.752 576l45.248 45.248 149.333333-149.333333 149.333334 149.333333L711.914667 576l-194.581334-194.581333z" p-id="3807" fill="#1afa29"></path></svg></span>
                        &nbsp;&nbsp;
                        <span ><font size="1px">日同比&nbsp;&nbsp;19.16% </font><svg t="1664960571637" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4808" width="16" height="16"><path d="M690 405h-46.9c-10.2 0-19.9 4.9-25.9 13.2L512 563.6 406.8 418.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246c3.2 4.4 9.7 4.4 12.9 0l178-246c3.9-5.3 0.1-12.7-6.4-12.7z" p-id="4809" fill="#d81e06"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" p-id="4810" fill="#d81e06"></path></svg></span>
                    </template>
                <template slot="footer">
                        <span>日销售额￥12423</span>
                </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title="访问量" count="88460">
                    <template slot="charts">
                        <LineChart></LineChart>
                    </template>
                    <template slot="footer">
                        <span>日访问量12234</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title="支付笔数" count="88460">
                    <template slot="charts">
                        <BarCharts></BarCharts>
                    </template>
                    <template slot="footer">
                        <span>转化率64%</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title="运营活动效果" count="78%">
                    <template slot="charts">
                        <ProgressCharts></ProgressCharts>
                    </template>
                    <template slot="footer">
                        <span><font size="1">周同比&nbsp;&nbsp;56.67% </font><svg t="1664960447428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3806" width="16" height="16"><path d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m5.333333 232.085334L322.752 576l45.248 45.248 149.333333-149.333333 149.333334 149.333333L711.914667 576l-194.581334-194.581333z" p-id="3807" fill="#1afa29"></path></svg></span>
                        &nbsp;&nbsp;
                        <span ><font size="1px">日同比&nbsp;&nbsp;19.16% </font><svg t="1664960571637" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4808" width="16" height="16"><path d="M690 405h-46.9c-10.2 0-19.9 4.9-25.9 13.2L512 563.6 406.8 418.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246c3.2 4.4 9.7 4.4 12.9 0l178-246c3.9-5.3 0.1-12.7-6.4-12.7z" p-id="4809" fill="#d81e06"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" p-id="4810" fill="#d81e06"></path></svg></span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail/index.vue';
import LineChart from './lineChart/index.vue';
import BarCharts from './barCharts/index.vue';
import ProgressCharts from './progressCharts/index.vue';
export default {
    components: { Detail, LineChart, BarCharts, ProgressCharts }
}
</script>

<style>

</style>