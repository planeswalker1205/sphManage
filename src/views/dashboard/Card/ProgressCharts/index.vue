<template>
  <div class="barcharts" ref="barcharts"></div>
</template>

<script>
import * as echarts from "echarts"
export default {
  name: "ProgressCharts",
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.barcharts)

    // 指定图表的配置项和数据
    var option = {
      tooltip: {},
      xAxis: {
       show:false,
       min:0,
       max:100
      },
      yAxis: {
          show:false,
                 type:'category'
      },
      series: [
        {
          type: "bar",
          data: [78],
          barWidth:10,
          color:'yellowgreen',
          showBackground:true,
          backgroundStyle:{
              color:'#eee'
          },
          label:{
              show:true,
              formatter:'|',
              position:'right'
          }
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