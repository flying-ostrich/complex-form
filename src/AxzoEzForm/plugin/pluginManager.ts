import { EzFormFactoryCfg, EzFormFactoryCfgLayer, EzFormItemDecoratorPlugin, EzFormPlugin, LogicHandler, Render } from "../core/types";
import { composePluginLogicHandlers, composePluginRenders, tranverseFactoryCfg } from "./util";



export class PluginManager<FormModel> {
    private plugins: EzFormPlugin<FormModel>[] = [];
    private factoryCfg: EzFormFactoryCfg<FormModel> = [];
    private decoratorPluginMap = new Map<string, EzFormItemDecoratorPlugin<FormModel>[]>();

    constructor(factoryCfg: EzFormFactoryCfg<FormModel>) {
        this.factoryCfg = factoryCfg;
    }
    /**
     * 注册插件
     * @param plugin 
     */
    usePlugin(plugin: EzFormPlugin<FormModel>) {
        this.plugins.push(plugin);
        if (plugin.type === 'ItemDecoratorPlugin') {
            const itemName = plugin.decorateItemName;
            if (this.decoratorPluginMap.has(itemName)) {
                this.decoratorPluginMap.get(itemName).push(plugin)
            } else {
                this.decoratorPluginMap.set(itemName, [plugin])
            }
            return;
        }
    }
    /**
     * 通过插件修改表单项配置
     * @param factoryCfg 
     */
    applyPlugins(): EzFormFactoryCfg<FormModel> {
        this._applyFormDecoratorPlugin();

        return this.factoryCfg;
    }
    /**
     * 获取已注册的插件列表
     * @returns 
     */
    getPlugins() {
        return this.plugins;
    }
    /**
     * 超找表单配置项
     * @param name 配置项名称
     * @returns 
     */
    _getFormItemByName(name: string): [
        EzFormFactoryCfgLayer<FormModel>,
        EzFormFactoryCfg<FormModel>,
        number
    ] | null {
        if (!name) return null;
        let result = null;
        tranverseFactoryCfg(this.factoryCfg, (item, parent, idx) => {
            if (item.name === name) {
                result = [item, parent, idx];
            }
        })
        return result;
    }

    /**
     * 应用表单项装饰器插件
     * @param plugin 
     */
    _applyFormDecoratorPlugin() {
        this.decoratorPluginMap.forEach((plugins, name) => {
            const [formItem] = this._getFormItemByName(name);

            // 修改逻辑函数
            const composedLogicHander = composePluginLogicHandlers(plugins.map(plugin => plugin.logicHandler));
            const decoratedLogicHandler: LogicHandler<FormModel> = (props, ctx) => {
                const prevHandler = formItem.logicHandler;
                const pCtx = prevHandler(props, ctx);
                return composedLogicHander(props, pCtx)
            }
            formItem.logicHandler = decoratedLogicHandler

            // 修改渲染器
            const composedRender = composePluginRenders(plugins.map(plugin => plugin.render));
            const decoratedRender: Render<FormModel> = (props, ctx) => {
                const prevRender = formItem.render;
                const pElements = prevRender(props, ctx);
                return composedRender(props, ctx, pElements);
            }
            formItem.render = decoratedRender;
        });
    }

    /**
     * 生成插件管理器实例
     * @returns 
     */
    static getInstance<FormModel>(factoryCfg: EzFormFactoryCfg<FormModel>) {
        return new PluginManager<FormModel>(factoryCfg);
    }
}