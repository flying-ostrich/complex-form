import { provide, defineComponent, watch, ref, Ref } from 'vue'
import { componentFactory, generateComponentsByCfg } from './componentFactory'
import type { EzFormFactoryCfg, FormComponentProps, FormInstance } from './types';



/**
 * 根据表单项配置对象生成表单元素
 * @param factoryCfg 表单项配置对象
 * @returns 
 */
const useUpdateByFactoryCfg = <FormModel,>(factoryCfg: EzFormFactoryCfg<FormModel>): Ref<JSX.Element[]> => {
  let formItems = ref<JSX.Element[]>([]);
  watch(
    () => factoryCfg,
    (factoryCfg) => {
      formItems.value = generateComponentsByCfg(factoryCfg);
      console.log('factory config change=>', formItems.value);
    },
    {
      immediate: true,
      deep: true
    }
  )
  return formItems
}
/**
 * EzForm组件工厂函数
 * @param factoryCfg 表单项配置对象
 * @returns 
 */
const EzFormFactory = <FormModel,>(factoryCfg: EzFormFactoryCfg<FormModel>) => {
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

      const formItems = useUpdateByFactoryCfg(factoryCfg);
      return () => {
        return <FormComponent {...restProps}>{formItems.value}</FormComponent>
      }
    },
    {
      props: ['model', 'render', 'logicHandler'],
      emits: ['change']
    }
  )
}

export { EzFormFactory }
