import type { FunctionalComponent } from 'vue'
import { LogicHandler, Render, componentFactory } from './componentFactory'

interface FormComponentProps<T> extends Record<string, unknown> {
  logicHandler: LogicHandler;
  render: Render;
  model: T
}

type EzFormParams<T> = Parameters<FunctionalComponent<FormComponentProps<T>>>

const EzForm = <T,>(props:EzFormParams<T>[0], ctx:EzFormParams<T>[1]) => {
  const { logicHandler, render, ...restProps } = props;

  const FormComponent = componentFactory(logicHandler, render, ctx)
  return <FormComponent {...restProps}></FormComponent>
}

export { EzForm }
