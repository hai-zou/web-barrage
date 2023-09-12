import './barrage.css';
import { BarrageOptions, BarrageItem, TrackConfig } from './interface';
import { Track } from './track';
import { example } from './data';

export class Barrage {
	private $container: HTMLElement;
	private data: BarrageItem[];
	private trackConfig: TrackConfig;
	private trackList: Track[] = [];
	private timer = 0;

	constructor(options: BarrageOptions) {
		this.$container = options.container;
		this.data = example;
		this.trackConfig = options.trackConfig;

		this.$container.style.position = 'relative';
		this.$container.style.overflow = 'hidden';
		this.initTrack();
		this.putBarrage();
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

	// 投放弹幕
	private putBarrage(): void {
		this.timer = window.setInterval(() => {
			for (const item of this.trackList) {
				if (!item.hasPosition()) continue;
				const barrageData = this.data.shift();
				if (barrageData) {
					item.addBarrageData(barrageData);
					item.play();
				} else {
					return;
				}
			}
		}, 500);
	}

	public destroy(): void {
		window.clearInterval(this.timer);
		this.trackList.forEach(item => {
			this.$container.removeChild(item.$trackEle);
		});
		this.trackList = [];
	}
}
