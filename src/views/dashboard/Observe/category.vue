<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <div class="category-header">
          <span>销售额类别占比</span>
          <el-radio-group v-model="value">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="charts" ref="charts"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "category",
  data() {
    return {
      value: "全部渠道 ",
    };
  },
  mounted() {
    //echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
        title:{
            text:'Direct',
            subtext:'735',
            left:'center',
            top:'center'
        },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    //charts事件
    lineCharts.on('mouseover',(params) => {
        const {name,value} = params.data
        lineCharts.setOption({
            title:{
                text:name,
                subtext:value
            }
        })
    })
  },
};
</script>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: -10px;
}
.header {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
  padding-top: -10px;
}
.charts {
    width: 100%;
    height: 300px;
}
</style>