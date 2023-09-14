import './barrage.css';
import { BarrageOptions, BarrageItem, TrackConfig } from './interface';
import { Track } from './track';

export class Barrage {
	private $container: HTMLElement;
	private data: BarrageItem[];
	private trackConfig: TrackConfig;
	private trackList: Track[] = [];
	private timer = undefined;

	constructor(options: BarrageOptions) {
		this.$container = options.container;
		this.data = options.data;
		this.trackConfig = options.trackConfig;

		this.$container.style.position = 'relative';
		this.$container.style.overflow = 'hidden';
		this.initTrack();
	}

	// 初始化轨道
	private initTrack(): void {
		const { number, height } = this.trackConfig;
		const clientHeight = this.$container.clientHeight;

		for (let i = 0; i < number; i++) {
			const trackItem = new Track({
				data: [],
				height,
				top: i * height,
			});
			if ((i + 1) * height > clientHeight) {
				return;
			}
			this.trackList.push(trackItem);
			this.$container.appendChild(trackItem.$trackEle);
		}
	}

	public addData(item: BarrageItem): void {
		this.data.push(item);
	}

	// 分配弹幕至不同轨道
	private distributeBarrage = () => {
		for (const trackItem of this.trackList) {
			if (!trackItem.hasPosition()) continue;
			const barrageData = this.data.shift();
			if (barrageData) {
				trackItem.addBullet(barrageData);
				trackItem.putInTrack();
			} else {
				return;
			}
		}
	}

	// 开始播放弹幕
	public play(): void {
		if (!this.timer) {
			this.timer = window.setInterval(this.distributeBarrage, 500);
		}
	}

	// 暂停播放
	public pause(): void {
		this.stopPut();
		this.trackList.forEach(trackItem => {
			trackItem.stopAllMove();
		});
	}

	// 继续播放
	public continue(): void {
		this.trackList.forEach(trackItem => {
			trackItem.continueMove();
		});
		this.play();
	}

	// 关闭定时器, 暂停投放
	private stopPut(): void {
		window.clearInterval(this.timer);
		this.timer = undefined;
	}

	// 销毁弹幕
	public destroy(): void {
		this.stopPut();
		this.trackList.forEach(trackItem => {
			this.$container.removeChild(trackItem.$trackEle);
		});
		this.trackList = [];
	}
}
