import { Render } from '@/AxzoEzForm/core/componentFactory'
import { Field } from 'vant'
import styles from './pricingMethodFieldRender.module.css'

const pricingMthodFieldRender: Render = (props, ctx) => {
  debugger
  return (
    <Field center label="计价方式" name="pricingMethod" class={styles['pricing-method-field']}>
        {
            {
              input: () => (
                <div class="btn-radio-box">
                    {
                        ctx?.pricingMethodBtns?.value?.map(btn => {
                          return (
                                <div>{btn.label}</div>
                          )
                        })
                    }
                </div>
              )
            }
        }
    </Field>
  )
}
export { pricingMthodFieldRender }
