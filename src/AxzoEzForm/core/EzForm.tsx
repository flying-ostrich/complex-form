import { provide, defineComponent } from 'vue'
import { LogicHandler, Render, componentFactory } from './componentFactory'
interface FormComponentProps<FormModel> extends Record<string, any> {
  logicHandler: LogicHandler<FormModel>;
  render: Render<FormModel>;
  model: FormModel
}

interface FormInstance<FormModel> {
  changeFormData(field: keyof FormModel, value: any): void
}

const EzFormFactory = <FormModel,>() => {
  return defineComponent<FormComponentProps<FormModel>, {
    change(field: keyof FormModel, value: any): void
  }>(
    (props, ctx) => {
      const { logicHandler, render, model, ...restProps } = props;
      const { expose, emit, ...nCtx } = ctx;
      const changeFormData = (field: keyof FormModel, value: any) => {
        ctx.emit('change', field, value)
      };
      const FormComponent = componentFactory(logicHandler, render, nCtx);
      const formInstance: FormInstance<FormModel> = {
        changeFormData
      }
      provide('formModel', model);
      provide('formInstance', formInstance);
      return () => (<FormComponent {...restProps}></FormComponent>)
    },
    {
      props: ['model', 'render', 'logicHandler'],
      emits: ['change']
    }
  )
}

export { EzFormFactory }
