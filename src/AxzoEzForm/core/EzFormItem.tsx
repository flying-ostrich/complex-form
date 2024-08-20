import { FCParams, LogicHandler, Render, componentFactory } from './componentFactory';

interface FormItemComponentProps<FormModel> {
  logicHandler: LogicHandler<FormModel>;
  render: Render<FormModel>;
  name: keyof FormModel
}

const EzFormItemFactory = <FormModel,>() => (props: FormItemComponentProps<FormModel>, ctx: FCParams[1]) => {
  const { logicHandler, render, ...restProps } = props
  const FormComponent = componentFactory(logicHandler, render, ctx)
  return <FormComponent {...restProps}></FormComponent>
}

export { EzFormItemFactory };

