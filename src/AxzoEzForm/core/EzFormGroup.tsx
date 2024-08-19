import type { FunctionalComponent } from 'vue'
import { LogicHandler, Render,componentFactory } from './componentFactory'

interface FormGroupComponentProps extends Record<string, unknown> {
  logicHandler: LogicHandler;
  render:Render;
}

const EzFormGroup: FunctionalComponent<FormGroupComponentProps> = (props, ctx) => {
  const { logicHandler, render, ...restProps } = props

  const FormComponent = componentFactory(logicHandler, render, ctx)
  return (
    <FormComponent {...restProps}>
      {ctx.slots}
    </FormComponent>
  )
}

export  {EzFormGroup}
