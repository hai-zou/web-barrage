import { Bullet } from "./bullet";
import { BarrageConfig, BarrageItem, TrackOptions } from "./interface";

type Options = TrackOptions & { config: BarrageConfig };

export class Track {

    public $trackEle: HTMLElement;

    // 分配至轨道中的弹幕
    private data: BarrageItem[];
    // 轨道距离顶部偏移量
    private top: number;
    // 若弹幕自身没有设置速度，则使用轨道的速度
    private speed: number;
    // 轨道高度
    private height: number;
    private config: BarrageConfig;

    // 轨道中运行的弹幕列表
    private bulletList: Bullet[];

    constructor(options: Options) {
        this.data = options.data;
        this.top = options.top;
        this.speed = options.speed;
        this.height = options.config.trackHeight;
        this.config = options.config;
        this.bulletList = [];

        this.$trackEle = this.createTrack();
    }

    private createTrack(): HTMLElement {
        const trackItem = document.createElement('div');
        trackItem.classList.add('barrage-track');
        trackItem.style.top = this.top + 'px';
        trackItem.style.height = this.height + 'px';
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

        if (rightDistance > 100) {
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
            speed: item.speed || this.speed,
            removeBullet: this.destroyBullet,
            config: this.config,
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