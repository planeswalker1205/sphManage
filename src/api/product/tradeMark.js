//品牌管理数据的模块(/admin/product/baseTrademark/{page}/{limit})
import request from "@/utils/request"
export const getTradeMarkList = (page, limit) => {
    return request({
        url: `/admin/product/baseTrademark/${page}/${limit}`,
        method: "get"
    })

}

//处理添加/修改品牌的操作（/admin/product/baseTrademark/save）
export const reqAddOrUpdateTradeMark = (trademark) => {
    if (trademark.id) {
        //修改
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: trademark })
    } else {
        //添加
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: trademark })
    }
}

//品牌信息删除操作
export const reqDeleteTradeMark = (id) => {
    return request({
        url: `/admin/product/baseTrademark/remove/${id}`,
        method: 'DELETE'
    })
}