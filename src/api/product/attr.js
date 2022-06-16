//平台属性管理模块请求文件
import request from "@/utils/request"
//获取一级分类数据
export const reqCategory1List = () => {
    return request({
        url: "/admin/product/getCategory1",
        method: "get"
    })
}

//获取二级分类数据
export const reqCategory2List = (id) => {
    return request({
        url: `/admin/product/getCategory2/${id}`,
        method: "get"
    })
}

//获取三级分类数据
export const reqCategory3List = (id) => {
    return request({
        url: `/admin/product/getCategory3/${id}`,
        method: "get"
    })
}

//获取商品基础属性接口
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
    return request({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: "get"
    })
}

//添加属性与属性值接口
export const reqAddOrUpdateAttr = (data) => {
    return request({
        url: '/admin/product/saveAttrInfo',
        method: "post",
        data
    })
}