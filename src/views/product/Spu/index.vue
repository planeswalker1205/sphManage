<template>
  <div>
    <el-card class="box-card">
      <CategorySelect
        @getAllCategoryId="getCategoryIds"
        :isShowTable="scene == 0"
      />
    </el-card>
    <el-card class="box-card">
      <!-- 默认显示的表格页面 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          :disabled="!categoryId3"
          >添加SPU</el-button
        >
        <el-table :data="spuTableData" style="width: 100%" :border="true">
          <el-table-column prop="" label="序号" width="180">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="180">
          </el-table-column>
          <el-table-column prop="description" label="spu描述">
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(scope.row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改sku"
                @click="updateSpu(scope.row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="dialogHandlerVisible(scope.row)"
              ></el-button>
              <el-popconfirm
                title="确定删除吗？"
                style="margin-left: 10px"
                @onConfirm="deleteSpu(scope.row)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="limit"
          layout="pager , jumper,prev,next, ->,sizes,total"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 添加/修改SPU信息 -->
      <SpuForm v-show="scene == 1" @scene="changeScene" ref="spuform" />
      <!-- 添加sku信息 -->
      <SkuForm v-show="scene == 2" @skuScene="changeskuScene" ref="sku" />
    </el-card>
    <!-- 弹出框 -->
    <el-dialog :title="`${spu.spuName}的sku列表`"  :visible.sync="dialogTableVisible" :before-close="closeDialog">
      <el-table :data="skuList" v-loading="loading">
        <el-table-column
          property="skuName"
          label="名称"
          style="width:100%;"
          border
        ></el-table-column>
        <el-table-column
          property="price"
          label="价格"
          width="200"
        ></el-table-column>
         <el-table-column
          property="price"
          label="重量"
          width="200"
        ></el-table-column>
         <el-table-column
          label="默认图片"
          width="200"
        >
        <template slot-scope="{row}">
          <img style="width:100px;height:100px;" :src="row.skuDefaultImg" alt="">
            
          
        </template></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  data() {
    return {
      loading:true,
      //标识默认表格是否显示
      isShowTable: true,
      categoryId1: "",
      categoryId2: "",
      categoryId3: "",
      spuTableData: [],
      //分页数据
      page: 1,
      limit: 5,
      total: 0,
      //表示当前所处场景
      scene: 0,
      //控制弹出框的显示与隐藏
      dialogTableVisible:false,
      spu:{},
      skuList:[]
    };
  },
  methods: {
    //修改场景
    changeScene(scene) {
      this.scene = scene;
      this.getSpuList();
    },

    //sku修改场景
    changeskuScene(scene) {
      this.scene = scene;
    },
    getCategoryIds(idx, level) {
      if (level === 1) {
        this.categoryId1 = idx;
        this.categoryId2 = "";
        this.categoryId3 = "";
      } else if (level === 2) {
        this.categoryId2 = idx;
        this.categoryId3 = "";
      } else {
        this.categoryId3 = idx;
        this.getSpuList();
      }
    },
    //切换页面显示的数量
    handleSizeChange(currentPages) {
      this.limit = currentPages;
      this.getSpuList();
    },
    //切换页面
    handleCurrentChange(currentPage) {
      this.page = currentPage;
      this.getSpuList();
    },
    //获取spu列表数据
    async getSpuList() {
      const { page, limit, categoryId3 } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, categoryId3);
      console.log(result);
      if (result.code === 200 || result.code === 20000) {
        this.spuTableData = result.data.records;
        this.total = result.data.total;
      }
    },
    //修改SPU
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spuform.initSpuInfo(row);
    },
    //添加spu
    addSpu() {
      this.scene = 1;
      this.$refs.spuform.addSpuData(this.categoryId3);
    },
    //删除Spu
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.getSpuList(this.spuTableData.length > 1 ? this.page : this.page--);
      }
    },
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.categoryId1, this.categoryId2, row);
    },
    //显示弹出框
    async dialogHandlerVisible(spu){
      this.dialogTableVisible = true
      this.spu=spu
      let result = await this.$API.sku.reqSkuList(spu.id)
      if(result.code==200){
        this.skuList = result.data
        this.loading = false
      }
    },
    closeDialog(done){
      //loading重置为true
      this.loading = true
      //清除列表数据
      this.skuList=[]
      //关闭对话框
      done()
    }
  },
  components: {
    SpuForm,
    SkuForm,
  },
};
</script>

<style>
.box-card {
  margin: 20px 0;
}
</style>