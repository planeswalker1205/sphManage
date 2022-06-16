<template>
  <div>
    <el-row :gutter="10" >
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <el-card>
            <Detail title="总销售额" count="￥ 135452">
                <template slot="charts">
                    <span style="font-size:15px;">周同比&nbsp;&nbsp;&nbsp;56.67%<svg color="green" width="16" height="16" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg></span>
                    
                    <span style="font-size:15px;margin-left:20px;">日同比&nbsp;&nbsp;&nbsp;19.94%<svg color="red" width="16" height="16" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg></span>
                </template>

                <template slot="footer">
                    <span>日销售额 ￥ 12423</span>
                </template>

            </Detail>
          </el-card></div
      ></el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <el-card>
            <Detail title="访问量"  count="88451">
                <template slot="charts">
                    <LineCharts></LineCharts>          
                </template>
                <template slot="footer">
                    <span>日访问量 5421</span>
                </template>
            </Detail>
          </el-card></div
      ></el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <el-card>
            <Detail title="支付笔数"  count="80451">
                <template slot="charts">
                    <BarCharts></BarCharts>
                </template>
                <template slot="footer">
                    <span>转化率 65%</span>
                </template>
            </Detail>
          </el-card></div
      ></el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <el-card>
            <Detail title="运营活动效果"  count="75%">
                <template slot="charts">
                    <ProgressCharts></ProgressCharts>
                </template>
                <template slot="footer">
                    <span style="font-size:15px;">周同比&nbsp;&nbsp;&nbsp;56.67%<svg color="green" width="16" height="16" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg></span>
                    
                    <span style="font-size:15px;margin-left:20px;">日同比&nbsp;&nbsp;&nbsp;19.94%<svg color="red" width="16" height="16" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg></span>
                </template>

            </Detail>
          </el-card></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineCharts from './LineCharts'
import BarCharts from './barCharts'
import ProgressCharts from './ProgressCharts'
export default {
  name: "Card",
  components: { Detail ,LineCharts,BarCharts,ProgressCharts},
};
</script>

<style>

</style>