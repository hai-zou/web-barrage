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

// 生成一个随机颜色
export function getRandomColor() {
  // 生成随机的 R、G 和 B 分量，0 到 255 之间的随机数
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  // 将 RGB 分量转换为十六进制格式，使用padStart确保至少两位字符
  var hexR = r.toString(16).padStart(2, '0');
  var hexG = g.toString(16).padStart(2, '0');
  var hexB = b.toString(16).padStart(2, '0');

  // 拼接十六进制颜色字符串
  var hexColor = '#' + hexR + hexG + hexB;

  return hexColor;
}