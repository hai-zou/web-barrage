# Barrage

Web 端用户界面 弹幕 组件

## 角色

弹幕组件的设计分为三种角色: 控制器 | 轨道 | 弹幕  
控制器中存放了所有待播放弹幕数据, 当开始播放弹幕的时候, 控制器去寻找合适的轨道投放弹幕

### 控制器

```javascript
declare class Barrage {
	// 弹幕挂载容器
	private $container: HTMLElement;
	// 弹幕数据
	private data: BarrageItem[];
	...

	// 添加弹幕
	public addData(item: BarrageItem): void;
	// 开始播放弹幕
	public play(): void;
	// 暂停播放
	public pause(): void;
	// 销毁弹幕
	public destroy(): void;
}
```

### 轨道

```javascript
declare class Track {
	// 轨道元素
	public $trackEle: HTMLElement;
	// 分配至轨道中的弹幕
	private data: BarrageItem[];
	...

	// 添加弹幕(单轨道)
	public addBullet(item: BarrageItem): void;
	// 判断是否有剩余空间用来放置弹幕
	public hasPosition(): boolean;
	// 往轨道投放弹幕
	public putInTrack(): void;
	// 暂停弹幕移动
	public stopAllMove(): void;
	// 销毁弹幕
	private destroyBullet = (bulletItem: Bullet): void;
}
```

### 弹幕

```javascript
declare class Bullet {
	// 弹幕元素
	public $bulletEle: HTMLElement;
	// 距离屏幕左边偏移量
	left: number;
	// 移动速度
	speed: number;
	...

	// 开始移动
	public move(): void;
	// 停止移动
	public stop(): void;
	// 销毁实例
	public destroy(): void;
}
```

## 文档

- [数据类型](#数据类型)
  - [BarrageItem](#barrageitem-弹幕数据)
  - [BarrageConfig](#barrageconfig-弹幕全局配置)
  - [TrackConfig](#trackconfig-弹幕轨道配置)
- [配置选项](#配置选项)

## 数据类型

### BarrageItem 弹幕数据

```javascript
{
	key: string; // 唯一Key
	speed: number; // 速度 — 像素/秒
	text: string; // 文字
	color: string; // 颜色
	createdAt: Date; // 创建时间
}
```

### BarrageConfig 弹幕全局配置

```javascript
{
	fontSize: string; // 字体大小
	defaultColor: string; // 字体默认颜色
}
```

### TrackConfig 弹幕轨道配置

```javascript
{
	number: number; // 轨道数量
	height: number; // 轨道高度
}
```

## 配置选项

| 配置项      | 类型                                         | 默认值 | 说明         |
| ----------- | -------------------------------------------- | ------ | ------------ |
| container   | `DOM`                                        |        | 弹幕容器     |
| data        | [BarrageItem](#barrageitem-弹幕数据)[]       | []     | 弹幕数据     |
| config      | [BarrageConfig](#barrageconfig-弹幕全局配置) | {}     | 弹幕配置     |
| trackConfig | [TrackConfig](#trackconfig-弹幕轨道配置)     | {}     | 弹幕轨道配置 |
