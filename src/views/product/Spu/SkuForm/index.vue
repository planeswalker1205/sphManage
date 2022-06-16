<template>
  <div>
    <el-form ref="skuform" :model="skuInfo" label-width="80px">
      <el-form-item label="SPU名称"> {{ spu.spuName }} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          type="number"
          placeholder="价格(元)"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input type="number" placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          placeholder="规格描述"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item :inline="true" label="平台属性">
        <el-form ref="selectForm" :inline="true" label-width="80px">
          <el-form-item
            v-for="attr in attrInfoList"
            :key="attr.id"
            :label="attr.attrName"
            style="margin: 10px 0"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                v-for="val in attr.attrValueList"
                :key="val.id"
                :label="val.valueName"
                :value="`${attr.id}:${val.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item :inline="true" label="销售属性">
        <el-form ref="selectForm" :inline="true" label-width="80px">
          <el-form-item
            style="margin: 20px 0"
            v-for="sale in spuSaleAttrList"
            :label="sale.saleAttrName"
            :key="sale.id"
          >
            <el-select v-model="sale.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="attr in sale.spuSaleAttrValueList"
                :key="attr.id"
                :label="attr.saleAttrValueName"
                :value="`${sale.id}:${attr.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table
          border=""
          style="width: 100%"
          :data="spuImageList"
          @selection-change="handleSelectionImgChange"
        >
          <el-table-column align="center" type="selection" width="55">
          </el-table-column>
          <el-table-column align="center" label="图片" width="width">
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="imgName"
            label="名称"
            width="width"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="prop"
            label="操作"
            width="width"
          >
            <!-- <el-button type="primary" size="mini">设为默认</el-button> -->
            <template slot-scope="{ row }">
              <el-button
                v-if="row.isDefault == 0"
                type="primary"
                size="mini"
                @click="changeDefault(row)"
                >设为默认</el-button
              >
              <el-button v-else type="success" size="mini">默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSku">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      //存储图片信息
      spuImageList: [],
      //存储销售属性
      spuSaleAttrList: [],
      //存储平台属性的数据
      attrInfoList: [],
      spu: [],
      //收集sku数据的字段
      skuInfo: {
        //第一类数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类数据：需要通过数据双向绑定v-model
        skuName: "",
        price: 0,
        //其他收集
        skuDefaultImg: "",
        skuDesc: "",
        //平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        skuImageList: [],
        skuSaleAttrValueList: [],
        weight: "",
      },
      //收集的图片的数据字段
      imageListData: [],
    };
  },
  methods: {
    //保存按钮
    async saveSku() {
      //整理平台属性
      const { attrInfoList, skuInfo,spuSaleAttrList,spuImageList } = this;
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);
      //整理销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item)=>{
        //saleid attrid
        if(item.attrIdAndValueId){
          const [saleAttrId,saleAttrValueId] = item.attrIdAndValueId.split(':')
          prev.push({saleAttrId,saleAttrValueId})
        }
        return prev
        
      },[])
      //整理图片属性
      skuInfo.skuImageList = spuImageList.map(item=>{
        return {
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId:item.id
        }
      })
      let result = await this.$API.sku.reqAddSku(skuInfo)
      if(result.code==200){
        this.$message({
          type:'success',
          message:'添加成功'
        })
        this.$emit("skuScene", 0);
      //清除数据
      Object.assign(this._data, this.$options.data());
      }
    },
    //获取SkuForm数据
    async getData(category1Id, category2Id, spu) {
      this.spu = spu;
      let resultImage = await this.$API.sku.reqSpuImageList(spu.id);
      if (resultImage.code == 200) {
        resultImage.data.forEach((item) => {
          //添加非响应数据isDefault字段（0代表未设置为默认）
          item.isDefault = 0;
        });
        this.spuImageList = resultImage.data;
      }
      let resultSale = await this.$API.sku.rqeSpuSaleAttrList(spu.id);
      if (resultSale.code == 200) {
        this.spuSaleAttrList = resultSale.data;
      }

      let resultAttr = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (resultAttr.code == 200) {
        this.attrInfoList = resultAttr.data;
      }
    },
    //table表格复选框选中事件
    handleSelectionImgChange(selection) {
      this.imageListData = selection;
    },
    //设置默认
    changeDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    //取消按钮
    cancel() {
      this.$emit("skuScene", 0);
      //清除数据
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
</style>