import { isRef, isReactive, readonly,inject } from 'vue'
import type { FunctionalComponent, Reactive } from 'vue';

export type FCParams = Parameters<FunctionalComponent>

type LogicContext<FormModel> =FCParams[1] & {
  renderParams?: Readonly<Record<string, any>>;
  model?: FormModel;
}

type RenderContext<FormModel> = LogicContext<FormModel>;

export type LogicHandler<FormModel> = (props: FCParams[0], ctx: LogicContext<FormModel>) => RenderContext<FormModel>;
export type Render<FormModel> = (props: FCParams[0], ctx: RenderContext<FormModel>) => any;

/**
 * 讲传递给UI渲染的参数设置为只读；
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

const componentFactory = <FormModel,>(
  itemLogic: (props: FCParams[0], ctx: LogicContext<FormModel>) => RenderContext<FormModel>,
  itemRender: Render<FormModel>,
  ctx: Omit<FCParams[1],'emit'>
): FunctionalComponent => {
  const FormComponent: FunctionalComponent = (props) => {
    const model = inject('formModel',{})  as FormModel;
    const lCtx = itemLogic(props, {...ctx,model});
    lCtx.renderParams = setReadOnly(lCtx.renderParams || {});
    lCtx.model = readonly(model as Reactive<FormModel>);
    return itemRender(props, lCtx)
  }

  return FormComponent
}

export { componentFactory };

