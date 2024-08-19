import { isRef, isReactive, readonly } from 'vue'
import type { FunctionalComponent, SetupContext } from 'vue';

type LogicFnParameters = Parameters<FunctionalComponent>
type LogicReturn = SetupContext & {
  renderParams: Readonly<Record<string, any>>
}
export type LogicHandler = (props: LogicFnParameters[0], ctx: LogicFnParameters[1]) => LogicReturn;
export type Render = (props: LogicFnParameters[0], ctx: LogicReturn) => any;

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

const componentFactory = (itemLogic: (props: LogicFnParameters[0], ctx: LogicFnParameters[1]) => LogicReturn, itemRender: Render, ctx: LogicFnParameters[1]): FunctionalComponent => {
  const FormComponent: FunctionalComponent = (props) => {
    const lCtx = itemLogic(props, ctx);
    lCtx.renderParams = setReadOnly(lCtx.renderParams);
    return itemRender(props, lCtx)
  }

  return FormComponent
}

export { componentFactory };

