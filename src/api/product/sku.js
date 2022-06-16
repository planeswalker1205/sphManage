//平台属性管理模块请求文件
import request from "@/utils/request"

//获取图片接口
export const reqSpuImageList = (spuId) => {
    return request({
        url: `/admin/product/spuImageList/${spuId}`,
        method: 'get'
    })
}

//获取销售属性的数据
export const rqeSpuSaleAttrList = (spuId) => {
    return request({
        url: `/admin/product/spuSaleAttrList/${spuId}`,
        method: 'get'
    })
}

//获取平台属性的数据
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
    return request({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: 'get'
    })

}



//添加sku
export const reqAddSku = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo })

//获取sku列表数据
export const reqSkuList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })

//获取sku列表数据
export const reqSkuListData = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })

//sku上架
export const reqSkuIssue = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })

//sku下架
export const reqSkuSoldOut = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })

//获取SKU详情的接口
export const reqSkuById = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })