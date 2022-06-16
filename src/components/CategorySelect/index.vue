<template>
  <div>
    <el-form :inline="true" :model="seleForm" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          v-model="seleForm.cate1Id"
          placeholder="请选择"
          @change="changeCategory1(seleForm.cate1Id)"
          :disabled="!isShowSelect"
        >
          <el-option
            v-for="item in seleData1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="seleForm.cate2Id"
          placeholder="请选择"
          @change="changeCategory2(seleForm.cate2Id)"
          :disabled="!isShowSelect"
        >
          <el-option
            v-for="item in seleData2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="seleForm.cate3Id"
          placeholder="请选择"
          @change="changeCategory3(seleForm.cate3Id)"
          :disabled="!isShowSelect"
        >
          <el-option
            v-for="item in seleData3"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:["isShowTable"],
  data() {
    return {
      seleForm: {
        cate1Id: "",
        cate2Id: "",
        cate3Id: "",
      },
      seleData1: [],
      seleData2: [],
      seleData3: [],
    };
  },
  computed:{
    isShowSelect(){
      if(this.isShowTable == undefined){
        return true
      }else{
        return this.isShowTable
      }
      
    }
  },
  methods: {
    async getCategory1Lists() {
      try {
        let result = await this.$API.attr.reqCategory1List();
        if (result.code === 200 || result.data === 20000) {
          this.seleData1 = result.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async changeCategory1(idx1) {
      this.$emit("getAllCategoryId", idx1, 1);
      //每次切换后清除后两个数据
      this.seleForm.cate2Id = "";
      this.seleForm.cate3Id = "";
      this.seleData2 = [];
      this.seleData3 = [];
      try {
        let result = await this.$API.attr.reqCategory2List(idx1);
        if (result.code === 200 || result.data === 20000) {
          this.seleData2 = result.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async changeCategory2(idx2) {
      this.$emit("getAllCategoryId", idx2, 2);
      //每次切换后清除后一个数据
      this.seleForm.cate3Id = "";
      this.seleData3 = [];
      try {
        let result = await this.$API.attr.reqCategory3List(idx2);
        if (result.code === 200 || result.data === 20000) {
          this.seleData3 = result.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    changeCategory3(idx3) {
      this.$emit("getAllCategoryId", idx3, 3);
    },
  },
  mounted() {
    this.getCategory1Lists();
  },
};
</script>

<style>
</style>