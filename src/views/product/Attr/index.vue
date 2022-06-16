<template>
  <div>
    <el-card class="box-card">
      <CategorySelect @getAllCategoryId="getCategoryIds" :isShowTable="isShowTable"/>
    </el-card>
    <el-card class="box-card">
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!categoryId3"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrData" :border="true">
          <el-table-column prop="id" label="序号" width="80"> </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="attrValueList" label="属性值列表">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attr in row.attrValueList"
                :key="attr.id"
                style="margin-left: 10px"
                >{{ attr.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加属性操作 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" :model="attrInfo" class="demo-form-inline">
          <el-form-item label="属性名">
            <el-input
              v-model="attrInfo.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-table
          style="width: 100%; margin: 20px 0"
          :data="attrInfo.attrValueList"
          :border="true"
        >
          <el-table-column prop="" label="序号" align="center" width="80">
            <template slot-scope="{ row, $index }">
              {{ $index }}
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="属性值名称"
            align="center"
            width="width"
          >
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                size="mini"
                placeholder="请输入属性值名称"
                v-if="row.flag"
                @blur="blurInput(row)"
                @keyup.native.enter="blurInput(row,$index)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" align="center" width="width">
            <template slot-scope="{ row ,$index}">
              <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm="deleteAttr($index)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"

                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveOrUpdateAttr">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入lodash中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      attrData: [],
      categoryId1: "",
      categoryId2: "",
      categoryId3: "",
      //控制表格的显示与隐藏
      isShowTable: true,
      //添加的属性名
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [], //属性值，多个
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
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
        this.getAttrList();
      }
    },
    async getAttrList() {
      let { categoryId1, categoryId2, categoryId3 } = this;
      let result = await this.$API.attr.reqAttrInfoList(
        categoryId1,
        categoryId2,
        categoryId3
      );
      if (result.code === 200 || result.code === 20000) {
        this.attrData = result.data;
      }
      console.log(result);
    },
    addAttrValue() {
  
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值，并把已有的属性的Id带上
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //点击添加属性
    addAttr() {
      this.isShowTable = false;
      //清除数据
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [], //属性值，多个
        categoryId: this.categoryId3,
        categoryLevel: 3,
      };
    },
    //点击修改属性
    updateAttr(row) {
      this.isShowTable = false;
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    //鼠标blur
    blurInput(row,index) {
      if (row.valueName.trim() == "") {
        this.$message("请输入属性值");
        return;
      }
      //新增的属性值不能与已有属性值重复
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });

      if (isRepeat) {
        this.$message("属性值不能重复");
        row.valueName=''
        return;
      }
      row.flag = false;
    },
    toEdit(row, $index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[$index].focus();
      });
    },
    deleteAttr(index) {
      this.attrInfo.attrValueList.splice(index,1)
    },
    //添加或者修改属性的操作
    async saveOrUpdateAttr(){
      //整理参数
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        if(item.valueName!=''){
          delete item.flag;
          return true
        }
      })
      if(this.attrInfo.attrName.trim()==''){
        this.$message({
          type:"warning",
          message:"未添加属性名"
        })
        return
      }
      if(this.attrInfo.attrValueList.length==0){
        this.$message({
          type:"warning",
          message:"未添加有效属性值"
        })
        return
      }
      try {
        let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        console.log(result)
        if(result.code===200||result.code===20000){
          this.isShowTable=true
          this.$message({
            type:"success",
            message:"保存成功"
          })
          this.getAttrList()
          
        }
      } catch (error) {
        
      }
    }
  },
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 20px 0;
}
</style>