export interface BarrageOptions {
    container: HTMLElement; // 弹幕挂载容器
    data: BarrageItem[]; // 弹幕数据
    config?: BarrageConfig; // 弹幕配置
}

export interface BarrageItem {
    key: string; // 唯一Key
    text: string; // 文字
    speed?: number; // 速度
    color?: string; // 颜色
    fontSize?: string; // 字体大小
    createdAt?: string; // 创建时间
}

export interface BarrageConfig {
    fontSize?: string; // 字体大小
    defaultColor?: string; // 字体默认颜色
    useRandomColor?: boolean; // 使用随机颜色
    trackNumber?: number; // 轨道数量
    trackHeight?: number; // 轨道高度
}

export interface TrackOptions {
    data: BarrageItem[]; // 轨道弹幕
    top: number; // 轨道位置
    speed: number; // 轨道中弹幕的速度
}

export interface Listeners {
    [key: string]: Function[];
}
