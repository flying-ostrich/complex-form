import type { FunctionalComponent } from 'vue'
import componentFactory, { LogicHandler, Render } from './componentFactory'

interface FormItemComponentProps extends Record<string, unknown> {
  logicHandler: LogicHandler;
  render:Render;
}

const EzFormItem: FunctionalComponent<FormItemComponentProps> = (props, ctx) => {
  const { logicHandler, render, ...restProps } = props

  const FormComponent = componentFactory(logicHandler, render, ctx)
  return <FormComponent {...restProps}></FormComponent>
}

export default EzFormItem
