import { EzFormFactory } from './core';
import { EzFormFactoryCfg, EzFormPlugin } from './core/types';
import { PluginManager } from './plugin/pluginManager';
export * from './core/componentFactory';



const useEzFormFactory = <FormModel,>(
    factoryCfg: EzFormFactoryCfg<FormModel>,
    plugins: EzFormPlugin<FormModel>[] = []
) => {

    // 注册插件
    const pluginManager = PluginManager.getInstance<FormModel>(factoryCfg);
    plugins.forEach(plugin => {
        pluginManager.usePlugin(plugin);
    })

    return {
        EzForm: EzFormFactory<FormModel>(pluginManager.applyPlugins(), pluginManager),
    }
}


export { useEzFormFactory };


