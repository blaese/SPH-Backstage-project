import request from '@/utils/request'

// 获取sku列表接口 /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({ url: `/product/list/${page}/${limit}`, method: 'get' })

// 上架 /admin/product/onSale/{skuId} GET 
export const reqSale = (skuId) => request({ url: `/product/onSale/${skuId}`, method: 'get' })

// 下架 /admin/product/cancelSale/{skuId} GET
export const reqCancel = (skuId) => request({ url: `/product/cancelSale/${skuId}`, method: 'get' })

// 获取sku详情 /admin/product/getSkuById/{skuId} GET
export const reqGetSkuById = (skuId) => request({ url: `/product/getSkuById/${skuId}`, method: 'get' })