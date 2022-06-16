<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0">
      <div slot="header" class="clearfix">
        <!-- 头部左侧 -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sales"></el-tab-pane>
          <el-tab-pane label="访问量" name="visits"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧 -->
        <div class="right">
          <span @click="todayData">今日</span>
          <span @click="toWeekData">本周</span>
          <span @click="toMonth">本月</span>
          <span @click="toYear">本年</span>
          <el-date-picker
            style="width: 300px"
            class="date"
            size="mini"
            v-model="datavalue"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>
      </div>

      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <div class="charts" ref="charts"></div>
          </el-col>
          <el-col :span="6">
            <div class="sortRight">
              <h3>门店{{ rightTitle }}排名</h3>
              <ul>
                <li v-for="item in salesData" :key="item.id">
                  <span>{{ item.id }}</span>
                  <span>{{ item.sname }}</span>
                  <span class="rValue">{{ item.sdata }}</span>
                </li>

                <!-- <li>
                  <span class="rIndex">1</span>
                  <span>肯德基</span>
                  <span class="rValue">15424</span>
                </li>
                 <li>
                  <span class="rIndex">2</span>
                  <span>麦当劳</span>
                  <span class="rValue">13545</span>
                </li>
                 <li>
                  <span class="rIndex">3</span>
                  <span>华莱士</span>
                  <span class="rValue">11235</span>
                </li>
                 <li>
                  <span>4</span>
                  <span>海底捞</span>
                  <span class="rValue">9456</span>
                </li>
                 <li>
                  <span>5</span>
                  <span>西北筱面村</span>
                  <span class="rValue">6548</span>
                </li>
                 <li>
                  <span>6</span>
                  <span>汉堡王</span>
                  <span class="rValue">3215</span>
                </li>
                 <li>
                  <span>7</span>
                  <span>真功夫</span>
                  <span class="rValue">1251</span>
                </li> -->
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sales",
      datavalue: "",
      //销售额数据
      salesData: [],
      mycharts: null,
    };
  },
  methods: {
    todayData() {
      const day = dayjs().format("YYYY-MM-DD");
      this.datavalue = [day, day];
    },
    toWeekData() {
      const week0 = dayjs().day(1).format("YYYY-MM-DD");
      const week1 = dayjs().day(7).format("YYYY-MM-DD");
      this.datavalue = [week0, week1];
    },
    toMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.datavalue = [start, end];
    },
    toYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.datavalue = [start, end];
    },
  },
  computed: {
    rightTitle() {
      return this.activeName == "sales" ? "销售额" : "访问量";
    },
  },

  watch: {
    activeName: {
      immediate: true,
      handler(nvalue, ovalue) {
        if (this.activeName == "sales") {
          this.$nextTick(() => {
            this.salesData = [
              { id: 1, sname: "肯德基", sdata: "15424" },
              { id: 2, sname: "麦当劳", sdata: "13545" },
              { id: 3, sname: "华莱士", sdata: "11235" },
              { id: 4, sname: "海底捞", sdata: "9456" },
              { id: 5, sname: "西北筱面村", sdata: "6548" },
              { id: 6, sname: "汉堡王", sdata: "3215" },
              { id: 7, sname: "真功夫", sdata: "1251" },
            ];
            this.mycharts.setOption({
              title: { text: "销售额趋势" },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow",
                },
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              xAxis: [
                {
                  type: "category",
                  data: [
                    "1月",
                    "2月",
                    "3月",
                    "4月",
                    "5月",
                    "6月",
                    "7月",
                    "8月",
                    "9月",
                    "10月",
                    "11月",
                    "12月",
                  ],
                  axisTick: {
                    alignWithLabel: true,
                  },
                },
              ],
              yAxis: [
                {
                  type: "value",
                },
              ],
              series: [
                {
                  name: "Direct",
                  type: "bar",
                  barWidth: "60%",
                  data: [
                    403, 89, 197, 348, 390, 375, 221, 154, 100, 200, 130, 21,
                  ],
                },
              ],
            });
          });
        } else {
          this.$nextTick(() => {
              this.salesData = [
              { id: 1, sname: "肯德基", sdata: "456413" },
              { id: 2, sname: "麦当劳", sdata: "415462" },
              { id: 3, sname: "华莱士", sdata: "354621" },
              { id: 4, sname: "海底捞", sdata: "215421" },
              { id: 5, sname: "西北筱面村", sdata: "124531" },
              { id: 6, sname: "汉堡王", sdata: "84653" },
              { id: 7, sname: "真功夫", sdata: "65211" },
            ];
            this.mycharts.setOption({
              title: { text: "访问量趋势" },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow",
                },
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              xAxis: [
                {
                  type: "category",
                  data: [
                    "1月",
                    "2月",
                    "3月",
                    "4月",
                    "5月",
                    "6月",
                    "7月",
                    "8月",
                    "9月",
                    "10月",
                    "11月",
                    "12月",
                  ],
                  axisTick: {
                    alignWithLabel: true,
                  },
                },
              ],
              yAxis: [
                {
                  type: "value",
                },
              ],
              series: [
                {
                  name: "Direct",
                  type: "bar",
                  barWidth: "60%",
                  data: [
                    1214, 889, 3437, 5449, 4195, 2472, 3574, 5154, 4100, 2500,
                    5530, 6441,
                  ],
                },
              ],
            });
          });
        }
      },
    },
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    // this.mycharts.setOption({
    //   title: { text: "销售额趋势" },
    //   tooltip: {
    //     trigger: "axis",
    //     axisPointer: {
    //       type: "shadow",
    //     },
    //   },
    //   grid: {
    //     left: "3%",
    //     right: "4%",
    //     bottom: "3%",
    //     containLabel: true,
    //   },
    //   xAxis: [
    //     {
    //       type: "category",
    //       data: [
    //         "1月",
    //         "2月",
    //         "3月",
    //         "4月",
    //         "5月",
    //         "6月",
    //         "7月",
    //         "8月",
    //         "9月",
    //         "10月",
    //         "11月",
    //         "12月",
    //       ],
    //       axisTick: {
    //         alignWithLabel: true,
    //       },
    //     },
    //   ],
    //   yAxis: [
    //     {
    //       type: "value",
    //     },
    //   ],
    //   series: [
    //     {
    //       name: "Direct",
    //       type: "bar",
    //       barWidth: "60%",
    //       data: [403, 89, 197, 348, 390, 375, 221, 154, 100, 200, 130, 21],
    //     },
    //   ],
    // });
  },
};
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
>>> .el-card__header {
  border-bottom: none;
}
.right {
  position: absolute;
  right: 0;
}
.date {
  width: 200px;
  margin: 0 20px;
}
.right span {
  margin: 0 10px;
  font-size: 13px;
}

.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}

ul li {
  height: 8%;
  margin: 15px 0;
}
ul li span:first-child {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  margin-right: 20px;
}
ul > :first-child > :first-child,
ul > li:nth-child(2) > :first-child,
ul > li:nth-child(3) > :first-child {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rValue {
  float: right;
}
</style>