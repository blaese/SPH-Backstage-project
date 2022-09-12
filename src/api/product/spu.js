import request from '@/utils/request'

// 获取spu列表数据的接口 GET /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) => request({
	url: `/product/${page}/${limit}`,
	method: 'get',
	params: { category3Id }
})

// 获取SPU信息  GET /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => request({ url: `/product/getSpuById/${spuId}`, method: 'get' })

// 获取品牌信息 GET  /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () => request({ url: '/product/baseTrademark/getTrademarkList', method: 'get' })

// 获取SPU图片  GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({ url: `/product/spuImageList/${spuId}`, method: 'get' })

// 获取销售属性 GET /admin/product/baseSaleAttrList
export const reqSaleAttrList = () => request({ url: '/product/baseSaleAttrList', method: 'get' })

// 修改SPU|添加SPU POST /admin/product/saveSpuInfo  POST /admin/product/updateSpuInfo 区别在于是否携带id
export const reqAddOrUpdateSpu = (data) => {
	if (data.id) {
		return request({ url: '/product/updateSpuInfo', method: 'post', data })
	} else {
		return request({ url: '/product/saveSpuInfo', method: 'post', data })
	}
}

//删除SPU
///admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({ url: `/product/deleteSpu/${spuId}`, method: 'delete' });

// 获取sku图片数据
// /admin/product/spuImageList/{spuId} GET
export const reqSkuImageList = (spuId) => request({ url: `/product/spuImageList/${spuId}`, method: 'get' })

// 获取sku销售属性数据
// /admin/product/spuSaleAttrList/{spuId} GET
export const reqSkuSaleAttrList = (spuId) => request({ url: `/product/spuSaleAttrList/${spuId}`, method: 'get' })

// 获取商品基础属性
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  GET
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
	url: `/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
	method: 'get'
})

// 收集sku信息
// POST /admin/product/saveSkuInfo skuInfo
export const reqSaveSku = (skuInfo) => request({ url: '/product/saveSkuInfo', method: 'post', data: skuInfo })

// 获取sku信息列表 /admin/product/findBySpuId/{spuId} GET 
export const reqSkuList = (spuId) => request({ url: `/product/findBySpuId/${spuId}`, method: 'get' })