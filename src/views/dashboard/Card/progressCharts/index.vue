<template>
  <div class="progress" ref="progress"></div>
</template>

<script>
    import echarts from 'echarts'
export default {
    mounted() {
        let progress = echarts.init(this.$refs.progress)
        progress.setOption({
            xAxis:{show:false,min:0,max:100},
            yAxis:{show:false,type:'category'},
            series:[
                {
                    type:'bar',
                    data:[78],
                    color:'yellowgreen',
                    barWidth:10 ,//设置柱状图宽度
                    //背景颜色的设置
                    showBackground:true,
                    backgroundStyle:{color:'#eee'},
                    //文本设置
                    label:{show:true,
                        formatter:'|', //改变文本标签内容
                        position:'right'//文本标签位置调试
                    }
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
     .progress {
        width: 100%;
        height: 100%;
    }
</style>