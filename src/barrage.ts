import './barrage.css';
import { BarrageOptions, BarrageItem, TrackConfig, BarrageConfig } from './interface';
import { Track } from './track';
import { createRandomNum } from './utils';

export class Barrage {
    private $container: HTMLElement;
    private $curtain: HTMLElement;
    private data: BarrageItem[];
    private config: BarrageConfig;
    private trackConfig: TrackConfig;
    private trackList: Track[] = [];
    private timer = undefined;

    constructor(options: BarrageOptions) {
        this.$container = options.container;
        this.data = options.data;
        this.config = options.config;
        this.trackConfig = options.trackConfig;

        this.createCurtain();
        this.initTrack();
    }

    // 创建幕布
    private createCurtain(): void {
        this.$container.classList.add('barrage-container');
        this.$curtain = document.createElement('div');
        this.$curtain.classList.add('barrage-curtain');
        const { fontSize, color } = this.config || {};
        if (fontSize) {
            this.$curtain.style.fontSize = fontSize;
        }
        if (color) {
            this.$curtain.style.color = color;
        }
        this.$container.appendChild(this.$curtain);
    }

    // 初始化轨道
    private initTrack(): void {
        const { number, height = Track.defaultHeight } = this.trackConfig;
        const clientHeight = this.$curtain.clientHeight;

        for (let i = 0; i < number; i++) {
            const trackItem = new Track({
                data: [],
                top: i * height,
                height,
                speed: createRandomNum(),
            });
            if ((i + 1) * height > clientHeight) {
                return;
            }
            this.trackList.push(trackItem);
            this.$curtain.appendChild(trackItem.$trackEle);
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

    // 清空幕布
    public destroy(): void {
        this.stopPut();
        this.$container.removeChild(this.$curtain);
        this.trackList = [];
    }
}
