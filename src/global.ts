import { Bullet } from "./bullet";
import { BarrageConfig } from "./interface";

// 创建一个单例，存储全局公共配置
export class GlobalData {
    private static instance: GlobalData | null = null;
    private config: BarrageConfig;

    private constructor() { } // 防止直接实例化

    public static getInstance(): GlobalData {
        if (GlobalData.instance === null) {
            GlobalData.instance = new GlobalData();
        }
        return GlobalData.instance;
    }

    public getConfig(): BarrageConfig {
        return this.config;
    }

    public setConfig(data: BarrageConfig): void {
        this.config = data;
        const { fontSize, defaultColor } = this.config;
        if (fontSize) {
            Bullet.fontSize = fontSize;
        }
        if (defaultColor) {
            Bullet.defaultColor = defaultColor;
        }
    }
}