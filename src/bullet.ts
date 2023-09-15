import { GlobalData } from "./global";
import { BarrageItem } from "./interface";
import { cancelAnimationFrame, getRandomColor, requestAnimationFrame } from "./utils";

type BulletOptions = BarrageItem & { left: number; removeBullet: (bulletItem: Bullet) => void };

export class Bullet {

    static defaultColor = '#000';
    static fontSize = '20px';

    public $bulletEle: HTMLElement;

    key: string;
    // 距离屏幕左边偏移量
    left: number;
    // 移动速度
    speed: number;
    // 动画
    animation: number;
    // 销毁实例
    removeBullet: (bulletItem: Bullet) => void;

    private globalDataInstance: GlobalData;

    constructor(options: BulletOptions) {
        this.globalDataInstance = GlobalData.getInstance();
        this.key = options.key;
        this.left = options.left;
        this.speed = options.speed;
        this.removeBullet = options.removeBullet;
        this.$bulletEle = this.createBullet(options);
    }

    private createBullet(item: BulletOptions): HTMLElement {
        const barrageItem = document.createElement("span");
        barrageItem.classList.add('barrage-item');
        barrageItem.style.left = item.left + 'px';
        barrageItem.style.color = this.getBarrageColor(item.color);
        barrageItem.style.fontSize = Bullet.fontSize;
        barrageItem.attributes['barrage-id'] = item.key;
        barrageItem.innerText = item.text;

        return barrageItem;
    }

    private getBarrageColor(color: string): string {
        const { useRandomColor } = this.globalDataInstance.getConfig();
        if (useRandomColor) {
            return getRandomColor();
        }
        return color || Bullet.defaultColor;
    }

    private animate = () => {
        this.left -= this.speed;
        this.$bulletEle.style.left = this.left + 'px';

        // 如果元素移出屏幕左侧，销毁实例
        if (this.left < -this.$bulletEle.offsetWidth) {
            this.destroy();
            return;
        }

        // 继续下一帧动画
        if (this.animation) {
            requestAnimationFrame(() => this.animate());
        }
    }

    public move(): void {
        if (!this.animation) {
            this.animation = requestAnimationFrame(() => this.animate());
        }
    }

    public stop(): void {
        if (this.animation) {
            cancelAnimationFrame(this.animation);
            this.animation = undefined;
        }
    }

    public destroy(): void {
        this.stop();
        this.removeBullet(this);
    }

}