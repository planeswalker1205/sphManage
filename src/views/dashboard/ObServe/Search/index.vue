<template>
  <div>
    <el-card>
      <div slot="header">
        <div class="search-header">
          <span class="title">线上热门搜索</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="linecharts">
        <el-row :gutter="10">
          <el-col :span="12"> <UsersCharts></UsersCharts> </el-col>
          <el-col :span="12"><AvgSearchCharts></AvgSearchCharts></el-col>
        </el-row>
      </div>
      <div class="tabSort">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
            size="mini"
          :default-sort="{  order: 'descending' }"
        >
          <el-table-column  type="index" label="排名" width="80">
          </el-table-column>
          <el-table-column  label="搜索关键字"  width="180">
          </el-table-column>
          <el-table-column  label="用户数" sortable>
          </el-table-column>
          <el-table-column  label="周涨幅" sortable>
          </el-table-column>
        </el-table>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </el-card>
  </div>
</template>

<script>
import UsersCharts from "./UsersCharts";
import AvgSearchCharts from "./AvgSearchCharts";
export default {
  name: "Search",
  data(){
      return {
          tableData:[{}]
      }
  },
  components: { UsersCharts, AvgSearchCharts },
};
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 15px;
}
.tabSort{
    margin-top:10px;
}
</style>