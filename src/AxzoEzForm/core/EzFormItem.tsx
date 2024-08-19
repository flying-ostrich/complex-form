import type { FunctionalComponent } from 'vue'
import { LogicHandler, Render,componentFactory } from './componentFactory'

interface FormItemComponentProps extends Record<string, unknown> {
  logicHandler: LogicHandler;
  render:Render;
}

const EzFormItem: FunctionalComponent<FormItemComponentProps> = (props, ctx) => {
  const { logicHandler, render, ...restProps } = props

  const FormComponent = componentFactory(logicHandler, render, ctx)
  return <FormComponent {...restProps}></FormComponent>
}

export  {EzFormItem}
