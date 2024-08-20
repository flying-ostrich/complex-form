import { FCParams, LogicHandler, Render, componentFactory } from './componentFactory'

interface FormGroupComponentProps<FormModel> {
  logicHandler: LogicHandler<FormModel>;
  render: Render<FormModel>;
}

const EzFormGroupFactory = <FormModel,>() => (
  props: FormGroupComponentProps<FormModel>,
  ctx: FCParams[1]
) => {
  const { logicHandler, render, ...restProps } = props
  const FormComponent = componentFactory(logicHandler, render, ctx)
  return (
    <FormComponent {...restProps}>
      {ctx.slots}
    </FormComponent>
  )
}

export { EzFormGroupFactory }
