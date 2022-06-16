<template>
  <div>
    <el-table :data="records" style="width: 100%">
      <el-table-column
        header-align="center"
        align="center"
        type="index"
        label="序号"
        width="80"
      >
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        prop="skuName"
        label="名称"
      >
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        prop="skuDesc"
        label="描述"
      >
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        label="默认图片"
        width="110"
      >
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        prop="weight"
        label="重量(KG)"
        width="80"
      >
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        prop="price"
        label="价格(元)"
        width="80"
      >
      </el-table-column>

      <el-table-column header-align="center" align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-down"
            v-if="row.isSale == 0"
            @click="cancelSale(row)"
            title="下架"
          ></el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-up"
            v-else
            @click="onSale(row)"
            title="上架"
          ></el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="$message({ type: 'info', message: '开发中...' })"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      style="text-align: center"
    >
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="50%"
    >
      <el-row>
        <el-col :span="5"
          ><div class="grid-content bg-purple-dark">名称</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-dark">
            {{ skuInfo.skuName }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="5"
          ><div class="grid-content bg-purple-dark">描述</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-dark">
            {{ skuInfo.skuDesc }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="5"
          ><div class="grid-content bg-purple-dark">价格</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-dark">
            {{ skuInfo.price }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="5"
          ><div class="grid-content bg-purple-dark">平台属性</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-dark">
            <el-tag
              style="margin-right: 10px"
              type="success"
              v-for="attr in skuInfo.skuAttrValueList"
              :key="attr.id"
              >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
            >
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="5"
          ><div class="grid-content bg-purple-dark">商品图片</div></el-col
        >
        <el-col :span="14">
          <el-carousel >
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img style="width:100%;height:100%;" :src="item.imgUrl" alt="">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      //抽屉属性
      drawer: false,
      direction: "rtl",
      //分页的数据
      page: 1,
      limit: 10,
      total: 0,
      //存储sku列表的数据
      records: [],
      //某个sku信息
      skuInfo: {},
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList() {
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuListData(page, limit);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },

    //切换页面
    handleCurrentChange(page) {
      this.page = page;
      this.getSkuList();
    },
    //每页条数
    handleSizeChange(size) {
      this.limit = size;
      this.getSkuList();
    },
    //上架商品
    async onSale(sku) {
      let result = await this.$API.sku.reqSkuIssue(sku.id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "上架成功",
        });
        sku.isSale = 0;
      }
    },
    async cancelSale(sku) {
      let result = await this.$API.sku.reqSkuSoldOut(sku.id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "下架成功",
        });
        sku.isSale = 1;
      }
    },
    async getSkuInfo(row) {
      this.drawer = true;
      let result = await this.$API.sku.reqSkuById(row.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
    //抽屉关闭触发
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
      this.skuInfo = {};
      done();
    },
  },
};
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>