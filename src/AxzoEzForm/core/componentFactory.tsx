import { isRef, isReactive, readonly, inject } from 'vue'
import type { FunctionalComponent, Reactive } from 'vue';
import type { EzFormFactoryCfg, RenderContext, LogicContext, FCParams, Render } from './types';
import { EzFormGroupFactory } from "./EzFormGroup"
import { EzFormItemFactory } from "./EzFormItem"

/**
 * 将传递给UI渲染的参数设置为只读；
 * 只处理 ref 和 reactive 的字段
 */
const setReadOnly = (params: Record<string, any>) => {
  if (!params) return params;
  const keys = Object.keys(params);
  keys?.forEach(key => {
    if (isRef(params[key]) || isReactive(params[key])) {
      params[key] = readonly(params[key]);
    }
  });
  return params;
}
/**
 * 组件 UI 逻辑 分离
 * @param itemLogic 逻辑处理函数
 * @param itemRender UI渲染函数
 * @param ctx 组件上下文
 * @returns 
 */
const componentFactory = <FormModel,>(
  itemLogic: (props: FCParams[0], ctx: LogicContext<FormModel>) => RenderContext<FormModel>,
  itemRender: Render<FormModel>,
  ctx: Omit<FCParams[1], 'emit'>
): FunctionalComponent => {
  const FormComponent: FunctionalComponent = (props, fCtx) => {
    const model = inject('formModel', {}) as FormModel;
    const lCtx = itemLogic(props, { ...ctx, model });

    // 渲染参数只读
    lCtx.renderParams = setReadOnly(lCtx.renderParams || {});
    // Form Model 只读
    lCtx.model = readonly(model as Reactive<FormModel>) as any;
    // FormComponent 内部子组件内容
    const fSlots = fCtx.slots?.default?.();
    // Render 函数渲染后的子组件内容
    const rSlots = itemRender(props, lCtx);
    return (
      <div>
        {fSlots}
        {rSlots}
      </div>
    )
  }

  return FormComponent;
}

const generateComponentsByCfg = <FormModel,>(factoryCfg: EzFormFactoryCfg<FormModel>) => {
  const EzFormGroup = EzFormGroupFactory<FormModel>();
  const EzFormItem = EzFormItemFactory<FormModel>();

  const mapLayer = (factoryCfg: EzFormFactoryCfg<FormModel>) => {
    if (!factoryCfg?.length) [];
    return factoryCfg.map(cfg => {
      if (cfg.type === 'group') {
        return (
          <EzFormGroup render={cfg.render} logicHandler={cfg.logicHandler} >
            {
              mapLayer(cfg.children)
            }
          </EzFormGroup>
        );
      }
      if (cfg.type === 'item') {
        return <EzFormItem render={cfg.render} logicHandler={cfg.logicHandler} name={cfg.fieldName} />
      }

      throw new Error('表单项 type 配置错误: type==' + cfg['type']);
    })
  }


  return mapLayer(factoryCfg);
}


export { componentFactory, generateComponentsByCfg };

