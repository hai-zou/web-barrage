import { BarrageItem, TrackOptions } from "./interface";

export class Track {
	// 分配至轨道中的弹幕
	private data: BarrageItem[];
	private height: number;
	private top: number;
	public $trackEle: HTMLElement;

	constructor(options: TrackOptions) {
		this.data = options.data;
		this.height = options.height;
		this.top = options.top;

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

	private createBarrage(item: BarrageItem): HTMLElement {
		const barrageItem = document.createElement("span");
		barrageItem.style.position = 'absolute';
		barrageItem.style.left = '100%';
		barrageItem.style.color = item.color;
		barrageItem.style.whiteSpace = 'nowrap';
		barrageItem.attributes['barrage-id'] = item.key;
		barrageItem.innerText = item.text;

		return barrageItem;
	}

	addBarrageData(item: BarrageItem): void {
		this.data.push(item);
	}

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

	public play(): void {
		if (!this.data.length) return;
		const item = this.data.shift();
		const barrageItem = this.createBarrage(item);
		this.$trackEle.appendChild(barrageItem);
		this.move(barrageItem, item.speed);
	}

	private move(element: HTMLElement, speed: number) {
		let left = this.$trackEle.offsetWidth;

		const animate = () => {
			left -= speed;
			element.style.left = left + 'px';

			// 如果元素移出屏幕左侧，停止动画
			if (left < -element.offsetWidth) {
				this.$trackEle.removeChild(element);
				return;
			}

			// 继续下一帧动画
			requestAnimationFrame(animate);
		}

		// 启动动画
		animate();
	}
}