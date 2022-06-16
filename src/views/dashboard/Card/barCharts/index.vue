<template>
  <div class="barcharts" ref="barcharts"></div>
</template>

<script>
import * as echarts from "echarts"
export default {
  name: "BarCharts",
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.barcharts)

    // 指定图表的配置项和数据
    var option = {
      tooltip: {},
      xAxis: {
       show:false,
       type:'category'
      },
      yAxis: {
          show:false
      },
      series: [
        {
          type: "bar",
          data: [30,45,15,20,28,50,35,47,18,23,35,40],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style>
.barcharts{
    width:100%;
    height:100%;
}
</style>