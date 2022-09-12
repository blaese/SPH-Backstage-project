// 获取品牌管理数据模块
import request from '@/utils/request'

// 品牌分页列表  /admin/product/baseTrademark/{page}/{limit} get page limit
export const reqTradeMarkList = (page, limit) => request({ url: `/product/baseTrademark/${page}/${limit}`, method: 'get' })

//新增品牌: /admin/product/baseTrademark/save   post  携带两个参数：品牌名称、品牌logo
//切记：对于新增的品牌，给服务器传递数据，不需要传递ID，ID是由服务器生成

//修改品牌 /admin/product/baseTrademark/update   put   携带三个参数：id、品牌名称、品牌logo
//切记：对于修改某一个品牌的操作，前端携带的参数需要带上id，你需要告诉服务器修改的是哪一个品牌
export const reqAddOrUpdateTradeMark = (tradeMark) => {
	if (tradeMark.id) {
		return request({ url: '/product/baseTrademark/update', method: 'put', data: tradeMark })
	} else {
		return request({ url: '/product/baseTrademark/save', method: 'post', data: tradeMark })
	}
}

// 删除品牌 /admin/product/baseTrademark/remove/{id} delete id 
export const reqDeleteTradeMark = (id) => request({ url: `/product/baseTrademark/remove/${id}`, method: 'delete' })