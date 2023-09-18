# Barrage

Web 端用户界面弹幕组件

弹幕组件的设计分为三种角色: 控制器 | 轨道 | 弹幕  
控制器中存放了所有待播放弹幕数据, 当开始播放弹幕的时候, 控制器去寻找合适的轨道投放弹幕

## 文档

- [基本用法](#基本用法)
- [数据类型](#数据类型)
  - [BarrageItem](#barrageitem-弹幕数据)
  - [BarrageConfig](#barrageconfig-弹幕全局配置)
- [配置选项](#配置选项)
- [事件](#事件)
- [API](#api)

## 基本用法

1. 通过 npm 或 yarn 安装，命令 `npm install h-barrage` 或 `yarn add h-barrage`

2. 创建一个容器，这个容器必须要有宽度和高度

```html
<div class="outer-container"></div>
```

3. 引入弹幕样式，准备数据（这里使用组件提供的示例数据）

```javascript
import "h-barrage/dist/barrage.css";
import example from "h-barrage/data.json";
```

4. 创建 barrage

```javascript
const barrage = new StaryBarrage({
  container: document.querySelector(".outer-container"),
  data: example,
});
barrage.play();
```

## 数据类型

### BarrageItem 弹幕数据

```javascript
export interface BarrageItem {
  // 唯一Key
  key: string;
  // 文字
  text: string;
  // 速度
  speed?: number;
  // 颜色
  color?: string;
  // 字体大小
  fontSize?: string;
  // 创建时间
  createdAt?: string;
}
```

### BarrageConfig 弹幕全局配置

```javascript
export class BarrageConfig {
  // 字体大小
  fontSize?: string = '20px';
  // 字体默认颜色
  defaultColor?: string = '#000';
  // 使用随机颜色
  useRandomColor?: boolean = false;
  // 轨道数量
  trackNumber?: number = 3;
  // 轨道高度
  trackHeight?: number = 40;
}
```

## 配置选项

| 配置项    | 类型                                         | 默认值 | 说明         |
| --------- | -------------------------------------------- | ------ | ------------ |
| container | `DOM`                                        |        | 弹幕容器     |
| data      | [BarrageItem](#barrageitem-弹幕数据)[]       | []     | 弹幕数据     |
| config    | [BarrageConfig](#barrageconfig-弹幕全局配置) | -      | 弹幕全局配置 |

## 事件

| 事件名     | 触发时机                     |
| ---------- | ---------------------------- |
| dataChange | 当弹幕数据发生变化的时候触发 |
| destroy    | 销毁实例时触发               |

## API

| 函数名   | 作用             |
| -------- | ---------------- |
| play     | 开始播放弹幕     |
| pause    | 暂停播放         |
| continue | 暂停之后继续播放 |
| addData  | 添加弹幕数据     |
| on       | 监听事件         |
| off      | 取消监听事件     |
| destroy  | 销毁实例         |
