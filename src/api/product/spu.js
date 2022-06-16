//平台属性管理模块请求文件
import request from "@/utils/request"

//获取基础表格数据
export const reqSpuList = (page, limit, category3Id) => {
    return request({
        url: `/admin/product/${page}/${limit}`,
        method: "get",
        params: { category3Id }
    })
}

//获取SPU信息
export const reqSpuInfo = (spuId) => {
    return request({
        url: `/admin/product/getSpuById/${spuId}`,
        method: 'get'
    })
}

//获取品牌信息
export const reqTradeMarkInfo = () => {
    return request({
        url: "/admin/product/baseTrademark/getTrademarkList",
        method: 'get'
    })
}

//获取SPU图片
export const reqSpuImageInfo = (spuId) => {
    return request({
        url: `/admin/product/spuImageList/${spuId}`,
        method: 'get'
    })
}

//获取销售属性
export const reqBaseSaleAttrList = () => {
    return request({
        url: '/admin/product/baseSaleAttrList',
        method: 'get'
    })
}

//修改SPU或者添加SPU（区别是是否携带ID）
export const reqAddOrUpdateSpu = (spuInfo) => {
    if (spuInfo.id) {
        return request({
            url: '/admin/product/updateSpuInfo',
            method: 'post',
            data: spuInfo
        })
    } else {
        return request({
            url: '/admin/product/saveSpuInfo',
            method: 'post',
            data: spuInfo
        })
    }

}

//删除Spu
export const reqDeleteSpu = (spuId) => {
    return request({
        url: `/admin/product/deleteSpu/${spuId}`,
        method: 'delete'
    })
}