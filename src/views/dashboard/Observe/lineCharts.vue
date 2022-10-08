<template>
  <div>
    <div class="header">
        <span class="search-header">搜索用户数</span>
        <i class="el-icon-warning-outline"></i>
    </div>
    <div class="main">
        <span class="main-title">12332</span>
        <span class="main-content">17.1</span>
        <i class="el-icon-caret-top" style="color:greenyellow"></i>
        <i class="el-icon-caret-bottom" style="color:red"></i>
    </div>
    <div class="footer">
        <div class="charts" ref="charts">
        </div>
    </div>
  </div>
</template>

<script>
    import echarts from 'echarts'
export default {
    name:'lineCharts',
    mounted() {
        //echarts实例
        let lineCharts = echarts.init(this.$refs.charts)
        lineCharts.setOption({
            xAxis:{show:false,type:'category'},
            yAxis:{show:false} ,
            series:[
                {
                    type:'line',
                    data:[30,77,33,42,88,55,99,17,20],
                    itemStyle:{opacity:0},//拐点样式的设置
                    lineStyle:{color:'blue'},//线条颜色设置
                    areaStyle:{color:{
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'blue' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#fff' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }},//填充颜色设置
                }
            ],
            grid:{
                left:0,
                right:0,
                top:0,
                bottom:0
            }
        })
    }
}
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.search-header {
    margin-right: 20px;
}
.main {
    margin: 10px 0;
}
.main-title {
    margin-right: 33px;
}
.charts {
    width: 100%;
    height: 30px;
}
.footer {
    margin-bottom: 30px;
}
</style>