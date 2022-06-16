<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" @click="addTradeMark"
      >添加</el-button
    >
    <!-- 表格组件 -->
    <el-table
      :data="tableData"
      :empty-text="emptyText"
      style="width: 100%; margin-top: 30px"
      :border="true"
    >
      <el-table-column prop="id" label="序号" width="80px" align="center">
      </el-table-column>

      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>

      <el-table-column label="品牌logo" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>

      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px; text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[3, 5, 9]"
      :pager-count="7"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>

    <!-- 对话框 -->

    <el-dialog
      :title="this.trademarkFrom.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- :model属性：把表单的信息收集到这个对象上，将来表单验证也需要此属性 -->
      <el-form
        :model="trademarkFrom"
        style="width: 80%"
        ref="tmForm"
        :rules="tmRules"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            v-model="trademarkFrom.tmName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 图片上传 -->
          <!-- 这里并非表单元素收集元素不用v-model -->
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkFrom.logoUrl"
              :src="trademarkFrom.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AdOrUpTradeMark()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      //第几页
      page: 1,
      //每页的条数
      limit: 3,
      //数据总数
      total: 0,
      tableData: [],
      emptyText: "数据为空",

      //对话框内容
      dialogFormVisible: false,
      //收集品牌信息
      trademarkFrom: {
        tmName: "",
        logoUrl: "",
      },
      //表单验证信息
      tmRules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 2, max: 7, message: "长度在 2 到 7 个字符", trigger: "blur" },
        ],
        logoUrl: [{ required: true, message: "Logo图片不能为空" }],
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    //获取列表数据
    async getPageList() {
      const { page, limit } = this;
      try {
        let result = await this.$API.trademark.getTradeMarkList(page, limit);
        if (result.code === 20000 || result.code === 200) {
          this.tableData = result.data.records;
          this.total = result.data.total;
          this.limit = result.data.size;
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleSizeChange(currPages) {
      this.limit = currPages;
      this.getPageList();
    },
    handleCurrentChange(currPage) {
      this.page = currPage;
      this.getPageList();
    },
    //添加品牌信息
    addTradeMark() {
      //先打开弹窗--加载出弹窗组件再清除验证信息，否则会报错
      this.dialogFormVisible = true;
      //清空表单验证数据
      this.$nextTick(()=>{
        this.$refs.tmForm.clearValidate();
      })
      this.trademarkFrom = { tmName: "", logoUrl: "" };

    },
    //修改品牌信息
    updateTradeMark(row) {
      this.trademarkFrom = {
        ...row,
      };

      //清空表单验证数据
      this.$nextTick(()=>{
        this.$refs.tmForm.clearValidate();
      })
     
      this.dialogFormVisible = true;
    },
    //添加/修改品牌信息
    AdOrUpTradeMark() {
      this.$refs.tmForm.validate(async (valid) => {
        if (valid) {
          try {
            let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
              this.trademarkFrom
            );
            if (result.code === 200 || result.code === 20000) {
              this.$message({
                type: "success",
                message: this.trademarkFrom.id
                  ? "修改品牌成功"
                  : "添加品牌成功",
              });
              this.getPageList();
              this.dialogFormVisible = false;
            } else {
              this.$message(result.data);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("err submit!!");
          return false;
        }
      });
    },
    // 图片logo上传成功后执行的方法
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.trademarkFrom.logoUrl = res.data;
      }
    },
    // 图片上传之前的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //删除品牌信息
    deleteTradeMark(row) {
      this.$confirm(`此操作将永久删除${row.tmName}信息, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
            if (result.code === 200 || result.code === 20000) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getPageList();
            } else {
              this.$message({
                type: "warning ",
                message: "删除失败!",
              });
            }
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>