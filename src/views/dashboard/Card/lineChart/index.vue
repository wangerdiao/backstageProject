<template>
  <div class="charts" ref="charts">

  </div>
</template>

<script>
    import echarts from 'echarts'
export default {
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
                    lineStyle:{color:'purple'},//线条颜色设置
                    areaStyle:{color:{
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'purple' // 0% 处的颜色
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

<style scope>
    .charts {
        width: 100%;
        height: 100%;
    }
</style>