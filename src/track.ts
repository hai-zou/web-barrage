import { Bullet } from "./bullet";
import { BarrageItem, TrackOptions } from "./interface";

export class Track {
    static number = 3;
    static height = 40;

    // 分配至轨道中的弹幕
    private data: BarrageItem[];
    private top: number;
    // 若弹幕自身没有设置速度，则使用轨道的速度
    private speed: number;
    public $trackEle: HTMLElement;
    private bulletList: Bullet[];

    constructor(options: TrackOptions) {
        this.data = options.data;
        this.top = options.top;
        this.speed = options.speed;
        this.bulletList = [];

        this.$trackEle = this.createTrack();
    }

    private createTrack(): HTMLElement {
        const trackItem = document.createElement('div');
        trackItem.classList.add('barrage-track');
        trackItem.style.top = this.top + 'px';
        trackItem.style.height = Track.height + 'px';
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