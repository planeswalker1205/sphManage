<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <div class="title">销售额类别占比</div>
        <div>
          <el-radio-group v-model="radio1" size="mini">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="saleCharts" ref="saleCharts"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      radio1: "",
    };
  },
  mounted() {
    let echart = echarts.init(this.$refs.saleCharts);
    echart.setOption({
      title: {
        text: "视频",
        subtext: 1048,
        left: "center",
        top: "center",
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
          data: [
            { value: 1048, name: "视频广告" },
            { value: 735, name: "联盟广告" },
            { value: 580, name: "邮件影响" },
            { value: 484, name: "搜索引擎" },
            { value: 300, name: "直接访问" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
    echart.on('mouseover',(params)=>{
      const {name,value} = params.data
      echart.setOption({
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
.header {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 15px;
}
.saleCharts {
  width: 100%;
  height: 300px;
}
</style>