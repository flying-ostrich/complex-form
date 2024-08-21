import { componentFactory } from './componentFactory';
import { FCParams, LogicHandler, Render } from './types';

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

