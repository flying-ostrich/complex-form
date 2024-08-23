import { EzFormFactoryCfg, EzFormFactoryCfgLayer, EzFormItemPluginLogicHandler, EzFormItemPluginRender, FCParams, LogicHandler, PluginLogicContext, RenderContext } from "../core/types";

/**
 * 遍历表单配置对象
 * @param factoryCfg 
 * @param visit 
 * @returns 
 */
const tranverseFactoryCfg = <FormModel>(
    factoryCfg: EzFormFactoryCfg<FormModel>,
    visit: (item: EzFormFactoryCfgLayer<FormModel>, parent: EzFormFactoryCfg<FormModel>, idx: number) => void
): void => {
    if (!factoryCfg?.length) return;
    factoryCfg?.forEach((cfg, idx) => {
        visit(cfg, factoryCfg, idx);
        if (cfg.type === 'group') {
            tranverseFactoryCfg(cfg.children, visit);
        }
    });
}


/**
 * 组合插件逻辑处理函数
 * @param handlers 
 * @returns 
 */
const composePluginLogicHandlers = <FormModel>(handlers: EzFormItemPluginLogicHandler<FormModel>[]): LogicHandler<FormModel> => {
    return (props: FCParams[0], ctx: PluginLogicContext<FormModel>): RenderContext<FormModel> => {
        return handlers.reduce(({ props, ctx }, next) => {
            return next.apply(null, [props, ctx]);
        }, {
            props, ctx
        })
    }
}

/**
 * 组合插件渲染器
 * @param renders 
 * @returns 
 */
const composePluginRenders = <FormModel>(renders: EzFormItemPluginRender<FormModel>[]): EzFormItemPluginRender<FormModel> => {
    return (props, ctx, el, ...args): any => {
        return renders.reduce(({ props, ctx, args }, next) => {
            return next.apply(null, [props, ctx, el, ...args]);
        }, {
            props, ctx, el: null, args
        })
    }
}


export { tranverseFactoryCfg, composePluginLogicHandlers, composePluginRenders }