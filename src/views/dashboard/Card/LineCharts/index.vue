<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "LineCharts",
  mounted() {
    console.log(echarts);
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      tooltip: {},
      series: [
        {
          smooth: true,
          type: "line",
          data: [9, 41, 35, 21, 40, 10, 21, 36, 14, 50, 34, 21, 51, 26, 54, 32],
          //拐点样式
          itemStyle: {
            opacity: 0,
          },

          lineStyle: {
            // color:'purple',
            opacity: 0,
          },
          //填充颜色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "green", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>