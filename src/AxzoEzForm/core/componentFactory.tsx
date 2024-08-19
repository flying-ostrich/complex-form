import type { FunctionalComponent, SetupContext } from 'vue'

type LogicFnParameters = Parameters<FunctionalComponent>
type LogicReturn = SetupContext | Record<string, unknown>
export type LogicHandler = (props:LogicFnParameters[0], ctx:LogicFnParameters[1]) => LogicReturn;
export type Render = (props:LogicFnParameters[0], ctx:LogicReturn) => any;

const componentFactory = (itemLogic: (props:LogicFnParameters[0], ctx:LogicFnParameters[1]) => LogicReturn, itemRender: Render, ctx:LogicFnParameters[1]): FunctionalComponent => {
  const FormComponent:FunctionalComponent = (props) => {
    const lCtx = itemLogic(props, ctx)

    return itemRender(props, lCtx)
  }

  return FormComponent
}

export default componentFactory
