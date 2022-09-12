// 平台属性管理
import request from '@/utils/request'

// 一级分类 GET  /admin/product/getCategory1 
export const reqGetCategory1 = () => request({ url: '/product/getCategory1', method: 'get' })

// 二级分类 GET /admin/product/getCategory2/{category1Id}
export const reqGetCategory2 = (category1Id) => request({ url: `/product/getCategory2/${category1Id}`, method: 'get' })

// 三级分类 GET /admin/product/getCategory3/{category2Id}
export const reqGetCategory3 = (category2Id) => request({ url: `/product/getCategory3/${category2Id}`, method: 'get' })

// 平台属性  GET  /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrList = (category1Id, category2Id, category3Id) => request({
	url: `/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
	method: 'get'
})

// 添加属性与修改属性接口 POST /admin/product/saveAttrInfo
export const reqAddorUpdateAttr = (data) => request({ url: '/product/saveAttrInfo', method: 'post', data })
/*
{
	"attrName": "",      属性名
	"attrValueList": [   属性名中属性值，因为属性值可以是多个，因此需要的是数组
		{
			"attrId": 0,          属性的id
			"valueName": "string"  属性值
		}
	],
	"categoryId": 0,    category3Id
	"categoryLevel":3,
}
*/
