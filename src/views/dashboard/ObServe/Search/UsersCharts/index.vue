<template>
  <div>
    <div class="header">
        <span class="searchUs">搜索用户数</span>

        <span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg></span>
    </div>
    <div class="main">
      <span>12321</span>
      <span
        >17.1<svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          color="red"
          fill="currentColor"
          class="bi bi-caret-up-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
          />
        </svg>

        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          color="green"
          fill="currentColor"
          class="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
          />
        </svg> -->
      </span>
    </div>
    <div class="footer">
        <div ref="usCharts" class="usCharts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "UsersCharts",
  mounted() {
    let usCharts = echarts.init(this.$refs.usCharts);
    usCharts.setOption({
            grid:{
                left:0,
                top:0,
                right:0,
                bottom:0
            },
      tooltip: {},
      xAxis: {
        show:false,
        type: "category",
      },
      yAxis: {
       show:false,
      },
      series: [
        {

          smooth: true,
          type: "line",
          data: [
            821,457,152,462,132,542,145,126,541,241
          ],
          //拐点样式
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "rgb(107, 175, 235)",
          },
          //填充颜色
          areaStyle: {
            color: {
              type: "line",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgb(107, 175, 235)", // 0% 处的颜色
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
    });
  },
};
</script>

<style scoped>
.header{
    font-size:13px;
    color:rgb(123, 126, 128);
    
}
.header span:nth-child(2){
   padding-left:10px;
   
}
.main{
    margin-top:15px;
}
.main span:nth-child(2){
    padding-left:30px;
    font-size: 13px;
    color: rgb(83, 85, 87);
}
.usCharts{
    width: 100%;
    height: 50px;
}
svg{
    vertical-align: middle;
}
</style>