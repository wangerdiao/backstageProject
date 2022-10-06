<template>
  <div class="bar" ref="bar"></div>
</template>

<script>
    import echarts from 'echarts'
export default {
    mounted() {
        let barCharts = echarts.init(this.$refs.bar)
        barCharts.setOption({
            xAxis:{show:false,type:'category'},
            yAxis:{show:false},
            series:[
                {
                    type:'bar',
                    data:[30,77,33,42,88,55,99,17,20,33,49,50,23],
                    color:'cyan'
                }
            ],
            tooltip:{},
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
     .bar {
        width: 100%;
        height: 100%;
    }
</style>