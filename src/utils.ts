// 考虑浏览器兼容的 requestAnimationFrame 方法
export const requestAnimationFrame = window.requestAnimationFrame ||
	(<any>window).mozRequestAnimationFrame ||
	(<any>window).webkitRequestAnimationFrame ||
	(<any>window).msRequestAnimationFrame;

// 考虑浏览器兼容的 cancelAnimationFrame 方法
export const cancelAnimationFrame = window.cancelAnimationFrame || (<any>window).mozCancelAnimationFrame;

// 生成 1-2 之间的随机数
export function createRandomNum(): number {
	const randomNumber = Math.random();
	return 1 + randomNumber;
}