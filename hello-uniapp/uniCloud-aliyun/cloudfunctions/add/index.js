"use strict";
const db = uniCloud.database();
exports.main = async (event, context) => {
	/* // event为客户端上传的参数
	// context中可获取客户端调用的上下文
	let clientIP = context.CLIENTIP; // 客户端ip信息
	let clientUA = context.CLIENTUA; // 客户端user-agent
	let spaceInfo = context.SPACEINFO; // 当前环境信息 {spaceId:'xxx',provider:'tencent'}
	// 以下四个属性只有使用uni-app以callFunction方式调用才能获取
	let os = context.OS; //客户端操作系统，返回值：android、ios    等
	let platform = context.PLATFORM; // 运行平台，返回值为 mp-weixin、app-plus等
	let appid = context.APPID; // manifest.json中配置的appid
	let deviceId = context.DEVICEID; // 客户端标识，新增于HBuilderX 3.1.0，同uni-app客户端getSystemInfo接口获取的deviceId
	console.log(event, context, clientIP, clientUA, spaceInfo, os, platform, appid, deviceId);
	// ...其它业务代码 */
	const collection = db.collection("unicloud-test"); // 获取表'unicloud-test'的集合对象
	const res = await collection.add(event);
	return res;
};
