# Barrage

Web 端用户界面 弹幕 组件

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
