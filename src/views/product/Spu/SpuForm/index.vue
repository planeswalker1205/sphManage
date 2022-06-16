<template>
  <!-- 添加SPU信息 -->
  <div>
    <el-form ref="spuform" :model="spu" label-width="80px" :rules="rules">
      <el-form-item label="SPU名称" prop="spuName">
        <el-input v-model="spu.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>

      <el-form-item label="品牌" prop="tmId">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option
            v-for="tm in tradeMarkList"
            :key="tm.id"
            :label="tm.tmName"
            :value="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述" prop="description">
        <el-input
          type="textarea"
          v-model="spu.description"
          placeholder="SPU描述"
        ></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImgList"
          :on-success="handlerSuccess"
          ref="uploadSpuImg"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          v-model="attrIdAndName"
          :placeholder="`还有${unselectSaleAttr.length}未选择`"
        >
          <el-option
            :label="attr.name"
            v-for="attr in unselectSaleAttr"
            :key="attr.id"
            :value="`${attr.id}+${attr.name}`"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table
          :data="spu.spuSaleAttrList"
          style="width: 100%"
          :border="true"
        >
          <el-table-column type="index" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="180">
          </el-table-column>
          <el-table-column label="属性值名称列表">
            <template slot-scope="{ row }">
              <el-tag
                v-for="tag in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
                @close="handleClose(row, tag)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.tagInputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="$event.target.blur"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="130">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
      <el-button @click="cancelAddOrUpdate">取消</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",

  data() {
    return {
      //未选择的属性名
      attrIdAndName: "",
      tableData: [],
      //点击查看时显示图片
      dialogImageUrl: "",
      //添加的spu信息
      addSpuInfoData: {
        spuName: "",
        trademark: "",
      },
      dialogVisible: false,
      //存储SPU信息属性
      spu: {
        category3Id: 0,
        description: "",
        id: 0,
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "",
          //   imgUrl: "",
          //   spuId: 0,
          // },
        ],
        spuName: "",
        spuSaleAttrList: [
          // {
          //   tagInputVisible: false,
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "",
          //       saleAttrName: "",
          //       saleAttrValueName: "",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
        tmId: "",
      },
      //存储品牌信息
      tradeMarkList: [],
      //spu图片信息
      spuImgList: [],
      //销售属性列表
      saleAttrList: [],

      //表单验证
      rules: {
        spuName: [
          { required: true, message: "请输入spu名称", trigger: "blur" },
        ],
        tmId: [{ required: true, message: "请选择品牌", trigger: "blur" }],
        description: [
          { required: true, message: "请输入SPU描述", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    unselectSaleAttr() {
      return this.saleAttrList.filter((item) => {
        let res = this.spu.spuSaleAttrList.find((value) => {
          return value.baseSaleAttrId == item.id;
        });
        if (res == undefined) {
          return item;
        }
      });
    },
  },
  methods: {
    //点击删除图片时执行的函数
    handleRemove(file, fileList) {
      //删除后图片List更新
      this.spuImgList = fileList;
    },
    //图片上传成功的回调
    handlerSuccess(response, file, fileList) {
      console.log("file:", file);

      //图片上传成功后更新图片List
      if (response.code == 200) {
        this.spuImgList = fileList;
      } else {
        //上传到服务器失败后从列表删除此图片
        let idx = this.$refs.uploadSpuImg.uploadFiles.findIndex(
          (item) => item.uid === file.uid
        );
        this.$refs.uploadSpuImg.uploadFiles.splice(idx, 1);
        this.$message({
          type: "warning",
          message: "上傳失敗",
        });
      }
    },
    //点击查看图片时执行的函数
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //点击修改后初始化数据
    async initSpuInfo(row) {
      let spuResult = await this.$API.spu.reqSpuInfo(row.id);
      if (spuResult.code === 200 || spuResult.code === 20000) {
        this.spu = spuResult.data;
      }
      //获取品牌啊信息
      let tmResult = await this.$API.spu.reqTradeMarkInfo();
      if (tmResult.code == 200 || tmResult.code == 20000) {
        this.tradeMarkList = tmResult.data;
      }
      //获取spu图片属性
      let imgResult = await this.$API.spu.reqSpuImageInfo(row.id);
      if (imgResult.code === 200 || imgResult.code === 20000) {
        //添加name和url参数用于照片墙的展示
        imgResult.data.forEach((element) => {
          element.name = element.imgName;
          element.url = element.imgUrl;
        });
        this.spuImgList = imgResult.data;
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code === 200 || saleResult.code === 20000) {
        this.saleAttrList = saleResult.data;
      }
    },

    //标签方法
    handleClose(row, tag) {
      row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(tag), 1);
    },

    showInput(row) {
      this.$set(row, "tagInputVisible", true);
      this.$set(row, "inputValue", "");
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(row) {
      //判断属性值重复
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != row.inputValue
      );
      if (!result) {
        this.$message({
          type: "warning",
          message: "添加的属性值不能重复",
        });
        row.tagInputVisible = false;
        return;
      }
      //判断属性值不能为空
      if (row.inputValue.trim() == "") {
        this.$message({
          type: "warning",
          message: "添加的属性值不能为空",
        });
        row.tagInputVisible = false;
        return;
      }

      if (row.inputValue) {
        row.spuSaleAttrValueList.push({
          baseSaleAttrId: row.baseSaleAttrId,
          saleAttrValueName: row.inputValue,
        });
      }
      row.tagInputVisible = false;
      row.inputValue = "";
    },
    //添加新的销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split("+");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      //添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr);
      //重置下拉框的值
      this.attrIdAndName = "";
    },
    //保存数据
    addOrUpdateSpu() {
      if (this.spu.spuSaleAttrList.length == 0) {
        this.$message({
          type: "warning",
          message: "请至少添加一个销售属性",
        });
        return;
      }
      this.$refs.spuform.validate(async (valid) => {
        if (valid) {
          this.spu.spuImageList = this.spuImgList.map((item) => {
            return {
              imgName: item.name,
              imgUrl: (item.response && item.response.data) || item.url,
            };
          });
          let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
          console.log("是否保存成功？？？？？？",result)
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "保存成功",
            });
            //保存后初始化数据：参数一：data上的数据，参数二：配置信息上的默认data
            Object.assign(this._data, this.$options.data());
            //清除验证信息
            this.$nextTick(() => {
              this.$refs.spuform.clearValidate();
            });
            this.$emit("scene", 0);
          }
        } else {
          console.log("err submit!!");
          return false;
        }
      });
    },

    //点击添加spu按钮时发请求的函数
    async addSpuData(catId3) {
      this.spu.category3Id = catId3;
      //获取品牌啊信息
      let tmResult = await this.$API.spu.reqTradeMarkInfo();
      if (tmResult.code == 200 || tmResult.code == 20000) {
        this.tradeMarkList = tmResult.data;
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code === 200 || saleResult.code === 20000) {
        this.saleAttrList = saleResult.data;
      }
    },
    //點擊取消
    cancelAddOrUpdate() {
      this.$emit("scene", 0);
      //取消后初始化数据：参数一：data上的数据，参数二：配置信息上的默认data
      Object.assign(this._data, this.$options.data());
      //清除验证信息
      this.$nextTick(() => {
        this.$refs.spuform.clearValidate();
      });
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>