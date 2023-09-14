export interface BarrageOptions {
	container: HTMLElement; // 弹幕挂载容器
	data: BarrageItem[]; // 弹幕数据
	config: BarrageConfig; // 弹幕配置
	trackConfig: TrackConfig; // 轨道配置
}

export interface BarrageItem {
	key: string; // 唯一Key
	speed: number; // 速度 — 像素/秒
	text: string; // 文字
	color: string; // 颜色
	createdAt: string; // 创建时间
}

export interface BarrageConfig {
	fontSize: string; // 字体大小
	defaultColor: string; // 字体默认颜色
}

export interface TrackConfig {
	number: number; // 轨道数量
	height: number; // 轨道高度
}

export interface TrackOptions {
	data: BarrageItem[]; // 轨道弹幕
	height: number; // 轨道高度
	top: number; // 轨道位置
}