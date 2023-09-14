import { Bullet } from "./bullet";
import { BarrageItem, TrackOptions } from "./interface";

export class Track {
	// 分配至轨道中的弹幕
	private data: BarrageItem[];
	private height: number;
	private top: number;
	public $trackEle: HTMLElement;
	private bulletList: Bullet[];

	constructor(options: TrackOptions) {
		this.data = options.data;
		this.height = options.height;
		this.top = options.top;
		this.bulletList = [];

		this.$trackEle = this.createTrack();
	}

	private createTrack(): HTMLElement {
		const trackItem = document.createElement('div');
		trackItem.style.position = 'absolute';
		trackItem.style.left = '0';
		trackItem.style.top = this.top + 'px';
		trackItem.style.height = this.height + 'px';
		trackItem.style.width = '100%';
		return trackItem;
	}

	public addBullet(item: BarrageItem): void {
		this.data.push(item);
	}

	// 判断轨道是否有剩余空间
	public hasPosition(): boolean {
		if (!this.$trackEle.hasChildNodes()) {
			return true;
		}
		const trackWidth = this.$trackEle.offsetWidth;
		const lastChild = <HTMLElement>this.$trackEle.lastElementChild;
		const lastChildLeft = lastChild.offsetLeft;
		const lastChildWidth = lastChild.offsetWidth;
		const rightDistance = trackWidth - lastChildLeft - lastChildWidth;

		if (rightDistance > 0) {
			return true;
		} else {
			return false;
		}
	}

	// 往轨道放入弹幕
	public putInTrack(): void {
		if (!this.data.length) return;
		const item = this.data.shift();
		const bulletItem = new Bullet({
			...item,
			left: this.$trackEle.offsetWidth,
			removeBullet: this.destroyBullet,
		});
		this.bulletList.push(bulletItem);
		this.$trackEle.appendChild(bulletItem.$bulletEle);
		bulletItem.move();
	}

	// 暂停轨道上的弹幕
	public stopAllMove(): void {
		this.bulletList.forEach(item => {
			item.stop();
		});
	}

	// 继续移动
	public continueMove(): void {
		this.bulletList.forEach(item => {
			item.move();
		});
	}

	// 销毁弹幕元素
	private destroyBullet = (bulletItem: Bullet): void => {
		const findIndex = this.bulletList.findIndex(item => item.key === bulletItem.key);
		if (findIndex !== -1) {
			this.bulletList.splice(findIndex, 1);
		}
		this.$trackEle.removeChild(bulletItem.$bulletEle);
	}
}