import './barrage.css';
import { BarrageOptions, BarrageItem, Listeners, BarrageConfig } from './interface';
import { Track } from './track';
import { createRandomNum } from './utils';

export class Barrage {

    static defaultConfig: BarrageConfig = {
        fontSize: '20px',
        defaultColor: '#000',
        useRandomColor: false,
        trackNumber: 3,
        trackHeight: 40,
    };

    private $container: HTMLElement;
    private $curtain: HTMLElement;
    private data: BarrageItem[];
    private config: BarrageConfig;
    private trackList: Track[] = [];
    private timer = undefined;
    private _listeners: Listeners;

    constructor(options: BarrageOptions) {
        this.$container = options.container;
        this.data = options.data;
        this.config = {
            ...Barrage.defaultConfig,
            ...options.config,
        };
        this._listeners = {};

        this._render();
    }

    private _render(): void {
        // 创建幕布
        this.$container.classList.add('barrage-container');
        this.$curtain = document.createElement('div');
        this.$curtain.classList.add('barrage-curtain');
        this.$container.appendChild(this.$curtain);

        // 创建轨道
        const { trackNumber, trackHeight } = this.config;
        const clientHeight = this.$curtain.clientHeight;
        for (let i = 0; i < trackNumber; i++) {
            const trackItem = new Track({
                config: this.config,
                data: [],
                top: i * trackHeight,
                speed: createRandomNum(),
            });
            if ((i + 1) * trackHeight > clientHeight) {
                return;
            }
            this.trackList.push(trackItem);
            this.$curtain.appendChild(trackItem.$trackEle);
        }
    }

    public addData(item: BarrageItem | BarrageItem[]): void {
        if (Array.isArray(item)) {
            this.data.push(...item);
        } else {
            this.data.push(item);
        }
        this.emit('dataChange', { data: this.data });
    }

    // 分配弹幕至不同轨道
    private distributeBarrage = () => {
        for (const trackItem of this.trackList) {
            if (!trackItem.hasPosition()) continue;
            const barrageData = this.data.shift();
            if (barrageData) {
                trackItem.addBullet(barrageData);
                trackItem.putInTrack();
                this.emit('dataChange', { data: this.data });
            } else {
                return;
            }
        }
    }

    // 开始播放弹幕
    public play(): void {
        if (!this.timer) {
            this.timer = window.setInterval(this.distributeBarrage, 1000);
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

    public on(eventName: string, callback: Function): Barrage {
        if (!this._listeners[eventName]) {
            this._listeners[eventName] = [];
        }
        this._listeners[eventName].push(callback);
        return this;
    }

    public off(eventName: string, callback: Function): Barrage {
        if (this._listeners[eventName]) {
            let index = this._listeners[eventName].indexOf(callback);
            if (index > -1) {
                this._listeners[eventName].splice(index, 1);
            }
        }
        return this;
    }

    private emit(eventName: string, event: any = {}): Barrage {
        if (this._listeners[eventName]) {
            for (let callback of this._listeners[eventName]) {
                let extendArgs = { ...event, ...{ name: eventName } };
                callback.call(this, extendArgs);
            }
        }
        return this;
    }

    public destroy(): void {
        this.stopPut();
        this.$container.removeChild(this.$curtain);
        this.trackList = [];

        this.emit('destroy');
    }
}
