// 考虑浏览器兼容的 requestAnimationFrame 方法
export const requestAnimationFrame = window.requestAnimationFrame ||
	(<any>window).mozRequestAnimationFrame ||
	(<any>window).webkitRequestAnimationFrame ||
	(<any>window).msRequestAnimationFrame;

// 考虑浏览器兼容的 cancelAnimationFrame 方法
export const cancelAnimationFrame = window.cancelAnimationFrame || (<any>window).mozCancelAnimationFrame;
